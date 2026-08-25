import { compareMoney } from "@/lib/utils";
import type { Product, SearchQuery } from "@/types";

/**
 * Ranking, extracted from the aggregator so both the live pipeline and the
 * demonstration catalogue order results identically — and so neither module
 * has to import the other.
 */

/** Rank products according to the query's sort option. Pure. */
export function sortProducts(products: Product[], query: SearchQuery): Product[] {
  const sorted = [...products];

  switch (query.filters.sort) {
    case "price_asc":
      return sorted.sort((a, b) => comparePrice(a, b));
    case "price_desc":
      return sorted.sort((a, b) => comparePrice(b, a));
    case "deal_score":
      return sorted.sort(
        (a, b) => (b.bestOffer?.deal?.score ?? 0) - (a.bestOffer?.deal?.score ?? 0),
      );
    case "relevance":
    default:
      // TODO: relevance scoring once sources return a usable ranking signal.
      return sorted;
  }
}

function comparePrice(a: Product, b: Product): number {
  if (!a.bestOffer) return 1;
  if (!b.bestOffer) return -1;
  return compareMoney(a.bestOffer.totalPrice, b.bestOffer.totalPrice);
}
