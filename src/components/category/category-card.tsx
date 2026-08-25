import Link from "next/link";
import { CategoryIcon } from "@/components/category/category-icon";
import { SmartImage } from "@/components/common/smart-image";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

/** Image tile with the category name overlaid, as on the landing page. */
export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-xl focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
    >
      {category.image ? (
        // Decorative: the category name is written over the tile, so a
        // descriptive alt would make screen readers announce it twice.
        <SmartImage
          src={category.image}
          alt=""
          fill
          context="categoryTile"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-ink transition-transform duration-500 group-hover:scale-105"
        >
          <CategoryIcon name={category.icon} className="size-10 text-white/25" strokeWidth={1.5} />
        </span>
      )}

      {/* Legibility scrim under the label. */}
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
      />

      <span className="absolute inset-x-0 bottom-0 p-4 font-display text-sm font-semibold text-white">
        {category.name}
      </span>
    </Link>
  );
}
