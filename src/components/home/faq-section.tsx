import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { FaqAccordion } from "@/components/common/faq-accordion";
import { faqItems } from "@/config/faq";

interface FaqSectionProps {
  /** Landing page shows a subset; the `/faq` page shows everything. */
  limit?: number;
}

export function FaqSection({ limit }: FaqSectionProps) {
  return (
    <section className="py-20">
      <Container className="space-y-10">
        <SectionTitle
          centered
          title="Questions fréquentes"
          description="Tout ce qu'il faut savoir avant de commencer."
        />
        <FaqAccordion
          items={limit ? faqItems.slice(0, limit) : faqItems}
          className="mx-auto max-w-3xl"
        />
      </Container>
    </section>
  );
}
