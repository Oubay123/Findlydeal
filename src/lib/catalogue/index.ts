import { cache } from "react";
import {
  GLOBAL_EXCLUDED_WORDS,
  catalogueEbayEntries,
  type CatalogueEbayEntry,
} from "@/config/catalogue-ebay";
import { annotateOffersWithDeals, summarizeOffers, typicalOffers } from "@/lib/deals";
import { getEbayConfig } from "@/lib/ebay/config";
import { EbayApiError, getAccessToken, searchItems } from "@/lib/ebay/client";
import { catalogueSeeds } from "@/lib/mock";
import { normalizeTerm } from "@/lib/search/normalize";
import { catalogueContent } from "@/config/catalogue/content";
import { toOffer } from "@/lib/sources/ebay";
import type { Offer, Product, ProductCondition } from "@/types";
import {
  BUCKET_COUNT,
  bucketOf,
  getCatalogueRuntime,
  type CatalogueIndex,
  type CatalogueStore,
  type PricePoint,
} from "./store";

export type { PricePoint } from "./store";

/**
 * The live catalogue: the products of `src/config/catalogue-ebay.ts`, priced
 * by the real eBay listings that match them.
 *
 * Ratings and reviews of the demonstration catalogue are dropped: they were
 * examples, and nothing here may pass them off as real.
 *
 * ## How it is kept up to date
 *
 * The catalogue is stored (Supabase, or Workers KV: see `./store.ts`) and
 * split into buckets. Every ten minutes a Cron Trigger rebuilds the stalest
 * bucket: one eBay search per product of that bucket, about twenty, which
 * stays under the subrequest limit of a Worker. A full turn of the catalogue
 * takes a little under three hours.
 *
 * Pages never call eBay: listing pages read the index (one card per
 * product), a product page reads that product.
 */

/** Prices shown are at most about this old (one full turn of the buckets). */
export const CATALOGUE_TTL_SECONDS = 3 * 60 * 60;

/** A bucket younger than this is left alone, whoever asks for a refresh. */
export const MIN_BUCKET_AGE_SECONDS = 2 * 60 * 60;

/** Offers kept per product, cheapest first. */
const MAX_OFFERS_PER_PRODUCT = 24;

/** eBay searches run at once during a rebuild. */
const CONCURRENCY = 6;

/** How long an isolate reuses the index it read. */
const INDEX_MEMORY_MS = 5 * 60 * 1000;
/** An incomplete index (filling up) is re-read much sooner. */
const INDEX_MEMORY_INCOMPLETE_MS = 15 * 1000;

/** Lowercase, accents and punctuation folded: "GA-2100" -> "ga2100". */
const squash = (text: string) => normalizeTerm(text).replace(/[^a-z0-9]/g, "");
/** Words separated by single spaces, for whole-word and phrase checks. */
const spaced = (text: string) =>
  ` ${normalizeTerm(text)
    .replace(/[^a-z0-9]+/g, " ")
    .trim()} `;

/** Broken, locked, counterfeit or bundled: never shown, wherever it comes from. */
export function isExcludedListing(title: string): boolean {
  const words = spaced(title);
  return GLOBAL_EXCLUDED_WORDS.some((excluded) => words.includes(spaced(excluded)));
}

/** Does an eBay listing title describe this catalogue product? */
export function matchesEntry(title: string, entry: CatalogueEbayEntry): boolean {
  const compact = squash(title);
  const words = spaced(title);

  const allRequired = entry.require.every((group) =>
    group.some((alternative) => compact.includes(squash(alternative))),
  );
  if (!allRequired) return false;

  const allowed = new Set(entry.allow ?? []);
  return ![
    ...GLOBAL_EXCLUDED_WORDS.filter((word) => !allowed.has(word)),
    ...(entry.exclude ?? []),
  ].some((excluded) => words.includes(spaced(excluded)));
}

