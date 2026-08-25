import type { Money } from "@/types";
import { cn, formatPrice } from "@/lib/utils";

interface PriceBadgeProps {
  price: Money;
  /** Struck-through reference price shown next to the current one. */
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
        <span className="text-sm text-muted-foreground line-through">
          {formatPrice(comparedTo!)}
        </span>
      ) : null}
    </span>
  );
}
