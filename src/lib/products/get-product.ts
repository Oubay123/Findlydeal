import { cache } from "react";
import { annotateOffersWithDeals } from "@/lib/deals";
import { getConfiguredSources, getSource } from "@/lib/sources";
import { getLiveCatalogue, isCatalogueSlug } from "@/lib/catalogue";
import { getMockProductById } from "@/lib/mock";
import { DEFAULT_LOCALE } from "@/lib/constants";
import type { Locale, Product, SourceId } from "@/types";

/**
 * Product retrieval for the comparison page.
 *
 * Two kinds of ids, once a source is configured:
 * - a catalogue slug (`apple-iphone-13-128go-minuit`): our product page,
 *   priced by every matching live offer (`src/lib/catalogue`);
 * - an offer id (`<source>:<externalId>`): a single listing found by search,
 *   with no cross-source product identity yet.
 */

/** Split `"ebay:123456"` into its source and its source-local id. */
export function parseProductId(id: string): { source: SourceId; externalId: string } | null {
  const separatorIndex = id.indexOf(":");
  if (separatorIndex <= 0) return null;

  const source = id.slice(0, separatorIndex);
  const externalId = id.slice(separatorIndex + 1);
  if (!externalId || !getSource(source as SourceId)) return null;

  return { source: source as SourceId, externalId };
}

/**
 * Fetch a product and all of its competing offers.
 * Returns `null` when the id is unknown or its source is unavailable.
 *
 * Wrapped in React's `cache()`: the product page calls this twice per
 * request — once in `generateMetadata`, once in the component — and without
 * memoisation that is two full lookups, which will be two HTTP round trips
 * once real adapters are wired.
 *
 * **Integration point for real sources.** When `adapter.search()` starts
 * making network calls, `cache()` alone is not enough: it only dedupes
 * *within* a single request. Add persistent caching there too, either by
 * calling the marketplace through `fetch(url, { next: { revalidate: 3600 } })`
 * — Next then caches the response across requests and visitors — or by
 * wrapping the adapter in `unstable_cache` when the client is not fetch-based.
 * Without it, every page view burns an API quota.
 */
export const getProductById = cache(async function getProductById(
  id: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<Product | null> {
  // No affiliate programme approved yet: the demonstration catalogue answers.
  // Removed automatically once a real source is configured. See `src/lib/mock/`.
  if (getConfiguredSources().length === 0) {
    return getMockProductById(id) ?? null;
  }

  // A catalogue product: our description, priced by live offers.
  if (isCatalogueSlug(id)) {
    return (await getLiveCatalogue()).find((product) => product.id === id) ?? null;
  }

  // Otherwise a single marketplace listing (`ebay:v1|123|0`), found by search.
  const parsed = parseProductId(id);
  if (!parsed) return null;

  const adapter = getSource(parsed.source);
  if (!adapter?.getOffer || !adapter.isConfigured()) return null;

  try {
    const offer = await adapter.getOffer(parsed.externalId, locale);
    if (!offer) return null;

    // TODO: once product grouping exists, also fetch the competing offers from
    // the other sources here and merge them into `offers`.
    const offers = annotateOffersWithDeals([offer]);

    return {
      id,
      title: offer.title,
      imageUrl: offer.imageUrl,
      offers,
      bestOffer: offers[0],
      priceRange: { min: offer.totalPrice, max: offer.totalPrice },
    };
  } catch {
    // A dead offer id is expected traffic, not an incident.
    return null;
  }
});
