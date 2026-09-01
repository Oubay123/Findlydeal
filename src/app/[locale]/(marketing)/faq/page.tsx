import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { FaqAccordion } from "@/components/common/faq-accordion";
import { SectionTitle } from "@/components/common/section-title";
import { faqItems } from "@/config/faq";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: localeAlternates(locale, "/faq"),
    title: "FAQ",
    description:
      "Questions fréquentes sur Findlydeal : gratuité du comparateur, méthode de détection des bonnes affaires, liens affiliés et plateformes comparées.",
  };
}

export default function FaqPage() {
  return (
    <Container className="max-w-3xl space-y-10 py-16">
      <Breadcrumbs items={[{ name: "FAQ" }]} />

      <SectionTitle
        as="h1"
        title="Questions fréquentes sur le comparateur"
        description="Tout ce qu'il faut savoir avant de commencer."
      />
      <FaqAccordion items={faqItems} headingLevel={2} />
    </Container>
  );
}
