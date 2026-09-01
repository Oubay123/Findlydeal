import { getConfiguredSources } from "@/lib/sources";
import { sortProducts } from "@/lib/search/sort";
import { normalizeTerm } from "@/lib/search/normalize";
import { buildMockProduct } from "@/lib/mock/build";
import { techSeeds } from "@/lib/mock/catalog/tech";
import { homeApplianceSeeds } from "@/lib/mock/catalog/home-appliances";
import { furnitureSeeds } from "@/lib/mock/catalog/furniture";
import { watchesJewelrySeeds } from "@/lib/mock/catalog/watches-jewelry";
import { creationWatchesSeeds } from "@/lib/mock/catalog/creation-watches";
import { lifestyleSeeds } from "@/lib/mock/catalog/lifestyle";
import type { CategorySlug, Product, ProductCondition, SearchQuery } from "@/types";

/**
 * Demonstration catalogue — READ THIS BEFORE PLUGGING A REAL SOURCE.
 *
 * Findlydeal ships with a fabricated catalogue so the site can be evaluated
 * (and submitted to affiliate programmes) before any API access is granted.
 * It is deliberately confined to this folder and exposed through the same
 * query shapes the live pipeline uses, so swapping it out is a deletion, not
 * a rewrite:
 *
 *   - `searchMockProducts(query)`  mirrors  `searchAllSources(query)`
 *   - `getMockProductById(id)`     mirrors  `getProductById(id)`
 *
 * `src/lib/search/aggregate.ts` and `src/lib/products/get-product.ts` fall
 * back here **only while no source is configured**. The day a real adapter
 * reports `isConfigured() === true`, this catalogue stops being read at all.
 *
 * Every product is presented to visitors as an example — see
 * `src/components/common/demo-notice.tsx`.
 */

/** The whole catalogue, built once at module load. */
const products: Product[] = [
  ...techSeeds,
  ...homeApplianceSeeds,
  ...furnitureSeeds,
  ...watchesJewelrySeeds,
  ...creationWatchesSeeds,
  ...lifestyleSeeds,
].map(buildMockProduct);

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

const productsById = new Map(products.map((product) => [product.id, product]));

export function getMockProducts(): Product[] {
  return products;
}

export function getMockProductById(id: string): Product | undefined {
  return productsById.get(id);
}

/*
 * The home page's deal shelf used to live here as `getFeaturedMockDeals()`.
 * It now goes through `@/lib/products/collections`, which asks the same
 * question of whichever pool is active — this catalogue today, the real
 * sources tomorrow — so the page does not have to know which one answered.
 */

/** Same filtering contract as a real search, applied in memory. */
export function searchMockProducts(query: SearchQuery): Product[] {
  const { filters } = query;
  const term = normalizeTerm(query.term);
  const words = term.split(" ").filter(Boolean);

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

/** Every word of the query must appear somewhere in the product's text. */
function matchesTerm(product: Product, words: string[]): boolean {
  const haystack = normalizeTerm(
    [product.title, product.brand, product.model, product.description].filter(Boolean).join(" "),
  );
  return words.every((word) => haystack.includes(word));
}

/**
 * True while the site is running on the demonstration catalogue.
 * Drives the "Exemple" labels and the demo banner, so the honesty notices
 * disappear at the same moment the fabricated data does.
 */
export function isDemoCatalogueActive(): boolean {
  return getConfiguredSources().length === 0;
}
