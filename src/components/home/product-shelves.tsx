import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { LocaleLink } from "@/components/common/locale-link";
import { ProductRow } from "@/components/product/product-row";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug } from "@/config/categories";
import { getServerDictionary } from "@/i18n/server";
import {
  getBestDeals,
  getMostReviewed,
  getNewestProducts,
  getProductsInCategory,
} from "@/lib/products/collections";
import type { CategorySlug, Product } from "@/types";

/**
 * The product shelves of the home page: three editorial rows, then three
 * categories, then the way to the rest of them.
 *
 * Only three categories are shelved. There are eight, and putting all of them
 * here turned the landing page into a catalogue to scroll past rather than a
 * place to start; the other five are one click away behind
 * "Voir toutes les catégories".
 *
 * Every row is a `ProductRow`, so the cards stay server-rendered and only the
 * arrow controls hydrate.
 *
 * "Meilleures ventes" is deliberately absent: see the note in
 * `@/lib/products/collections` on why a sales shelf cannot be honest here.
 *
 * The demonstration disclosure is not repeated here: `DemoBanner`, rendered at
 * the top of the page, already carries it above the fold.
 */

/** The three universes shelved on the landing page, in display order. */
const FEATURED_CATEGORIES: CategorySlug[] = [
  "tech",
  "home-appliances",
  "watches-jewelry",
  "furniture",
  "fashion",
  "leisure",
];

/** Shelves never show fewer cards than this, even if it means a repeat. */
const MIN_CARDS_PER_SHELF = 3;

/**
 * Takes `limit` products from `candidates` that no earlier shelf has shown,
 * so the same product does not fill three shelves in a row. With a small
 * catalogue, a shelf is topped up with already shown products rather than
 * left nearly empty.
 */
function pickUnseen(candidates: Product[], limit: number, shown: Set<string>): Product[] {
  const fresh = candidates.filter((product) => !shown.has(product.id)).slice(0, limit);
  const picked =
    fresh.length >= MIN_CARDS_PER_SHELF
      ? fresh
      : [...fresh, ...candidates.filter((product) => !fresh.includes(product))].slice(
          0,
          Math.min(limit, Math.max(MIN_CARDS_PER_SHELF, fresh.length)),
        );
  for (const product of picked) shown.add(product.id);
  return picked;
}

export async function ProductShelves() {
  const t = await getServerDictionary();

  // Six and five rather than eight. Six shelves already sit close to the DOM
  // budget Lighthouse starts penalising, and a shelf scrolls, so the cards
  // past the fourth are an arrow click away either way.
  const [newestPool, bestDealsPool, mostReviewedPool, ...byCategoryPool] = await Promise.all([
    getNewestProducts(30),
    getBestDeals(30),
    getMostReviewed(30),
    ...FEATURED_CATEGORIES.map((slug) => getProductsInCategory(slug, 30)),
  ]);

  // Deals first: they are the reason to come back, so they get first pick.
  const shown = new Set<string>();
  const bestDeals = pickUnseen(bestDealsPool, 6, shown);
  const newest = pickUnseen(newestPool, 6, shown);
  const mostReviewed = pickUnseen(mostReviewedPool, 6, shown);
  const byCategory = byCategoryPool.map((pool) => pickUnseen(pool, 4, shown));

  return (
    <section className="py-20">
      <Container className="space-y-14">
        <ProductRow
          title={t.home.newest}
          description={t.home.newestBody}
          products={newest}
          href="/search?sort=newest"
        />

        <ProductRow
          title={t.home.bestDeals}
          description={t.home.bestDealsBody}
          products={bestDeals}
          href="/search?sort=deal_score"
        />

        <ProductRow
          title={t.home.mostReviewed}
          description={t.home.mostReviewedBody}
          products={mostReviewed}
          href="/search?sort=rating_desc"
        />

        {FEATURED_CATEGORIES.map((slug, index) => {
          const category = getCategoryBySlug(slug);
          if (!category) return null;

          return (
            <ProductRow
              key={slug}
              title={category.name}
              description={category.description}
              products={byCategory[index] ?? []}
              href={`/category/${slug}`}
              linkLabel={t.home.seeCategory}
            />
          );
        })}

        <div className="flex justify-center pt-2">
          <Button asChild variant="outline-brand" size="md">
            <LocaleLink href="/categories">
              {t.home.allCategories}
              <ArrowRight data-icon="inline-end" aria-hidden />
            </LocaleLink>
          </Button>
        </div>
      </Container>
    </section>
  );
}
