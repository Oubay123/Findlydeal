import { CONDITION_LABELS } from "@/lib/constants";
import { typicalOffers } from "@/lib/deals";
import { formatPrice } from "@/lib/utils";
import type { Offer, ProductCondition } from "@/types";

const ORDER: ProductCondition[] = ["new", "refurbished", "used"];

/**
 * "From" price per condition, side by side: the first thing a visitor of a
 * new / refurbished / used comparator wants to know. Each figure is the
 * cheapest offer in that condition whose price is in line with the others
 * (a doubtful listing never sets it). Links jump to the comparison table.
 */
export function ConditionPrices({ offers }: { offers: Offer[] }) {
  const typical = typicalOffers(offers);
  const rows = ORDER.map((condition) => {
    const matching = typical
      .filter((offer) => offer.condition === condition)
      .sort((a, b) => a.totalPrice.amount - b.totalPrice.amount);
    return { condition, cheapest: matching[0], count: matching.length };
  });

  if (rows.filter((row) => row.cheapest).length < 2) return null;

  return (
    <dl className="grid grid-cols-3 divide-x overflow-hidden rounded-2xl border bg-white text-center">
      {rows.map(({ condition, cheapest, count }) => (
        <div key={condition} className="px-2 py-3.5">
          <dt className="text-xs font-medium text-muted-foreground">
            {CONDITION_LABELS[condition]}
          </dt>
          <dd className="mt-1">
            {cheapest ? (
              <>
                <span className="block font-display text-base font-bold tabular-nums sm:text-lg">
                  {formatPrice(cheapest.totalPrice)}
                </span>
                <span className="block text-[0.7rem] text-muted-foreground">
                  {count} offre{count > 1 ? "s" : ""}
                </span>
              </>
            ) : (
              <span className="block pt-1 text-sm text-muted-foreground">Aucune offre</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
