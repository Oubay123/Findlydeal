import { LocaleDropdown } from "@/components/layout/locale-dropdown";
import { PUBLIC_UI_LOCALES } from "@/i18n";
import { getServerDictionary, getUiLocale } from "@/i18n/server";
import { cn } from "@/lib/utils";

/**
 * The current language, and a way to change it once there is a choice.
 *
 * Only the locales listed in `PUBLIC_UI_LOCALES` are offered. While that is a
 * single language a dropdown would be a menu with one item, so this degrades
 * to a quiet indicator: no menu, and, since the component then stays on the
 * server, no JavaScript at all.
 *
 * That split also fixes a rendering problem. The menu reads the query string
 * to preserve it across a language change, and `useSearchParams()` makes a
 * component bail out of static prerendering: the indicator was rendering as
 * its empty Suspense fallback on every statically built page, so it never
 * appeared in the served HTML. Only the menu needs that hook, so only the menu
 * pays for it.
 *
 * It becomes a real switcher on its own the day a second locale is published.
 */
export async function LanguageSwitcher({ className }: { className?: string }) {
  if (PUBLIC_UI_LOCALES.length >= 2) return <LocaleDropdown className={className} />;

  const [locale, dictionary] = await Promise.all([getUiLocale(), getServerDictionary()]);

  return (
    <span
      aria-label={dictionary.nav.languageLabel}
      className={cn(
        "text-xs font-medium tracking-wide text-muted-foreground/70 uppercase",
        className,
      )}
    >
      {locale}
    </span>
  );
}
