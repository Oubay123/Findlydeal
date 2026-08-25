import Link from "next/link";
import { ImageOff } from "lucide-react";
import { DemoBadge } from "@/components/common/demo-notice";
import { RatingStars } from "@/components/common/rating-stars";
import { SmartImage } from "@/components/common/smart-image";
import { DealBadge } from "@/components/product/deal-badge";
import { PriceBadge } from "@/components/product/price-badge";
import { Button } from "@/components/ui/button";
import { CONDITION_LABELS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductListRowProps {
  product: Product;
  action?: React.ReactNode;
}

/**
 * The list-view counterpart of `ProductCard`.
 *
 * The extra horizontal room is spent on what a card cannot show: the price of
 * every source side by side, which is the whole point of a comparator.
 */
export function ProductListRow({ product, action }: ProductListRowProps) {
  const { bestOffer } = product;
  const href = `/product/${encodeURIComponent(product.id)}`;
  const sortedOffers = [...product.offers].sort(
    (a, b) => a.totalPrice.amount - b.totalPrice.amount,
  );

  return (
    <article className="group flex flex-col gap-4 rounded-2xl border bg-white p-4 transition-shadow hover:shadow-md hover:shadow-black/5 sm:flex-row">
      <Link href={href} className="shrink-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted sm:aspect-square sm:w-40">
          {product.imageUrl ? (
            <SmartImage
              src={product.imageUrl}
              alt={product.imageAlt ?? product.title}
              fill
              context="productCardList"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <ImageOff className="size-6" strokeWidth={1.5} aria-hidden />
            </span>
          )}
          <DemoBadge className="absolute bottom-2 left-2" />
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {bestOffer?.deal ? <DealBadge deal={bestOffer.deal} /> : null}
          {bestOffer ? (
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
              {CONDITION_LABELS[bestOffer.condition]}
            </span>
          ) : null}
        </div>

        <h3 className="text-sm leading-snug font-medium">
          <Link href={href} className="transition-colors hover:text-primary">
            {product.title}
          </Link>
        </h3>

        {product.rating ? (
          <RatingStars value={product.rating.value} count={product.rating.count} />
        ) : null}

        {sortedOffers.length > 0 ? (
          <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {sortedOffers.slice(0, 4).map((offer, index) => (
              <li key={offer.id} className="flex items-center gap-1.5">
                <span className="capitalize">{offer.source}</span>
                <span className={index === 0 ? "font-semibold text-deal" : "font-medium"}>
                  {formatPrice(offer.totalPrice)}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-col justify-center gap-2 sm:w-48 sm:items-end sm:text-right">
        {bestOffer ? (
          <PriceBadge
            price={bestOffer.totalPrice}
            comparedTo={bestOffer.deal?.referencePrice}
            className="sm:justify-end"
          />
        ) : (
          <p className="text-sm text-muted-foreground">Prix indisponible</p>
        )}
        <p className="text-xs text-muted-foreground">
          {product.offers.length} offre{product.offers.length > 1 ? "s" : ""} comparée
          {product.offers.length > 1 ? "s" : ""}
        </p>

        <div className="w-full space-y-2 sm:w-40">
          {action}
          <Button asChild className="h-10 w-full rounded-lg">
            <Link href={href}>Voir les offres</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
