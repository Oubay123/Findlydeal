import { locale as localeRootParam } from "next/root-params";
import {
  DEFAULT_UI_LOCALE,
  getDictionary,
  isUiLocale,
  localePath,
  type Dictionary,
  type UiLocale,
} from "@/i18n";

/**
 * Reads the current locale from the route, for Server Components.
 *
 * `next/root-params` exposes a getter named after each dynamic segment above
 * the root layout — here `app/[locale]`, so the export is `locale`. It works
 * in any Server Component without the value being passed down, which is what
 * keeps a product card or a breadcrumb from needing a `locale` prop threaded
 * through four layers.
 *
 * It is unavailable in Client Components by design; those use
 * `@/i18n/use-locale`, which reads the same value back out of the pathname.
 */
export async function getUiLocale(): Promise<UiLocale> {
  const value = await localeRootParam();
  return value && isUiLocale(value) ? value : DEFAULT_UI_LOCALE;
}

/** Strings for the current locale, in a Server Component. */
export async function getServerDictionary(): Promise<Dictionary> {
  return getDictionary(await getUiLocale());
}

/** A locale-aware href, built from a site-relative path. */
export async function serverPath(path: string): Promise<string> {
  return localePath(await getUiLocale(), path);
}
