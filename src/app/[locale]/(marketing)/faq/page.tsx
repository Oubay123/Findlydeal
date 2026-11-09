import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { JsonLd } from "@/components/common/json-ld";
import { FaqAccordion } from "@/components/common/faq-accordion";
import { SectionTitle } from "@/components/common/section-title";
import { getFaqItems } from "@/config/faq";
import { buildGraph, faqEntities, pageUrl, webPageNode } from "@/lib/seo/json-ld";

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

/** The marketplace answer names the sources connected at runtime. */
export const dynamic = "force-dynamic";

export default async function FaqPage({ params }: { params: Promise<{ locale: UiLocale }> }) {
  const { locale } = await params;
  const faqItems = getFaqItems();
  const url = pageUrl(locale, "/faq");

  return (
    <Container className="max-w-3xl space-y-10 py-16">
      <JsonLd
        data={buildGraph(
          webPageNode({
            url,
            name: "Questions fréquentes sur le comparateur",
            type: "FAQPage",
            mainEntity: faqEntities(faqItems),
            hasBreadcrumb: true,
          }),
        )}
      />
      <Breadcrumbs path="/faq" items={[{ name: "FAQ" }]} />

      <SectionTitle
        as="h1"
        title="Questions fréquentes sur le comparateur"
        description="Tout ce qu'il faut savoir avant de commencer."
      />
      <FaqAccordion items={faqItems} headingLevel={2} />
    </Container>
  );
}
