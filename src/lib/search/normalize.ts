/**
 * Query normalisation: turn whatever the user typed into a stable term that
 * can be compared, cached and fanned out to several sources.
 *
 * Kept deliberately dumb for now. Once real results are flowing this is where
 * brand/model extraction and noise-word stripping ("pas cher", "best price",
 * "livraison gratuite") will live.
 */

/**
 * Collapse whitespace, lowercase, and strip diacritics.
 *
 * Accent folding is not cosmetic here: French shoppers type "canape" and
 * "cafe" far more often than "canapé" and "café", and marketplace titles are
 * inconsistent too. Both sides of a comparison must go through this function.
 */
export function normalizeTerm(term: string): string {
  return term
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

/** Stable cache key for a normalised term in a given locale. */
export function buildQueryKey(term: string, locale: string): string {
  return `${locale}:${normalizeTerm(term)}`;
}
