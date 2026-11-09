import { cache } from "react";
import {
  GLOBAL_EXCLUDED_WORDS,
  catalogueEbayEntries,
  type CatalogueEbayEntry,
} from "@/config/catalogue-ebay";
import { annotateOffersWithDeals, summarizeOffers, typicalOffers } from "@/lib/deals";
import { cached } from "@/lib/ebay/cache";
import { getEbayConfig } from "@/lib/ebay/config";
import { EbayApiError, getAccessToken, searchItems } from "@/lib/ebay/client";
import type { MockProductSeed } from "@/lib/mock/build";
import { catalogueSeeds } from "@/lib/mock";
import { normalizeTerm } from "@/lib/search/normalize";
import { toOffer } from "@/lib/sources/ebay";
import { getCatalogueRuntime, type CatalogueKv, type CatalogueRuntime } from "./store";
import type { Offer, Product } from "@/types";

/**
 * The live catalogue: our product descriptions, priced by real eBay offers.
 *
 * Each product listed in `src/config/catalogue-ebay.ts` keeps its catalogue
 * description (title, specs, release date) and gets the eBay listings that
 * match it as offers. Ratings and reviews of the demonstration catalogue are
 * dropped: they were examples, and nothing here may pass them off as real.
 *
 * The whole catalogue is rebuilt every `CATALOGUE_TTL_SECONDS` by a scheduled
 * job and kept as a single Workers KV entry shared by every data centre (see
 * `loadFromKv`). A rebuild costs one eBay search per product, which stays
 * under the 50-subrequest limit of a Worker on the free plan (about 25
 * products today). Past ~40 products, split the rebuild in batches.
 */

/** How long one priced catalogue is reused: prices shown are at most this old. */
export const CATALOGUE_TTL_SECONDS = 3 * 60 * 60;

/** Offers kept per product, cheapest first. */
const MAX_OFFERS_PER_PRODUCT = 24;

/** eBay searches run at once during a rebuild. */
const CONCURRENCY = 6;

/**
 * A rebuild where some searches failed is kept 15 minutes, so the missing
 * products come back soon; one where eBay refused everything, 2 minutes, so
 * a fixed key is picked up quickly without calling eBay on every visit.
 */
const PARTIAL_TTL_SECONDS = 15 * 60;
const FAILED_TTL_SECONDS = 2 * 60;

interface LiveCatalogue {
  products: Product[];
  failures: number;
}

/** Lowercase, accents and punctuation folded: "GA-2100" -> "ga2100". */
const squash = (text: string) => normalizeTerm(text).replace(/[^a-z0-9]/g, "");
/** Words separated by single spaces, for whole-word and phrase checks. */
const spaced = (text: string) =>
  ` ${normalizeTerm(text)
    .replace(/[^a-z0-9]+/g, " ")
    .trim()} `;

/** Does an eBay listing title describe this catalogue product? */
export function matchesEntry(title: string, entry: CatalogueEbayEntry): boolean {
  const compact = squash(title);
  const words = spaced(title);

  const allRequired = entry.require.every((group) =>
    group.some((alternative) => compact.includes(squash(alternative))),
  );
  if (!allRequired) return false;

  return ![...GLOBAL_EXCLUDED_WORDS, ...(entry.exclude ?? [])].some((excluded) =>
    words.includes(spaced(excluded)),
  );
}

async function findOffers(entry: CatalogueEbayEntry): Promise<Offer[]> {
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
  return annotateOffersWithDeals(offers)
    .sort((a, b) => a.totalPrice.amount - b.totalPrice.amount)
    .slice(0, MAX_OFFERS_PER_PRODUCT);
}

