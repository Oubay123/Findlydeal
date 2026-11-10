import { CONDITION_LABELS } from "@/lib/constants";
import { marketByCondition } from "@/lib/catalogue/market";
import { cn, formatPrice } from "@/lib/utils";
import type { Offer, ProductCondition } from "@/types";

/** Text and background of each condition, from the palette in globals.css. */
export const CONDITION_TONE: Record<ProductCondition, string> = {
  new: "text-condition-new bg-condition-new-soft",
  refurbished: "text-condition-refurbished bg-condition-refurbished-soft",
  used: "text-condition-used bg-condition-used-soft",
  unknown: "text-muted-foreground bg-muted",
};

const eur = (cents: number) => formatPrice({ amount: cents, currency: "EUR" });

interface ConditionLadderProps {
  offers: Offer[];
  /** `compact` for product cards, `large` for the home page example. */
  size?: "compact" | "large";
  className?: string;
}

/**
 * The same product's lowest delivered price in each condition, one line per
 * condition: the comparison the site exists for. Conditions without an offer
 * are left out rather than shown empty. Only offers priced in line with the
 * others count (see `marketByCondition`).
 */
export function ConditionLadder({ offers, size = "compact", className }: ConditionLadderProps) {
  const rows = marketByCondition(offers).filter((row) => row.lowestCents);
  if (rows.length === 0) return null;
  const large = size === "large";

  return (
    <dl className={cn("space-y-1", large && "space-y-2", className)}>
      {rows.map((row) => (
        <div key={row.condition} className="flex items-center justify-between gap-3">
          <dt>
            <span
              className={cn(
                "inline-block rounded-md font-medium",
                large ? "px-2.5 py-1 text-sm" : "px-1.5 py-0.5 text-xs",
                CONDITION_TONE[row.condition],
              )}
            >
              {CONDITION_LABELS[row.condition]}
            </span>
          </dt>
          <dd
            className={cn("text-right font-semibold tabular-nums", large ? "text-xl" : "text-sm")}
          >
            {eur(row.lowestCents as number)}
            {large && row.gapWithNewPercent ? (
              <span className="ml-2 text-sm font-medium text-deal">−{row.gapWithNewPercent} %</span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
