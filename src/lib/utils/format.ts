import type { Money } from "@/types";

/**
 * Presentation helpers. Pure functions only — no data fetching, no React.
 */

/**
 * Render a `Money` value (stored in minor units) for a given locale.
 * `formatPrice({ amount: 129900, currency: "EUR" })` -> "1 299,00 €"
 */
export function formatPrice(money: Money, locale: string = "fr-FR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: money.currency,
  }).format(money.amount / 100);
}

/** `formatDiscount(18.4)` -> "-18%" */
export function formatDiscount(percent: number): string {
  return `-${Math.round(percent)}%`;
}

/** Relative freshness of an offer, e.g. "2 h ago". */
export function formatRelativeTime(isoDate: string, locale: string = "fr-FR"): string {
  const deltaSeconds = (Date.parse(isoDate) - Date.now()) / 1000;
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  for (const [unit, secondsInUnit] of units) {
    if (Math.abs(deltaSeconds) >= secondsInUnit || unit === "second") {
      return formatter.format(Math.round(deltaSeconds / secondsInUnit), unit);
    }
  }
  return formatter.format(0, "second");
}

/** Shorten a marketplace title without cutting mid-word. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

const articleDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Editorial date, e.g. "28 juillet 2026". */
export function formatArticleDate(isoDate: string): string {
  return articleDateFormatter.format(new Date(isoDate));
}
