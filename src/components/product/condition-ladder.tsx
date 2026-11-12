import { CONDITION_LABELS } from "@/lib/constants";
import { marketByCondition } from "@/lib/catalogue/market";
import { cn, formatPrice } from "@/lib/utils";
import type { Offer } from "@/types";

const eur = (cents: number) => formatPrice({ amount: cents, currency: "EUR" });

/**
 * The same product's lowest delivered price in each condition, one line per
 * condition: the comparison the site exists for. Conditions are told apart by
 * their name, never by a tint; the only accent is the cheapest price. Conditions
 * without an offer are left out rather than shown empty, and only offers
 * priced in line with the others count (see `marketByCondition`).
 */
export function ConditionLadder({ offers, className }: { offers: Offer[]; className?: string }) {
  const rows = marketByCondition(offers).filter((row) => row.lowestCents);
  if (rows.length === 0) return null;
  const cheapest = Math.min(...rows.map((row) => row.lowestCents as number));

  return (
    <dl className={cn("space-y-1 text-sm", className)}>
      {rows.map((row) => {
        const isCheapest = row.lowestCents === cheapest && rows.length > 1;
        return (
          <div key={row.condition} className="flex items-baseline justify-between gap-3">
            <dt className="text-muted-foreground">{CONDITION_LABELS[row.condition]}</dt>
            <dd
              className={cn(
                "font-semibold tabular-nums",
                isCheapest ? "text-primary" : "text-foreground",
              )}
            >
              {eur(row.lowestCents as number)}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
