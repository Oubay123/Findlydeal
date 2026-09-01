import { LocaleLink } from "@/components/common/locale-link";
import { ArrowRight } from "lucide-react";
import { CarouselTrack } from "@/components/product/carousel-track";
import { ProductCard } from "@/components/product/product-card";
import { getServerDictionary } from "@/i18n/server";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductRowProps {
  title: string;
  /** One line under the title explaining what the row contains. */
  description?: string;
  products: Product[];
  /** Optional "voir tout" target, e.g. `/search?category=tech`. */
  href?: string;
  linkLabel?: string;
  /**
   * Heading level. `h2` by default; pass `"h3"` when the row already sits
   * inside a section that owns the `h2`, so the outline stays valid.
   */
  as?: "h2" | "h3";
  className?: string;
}

/**
 * A horizontal shelf of products, as used on the home page and under a
 * product's own comparison.
 *
 * Navigation is by arrow buttons, which live in `CarouselTrack`. That is the
 * only part that hydrates: this component stays on the server and hands the
 * cards down as children, so `ProductCard` never reaches the client bundle
 * even though the shelf around it is interactive. On a home page carrying six
 * shelves and forty-odd cards, that distinction is the whole cost of the
 * feature.
 *
 * Renders nothing when `products` is empty: an empty shelf with a heading
 * looks like a bug, and these rows are all best-effort suggestions.
 */
export async function ProductRow({
  title,
  description,
  products,
  href,
  linkLabel,
  as: Heading = "h2",
  className,
}: ProductRowProps) {
  if (products.length === 0) return null;

  const t = await getServerDictionary();

  return (
    <section className={cn("space-y-4", className)} aria-label={title}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div className="space-y-1">
          <Heading className="text-xl font-bold sm:text-2xl">{title}</Heading>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>

        {href ? (
          <LocaleLink
            href={href}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
          >
            {linkLabel ?? t.home.seeAll}
            <ArrowRight className="size-4" aria-hidden />
          </LocaleLink>
        ) : null}
      </div>

      {/*
        The scroll region gets a name of its own rather than repeating the
        section's: two nested regions announced identically make a screen
        reader read the shelf title twice on the way in.
      */}
      <CarouselTrack
        label={`${title}, ${t.common.horizontalScroll}`}
        previousLabel={`${t.common.previous} : ${title}`}
        nextLabel={`${t.common.next} : ${title}`}
      >
        <ul className="flex snap-x snap-mandatory gap-4">
          {products.map((product) => (
            <li key={product.id} className="w-[15rem] shrink-0 snap-start sm:w-[16.5rem]">
              <ProductCard product={product} imageContext="productCardRow" />
            </li>
          ))}
        </ul>
      </CarouselTrack>
    </section>
  );
}
