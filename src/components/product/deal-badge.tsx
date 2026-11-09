import { formatBelowMedian } from "@/lib/utils";
import type { DealSignal } from "@/types";

interface DealBadgeProps {
  deal: DealSignal;
}

/**
 * Visual translation of a `DealSignal`.
 * A gap below the median of the other offers shows its exact percentage in
 * orange ("18 % sous la médiane", never "-18 %", which would read as a seller
 * discount); an offer that wins on other grounds gets the green "Meilleure
 * affaire" label instead. A suspicious price gets a neutral "à vérifier"
 * warning, never a deal colour.
 */
export function DealBadge({ deal }: DealBadgeProps) {
  if (deal.suspicious) {
    return (
      <span
        title={deal.reasons.join(" · ")}
        className="rounded-md border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900"
      >
        Prix inhabituel, à vérifier
      </span>
    );
  }
  if (deal.level === "none") return null;

  const hasDiscount = typeof deal.discountPercent === "number" && deal.discountPercent > 0;

  return (
    <span
      title={deal.reasons.join(" · ")}
      className={`rounded-md px-2.5 py-1 text-xs font-semibold text-white ${
        hasDiscount ? "bg-primary" : "bg-deal-soft"
      }`}
    >
      {hasDiscount ? formatBelowMedian(deal.discountPercent!) : "Meilleure affaire"}
    </span>
  );
}
