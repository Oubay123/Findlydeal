import type { Money } from "@/types";
import { cn, formatPrice } from "@/lib/utils";

interface PriceBadgeProps {
  price: Money;
  /**
   * Median price of the other offers, shown next to the current one when the
   * offer is below it. Deliberately not struck through: a crossed-out price
   * reads as the seller's former price, which this is not.
   */
  comparedTo?: Money;
  size?: "sm" | "lg";
  className?: string;
}

/** Canonical way to display a price. Never format a price inline elsewhere. */
export function PriceBadge({ price, comparedTo, size = "sm", className }: PriceBadgeProps) {
  const isDiscounted = Boolean(comparedTo && comparedTo.amount > price.amount);

  return (
    <span className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-display font-bold",
          size === "lg" ? "text-2xl" : "text-lg",
          isDiscounted ? "text-deal" : "text-foreground",
        )}
      >
        {formatPrice(price)}
      </span>
      {isDiscounted ? (
        <span className="text-xs text-muted-foreground">
          médiane&nbsp;{formatPrice(comparedTo!)}
        </span>
      ) : null}
    </span>
  );
}
