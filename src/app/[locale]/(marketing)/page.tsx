import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { HomeCategories } from "@/components/home/home-categories";
import { HomeDeals } from "@/components/home/home-deals";
import { SeasonalBanner } from "@/components/home/seasonal-banner";
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
 * Landing page: what the site does (with a live example), the occasion of
 * the moment when there is one, the one product grid, the categories, how
 * it works, the FAQ.
 * Every block is its own component in `@/components/home`.
 */
export default function HomePage() {
  return (
    <>
      <DemoBanner />
      <HeroSection />
      <SeasonalBanner />
      <HomeDeals />
      <HomeCategories />
      <HowItWorks />
      <FaqSection limit={5} />
    </>
  );
}
