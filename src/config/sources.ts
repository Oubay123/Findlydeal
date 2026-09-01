import type { SourceId } from "@/types";

/**
 * How each partner is *presented*: name, monogram, accent colour, home page.
 *
 * Deliberately separate from `src/lib/sources/`, which holds the adapters. The
 * adapters carry credentials, HTTP clients and error classes; a filter pill or
 * an offer row only needs a name and a colour, and importing an adapter to get
 * them would pull the whole affiliate machinery into the browser bundle. This
 * file is plain data and safe to import from a client component.
 *
 * The adapters read their `label` from here, so the two never drift apart.
 *
 * ## About the logos
 *
 * These are **monograms**, not the partners' logos. Reproducing eBay's or
 * Back Market's logotype requires their permission, and every affiliate
 * programme ships brand guidelines that govern exactly how their marks may be
 * displayed. Shipping a made-up approximation of a real logo would be worse
 * than shipping none.
 *
 * The accent colours below are the partners' publicly known brand colours,
 * used to tint a neutral badge — that is ordinary practice for a comparison
 * site and reproduces no protected mark.
 *
 * To use an official asset once a programme grants it: drop the file in
 * `public/logos/`, set `logoSrc` to `"/logos/<file>.svg"`, and `SourceLogo`
 * switches to it on its own. Respect the sizing and clear-space rules in the
 * programme's guidelines.
 */
export interface SourcePresentation {
  /** Display name, as the partner writes it. */
  label: string;
  /** One or two letters shown on the badge while no official asset exists. */
  monogram: string;
  /** Partner brand colour, used as the badge background. */
  accent: string;
  /** Text colour that passes contrast against `accent`. */
  accentForeground: string;
  /** Partner home page, for the "nos partenaires" listings. */
  homepage: string;
  /**
   * Official logo in `public/logos/`, once the affiliate programme provides
   * one and its guidelines allow this usage. Takes precedence over the
   * monogram.
   */
  logoSrc?: string;
}

export const sourcePresentation: Record<SourceId, SourcePresentation> = {
  ebay: {
    label: "eBay",
    monogram: "eB",
    accent: "#0064d2",
    accentForeground: "#ffffff",
    homepage: "https://www.ebay.fr",
  },
  backmarket: {
    label: "Back Market",
    monogram: "BM",
    accent: "#0f4c3a",
    accentForeground: "#ffffff",
    homepage: "https://www.backmarket.fr",
  },
  creationwatches: {
    label: "Creation Watches",
    monogram: "CW",
    accent: "#1c2a3a",
    accentForeground: "#ffffff",
    homepage: "https://www.creationwatches.com",
  },
  wayfair: {
    label: "Wayfair",
    monogram: "Wf",
    accent: "#7f187f",
    accentForeground: "#ffffff",
    homepage: "https://www.wayfair.de",
  },
};

/**
 * Presentation for a source id, with a readable fallback rather than a crash.
 * An offer can carry a source that has no entry yet — a new adapter added in a
 * hurry, or stale cached data — and a comparison table is the wrong place to
 * throw.
 */
export function getSourcePresentation(id: SourceId | string): SourcePresentation {
  const known = sourcePresentation[id as SourceId];
  if (known) return known;

  return {
    label: id,
    monogram: id.slice(0, 2).toUpperCase(),
    accent: "#6b7280",
    accentForeground: "#ffffff",
    homepage: "#",
  };
}
