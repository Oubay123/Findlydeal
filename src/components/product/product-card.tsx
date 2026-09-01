import { LocaleLink } from "@/components/common/locale-link";
import { ImageOff } from "lucide-react";
import { DemoBadge } from "@/components/common/demo-notice";
import { RatingStars } from "@/components/common/rating-stars";
import { SmartImage } from "@/components/common/smart-image";
import { DealBadge } from "@/components/product/deal-badge";
import { PriceBadge } from "@/components/product/price-badge";
import { Button } from "@/components/ui/button";
import { CONDITION_LABELS } from "@/lib/constants";
import { getServerDictionary } from "@/i18n/server";
import type { ImageContext } from "@/lib/utils/images";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /** Rendered next to the button — the compare checkbox on the search page. */
  action?: React.ReactNode;
  /**
   * Where the card is displayed, which decides the `sizes` attribute.
   * A card in a scrolling shelf is ~264 px wide even on mobile, so the grid
   * default would make the browser download a full-width image for it.
   */
  imageContext?: ImageContext;
}

/**
 * One result in a product grid. Links to the comparison page rather than to a
 * merchant, so the user always sees every offer before leaving.
 */
export async function ProductCard({
  product,
  action,
  imageContext = "productCardGrid",
}: ProductCardProps) {
  const t = await getServerDictionary();
  const { bestOffer } = product;
  const href = `/product/${encodeURIComponent(product.id)}`;
  const otherOffers = product.offers.length - 1;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lg hover:shadow-black/5">
      <LocaleLink href={href} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {product.imageUrl ? (
            <SmartImage
              src={product.imageUrl}
              alt={product.imageAlt ?? product.title}
              fill
              context={imageContext}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <ImageOff className="size-7" strokeWidth={1.5} aria-hidden />
            </span>
          )}

          {bestOffer?.deal ? (
            <span className="absolute top-3 left-3">
              <DealBadge deal={bestOffer.deal} />
            </span>
          ) : null}

          {bestOffer ? (
            <span className="absolute top-3 right-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-medium text-foreground">
              {CONDITION_LABELS[bestOffer.condition]}
            </span>
          ) : null}

          <DemoBadge className="absolute bottom-3 left-3" />
        </div>
      </LocaleLink>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-4">
        <LocaleLink href={href}>
          <h3 className="line-clamp-2 text-sm leading-snug font-medium transition-colors hover:text-primary">
            {product.title}
          </h3>
        </LocaleLink>

        {product.rating ? (
          <RatingStars
            value={product.rating.value}
            count={product.rating.count}
            variant="compact"
          />
        ) : null}

        {bestOffer ? (
          <PriceBadge price={bestOffer.totalPrice} comparedTo={bestOffer.deal?.referencePrice} />
        ) : (
          <p className="text-sm text-muted-foreground">Prix indisponible</p>
        )}

        {otherOffers > 0 ? (
          <p className="text-xs text-muted-foreground">
            Meilleur prix sur {product.offers.length} offres comparées
          </p>
        ) : null}

        <div className="mt-auto space-y-2 pt-1">
          {action}
          <Button asChild className="h-11 w-full rounded-lg">
            <LocaleLink href={href}>{t.product.compareOffers}</LocaleLink>
          </Button>
        </div>
      </div>
    </article>
  );
}
