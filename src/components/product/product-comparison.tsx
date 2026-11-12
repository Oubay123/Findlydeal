import { DemoFootnote } from "@/components/common/demo-notice";
import { LocaleLink } from "@/components/common/locale-link";
import { OfferRow } from "@/components/product/offer-row";
import { getSourcePresentation } from "@/config/sources";
import { compareOffers, typicalOffers } from "@/lib/deals";
import { lastFetchedAt } from "@/lib/catalogue/market";
import { formatPrice, formatRelativeTime } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductComparisonProps {
  product: Product;
}

/**
 * Every offer for one product, cheapest delivered price first. This is the
 * reason the site exists, so it stays visually dominant.
 */
export function ProductComparison({ product }: ProductComparisonProps) {
  const offers = [...product.offers].sort(compareOffers);
  // The gap is measured between offers priced like the others: one listing
  // at three times the price, or a doubtful one, would make it meaningless.
  const typical = typicalOffers(offers).filter((offer) => !offer.shippingUnknown);
  const fetchedAt = lastFetchedAt(offers);
  const cheapest = typical[0];
  const dearest = typical[typical.length - 1];
  const saving = cheapest && dearest ? dearest.totalPrice.amount - cheapest.totalPrice.amount : 0;
  const best = product.bestOffer ?? offers[0];
  const sources = [...new Set(offers.map((offer) => getSourcePresentation(offer.source).label))];

  return (
    <section id="offres" aria-labelledby="offers-title" className="scroll-mt-20 space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="offers-title" className="text-xl font-semibold">
          Toutes les offres
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {offers.length < (product.offerCount ?? 0)
              ? `${offers.length} moins chères sur ${product.offerCount}`
              : `${offers.length}`}
          </span>
        </h2>
        {saving > 0 ? (
          <p className="text-sm text-muted-foreground">
            Jusqu&apos;à {formatPrice({ amount: saving, currency: cheapest!.totalPrice.currency })}{" "}
            d&apos;écart
          </p>
        ) : null}
      </div>

      {/* Ranking and affiliation, stated where the offers are (art. D111-7). */}
      <p className="text-xs leading-relaxed text-muted-foreground">
        Offres {sources.join(", ")} livrables en France, classées par prix livré, de la moins chère
        à la plus chère ; celles dont la livraison n&apos;est pas connue viennent après. Liste non
        exhaustive, aucune position payante
        {fetchedAt ? `, prix relevés ${formatRelativeTime(fetchedAt)}` : ""}. Les liens sont
        affiliés : Findlydeal peut percevoir une commission, sans effet sur le prix ni sur
        l&apos;ordre.{" "}
        <LocaleLink href="/methodologie" className="underline underline-offset-2">
          Notre méthode
        </LocaleLink>
      </p>

      {offers.length > 0 ? (
        <ul className="divide-y border-y">
          {offers.map((offer) => (
            <OfferRow key={offer.id} offer={offer} isBest={offer.id === best?.id} />
          ))}
        </ul>
      ) : (
        <p className="bg-brand-50 rounded-xl border p-8 text-center text-sm text-muted-foreground">
          Aucune offre disponible pour ce produit actuellement.
        </p>
      )}

      <DemoFootnote />
    </section>
  );
}
