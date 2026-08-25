import { getConfiguredSources } from "@/lib/sources";
import { SourceError as SourceAdapterError } from "@/lib/sources/types";
import { searchMockProducts } from "@/lib/mock";
import { sortProducts } from "@/lib/search/sort";
import type { Offer, Product, SearchQuery, SearchResult, SourceError, SourceId } from "@/types";

export { sortProducts } from "@/lib/search/sort";

/**
 * The heart of the product: query every relevant source in parallel, normalise
 * the answers, group them per product and rank them.
 *
 * Design decisions already baked in:
 * - one slow or failing source must never fail the whole search: errors are
 *   collected per source and surfaced to the UI;
 * - sources without credentials are skipped, not called;
 * - grouping and sorting stay pure so they can be unit-tested without network.
 */
export async function searchAllSources(query: SearchQuery): Promise<SearchResult> {
  const sources = getConfiguredSources().filter((source) =>
    query.filters.sources ? query.filters.sources.includes(source.id) : true,
  );

  // No affiliate programme approved yet: serve the demonstration catalogue
  // rather than an empty page. This branch disappears on its own as soon as
  // one adapter reports `isConfigured() === true`. See `src/lib/mock/`.
  if (sources.length === 0) {
    const products = searchMockProducts(query);
    return {
      query,
      products,
      totalCount: products.length,
      sourcesQueried: [],
      errors: [],
    };
  }

  const errors: SourceError[] = [];
  const offers: Offer[] = [];

  const responses = await Promise.allSettled(
    sources.map((source) =>
      source.search({
        term: query.term,
        locale: query.locale,
        categorySlug: query.filters.categorySlug,
        conditions: query.filters.conditions,
        minPrice: query.filters.minPrice,
        maxPrice: query.filters.maxPrice,
        limit: query.perPage,
        page: query.page,
      }),
    ),
  );

  responses.forEach((response, index) => {
    const sourceId = sources[index]?.id as SourceId;
    if (response.status === "fulfilled") {
      offers.push(...response.value.offers);
      return;
    }
    const reason: unknown = response.reason;
    errors.push({
      source: sourceId,
      message:
        reason instanceof SourceAdapterError || reason instanceof Error
          ? reason.message
          : "Unknown source error",
    });
  });

  const products = sortProducts(groupOffersIntoProducts(offers), query);

  return {
    query,
    products,
    totalCount: products.length,
    sourcesQueried: sources.map((source) => source.id),
    errors,
  };
}

/**
 * Group offers that describe the same physical product.
 *
 * TODO: real matching (brand + model + storage/size normalisation, EAN/GTIN
 * when available, fuzzy title similarity as a last resort). For now every
 * offer is its own product, which is correct — just not yet useful.
 */
export function groupOffersIntoProducts(offers: Offer[]): Product[] {
  return offers.map((offer) => ({
    id: offer.id,
    title: offer.title,
    imageUrl: offer.imageUrl,
    offers: [offer],
    bestOffer: offer,
    priceRange: { min: offer.totalPrice, max: offer.totalPrice },
  }));
}