async function findOffers(entry: CatalogueEbayEntry): Promise<{ offers: Offer[]; total: number }> {
  const response = await searchItems({
    query: entry.query,
    minPrice: entry.minPrice,
    maxPrice: entry.maxPrice,
    limit: 50,
    // The catalogue is cached as a whole: caching each search on top would
    // double the subrequests of a rebuild for nothing.
    cache: false,
  });

  const offers = (response.itemSummaries ?? [])
    .filter((item) => item.title && matchesEntry(item.title, entry))
    .map((item) => toOffer(item))
    .filter((offer): offer is Offer => offer !== null && offer.condition !== "unknown");

  // Medians are computed on every matched listing, then the cheapest are
  // kept for display: keeping the cheapest first would bias the median low.
  return {
    offers: annotateOffersWithDeals(offers)
      .sort((a, b) => a.totalPrice.amount - b.totalPrice.amount)
      .slice(0, MAX_OFFERS_PER_PRODUCT),
    total: offers.length,
  };
}

/**
 * Identity of a catalogue product: the described catalogue
 * (`src/lib/mock/catalog/`) when the slug has a seed there, completed by the
 * editorial sheets of the extended catalogue (`src/config/catalogue/content/`).
 */
function identityOf(entry: CatalogueEbayEntry) {
  const seed = seedsBySlug.get(entry.slug);
  const content = catalogueContent[entry.slug];
  return {
    title: seed?.title ?? entry.title ?? entry.slug,
    brand: seed?.brand ?? entry.brand,
    model: seed?.model,
    category: seed?.category ?? entry.category,
    subject: seed?.imageSubject ?? entry.subject ?? "",
    releasedAt: seed?.releasedAt,
    description: entry.description ?? seed?.description ?? content?.description,
    specs: seed?.specs ?? content?.specs,
    videoReviewId: seed?.videoReviewId,
  };
}

const seedsBySlug = new Map(catalogueSeeds.map((seed) => [seed.slug, seed]));

function buildLiveProduct(
  entry: CatalogueEbayEntry,
  offers: Offer[],
  offerCount = offers.length,
): Product {
  const identity = identityOf(entry);
  // Photos from listings priced like the others: a doubtful listing's photo
  // may not even show the product.
  const images = [
    ...new Set(
      typicalOffers(offers)
        .map((offer) => offer.imageUrl)
        .filter(Boolean),
    ),
  ].slice(0, 3) as string[];

  return {
    id: entry.slug,
    title: identity.title,
    brand: identity.brand,
    model: identity.model,
    categorySlug: identity.category,
    imageUrl: images[0],
    imageAlt: `${identity.subject} ${identity.title}`.trim(),
    images,
    videoReviewId: identity.videoReviewId,
    releasedAt: identity.releasedAt,
    description: identity.description,
    specs: identity.specs,
    offers,
    offerCount,
    ...summarizeOffers(offers),
  };
}

const CONDITIONS: ProductCondition[] = ["new", "refurbished", "used"];

/**
 * The listing card of a product: everything a grid, a filter or a sort needs,
 * with the offers reduced to the cheapest typical one per condition (so the
 * "refurbished" and "used" pages, and the condition filter, still work).
 */
function toCard(product: Product): Product {
  const typical = typicalOffers(product.offers);
  const kept = CONDITIONS.flatMap((condition) => {
    const cheapest = typical
      .filter((offer) => offer.condition === condition)
      .sort((a, b) => a.totalPrice.amount - b.totalPrice.amount)[0];
    return cheapest ? [cheapest] : [];
  });
  const best = product.bestOffer;
  const offers = best && !kept.some((offer) => offer.id === best.id) ? [best, ...kept] : kept;
  return {
    ...product,
    images: product.imageUrl ? [product.imageUrl] : [],
    description: undefined,
    specs: undefined,
    offers,
  };
}

/** Runs `task` over `items`, at most `limit` at a time, keeping the order. */
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  task: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next++;
      results[index] = await task(items[index] as T);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const describe = (error: unknown) =>
  error instanceof EbayApiError || error instanceof Error ? error.message : String(error);

const entriesOfBucket = (bucket: number) =>
  catalogueEbayEntries.filter((entry) => bucketOf(entry.slug) === bucket);

/* ------------------------------------------------------------------ */
/* Refresh                                                             */
/* ------------------------------------------------------------------ */

