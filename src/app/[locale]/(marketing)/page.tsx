import { MarketPulse } from "@/components/home/market-pulse";
import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import { FaqSection } from "@/components/home/faq-section";
import { FeatureHighlights } from "@/components/home/feature-highlights";
import { FinalCta } from "@/components/home/final-cta";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { ProductShelves } from "@/components/home/product-shelves";
import { DemoBanner } from "@/components/common/demo-notice";
import type { Metadata } from "next";

/**
 * Rendered on each request, never at build time: whether prices come from
 * the demonstration catalogue or from live eBay offers depends on the
 * Worker's runtime secrets, which the build machine does not have. Live
 * marketplace answers are cached by the adapters (src/lib/ebay/cache.ts).
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { absolute: "Findlydeal : comparateur neuf, reconditionné et occasion" },
    description:
      "Comparez en une recherche les prix de nombreux vendeurs, en neuf, en reconditionné et en occasion, avec les offres nettement sous le prix médian signalées.",
    alternates: localeAlternates(locale, "/"),
  };
}

/**
 * Landing page. Every block is its own component in `@/components/home` —
 * this file only decides the order of the sections.
 */
export default function HomePage() {
  return (
    <>
      <DemoBanner />
      <HeroSection />
      <HowItWorks />
      <MarketPulse />
      <ProductShelves />
      <FeatureHighlights />
      <FaqSection limit={5} />
      <FinalCta />
    </>
  );
}
