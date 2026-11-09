import { CategoryCard } from "@/components/category/category-card";
import { listedCategories } from "@/config/categories";
import type { Category } from "@/types";

interface CategoryGridProps {
  /** Defaults to the categories advertised (`listedCategories`). */
  categories?: Category[];
}

export function CategoryGrid({ categories = listedCategories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </div>
  );
}