export interface RefreshResult {
  rebuilt: boolean;
  reason?: "ebay-not-configured" | "fresh" | "locked" | "ebay-refused";
  store?: CatalogueStore["kind"];
  bucket?: number;
  products?: number;
  priced?: number;
  failures?: number;
}

/** Oldest refresh among the products of a bucket (0 when one is missing). */
function bucketAge(index: CatalogueIndex, bucket: number, now: number): number {
  const entries = entriesOfBucket(bucket);
  if (entries.length === 0) return 0;
  const oldest = Math.min(...entries.map((entry) => index[entry.slug]?.refreshedAt ?? 0));
  return now - oldest;
}

/** The bucket most in need of a refresh, if any is due. */
function stalestBucket(index: CatalogueIndex, now: number): number | null {
  let stalest: { bucket: number; age: number } | null = null;
  for (let bucket = 0; bucket < BUCKET_COUNT; bucket++) {
    const age = bucketAge(index, bucket, now);
    if (age >= MIN_BUCKET_AGE_SECONDS * 1000 && (!stalest || age > stalest.age)) {
      stalest = { bucket, age };
    }
  }
  return stalest?.bucket ?? null;
}

async function rebuildBucket(store: CatalogueStore, bucket: number): Promise<RefreshResult> {
  const started = Date.now();
  const config = getEbayConfig();
  if (!config) return { rebuilt: false, reason: "ebay-not-configured" };
  const entries = entriesOfBucket(bucket);

  // One token for the whole run; if eBay refuses the keys, stop there
  // instead of failing the same way once per product.
  try {
    await getAccessToken(config);
  } catch (error) {
    console.error(`[ebay] catalogue: ${describe(error)}`);
    return { rebuilt: false, reason: "ebay-refused", bucket };
  }

  let failures = 0;
  const failed = new Set<string>();
  const built = await mapWithConcurrency(entries, CONCURRENCY, async (entry) => {
    try {
      const { offers, total } = await findOffers(entry);
      return buildLiveProduct(entry, offers, total);
    } catch (error) {
      // One product failing (timeout, quota) must not empty the others.
      failures++;
      failed.add(entry.slug);
      console.error(`[ebay] catalogue ${entry.slug}: ${describe(error)}`);
      return buildLiveProduct(entry, []);
    }
  });

  // A product eBay failed on keeps its previous offers rather than vanishing.
  const previous =
    failed.size > 0
      ? new Map((await store.readBucket(bucket)).map((product) => [product.id, product]))
      : new Map<string, Product>();
  const products = built.map((product) =>
    failed.has(product.id) ? (previous.get(product.id) ?? product) : product,
  );

  const now = Date.now();
  const cards: CatalogueIndex = Object.fromEntries(
    products.map((product) => [product.id, { card: toCard(product), refreshedAt: now }]),
  );
  const priced = products.filter((product) => product.offers.length > 0).length;

  await store.writeBucket({
    bucket,
    products,
    cards,
    slugs: entries.map((entry) => entry.slug),
    stats: { priced, failures, durationMs: now - started },
  });
  memory = null;

  console.log(
    `[ebay] bucket ${bucket} (${store.kind}): ${priced}/${entries.length} products priced, ${failures} failed`,
  );
  return { rebuilt: true, store: store.kind, bucket, products: entries.length, priced, failures };
}

/**
 * Rebuilds the stalest bucket if one is due. Called by the Cron Trigger
 * every ten minutes (`cloudflare/worker.js`), and in the background by page
 * views while part of the catalogue has never been built. Harmless when
 * called more often: a recent bucket is left alone and a lock keeps two
 * refreshes from running together.
 */
export async function refreshCatalogue(): Promise<RefreshResult> {
  if (!getEbayConfig()) return { rebuilt: false, reason: "ebay-not-configured" };
  const { store } = getCatalogueRuntime();

  const index = await store.readIndex();
  const bucket = stalestBucket(index, Date.now());
  if (bucket === null) return { rebuilt: false, reason: "fresh", store: store.kind };
  if (!(await store.acquireLock(90)))
    return { rebuilt: false, reason: "locked", store: store.kind };

  try {
    return await rebuildBucket(store, bucket);
  } finally {
    await store.releaseLock().catch(() => undefined);
  }
}

