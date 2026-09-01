import { LocaleLink } from "@/components/common/locale-link";
import { SmartImage } from "@/components/common/smart-image";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

/**
 * One category tile: a photo of the universe with its name written over it.
 *
 * The photo is decorative, so its `alt` is empty: the category name is right
 * there in the tile, and a descriptive alt would make a screen reader announce
 * it twice.
 *
 * The scrim is not styling for its own sake. White text over an arbitrary
 * photograph has no guaranteed contrast, and these photos change; the gradient
 * is what makes the label readable whatever picture sits under it.
 */
export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <LocaleLink
      href={`/category/${category.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-xl focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
    >
      <SmartImage
        src={category.image}
        alt=""
        fill
        context="categoryTile"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
      />

      <span className="absolute inset-x-0 bottom-0 p-4 font-display text-sm font-semibold text-white">
        {category.name}
      </span>
    </LocaleLink>
  );
}
