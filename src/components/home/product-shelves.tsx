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
import type { CategorySlug } from "@/types";

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
const FEATURED_CATEGORIES: CategorySlug[] = ["tech", "watches-jewelry", "furniture"];

export async function ProductShelves() {
  const t = await getServerDictionary();

  // Six and five rather than eight. Six shelves already sit close to the DOM
  // budget Lighthouse starts penalising, and a shelf scrolls, so the cards
  // past the fourth are an arrow click away either way.
  const [newest, bestDeals, mostReviewed, ...byCategory] = await Promise.all([
    getNewestProducts(6),
    getBestDeals(6),
    getMostReviewed(6),
    ...FEATURED_CATEGORIES.map((slug) => getProductsInCategory(slug, 5)),
  ]);

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
