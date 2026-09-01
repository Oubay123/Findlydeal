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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { absolute: "Findlydeal, comparateur de prix multi-plateformes" },
    description:
      "Comparez en une recherche les prix de plusieurs marketplaces : neuf, reconditionné et occasion, avec les vraies bonnes affaires signalées et les remises vérifiées.",
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
      <ProductShelves />
      <FeatureHighlights />
      <FaqSection limit={5} />
      <FinalCta />
    </>
  );
}
