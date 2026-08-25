import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { FaqAccordion } from "@/components/common/faq-accordion";
import { SectionTitle } from "@/components/common/section-title";
import { faqItems } from "@/config/faq";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "FAQ",
  description: `Questions fréquentes sur ${siteConfig.name}, la comparaison de prix et les liens affiliés.`,
};

export default function FaqPage() {
  return (
    <Container className="max-w-3xl space-y-10 py-16">
      <SectionTitle
        title="Questions fréquentes"
        description="Tout ce qu'il faut savoir avant de commencer."
      />
      <FaqAccordion items={faqItems} />
    </Container>
  );
}
