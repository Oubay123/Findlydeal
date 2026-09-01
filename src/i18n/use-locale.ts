"use client";

import { usePathname } from "next/navigation";
import { getDictionary, localePath, splitLocale, type Dictionary, type UiLocale } from "@/i18n";

/**
 * The current locale, for Client Components.
 *
 * `next/root-params` is the way to read it on the server, but it explicitly
 * does not work in Client Components. Rather than prop-drilling the locale
 * into the navbar, the mobile menu and every filter control, they read it back
 * out of the pathname — which is where it lives anyway, since routing is what
 * defines it.
 */
export function useUiLocale(): UiLocale {
  return splitLocale(usePathname()).locale;
}

/** The pathname without its locale prefix, for active-link comparisons. */
export function useUnprefixedPathname(): string {
  return splitLocale(usePathname()).path;
}

/** Strings for the current locale, in a Client Component. */
export function useDictionary(): Dictionary {
  return getDictionary(useUiLocale());
}

/** Builds a locale-aware href from a site-relative path. */
export function useLocalePath(): (path: string) => string {
  const locale = useUiLocale();
  return (path: string) => localePath(locale, path);
}
