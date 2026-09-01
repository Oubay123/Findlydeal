import { LocaleLink } from "@/components/common/locale-link";
import { CategoryIcon } from "@/components/category/category-icon";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

/** Image tile with the category name overlaid, as on the landing page. */
export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <LocaleLink
      href={`/category/${category.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-xl focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
    >
      {/*
        Icon tile rather than a photo. The stock shots that used to fill these
        cards showed a generic scene that said nothing the label did not
        already say, and each one was a full image download on the page a
        visitor lands on first.
      */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center bg-ink transition-transform duration-500 group-hover:scale-105"
      >
        <CategoryIcon name={category.icon} className="size-10 text-white/25" strokeWidth={1.5} />
      </span>

      {/* Legibility scrim under the label. */}
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
      />

      <span className="absolute inset-x-0 bottom-0 p-4 font-display text-sm font-semibold text-white">
        {category.name}
      </span>
    </LocaleLink>
  );
}
