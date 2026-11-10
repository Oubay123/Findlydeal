import { ExternalLink } from "lucide-react";
import { CONDITION_TONE } from "@/components/product/condition-ladder";
import { DealBadge } from "@/components/product/deal-badge";
import { PriceBadge } from "@/components/product/price-badge";
import { Button } from "@/components/ui/button";
import { getSourcePresentation } from "@/config/sources";
import { CONDITION_LABELS } from "@/lib/constants";
import { getServerDictionary } from "@/i18n/server";
import { estimateBuyerProtectionFee } from "@/lib/sources/ebay-fees";
import { formatPrice, formatRelativeTime } from "@/lib/utils";
import type { Offer } from "@/types";

interface OfferRowProps {
  offer: Offer;
  /** Highlights the product's headline offer (cheapest, not doubtful). */
  isBest?: boolean;
}

/**
 * One source's offer inside the comparison table.
 *
 * The listing's own title comes first: it is what tells a visitor whether
 * this is exactly the product (storage, model, bundle). The seller follows.
 *
 * Outbound links carry `rel="sponsored nofollow noopener"`: required by the
 * affiliate programmes and by search engine guidelines.
 */
export async function OfferRow({ offer, isBest }: OfferRowProps) {
  const t = await getServerDictionary();
  return (
    <li
      className={`flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl border bg-white p-4 sm:p-5 ${
        isBest ? "border-primary ring-1 ring-primary" : ""
      }`}
    >
      <div className="min-w-40 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${CONDITION_TONE[offer.condition]}`}
          >
            {CONDITION_LABELS[offer.condition]}
          </span>
          {isBest ? (
            <span className="rounded-md bg-deal-soft px-2 py-0.5 text-xs font-semibold text-deal">
              {t.product.cheapest}
            </span>
          ) : null}
        </div>
        <p className="line-clamp-2 text-sm font-medium" title={offer.title}>
          {offer.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {offer.seller?.name ? (
            <>
              Vendu par {offer.seller.name}
              {offer.sellerType === "individual"
                ? " (particulier)"
                : offer.sellerType === "business"
                  ? " (professionnel)"
                  : ""}
              {", "}
            </>
          ) : null}
          {offer.seller?.name ? "mis à jour" : "Mis à jour"} {formatRelativeTime(offer.fetchedAt)}
        </p>
      </div>

      <div className="space-y-1 text-right">
        <PriceBadge price={offer.totalPrice} comparedTo={offer.deal?.referencePrice} />
        {offer.shippingPrice ? (
          <p className="text-xs text-muted-foreground">{t.product.shippingIncluded}</p>
        ) : null}
        {offer.shippingUnknown ? (
          <p className="text-xs text-muted-foreground">Frais de port à vérifier</p>
        ) : null}
        {offer.source === "ebay" && offer.sellerType === "individual" ? (
          // Charged by eBay at checkout on private sellers' items, not part
          // of the listing price the API returns.
          <p className="text-xs text-muted-foreground">
            + frais de Protection des acheteurs eBay estimés à{" "}
            {formatPrice(estimateBuyerProtectionFee(offer.price))}
          </p>
        ) : null}
        {offer.deal ? <DealBadge deal={offer.deal} /> : null}
      </div>

      <Button asChild size="md" variant={isBest ? "default" : "outline"}>
        <a href={offer.url} target="_blank" rel="sponsored nofollow noopener noreferrer">
          Voir sur {getSourcePresentation(offer.source).label}
          <ExternalLink data-icon="inline-end" aria-hidden />
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      </Button>
    </li>
  );
}
