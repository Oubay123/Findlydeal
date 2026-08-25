import { formatDiscount } from "@/lib/utils";
import type { DealSignal } from "@/types";

interface DealBadgeProps {
  deal: DealSignal;
}

/**
 * Visual translation of a `DealSignal`.
 * A discount shows the exact percentage in orange; an offer that wins on other
 * grounds gets the green "Meilleure affaire" label instead.
 */
export function DealBadge({ deal }: DealBadgeProps) {
  if (deal.level === "none") return null;

  const hasDiscount = typeof deal.discountPercent === "number" && deal.discountPercent > 0;

  return (
    <span
      title={deal.reasons.join(" · ")}
      className={`rounded-md px-2.5 py-1 text-xs font-semibold text-white ${
        hasDiscount ? "bg-primary" : "bg-deal-soft"
      }`}
    >
      {hasDiscount ? formatDiscount(deal.discountPercent!) : "Meilleure affaire"}
    </span>
  );
}
