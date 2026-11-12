import { LocaleLink } from "@/components/common/locale-link";
import { ImageOff } from "lucide-react";
import { DemoBadge } from "@/components/common/demo-notice";
import { RatingStars } from "@/components/common/rating-stars";
import { SmartImage } from "@/components/common/smart-image";
import { DealBadge } from "@/components/product/deal-badge";
import { ConditionLadder } from "@/components/product/condition-ladder";
import { PriceBadge } from "@/components/product/price-badge";
import { CONDITION_LABELS } from "@/lib/constants";
import { productImageFit, type ImageContext } from "@/lib/utils/images";
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
 * One result in a product grid. Links to the product page, where every offer
 * is listed, so the visitor sees them all before leaving for a merchant.
 *
 * For a compared model, the card shows its lowest delivered price in each
 * condition (new, refurbished, used): that comparison is what the site is
 * for. A single marketplace listing shows its own price and condition.
 */
export async function ProductCard({
  product,
  action,
  imageContext = "productCardGrid",
}: ProductCardProps) {
  const { bestOffer } = product;
  const href = `/product/${encodeURIComponent(product.id)}`;
  const isSingleListing = product.id.includes(":");
  const count = product.offerCount ?? product.offers.length;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border bg-white transition-colors hover:border-foreground/30">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
        {product.imageUrl ? (
          <SmartImage
            src={product.imageUrl}
            alt=""
            fill
            context={imageContext}
            className={productImageFit(product.imageUrl)}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            <ImageOff className="size-7" strokeWidth={1.5} aria-hidden />
          </span>
        )}
        {bestOffer?.deal ? (
          <span className="absolute top-2.5 left-2.5">
            <DealBadge deal={bestOffer.deal} />
          </span>
        ) : null}
        <DemoBadge className="absolute bottom-2.5 left-2.5" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 border-t p-4">
        <h3 className="line-clamp-2 text-[0.95rem] leading-snug font-semibold">
          {/* The title's link covers the whole card: one target, one destination. */}
          <LocaleLink
            href={href}
            className="group-hover:text-primary after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-3 focus-visible:after:ring-ring"
          >
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

        {isSingleListing && bestOffer ? (
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-sm text-muted-foreground">
              {CONDITION_LABELS[bestOffer.condition]}
            </span>
            <PriceBadge price={bestOffer.totalPrice} />
          </div>
        ) : bestOffer ? (
          <ConditionLadder offers={product.offers} />
        ) : (
          <p className="text-sm text-muted-foreground">Aucune offre en ce moment</p>
        )}

        <div className="mt-auto space-y-2 pt-1">
          {!isSingleListing && count > 1 ? (
            <p className="text-xs text-muted-foreground">{count} annonces comparées</p>
          ) : null}
          {action ? <div className="relative z-10">{action}</div> : null}
        </div>
      </div>
    </article>
  );
}
