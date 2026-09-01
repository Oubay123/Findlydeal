/**
 * Interface locales — the languages the *site* is published in.
 *
 * Not to be confused with `Locale` in `@/types`, which is a different thing
 * with a similar name: that one lists the languages a *search query* can be
 * fanned out to (fr, en, de, es, it), because the same product is listed as
 * "casque audio", "headphones" or "Kopfhörer" depending on the marketplace.
 * The site being published in French says nothing about which marketplaces it
 * queries, so the two lists move independently and are kept apart on purpose.
 */
export const UI_LOCALES = ["fr", "en"] as const;

export type UiLocale = (typeof UI_LOCALES)[number];

/**
 * The locales *offered to visitors* in the language switcher.
 *
 * Deliberately narrower than `UI_LOCALES`. The English tree exists and is
 * routable — `/en/...` answers, `dictionaries/en.ts` is in place, the proxy
 * still negotiates it — but it is not translated yet, so pointing visitors at
 * it would advertise a French page under an English flag.
 *
 * This is the single switch that hides it: add `"en"` back here and the
 * switcher, the footer language row and any future locale UI pick it up. No
 * route to restore, no file to un-delete.
 *
 * Indexing is governed separately by `isLocaleTranslated()`, which reads the
 * dictionary itself: the two can never contradict each other by accident.
 */
export const PUBLIC_UI_LOCALES: readonly UiLocale[] = ["fr"];

/** The locale `/` redirects to, and the one `x-default` points at. */
export const DEFAULT_UI_LOCALE: UiLocale = "fr";

export const UI_LOCALE_LABELS: Record<UiLocale, string> = {
  fr: "Français",
  en: "English",
};

/** `hreflang` value for each locale. */
export const UI_LOCALE_HREFLANG: Record<UiLocale, string> = {
  fr: "fr",
  en: "en",
};

export function isUiLocale(value: string): value is UiLocale {
  return (UI_LOCALES as readonly string[]).includes(value);
}

/**
 * Prefix a site-relative path with a locale.
 *
 * Every internal link goes through this. Hardcoding `/search` somewhere would
 * silently drop a visitor from `/en` back into French, and that kind of bug is
 * invisible until someone browses in the other language.
 */
export function localePath(locale: UiLocale, path: string): string {
  if (!path.startsWith("/")) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * The locale a pathname belongs to, and the path without its prefix.
 * Returns the default locale for a path that carries no prefix yet.
 */
export function splitLocale(pathname: string): { locale: UiLocale; path: string } {
  const [, first = "", ...rest] = pathname.split("/");
  if (!isUiLocale(first)) return { locale: DEFAULT_UI_LOCALE, path: pathname };

  const path = `/${rest.join("/")}`;
  return { locale: first, path: path === "/" ? "/" : path.replace(/\/$/, "") };
}
