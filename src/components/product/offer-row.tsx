import { ExternalLink } from "lucide-react";
import { DealBadge } from "@/components/product/deal-badge";
import { PriceBadge } from "@/components/product/price-badge";
import { Button } from "@/components/ui/button";
import { CONDITION_LABELS } from "@/lib/constants";
import { formatRelativeTime } from "@/lib/utils";
import type { Offer } from "@/types";

interface OfferRowProps {
  offer: Offer;
  /** Highlights the cheapest row of a comparison table. */
  isBest?: boolean;
}

/**
 * One source's offer inside the comparison table.
 *
 * Outbound links carry `rel="sponsored nofollow noopener"`: required by the
 * affiliate programmes and by search engine guidelines.
 */
export function OfferRow({ offer, isBest }: OfferRowProps) {
  return (
    <li
      className={`flex flex-wrap items-center gap-4 rounded-2xl border bg-white p-5 ${
        isBest ? "border-primary" : ""
      }`}
    >
      <div className="min-w-40 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium capitalize">
            {offer.source}
          </span>
          <span className="text-xs text-muted-foreground">{CONDITION_LABELS[offer.condition]}</span>
          {isBest ? (
            <span className="rounded-md bg-deal-soft px-2 py-0.5 text-xs font-semibold text-white">
              Moins cher
            </span>
          ) : null}
        </div>
        <p className="text-sm">{offer.seller?.name ?? offer.title}</p>
        <p className="text-xs text-muted-foreground">
          Mis à jour {formatRelativeTime(offer.fetchedAt)}
        </p>
      </div>

      <div className="space-y-1 text-right">
        <PriceBadge price={offer.totalPrice} comparedTo={offer.deal?.referencePrice} />
        {offer.shippingPrice ? (
          <p className="text-xs text-muted-foreground">livraison incluse</p>
        ) : null}
        {offer.deal ? <DealBadge deal={offer.deal} /> : null}
      </div>

      <Button asChild size="md">
        <a href={offer.url} target="_blank" rel="sponsored nofollow noopener noreferrer">
          Voir l&apos;offre
          <ExternalLink data-icon="inline-end" aria-hidden />
        </a>
      </Button>
    </li>
  );
}
