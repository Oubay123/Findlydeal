import { DEFAULT_UI_LOCALE, type UiLocale } from "@/i18n/config";
import { fr } from "@/i18n/dictionaries/fr";
import { en } from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/dictionaries/fr";

export type { Dictionary };
export * from "@/i18n/config";

const dictionaries: Record<UiLocale, Dictionary> = { fr, en };

/**
 * Fills every empty string with the French one, recursively.
 *
 * An untranslated key renders the French text rather than a blank, which is
 * the difference between "this page is not translated yet" and "this page is
 * broken". `isLocaleTranslated` is what stops the half-translated version from
 * being indexed, so the fallback never quietly ships as if it were finished.
 */
function withFallback<T>(target: T, reference: T): T {
  if (typeof reference === "string") {
    return (typeof target === "string" && target.length > 0 ? target : reference) as T;
  }

  if (reference && typeof reference === "object") {
    const merged: Record<string, unknown> = {};
    for (const key of Object.keys(reference as Record<string, unknown>)) {
      merged[key] = withFallback(
        (target as Record<string, unknown> | undefined)?.[key],
        (reference as Record<string, unknown>)[key],
      );
    }
    return merged as T;
  }

  return target ?? reference;
}

const resolved: Record<UiLocale, Dictionary> = {
  fr,
  en: withFallback(en, fr),
};

/** The strings for a locale, French filling any gap. */
export function getDictionary(locale: UiLocale): Dictionary {
  return resolved[locale] ?? resolved[DEFAULT_UI_LOCALE];
}

/** True when no string is still waiting for a translation. */
function isComplete(value: unknown): boolean {
  if (typeof value === "string") return value.length > 0;
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).every(isComplete);
  }
  return false;
}

/**
 * Whether a locale is finished, computed from its dictionary rather than a
 * flag someone has to remember to flip.
 *
 * Drives three things at once: `/en` is `noindex` while it is false, it stays
 * out of the sitemap, and no `hreflang` points at it. Filling the last string
 * in `dictionaries/en.ts` turns all three on, with nothing else to edit.
 */
export function isLocaleTranslated(locale: UiLocale): boolean {
  if (locale === DEFAULT_UI_LOCALE) return true;
  return isComplete(dictionaries[locale]);
}

/** Locales ready to be published: indexed, listed in the sitemap, in hreflang. */
export function getPublishedLocales(): UiLocale[] {
  return (Object.keys(dictionaries) as UiLocale[]).filter(isLocaleTranslated);
}

/**
 * Substitutes `{name}` placeholders.
 * Kept deliberately small: the alternative is an ICU message formatter, and
 * this site has exactly two strings with a variable in them.
 */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
