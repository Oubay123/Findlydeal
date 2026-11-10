import { CategoryGrid } from "@/components/category/category-grid";
import { productCategories } from "@/config/categories";
import { Container } from "@/components/common/container";
import { LocaleLink } from "@/components/common/locale-link";

/**
 * The product categories, with how many products are priced in each. The
 * two transversal ones (refurbished, used) are in the main menu and linked
 * under the heading rather than repeated as tiles.
 */
export function HomeCategories() {
  return (
    <section aria-labelledby="home-categories" className="bg-brand-50 border-t py-16">
      <Container className="space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="home-categories" className="text-2xl font-bold tracking-tight sm:text-3xl">
            Parcourir les catégories
          </h2>
          <p className="text-sm text-muted-foreground">
            Ou tout voir en{" "}
            <LocaleLink
              href="/category/refurbished"
              className="font-medium text-primary hover:underline"
            >
              reconditionné
            </LocaleLink>{" "}
            ou en{" "}
            <LocaleLink
              href="/category/second-hand"
              className="font-medium text-primary hover:underline"
            >
              occasion
            </LocaleLink>
          </p>
        </div>
        <CategoryGrid categories={productCategories} />
      </Container>
    </section>
  );
}
