import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_UI_LOCALE, PUBLIC_UI_LOCALES, UI_LOCALES } from "@/i18n/config";

/**
 * Sends every un-prefixed request to a locale.
 *
 * `middleware` is the deprecated name for this file in this version of
 * Next.js; the convention is `proxy.ts` at the same level as `app/`.
 *
 * The locale is picked from `Accept-Language`, falling back to French. It is a
 * redirect rather than a rewrite on purpose: one URL per language is what
 * makes `hreflang`, canonicals and sharing behave, and a rewrite would serve
 * two languages from the same address.
 *
 * Negotiation only ever lands on a **published** locale. `/en/...` still
 * answers if someone types it, because the tree exists, but an English browser
 * is not sent there automatically while the language is untranslated: it would
 * be served French text under an English URL without having asked for it.
 */
function preferredLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return DEFAULT_UI_LOCALE;

  // "fr-CH,fr;q=0.9,en;q=0.8" -> ["fr-ch", "fr", "en"], best first.
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag = "", ...rest] = part.trim().split(";");
      const quality = Number(rest.find((p) => p.startsWith("q="))?.slice(2) ?? 1);
      return { tag: tag.toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    // `fr-CH` and `fr` both mean the French site.
    const base = tag.split("-")[0] ?? "";
    if (PUBLIC_UI_LOCALES.some((locale) => locale === base)) return base;
  }

  return DEFAULT_UI_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = UI_LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  /*
   * Everything except Next's own assets and the files that must stay at the
   * root of the domain. `sitemap.xml` and `robots.txt` are single files that
   * cover both languages; prefixing them would break the two URLs search
   * engines look for by convention.
   */
  matcher: [
    "/((?!_next|api|favicon\\.ico|icon\\.svg|apple-icon\\.png|robots\\.txt|sitemap\\.xml).*)",
  ],
};
