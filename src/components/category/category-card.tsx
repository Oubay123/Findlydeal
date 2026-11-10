import { CategoryIcon } from "@/components/category/category-icon";
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
 * One category tile: icon, name, what it covers and, when the catalogue is
 * live, how many products are priced in it. Text only: a stock photo per
 * category said nothing a word does not, and cost a large download.
 */
export function CategoryCard({ category, count, fromCents }: CategoryCardProps) {
  return (
    <LocaleLink
      href={`/category/${category.slug}`}
      className="flex h-full flex-col gap-3 rounded-xl border bg-white p-5 transition-colors hover:border-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
    >
      <CategoryIcon name={category.icon} className="size-6 text-primary" strokeWidth={1.75} />
      <span className="text-base font-semibold">{category.name}</span>
      <span className="text-sm leading-snug text-muted-foreground">{category.description}</span>
      {count ? (
        <span className="mt-auto pt-1 text-sm text-foreground/80">
          {count} produits
          {fromCents ? `, dès ${formatPrice({ amount: fromCents, currency: "EUR" })}` : ""}
        </span>
      ) : null}
    </LocaleLink>
  );
}
