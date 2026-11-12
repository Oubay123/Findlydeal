import { LocaleLink } from "@/components/common/locale-link";
import { formatPrice } from "@/lib/utils";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  /** Products currently priced in the category, when known. */
  count?: number;
  /** Lowest delivered price in the category, in cents, when known. */
  fromCents?: number;
}

/**
 * One entry of the category index: name, what it covers and, when the
 * catalogue is live, how many products are priced in it. Set as a line of an
 * index under a hairline rather than as a boxed tile with an icon: the words
 * already say which category it is.
 */
export function CategoryCard({ category, count, fromCents }: CategoryCardProps) {
  return (
    <LocaleLink
      href={`/category/${category.slug}`}
      className="group flex h-full flex-col gap-1 border-t border-foreground/15 py-5 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
    >
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-lg font-semibold tracking-tight group-hover:text-primary">
          {category.name}
        </span>
        {count ? (
          <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
            {count} produits
          </span>
        ) : null}
      </span>
      <span className="text-sm leading-snug text-muted-foreground">
        {category.description}
        {fromCents ? (
          <span className="text-foreground/80">
            {" "}
            Dès {formatPrice({ amount: fromCents, currency: "EUR" })}.
          </span>
        ) : null}
      </span>
    </LocaleLink>
  );
}
