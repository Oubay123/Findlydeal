import { CategoryCard } from "@/components/category/category-card";
import { categories as allCategories } from "@/config/categories";
import type { Category } from "@/types";

interface CategoryGridProps {
  /** Defaults to every category declared in `@/config/categories`. */
  categories?: Category[];
}

export function CategoryGrid({ categories = allCategories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </div>
  );
}
