import type { Locale } from "@/types";

/**
 * Locales the search engine can expand a query into.
 *
 * Multilingual search matters because the same product is listed under
 * different wordings depending on the marketplace's country ("casque audio"
 * vs "headphones" vs "Kopfhörer"). `src/lib/search/translate.ts` uses this
 * list to decide which languages a query is worth being fanned out to.
 */
export const SUPPORTED_LOCALES: readonly Locale[] = ["fr", "en", "de", "es", "it"] as const;

export const DEFAULT_LOCALE: Locale = "fr";

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  de: "Deutsch",
  es: "Español",
  it: "Italiano",
};

export function isSupportedLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
