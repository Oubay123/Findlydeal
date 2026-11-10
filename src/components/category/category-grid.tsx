import { CategoryCard } from "@/components/category/category-card";
import { listedCategories } from "@/config/categories";
import { getPricedCatalogue } from "@/lib/catalogue";
import { isDemoCatalogueActive } from "@/lib/mock";
import { filterProducts } from "@/lib/search/filter";
import type { Category } from "@/types";

interface CategoryGridProps {
  /** Defaults to the categories advertised (`listedCategories`). */
  categories?: Category[];
}

/**
 * Grid of category tiles, each with the number of products priced in it
 * right now. The two transversal categories (refurbished, used) come last.
 */
export async function CategoryGrid({ categories = listedCategories }: CategoryGridProps) {
  const products = isDemoCatalogueActive() ? [] : await getPricedCatalogue();
  const stats = new Map(
    categories.map((category) => {
      const inCategory = filterProducts(products, {
        term: "",
        locale: "fr",
        filters: { categorySlug: category.slug, sort: "relevance" },
        page: 1,
        perPage: 1000,
      });
      const from = inCategory
        .map((product) => product.bestOffer?.totalPrice.amount)
        .filter((amount): amount is number => amount !== undefined)
        .sort((a, b) => a - b)[0];
      return [category.slug, { count: inCategory.length, from }] as const;
    }),
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.slug}
          category={category}
          count={stats.get(category.slug)?.count}
          fromCents={stats.get(category.slug)?.from}
        />
      ))}
    </div>
  );
}
