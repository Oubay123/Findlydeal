import { cache } from "react";
import { getConfiguredSources } from "@/lib/sources";
import { getMockProducts } from "@/lib/mock";
import { searchAllSources } from "@/lib/search/aggregate";
import { DEFAULT_LOCALE } from "@/lib/constants";
import type { CategorySlug, Product, ProductCondition } from "@/types";

/**
 * The shelves of the home page.
 *
 * Every collection here is built from a signal a real marketplace actually
 * exposes: a price, a rating, a review count, a listing date. That constraint
 * is the point — a "meilleures ventes" shelf would need sales figures, which
 * no affiliate API returns, so the section would have to be deleted the day
 * the demonstration catalogue goes away. `getMostReviewed` answers the same
 * editorial need ("what are people buying?") with data that will still be
 * there.
 *
 * All four read one shared, request-memoised pool, so a home page carrying six
 * shelves does one lookup rather than six.
 */

/** Every product the site can currently show, memoised per request. */
const getPool = cache(async function getPool(): Promise<Product[]> {
  if (getConfiguredSources().length === 0) return getMockProducts();

  const { products } = await searchAllSources({
    term: "",
    locale: DEFAULT_LOCALE,
    filters: { sort: "relevance" },
    page: 1,
    perPage: 48,
  });
  return products;
});

/** Sorts a copy of the pool and takes the head. */
function top(pool: Product[], score: (product: Product) => number, limit: number): Product[] {
  return pool
    .map((product) => ({ product, value: score(product) }))
    .filter((entry) => Number.isFinite(entry.value))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit)
    .map((entry) => entry.product);
}

/** Most recently released, newest first. Products with no date are skipped. */
export async function getNewestProducts(limit = 8): Promise<Product[]> {
  const pool = await getPool();
  return top(pool, (product) => (product.releasedAt ? Date.parse(product.releasedAt) : NaN), limit);
}

/**
 * Best rated. A minimum review count keeps a lone five-star review from
 * outranking a product with four hundred.
 */
export async function getBestRatedProducts(limit = 8, minReviews = 50): Promise<Product[]> {
  const pool = await getPool();
  return top(
    pool.filter((product) => (product.rating?.count ?? 0) >= minReviews),
    (product) => product.rating?.value ?? NaN,
    limit,
  );
}

/** Strongest discount against the reference price. */
export async function getBestDeals(limit = 8): Promise<Product[]> {
  const pool = await getPool();
  return top(pool, (product) => product.bestOffer?.deal?.score ?? NaN, limit);
}

/**
 * Most reviewed, which is the closest honest proxy for popularity: a
 * marketplace publishes review counts, never sales.
 */
export async function getMostReviewed(limit = 8): Promise<Product[]> {
  const pool = await getPool();
  return top(pool, (product) => product.rating?.count ?? NaN, limit);
}

/**
 * Two categories are transversal rather than thematic: a product is in
 * "Reconditionné" or "Occasion" because of the *condition* of one of its
 * offers, not because of what it is. Same rule as the search page.
 */
const CONDITION_CATEGORIES: Partial<Record<CategorySlug, ProductCondition>> = {
  refurbished: "refurbished",
  "second-hand": "used",
};

/**
 * One shelf per category. Cheapest first inside a category, because that is
 * the question the site exists to answer.
 */
export async function getProductsInCategory(slug: CategorySlug, limit = 8): Promise<Product[]> {
  const pool = await getPool();
  const condition = CONDITION_CATEGORIES[slug];

  return pool
    .filter((product) =>
      condition
        ? product.offers.some((offer) => offer.condition === condition)
        : product.categorySlug === slug,
    )
    .sort((a, b) => (a.bestOffer?.totalPrice.amount ?? 0) - (b.bestOffer?.totalPrice.amount ?? 0))
    .slice(0, limit);
}