function buildLiveProduct(seed: MockProductSeed, entry: CatalogueEbayEntry, offers: Offer[]) {
  // Photos from listings priced like the others: a doubtful listing's photo
  // may not even show the product.
  const images = [
    ...new Set(
      typicalOffers(offers)
        .map((offer) => offer.imageUrl)
        .filter(Boolean),
    ),
  ].slice(0, 3) as string[];

  const product: Product = {
    id: seed.slug,
    title: seed.title,
    brand: seed.brand,
    model: seed.model,
    categorySlug: seed.category,
    imageUrl: images[0],
    imageAlt: `${seed.imageSubject} ${seed.title}`,
    images,
    videoReviewId: seed.videoReviewId,
    releasedAt: seed.releasedAt,
    description: entry.description ?? seed.description,
    specs: seed.specs,
    offers,
    ...summarizeOffers(offers),
  };
  return product;
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

async function buildLiveCatalogue(): Promise<LiveCatalogue> {
  const seedsBySlug = new Map(catalogueSeeds.map((seed) => [seed.slug, seed]));
  const entries = catalogueEbayEntries.filter((entry) => seedsBySlug.has(entry.slug));
  const config = getEbayConfig();
  if (!config) return { products: [], failures: 0 };
  const empty = (entry: CatalogueEbayEntry) =>
    buildLiveProduct(seedsBySlug.get(entry.slug) as MockProductSeed, entry, []);

  // One token for the whole rebuild; if eBay refuses the keys, stop there
  // instead of failing the same way once per product.
  try {
    await getAccessToken(config);
  } catch (error) {
    console.error(`[ebay] catalogue: ${describe(error)}`);
    return { products: entries.map(empty), failures: entries.length };
  }

  let failures = 0;
  const products = await mapWithConcurrency(entries, CONCURRENCY, async (entry) => {
    try {
      return buildLiveProduct(
        seedsBySlug.get(entry.slug) as MockProductSeed,
        entry,
        await findOffers(entry),
      );
    } catch (error) {
      // One product failing (timeout, quota) must not empty the whole site.
      failures++;
      console.error(`[ebay] catalogue ${entry.slug}: ${describe(error)}`);
      return empty(entry);
    }
  });

  const priced = products.filter((product) => product.offers.length > 0).length;
  console.log(
    `[ebay] catalogue rebuilt: ${priced}/${entries.length} products priced, ${failures} failed`,
  );
  return { products, failures };
}

const describe = (error: unknown) =>
  error instanceof EbayApiError || error instanceof Error ? error.message : String(error);

interface StoredCatalogue extends LiveCatalogue {
  /** Epoch milliseconds of the rebuild. */
  builtAt: number;
}

/** Bump when the stored shape or the offer logic changes. */
const STORE_KEY = "catalogue:ebay:v3";
/** Set while a rebuild runs; expires on its own (KV minimum: 60 s). */
const LOCK_KEY = `${STORE_KEY}:lock`;
const LOCK_TTL_SECONDS = 120;
/** How long an isolate reuses what it read from KV before reading again. */
const MEMORY_TTL_MS = 5 * 60 * 1000;

function ttlSecondsFor({ products, failures }: LiveCatalogue): number {
  if (failures === 0) return CATALOGUE_TTL_SECONDS;
  return failures < products.length ? PARTIAL_TTL_SECONDS : FAILED_TTL_SECONDS;
}

const ageMs = (catalogue: StoredCatalogue) => Date.now() - catalogue.builtAt;
const isFresh = (catalogue: StoredCatalogue) => ageMs(catalogue) < ttlSecondsFor(catalogue) * 1000;

let memory: { catalogue: StoredCatalogue; readAt: number } | null = null;
let rebuilding: Promise<StoredCatalogue> | null = null;

/**
 * Rebuilds the catalogue and stores it. A rebuild where eBay refused
 * everything never replaces a good catalogue: visitors keep seeing the last
 * prices (with their date) rather than an empty site.
 */
function rebuild(kv: CatalogueKv | undefined, previous: StoredCatalogue | null) {
  rebuilding ??= (async () => {
    const built = await buildLiveCatalogue();
    const failedEntirely = built.failures > 0 && built.failures >= built.products.length;
    if (failedEntirely && previous && previous.products.length > 0) return previous;

    const stored: StoredCatalogue = { ...built, builtAt: Date.now() };
    memory = { catalogue: stored, readAt: Date.now() };
    await kv?.put(STORE_KEY, JSON.stringify(stored));
    return stored;
  })().finally(() => {
    rebuilding = null;
  });
  return rebuilding;
}

async function readStored(kv: CatalogueKv): Promise<StoredCatalogue | null> {
  if (memory && Date.now() - memory.readAt < MEMORY_TTL_MS && isFresh(memory.catalogue)) {
    return memory.catalogue;
  }
  const stored = (await kv.get(STORE_KEY, { type: "json" })) as StoredCatalogue | null;
  if (stored) memory = { catalogue: stored, readAt: Date.now() };
  return stored;
}

/**
 * The stored catalogue, refreshed when due.
 *
 * - fresh: served as is;
 * - stale: served as is, and rebuilt in the background by one request only
 *   (a KV lock), so visitors never wait for eBay;
 * - missing (first deploy): built now.
 *
 * A Cron Trigger (`cloudflare/worker.js`) also calls `refreshCatalogue()`
 * every three hours, so a visitor rarely meets a stale catalogue at all.
 */
async function loadFromKv(kv: CatalogueKv, waitUntil?: CatalogueRuntime["waitUntil"]) {
  const stored = await readStored(kv);
  if (stored && isFresh(stored)) return stored;
  if (rebuilding) return stored ?? rebuilding;

  const locked = await kv.get(LOCK_KEY);
  if (locked && stored) return stored;
  await kv.put(LOCK_KEY, "1", { expirationTtl: LOCK_TTL_SECONDS });

  const job = rebuild(kv, stored);
  if (!stored) return job;
  waitUntil?.(job.catch((error) => console.error(`[ebay] catalogue: ${describe(error)}`)));
  return stored;
}

/**
 * Rebuilds the catalogue if it is older than `minAgeSeconds` (or incomplete).
 * Used by the scheduled refresh; harmless if called more often, since a
 * recent catalogue is left alone.
 */
export async function refreshCatalogue(minAgeSeconds: number) {
  if (!getEbayConfig()) return { rebuilt: false, reason: "ebay-not-configured" as const };
  const { kv } = getCatalogueRuntime();
  if (!kv) return { rebuilt: false, reason: "no-kv" as const };

  const stored = (await kv.get(STORE_KEY, { type: "json" })) as StoredCatalogue | null;
  if (stored && stored.failures === 0 && ageMs(stored) < minAgeSeconds * 1000) {
    return { rebuilt: false, reason: "recent" as const, builtAt: stored.builtAt };
  }
  await kv.put(LOCK_KEY, "1", { expirationTtl: LOCK_TTL_SECONDS });
  const catalogue = await rebuild(kv, stored);
  return {
    rebuilt: true,
    builtAt: catalogue.builtAt,
    priced: catalogue.products.filter((product) => product.offers.length > 0).length,
    failures: catalogue.failures,
  };
}

/**
 * Every live catalogue product, including those with no offer right now
 * (their page stays reachable, without being indexed). Memoised per request.
 */
export const getLiveCatalogue = cache(async function getLiveCatalogue(): Promise<Product[]> {
  if (!getEbayConfig()) return [];
  const { kv, waitUntil } = getCatalogueRuntime();
  if (kv) return (await loadFromKv(kv, waitUntil)).products;

  // No KV (local server, tests): the per-isolate cache is enough.
  const catalogue = await cached(STORE_KEY, ttlSecondsFor, buildLiveCatalogue);
  return catalogue.products;
});

/** Live catalogue products that currently have at least one offer. */
export async function getPricedCatalogue(): Promise<Product[]> {
  return (await getLiveCatalogue()).filter((product) => product.offers.length > 0);
}

/** Is this id one of the live catalogue products? */
export function isCatalogueSlug(id: string): boolean {
  return catalogueEbayEntries.some((entry) => entry.slug === id);
}
