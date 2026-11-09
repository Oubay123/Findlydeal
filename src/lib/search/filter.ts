import { normalizeTerm } from "@/lib/search/normalize";
import { sortProducts } from "@/lib/search/sort";
import type { CategorySlug, Product, ProductCondition, SearchQuery } from "@/types";

/**
 * In-memory search over products that are already built: the demonstration
 * catalogue, and the catalogue products carrying live eBay offers. Same
 * contract as a source search, so the pages cannot tell them apart.
 */

/**
 * Two categories are transversal rather than thematic: a product belongs to
 * "Reconditionné" or "Occasion" because of the *condition* of one of its
 * offers, not because of what it is. Browsing them filters on condition.
 */
const CONDITION_CATEGORIES: Partial<Record<CategorySlug, ProductCondition>> = {
  refurbished: "refurbished",
  "second-hand": "used",
};

/** Does this product belong to the category being browsed? */
function matchesCategory(product: Product, slug: CategorySlug): boolean {
  const condition = CONDITION_CATEGORIES[slug];
  if (condition) return product.offers.some((offer) => offer.condition === condition);
  return product.categorySlug === slug;
}

/** Every word of the query must appear somewhere in the product's text. */
function matchesTerm(product: Product, words: string[]): boolean {
  const haystack = normalizeTerm(
    [product.title, product.brand, product.model, product.description].filter(Boolean).join(" "),
  );
  return words.every((word) => haystack.includes(word));
}

export function filterProducts(products: Product[], query: SearchQuery): Product[] {
  const { filters } = query;
  const words = normalizeTerm(query.term).split(" ").filter(Boolean);

  const matched = products.filter((product) => {
    if (words.length > 0 && !matchesTerm(product, words)) return false;
    if (filters.categorySlug && !matchesCategory(product, filters.categorySlug)) return false;

    // A product qualifies as soon as one of its offers satisfies the filters.
    const offers = product.offers.filter((offer) => {
      if (filters.sources && !filters.sources.includes(offer.source)) return false;
      if (filters.conditions && !filters.conditions.includes(offer.condition)) return false;

      const euros = offer.totalPrice.amount / 100;
      if (filters.minPrice !== undefined && euros < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && euros > filters.maxPrice) return false;
      return true;
    });

    if (offers.length === 0) return false;
    if (filters.dealsOnly && !offers.some((offer) => (offer.deal?.score ?? 0) > 0)) return false;
    return true;
  });

  return sortProducts(matched, query);
}
