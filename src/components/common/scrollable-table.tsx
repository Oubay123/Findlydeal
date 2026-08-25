import { cn } from "@/lib/utils";

interface ScrollableTableProps {
  children: React.ReactNode;
  /**
   * Width below which the table starts scrolling instead of squeezing.
   * A table narrower than this is unreadable, not compact.
   */
  minWidth?: string;
  /** Announced to screen readers; also useful as an SEO signal. */
  caption?: string;
  className?: string;
}

/**
 * The one way tables are rendered in this app.
 *
 * A table is the only element that genuinely cannot fit a 375 px screen
 * without becoming unreadable, so it scrolls horizontally rather than
 * collapsing. Three things make that scroll usable:
 *
 * - `min-width` on the table, otherwise the browser crushes the columns and
 *   there is nothing to scroll;
 * - `scroll-shadows` (see globals.css), a CSS-only cue that fades in on the
 *   side where content is still hidden;
 * - `tabindex` + `role="region"`, so a keyboard user can scroll the container
 *   without a mouse. Without it the content is simply unreachable.
 */
export function ScrollableTable({
  children,
  minWidth = "34rem",
  caption,
  className,
}: ScrollableTableProps) {
  return (
    <div
      role="region"
      aria-label={caption ?? "Tableau, défilement horizontal possible"}
      tabIndex={0}
      className={cn(
        "my-6 w-full overflow-x-auto rounded-xl border scroll-shadows focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none",
        className,
      )}
    >
      <table className="w-full border-collapse text-sm" style={{ minWidth }}>
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        {children}
      </table>
    </div>
  );
}
