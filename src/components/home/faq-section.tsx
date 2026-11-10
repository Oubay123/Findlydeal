import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { FaqAccordion } from "@/components/common/faq-accordion";
import { getFaqItems } from "@/config/faq";

interface FaqSectionProps {
  /** Landing page shows a subset; the `/faq` page shows everything. */
  limit?: number;
}

export function FaqSection({ limit }: FaqSectionProps) {
  const faqItems = getFaqItems();
  return (
    <section className="py-16">
      <Container className="space-y-6">
        <SectionTitle title="Questions fréquentes" />
        <FaqAccordion items={limit ? faqItems.slice(0, limit) : faqItems} className="max-w-3xl" />
      </Container>
    </section>
  );
}