/* ------------------------------------------------------------------ */
/* Reads                                                               */
/* ------------------------------------------------------------------ */

let memory: { index: CatalogueIndex; expiresAt: number } | null = null;

function remember(index: CatalogueIndex) {
  // While the catalogue is filling up (first deployment, new products), the
  // next read happens soon: nobody should see an empty site for minutes.
  const complete = catalogueEbayEntries.every((entry) => index[entry.slug]);
  memory = {
    index,
    expiresAt: Date.now() + (complete ? INDEX_MEMORY_MS : INDEX_MEMORY_INCOMPLETE_MS),
  };
}

const readIndex = cache(async function readIndex(): Promise<CatalogueIndex> {
  if (memory && Date.now() < memory.expiresAt) return memory.index;
  const { store, waitUntil } = getCatalogueRuntime();

  let index: CatalogueIndex;
  try {
    index = await store.readIndex();
  } catch (error) {
    console.error(`[catalogue] index: ${describe(error)}`);
    return memory?.index ?? {};
  }

  // Without a store shared between requests (local server), build it all now.
  if (store.kind === "memory" && Object.keys(index).length === 0) {
    for (let bucket = 0; bucket < BUCKET_COUNT; bucket++) await rebuildBucket(store, bucket);
    index = await store.readIndex();
  }

  // Part of the catalogue has never been built (first deployment, new
  // products): build it in the background instead of waiting for the cron.
  const incomplete = catalogueEbayEntries.some((entry) => !index[entry.slug]);
  if (incomplete && waitUntil && store.kind !== "memory") {
    waitUntil(refreshCatalogue().catch((error) => console.error(`[catalogue] ${describe(error)}`)));
  }

  remember(index);
  return index;
});

const knownSlugs = new Set(catalogueEbayEntries.map((entry) => entry.slug));

/**
 * Listing cards of the catalogue products that currently have an offer, in
 * the order of the configuration. Their `offers` hold one offer per
 * condition; use `getCatalogueProduct` for the full comparison.
 */
export const getPricedCatalogue = cache(async function getPricedCatalogue(): Promise<Product[]> {
  if (!getEbayConfig()) return [];
  const index = await readIndex();
  return catalogueEbayEntries.flatMap((entry) => {
    const card = index[entry.slug]?.card;
    return card && card.offers.length > 0 ? [card] : [];
  });
});

/**
 * One catalogue product with every offer kept for it, or `null` when the slug
 * is unknown. A product not built yet (or with no offer right now) comes back
 * without offers: its page stays reachable, without being indexed.
 */
export const getCatalogueProduct = cache(async function getCatalogueProduct(
  slug: string,
): Promise<Product | null> {
  if (!knownSlugs.has(slug) || !getEbayConfig()) return null;
  const entry = catalogueEbayEntries.find((candidate) => candidate.slug === slug);
  if (!entry) return null;
  try {
    const stored = await getCatalogueRuntime().store.readProduct(slug);
    if (stored) return stored;
  } catch (error) {
    console.error(`[catalogue] ${slug}: ${describe(error)}`);
  }
  // Fall back on the card (cheapest offer per condition), else an empty page.
  const card = (await readIndex())[slug]?.card;
  return card ?? buildLiveProduct(entry, []);
});

/** How far back the product page's price history looks. */
export const PRICE_HISTORY_DAYS = 90;

/**
 * Price history of a catalogue product, oldest first. Empty while the
 * database has not accumulated points (or without a database at all): the
 * page then simply skips the section.
 */
export const getPriceHistory = cache(async function getPriceHistory(
  slug: string,
): Promise<PricePoint[]> {
  if (!knownSlugs.has(slug) || !getEbayConfig()) return [];
  try {
    return await getCatalogueRuntime().store.readPriceHistory(slug, PRICE_HISTORY_DAYS);
  } catch (error) {
    console.error(`[catalogue] history ${slug}: ${describe(error)}`);
    return [];
  }
});

/** Is this id one of the live catalogue products? */
export function isCatalogueSlug(id: string): boolean {
  return knownSlugs.has(id);
}
