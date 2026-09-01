import type { Metadata } from "next";
import {
  DEFAULT_UI_LOCALE,
  UI_LOCALE_HREFLANG,
  getPublishedLocales,
  localePath,
  type UiLocale,
} from "@/i18n";

/** OpenGraph wants `fr_FR`, not `fr`. */
const OPEN_GRAPH_LOCALES: Record<UiLocale, string> = {
  fr: "fr_FR",
  en: "en_US",
};

export function localeOpenGraph(locale: UiLocale): string {
  return OPEN_GRAPH_LOCALES[locale];
}

/**
 * Canonical and `hreflang` for one page, in one call.
 *
 * Two rules are enforced here rather than left to each page:
 *
 * 1. **The canonical carries the locale.** `/en/search` pointing at `/search`
 *    would tell Google the two languages are the same page.
 * 2. **`hreflang` only lists locales that are actually finished.** Advertising
 *    an alternate that is `noindex` — which is what an untranslated locale is,
 *    see `isLocaleTranslated` — contradicts itself, and search engines drop
 *    the whole cluster when they see it. So while English is empty, French
 *    pages simply carry no alternates, and the tags appear on their own the
 *    day the dictionary is filled.
 *
 * `path` is the route *without* its locale prefix, e.g. `/search`.
 */
export function localeAlternates(locale: UiLocale, path: string): Metadata["alternates"] {
  const published = getPublishedLocales();
  const canonical = localePath(locale, path);

  if (published.length < 2) return { canonical };

  const languages: Record<string, string> = {};
  for (const published_ of published) {
    languages[UI_LOCALE_HREFLANG[published_]] = localePath(published_, path);
  }
  languages["x-default"] = localePath(DEFAULT_UI_LOCALE, path);

  return { canonical, languages };
}
