import { SUPPORTED_LOCALES } from "@/lib/constants";
import type { Locale } from "@/types";
import { normalizeTerm } from "./normalize";

/**
 * Multilingual search — NOT IMPLEMENTED YET.
 *
 * Why it exists: the same product is listed under different wordings per
 * marketplace country ("casque audio" / "headphones" / "Kopfhörer"). Searching
 * only in the user's language silently hides a large part of the offers.
 *
 * Planned strategy, cheapest first:
 *   1. brand + model numbers are language-neutral -> no translation needed;
 *   2. a small hand-written glossary for high-traffic category words;
 *   3. a translation API (`TRANSLATION_API_KEY`) as the fallback, with the
 *      result cached by `buildQueryKey()`.
 */

export interface TranslatedTerm {
  locale: Locale;
  term: string;
}

/**
 * Expand a term into the locales worth querying.
 * Currently returns the term untouched for each locale — good enough while
 * adapters are stubs, and the call sites already have the final shape.
 */
export async function expandTermToLocales(
  term: string,
  locales: readonly Locale[] = SUPPORTED_LOCALES,
): Promise<TranslatedTerm[]> {
  const normalized = normalizeTerm(term);
  // TODO: replace with the glossary + translation API strategy above.
  return locales.map((locale) => ({ locale, term: normalized }));
}

/** True when the term is language-neutral (model numbers, references, EANs). */
export function isLanguageNeutral(term: string): boolean {
  return /^[\p{Lu}\p{N}\s\-+./]+$/u.test(term.trim()) && /\d/.test(term);
}
