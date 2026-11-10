import { LocaleLink } from "@/components/common/locale-link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isCatalogueSlug } from "@/lib/catalogue";
import { getMockProductById } from "@/lib/mock";

interface ArticleProductProps {
  /** Product id, as used by `/product/[id]`. */
  slug: string;
  /** Fallback search term when the product is not in the catalogue. */
  fallbackTerm?: string;
}

/**
 * An inline comparison block inside an article.
 *
 * It turns an editorial point into a comparison, three lines below where the
 * reader had the thought, and carries internal-link weight a young site needs.
 *
 * **No price in it, on purpose.** Articles are generated at build time, while
 * live prices depend on the Worker's runtime secrets: a price printed here
 * would be a frozen demonstration figure. The block names the product and
 * links to its comparison page, where prices are live.
 *
 * Links to the product page only for catalogue products that have live offers
 * once eBay is configured (`src/config/catalogue-ebay.ts`); any other id falls
 * back to a search, so an article never links to a page that may not exist.
 */
export function ArticleProduct({ slug, fallbackTerm }: ArticleProductProps) {
  const product = isCatalogueSlug(slug) ? getMockProductById(slug) : undefined;

  if (!product) {
    const term = fallbackTerm ?? slug.replace(/-/g, " ");
    return (
      <div className="my-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-5">
        <p className="text-sm text-muted-foreground">
          Comparez les prix de ce produit chez de nombreux vendeurs.
        </p>
        <Button asChild size="md" variant="outline-brand">
          <LocaleLink href={`/search?q=${encodeURIComponent(term)}`}>
            <Search data-icon="inline-start" aria-hidden />
            Rechercher
          </LocaleLink>
        </Button>
      </div>
    );
  }

  const href = `/product/${encodeURIComponent(product.id)}`;

  return (
    <aside className="my-8 flex flex-wrap items-center gap-4 rounded-2xl border p-5">
      <div className="min-w-40 flex-1 space-y-1">
        <h3 className="text-sm leading-snug font-semibold">
          <LocaleLink href={href} className="transition-colors hover:text-primary">
            {product.title}
          </LocaleLink>
        </h3>
        <p className="text-xs text-muted-foreground">
          Offres neuves, reconditionnées et d&apos;occasion, comparées au prix total.
        </p>
      </div>
      <Button asChild size="md" className="w-full sm:w-auto">
        <LocaleLink href={href}>Comparer les prix</LocaleLink>
      </Button>
    </aside>
  );
}
