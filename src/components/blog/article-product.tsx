import { SourceLogo } from "@/components/common/source-logo";
import { LocaleLink } from "@/components/common/locale-link";
import { ArrowRight, Search } from "lucide-react";
import { DemoBadge } from "@/components/common/demo-notice";
import { RatingStars } from "@/components/common/rating-stars";
import { SmartImage } from "@/components/common/smart-image";
import { Button } from "@/components/ui/button";
import { getMockProductById } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

interface ArticleProductProps {
  /** Product id, as used by `/product/[id]`. */
  slug: string;
  /** Fallback search term when the product is not in the catalogue. */
  fallbackTerm?: string;
}

/**
 * An inline price block inside an article.
 *
 * This is the one thing a price comparison blog can do that a generic blog
 * cannot: turn an editorial point into a live comparison, three lines below
 * where the reader had the thought. It also carries real internal linking
 * weight, which is what a young site lacks most.
 *
 * **Degrades on purpose.** If the id is unknown — because the demonstration
 * catalogue was deleted, or a product was retired — the component renders a
 * search link instead of disappearing. An article must never end up with a
 * hole where a product used to be.
 *
 * Integration point: swap `getMockProductById` for the real product lookup
 * when adapters go live. It stays synchronous here because MDX bodies render
 * on the server.
 */
export function ArticleProduct({ slug, fallbackTerm }: ArticleProductProps) {
  const product = getMockProductById(slug);

  if (!product) {
    const term = fallbackTerm ?? slug.replace(/-/g, " ");
    return (
      <div className="my-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-5">
        <p className="text-sm text-muted-foreground">
          Comparez les prix de ce produit sur toutes les plateformes.
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

  const offers = [...product.offers].sort((a, b) => a.totalPrice.amount - b.totalPrice.amount);
  const href = `/product/${encodeURIComponent(product.id)}`;

  return (
    <aside className="my-8 overflow-hidden rounded-2xl border">
      <div className="flex flex-wrap items-start gap-4 p-5">
        <LocaleLink href={href} className="shrink-0">
          <span className="relative block size-24 overflow-hidden rounded-xl bg-muted">
            {product.imageUrl ? (
              <SmartImage
                src={product.imageUrl}
                alt={product.imageAlt ?? product.title}
                fill
                context="thumbnail"
                className="object-cover"
              />
            ) : null}
            <DemoBadge className="absolute bottom-1 left-1 scale-90" />
          </span>
        </LocaleLink>

        <div className="min-w-40 flex-1 space-y-1.5">
          <h3 className="text-sm leading-snug font-semibold">
            <LocaleLink href={href} className="transition-colors hover:text-primary">
              {product.title}
            </LocaleLink>
          </h3>
          {product.rating ? (
            <RatingStars
              value={product.rating.value}
              count={product.rating.count}
              variant="compact"
            />
          ) : null}
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {offers.slice(0, 3).map((offer, index) => (
              <li key={offer.id} className="flex items-center gap-1.5">
                <SourceLogo source={offer.source} />
                <span className={index === 0 ? "font-semibold text-deal" : "font-medium"}>
                  {formatPrice(offer.totalPrice)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Button asChild size="md" className="w-full sm:w-auto">
          <LocaleLink href={href}>
            Voir les {product.offers.length} prix
            <ArrowRight data-icon="inline-end" aria-hidden />
          </LocaleLink>
        </Button>
      </div>
    </aside>
  );
}
