import { cache } from "react";
import { getConfiguredSources } from "@/lib/sources";
import { getMockProducts } from "@/lib/mock";
import { searchAllSources } from "@/lib/search/aggregate";
import { DEFAULT_LOCALE } from "@/lib/constants";
import type { Product } from "@/types";

/**
 * "Produits similaires" and "Ces produits pourraient vous intéresser".
 *
 * Two different questions, deliberately answered by two different rankings:
 *
 *   - **similar** — the alternatives a visitor weighs against the product in
 *     front of them: same category, close price, ideally same brand.
 *   - **discovery** — what else the site carries, which is only useful if it
 *     is *not* another variant of the same thing. It therefore excludes the
 *     product's own category.
 *
 * Ranking is pure and lives in `scoreSimilarity` so it can be reasoned about
 * without a data source; the exported functions only decide where the pool of
 * candidates comes from.
 */

/** How close two prices are, 0 (unrelated) to 1 (identical). */
function priceProximity(a: Product, b: Product): number {
  const priceA = a.bestOffer?.totalPrice.amount;
  const priceB = b.bestOffer?.totalPrice.amount;
  if (!priceA || !priceB) return 0;

  const ratio = Math.min(priceA, priceB) / Math.max(priceA, priceB);
  // Below half the price it is a different market segment, not an alternative.
  return ratio < 0.5 ? 0 : (ratio - 0.5) * 2;
}

/**
 * The words describing *what the product is*, e.g. `["smartphone"]` or
 * `["montre", "plongée", "automatique"]`.
 *
 * `imageAlt` is built as `"<sujet> <titre>"`, so removing the title leaves the
 * subject on its own. A source that exposes no `imageAlt` yields an empty
 * list, and the ranking simply falls back to category, brand and price.
 */
function subjectWords(product: Product): string[] {
  const alt = product.imageAlt?.toLowerCase();
  if (!alt) return [];

  const title = product.title.toLowerCase();
  const subject = alt.endsWith(title) ? alt.slice(0, alt.length - title.length) : alt;

  return subject.split(/[^\p{L}]+/u).filter((word) => word.length > 3);
}

/**
 * Higher is more similar. The weights encode a simple editorial judgement:
 * the same category is the price of entry, being *the same kind of object*
 * matters most, the brand helps, and a comparable price decides the rest.
 *
 * Product type is weighted above brand deliberately. Ranking brand first put
 * an iPad and a MacBook ahead of a Galaxy S23 among an iPhone's alternatives,
 * which is not what a visitor comparing phones is looking for.
 */
function scoreSimilarity(product: Product, candidate: Product): number {
  let score = 0;

  if (candidate.categorySlug && candidate.categorySlug === product.categorySlug) score += 4;

  const subject = new Set(subjectWords(product));
  const shared = subjectWords(candidate).filter((word) => subject.has(word)).length;
  score += Math.min(shared, 2) * 2.5;

  if (candidate.brand && product.brand && candidate.brand === product.brand) score += 2;
  score += priceProximity(product, candidate) * 2;

  // A visible deal makes a suggestion worth clicking; it never outranks fit.
  if ((candidate.bestOffer?.deal?.score ?? 0) > 0) score += 0.5;

  return score;
}

/**
 * The candidate pool: every product the site can currently show.
 *
 * While no affiliate programme is approved this is the demonstration
 * catalogue. Once a real source answers, "related" becomes a category search,
 * which is the only query a marketplace API can actually serve — there is no
 * "products like this one" endpoint to call.
 */
const getCandidatePool = cache(async function getCandidatePool(
  product: Product,
): Promise<Product[]> {
  if (getConfiguredSources().length === 0) return getMockProducts();

  const { products } = await searchAllSources({
    term: "",
    locale: DEFAULT_LOCALE,
    filters: { sort: "relevance", categorySlug: product.categorySlug },
    page: 1,
    perPage: 24,
  });
  return products;
});

/** Ranks a pool against `product`, dropping the product itself. */
function rank(product: Product, pool: Product[], keep: (candidate: Product) => boolean): Product[] {
  return pool
    .filter((candidate) => candidate.id !== product.id && keep(candidate))
    .map((candidate) => ({ candidate, score: scoreSimilarity(product, candidate) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.candidate);
}

/**
 * Alternatives to `product`, best fit first.
 * Returns fewer than `limit` — possibly none — rather than padding the row
 * with products that are not comparable.
 */
export async function getSimilarProducts(product: Product, limit = 4): Promise<Product[]> {
  const pool = await getCandidatePool(product);
  return rank(product, pool, (candidate) => candidate.categorySlug === product.categorySlug).slice(
    0,
    limit,
  );
}

/**
 * Cross-category suggestions, shown under the similar products.
 * Excludes the product's own category so the two rows never overlap.
 */
export async function getDiscoveryProducts(product: Product, limit = 4): Promise<Product[]> {
  const pool = await getCandidatePool(product);
  const others = rank(
    product,
    pool,
    (candidate) => candidate.categorySlug !== product.categorySlug,
  );

  // Spread across categories: four suggestions from four different universes
  // are more useful than four cameras.
  const seen = new Set<string>();
  const spread: Product[] = [];
  const rest: Product[] = [];
  for (const candidate of others) {
    const key = candidate.categorySlug ?? "";
    if (seen.has(key)) rest.push(candidate);
    else {
      seen.add(key);
      spread.push(candidate);
    }
  }
  return [...spread, ...rest].slice(0, limit);
}

/**
 * Suggestions under a comparison: alternatives to the whole basket rather than
 * to one product. Scored against every compared product and deduplicated, so a
 * candidate that fits several of them ranks highest.
 */
export async function getSimilarToAll(products: Product[], limit = 4): Promise<Product[]> {
  const [first] = products;
  if (!first) return [];

  const pool = await getCandidatePool(first);
  const compared = new Set(products.map((product) => product.id));
  const totals = new Map<string, { product: Product; score: number }>();

  for (const product of products) {
    for (const candidate of pool) {
      if (compared.has(candidate.id)) continue;
      const score = scoreSimilarity(product, candidate);
      if (score <= 0) continue;

      const current = totals.get(candidate.id);
      if (current) current.score += score;
      else totals.set(candidate.id, { product: candidate, score });
    }
  }

  return [...totals.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.product);
}
