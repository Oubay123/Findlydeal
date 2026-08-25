import { DemoFootnote } from "@/components/common/demo-notice";
import { OfferRow } from "@/components/product/offer-row";
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
  const cheapest = offers[0];
  const dearest = offers[offers.length - 1];
  const saving = cheapest && dearest ? dearest.totalPrice.amount - cheapest.totalPrice.amount : 0;

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold">
          Comparatif des prix
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {offers.length} offre{offers.length > 1 ? "s" : ""}
          </span>
        </h2>
        {saving > 0 ? (
          <p className="text-sm font-medium text-deal">
            Jusqu&apos;à {formatPrice({ amount: saving, currency: cheapest!.totalPrice.currency })}{" "}
            d&apos;écart
          </p>
        ) : null}
      </div>

      {offers.length > 0 ? (
        <ul className="space-y-3">
          {offers.map((offer) => (
            <OfferRow key={offer.id} offer={offer} isBest={offer.id === cheapest?.id} />
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
