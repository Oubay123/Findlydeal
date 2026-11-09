import { DemoFootnote } from "@/components/common/demo-notice";
import { LocaleLink } from "@/components/common/locale-link";
import { OfferRow } from "@/components/product/offer-row";
import { typicalOffers } from "@/lib/deals";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductComparisonProps {
  product: Product;
}

/**
 * The price table: every offer for one product, cheapest first.
 * This is the reason the site exists, so it stays visually dominant.
 */
export function ProductComparison({ product }: ProductComparisonProps) {
  const offers = [...product.offers].sort((a, b) => a.totalPrice.amount - b.totalPrice.amount);
  // The gap is measured between offers priced like the others: one listing
  // at three times the price, or a doubtful one, would make it meaningless.
  const typical = typicalOffers(offers);
  const cheapest = typical[0];
  const dearest = typical[typical.length - 1];
  const saving = cheapest && dearest ? dearest.totalPrice.amount - cheapest.totalPrice.amount : 0;
  const best = product.bestOffer ?? offers[0];

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold">
          Comparatif des prix
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {offers.length < (product.offerCount ?? 0)
              ? `${offers.length} offres les moins chères sur ${product.offerCount}`
              : `${offers.length} offre${offers.length > 1 ? "s" : ""}`}
          </span>
        </h2>
        {saving > 0 ? (
          <p className="text-sm font-medium text-deal">
            Jusqu&apos;à {formatPrice({ amount: saving, currency: cheapest!.totalPrice.currency })}{" "}
            d&apos;écart
          </p>
        ) : null}
      </div>

      {/* Ranking and affiliation, stated where the offers are (art. D111-7). */}
      <p className="text-xs leading-relaxed text-muted-foreground">
        Offres classées par prix total, livraison comprise, de la moins chère à la plus chère. Liste
        non exhaustive ; aucune position payante. Les liens vers les marchands sont affiliés :
        Findlydeal peut percevoir une commission, sans effet sur le prix ni sur l&apos;ordre.{" "}
        <LocaleLink href="/methodologie" className="underline underline-offset-2">
          Notre méthode
        </LocaleLink>
      </p>

      {offers.length > 0 ? (
        <ul className="space-y-3">
          {offers.map((offer) => (
            <OfferRow key={offer.id} offer={offer} isBest={offer.id === best?.id} />
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl bg-cream p-10 text-center text-sm text-muted-foreground">
          Aucune offre disponible pour ce produit actuellement.
        </p>
      )}

      <DemoFootnote />
    </section>
  );
}
