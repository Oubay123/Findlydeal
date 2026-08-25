import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  /** 0..5. */
  value: number;
  count?: number;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Five stars filled proportionally to the score.
 * The fill is done with a clipped overlay so half-stars render exactly.
 */
export function RatingStars({ value, count, size = "sm", className }: RatingStarsProps) {
  const clamped = Math.min(5, Math.max(0, value));
  const starSize = size === "md" ? "size-4.5" : "size-3.5";

  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      <span
        className="relative inline-flex"
        role="img"
        aria-label={`Note de ${clamped.toFixed(1)} sur 5`}
      >
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className={cn(starSize, "text-border")} fill="currentColor" />
          ))}
        </span>
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${(clamped / 5) * 100}%` }}
          aria-hidden
        >
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className={cn(starSize, "text-primary")} fill="currentColor" />
            ))}
          </span>
        </span>
      </span>

      <span className={cn("font-medium", size === "md" ? "text-sm" : "text-xs")}>
        {clamped.toFixed(1)}
      </span>
      {count !== undefined ? (
        <span className={cn("text-muted-foreground", size === "md" ? "text-sm" : "text-xs")}>
          ({count.toLocaleString("fr-FR")})
        </span>
      ) : null}
    </span>
  );
}
