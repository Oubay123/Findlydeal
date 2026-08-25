import { CategoryShowcase } from "@/components/home/category-showcase";
import { FaqSection } from "@/components/home/faq-section";
import { FeatureHighlights } from "@/components/home/feature-highlights";
import { FeaturedDeals } from "@/components/home/featured-deals";
import { FinalCta } from "@/components/home/final-cta";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { DemoBanner } from "@/components/common/demo-notice";
import { getFeaturedMockDeals } from "@/lib/mock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Landing page. Every block is its own component in `@/components/home` —
 * this file only decides the order of the sections.
 */
export default function HomePage() {
  // Demonstration catalogue until an affiliate source is approved.
  // Swap for a real "best deals" query then — see `src/lib/mock/`.
  const featuredDeals = getFeaturedMockDeals(8);

  return (
    <>
      <DemoBanner />
      <HeroSection />
      <CategoryShowcase />
      <HowItWorks />
      <FeaturedDeals products={featuredDeals} />
      <FeatureHighlights />
      <FaqSection limit={5} />
      <FinalCta />
    </>
  );
}
