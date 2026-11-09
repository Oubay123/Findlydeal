import { cache } from "react";
import {
  GLOBAL_EXCLUDED_WORDS,
  catalogueEbayEntries,
  type CatalogueEbayEntry,
} from "@/config/catalogue-ebay";
import { annotateOffersWithDeals } from "@/lib/deals";
import { cached } from "@/lib/ebay/cache";
import { isEbayConfigured } from "@/lib/ebay/config";
import { searchItems } from "@/lib/ebay/client";
import type { MockProductSeed } from "@/lib/mock/build";
import { catalogueSeeds } from "@/lib/mock";
import { normalizeTerm } from "@/lib/search/normalize";
import { toOffer } from "@/lib/sources/ebay";
import type { Offer, Product } from "@/types";

/**
 * The live catalogue: our product descriptions, priced by real eBay offers.
 *
 * Each product listed in `src/config/catalogue-ebay.ts` keeps its catalogue
 * description (title, specs, release date) and gets the eBay listings that
 * match it as offers. Ratings and reviews of the demonstration catalogue are
 * dropped: they were examples, and nothing here may pass them off as real.
 *
 * The whole catalogue is rebuilt at most once per `CATALOGUE_TTL_SECONDS` per
 * Cloudflare data centre and kept as a single cache entry. A rebuild costs one
 * eBay search per product, which stays under the 50-subrequest limit of a
 * Worker on the free plan (about 25 products today). Past ~40 products, move
 * the rebuild to a scheduled job writing to a database (Supabase, planned).
 */

/** How long one priced catalogue is reused: prices shown are at most this old. */
export const CATALOGUE_TTL_SECONDS = 3 * 60 * 60;

/** Offers kept per product, cheapest first. */
const MAX_OFFERS_PER_PRODUCT = 24;

/** eBay searches run at once during a rebuild. */
const CONCURRENCY = 6;

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
    limit: 50,
    // The catalogue is cached as a whole: caching each search on top would
    // double the subrequests of a rebuild for nothing.
    cache: false,
  });

  const offers = (response.itemSummaries ?? [])
    .filter((item) => item.title && matchesEntry(item.title, entry))
    .map((item) => toOffer(item))
    .filter((offer): offer is Offer => offer !== null && offer.condition !== "unknown")
    .sort((a, b) => a.totalPrice.amount - b.totalPrice.amount)
    .slice(0, MAX_OFFERS_PER_PRODUCT);

  return annotateOffersWithDeals(offers).sort((a, b) => a.totalPrice.amount - b.totalPrice.amount);
}

function buildLiveProduct(seed: MockProductSeed, entry: CatalogueEbayEntry, offers: Offer[]) {
  const images = [...new Set(offers.map((offer) => offer.imageUrl).filter(Boolean))].slice(
    0,
    3,
  ) as string[];
  const cheapest = offers[0];
  const dearest = offers[offers.length - 1];

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
    bestOffer: cheapest,
    priceRange:
      cheapest && dearest ? { min: cheapest.totalPrice, max: dearest.totalPrice } : undefined,
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

async function buildLiveCatalogue(): Promise<Product[]> {
  const seedsBySlug = new Map(catalogueSeeds.map((seed) => [seed.slug, seed]));
  const entries = catalogueEbayEntries.filter((entry) => seedsBySlug.has(entry.slug));

  return mapWithConcurrency(entries, CONCURRENCY, async (entry) => {
    const seed = seedsBySlug.get(entry.slug) as MockProductSeed;
    // One product failing (timeout, quota) must not empty the whole site.
    const offers = await findOffers(entry).catch(() => [] as Offer[]);
    return buildLiveProduct(seed, entry, offers);
  });
}

/**
 * Every live catalogue product, including those with no offer right now
 * (their page stays reachable, without being indexed). Memoised per request,
 * cached across requests.
 */
export const getLiveCatalogue = cache(async function getLiveCatalogue(): Promise<Product[]> {
  if (!isEbayConfigured()) return [];
  return cached("catalogue:ebay:v1", CATALOGUE_TTL_SECONDS, buildLiveCatalogue);
});

/** Live catalogue products that currently have at least one offer. */
export async function getPricedCatalogue(): Promise<Product[]> {
  return (await getLiveCatalogue()).filter((product) => product.offers.length > 0);
}

/** Is this id one of the live catalogue products? */
export function isCatalogueSlug(id: string): boolean {
  return catalogueEbayEntries.some((entry) => entry.slug === id);
}
