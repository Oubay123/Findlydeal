import { ExternalLink } from "lucide-react";
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
    <li className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5">
      <div className="min-w-40 flex-1 space-y-1.5">
        <p className="text-xs font-medium">
          <span className="text-muted-foreground">{CONDITION_LABELS[offer.condition]}</span>
          {isBest ? <span className="ml-3 text-primary">{t.product.cheapest}</span> : null}
        </p>
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
        <PriceBadge
          price={offer.totalPrice}
          comparedTo={offer.deal?.referencePrice}
          marker={
            offer.source === "ebay"
              ? { symbol: "*", label: "eBay peut ajouter des frais au paiement" }
              : undefined
          }
        />
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
