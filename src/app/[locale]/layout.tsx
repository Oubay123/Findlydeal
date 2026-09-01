import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { IconSprite } from "@/components/common/icon-sprite";
import { CookieConsent } from "@/components/common/cookie-consent";
import { JsonLd } from "@/components/common/json-ld";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/config/site";
import { getDictionary, isLocaleTranslated, isUiLocale, UI_LOCALES } from "@/i18n";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo/json-ld";
import { localeOpenGraph } from "@/lib/seo/locale";
import "../globals.css";

/**
 * Poppins carries the headings, Inter the body copy.
 *
 * Only the two weights actually used: `font-display` never appears with
 * `font-medium` anywhere in the codebase, so 500 was three subset files
 * downloaded for nothing. `display: "swap"` is next/font's default — text is
 * painted immediately in the fallback rather than staying invisible.
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Both locales are known at build time, so both trees are prerendered.
 * Anything else that reaches `[locale]` is a 404, enforced below.
 */
export function generateStaticParams() {
  return UI_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isUiLocale(locale)) notFound();

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name}, ${siteConfig.tagline.toLowerCase()}`,
      template: `%s · ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      url: `${siteConfig.url}/${locale}`,
      locale: localeOpenGraph(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
    },
    // A locale whose dictionary still has empty strings renders French text
    // through the fallback. Useful to preview, harmful to index — so it is
    // kept out of the index until the last string is translated.
    ...(isLocaleTranslated(locale) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isUiLocale(locale)) notFound();

  const dictionary = getDictionary(locale);

  return (
    <html lang={locale} className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {/*
          Skip link: the header carries a dozen links and a category menu, so
          without it a keyboard or screen-reader user tabs through the whole
          navigation on every single page before reaching the content.
          Visually hidden until focused.
        */}
        <a
          href="#contenu"
          className="sr-only rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100"
        >
          {dictionary.nav.skipToContent}
        </a>

        {/* Icon paths that repeat dozens of times per page, declared once. */}
        <IconSprite />
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebSiteSchema()} />
        <Header locale={locale} />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
        {/* Dormant until a non-essential script exists. See lib/consent. */}
        <CookieConsent />
      </body>
    </html>
  );
}
