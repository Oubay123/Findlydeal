/**
 * One-per-page SVG sprite for icons that repeat dozens of times.
 *
 * Most icons appear once or twice and are fine as inline `lucide-react`
 * components. The star is not: a rating renders ten of them, and a home page
 * with sixty product cards therefore inlined six hundred copies of the same
 * 600-character path — around 400 KB of HTML for one glyph.
 *
 * Declaring the path once and referencing it with `<use>` brings each star
 * down to about eighty characters. Rendered from the root layout, so the
 * symbol exists before any `RatingStars` on the page.
 *
 * The sprite is hidden with `display:none` rather than `hidden` or
 * `aria-hidden` alone: a `<symbol>` referenced by `<use>` still resolves from
 * a display:none parent, which is exactly the intended behaviour.
 */
export function IconSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "none" }}
      aria-hidden
      focusable="false"
    >
      <symbol id="fd-star" viewBox="0 0 24 24">
        {/* lucide-react `Star`, filled. */}
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </symbol>
    </svg>
  );
}
