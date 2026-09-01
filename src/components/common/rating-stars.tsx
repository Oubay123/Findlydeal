import { cn } from "@/lib/utils";

interface RatingStarsProps {
  /** 0..5. */
  value: number;
  count?: number;
  size?: "sm" | "md";
  /**
   * `full` draws the five stars; `compact` draws one star followed by the
   * score.
   *
   * Compact exists for dense listings. The five-star display is twenty-five
   * DOM elements — two layers of five icons plus their wrappers — and a home
   * page carrying sixty cards spent half its DOM budget on decoration nobody
   * reads: in a grid, the number is the information. The full display stays
   * where the rating is the subject, on the product page.
   */
  variant?: "full" | "compact";
  className?: string;
}

/**
 * One star, drawn from the sprite declared once per page by `IconSprite`.
 *
 * Inlining `lucide-react`'s `Star` here instead costs ~600 characters of path
 * data per star, and a rating renders ten of them.
 */
function Star({ className }: { className: string }) {
  return (
    <svg
      className={cn("fill-current", className)}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
    >
      <use href="#fd-star" />
    </svg>
  );
}

/**
 * Five stars filled proportionally to the score.
 * The fill is done with a clipped overlay so half-stars render exactly.
 */
export function RatingStars({
  value,
  count,
  size = "sm",
  variant = "full",
  className,
}: RatingStarsProps) {
  const clamped = Math.min(5, Math.max(0, value));
  const starSize = size === "md" ? "size-4.5" : "size-3.5";
  const textSize = size === "md" ? "text-sm" : "text-xs";

  if (variant === "compact") {
    return (
      <span
        className={cn("flex items-center gap-1", textSize, className)}
        role="img"
        aria-label={`Note de ${clamped.toFixed(1)} sur 5${
          count !== undefined ? `, ${count.toLocaleString("fr-FR")} avis` : ""
        }`}
      >
        <Star className={cn(starSize, "text-primary")} />
        <span className="font-medium">{clamped.toFixed(1)}</span>
        {count !== undefined ? (
          <span className="text-muted-foreground">({count.toLocaleString("fr-FR")})</span>
        ) : null}
      </span>
    );
  }

  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      <span
        className="relative inline-flex"
        role="img"
        aria-label={`Note de ${clamped.toFixed(1)} sur 5`}
      >
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className={cn(starSize, "text-border")} />
          ))}
        </span>
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${(clamped / 5) * 100}%` }}
          aria-hidden
        >
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className={cn(starSize, "text-primary")} />
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
