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

/**
 * Rough signal used to decide whether a query is specific enough to group
 * offers into a single product ("iphone 15 pro 256") or too broad ("laptop").
 */
export function isSpecificQuery(term: string): boolean {
  const normalized = normalizeTerm(term);
  const hasNumber = /\d/.test(normalized);
  const wordCount = normalized.split(" ").filter(Boolean).length;
  return wordCount >= 2 && hasNumber;
}
