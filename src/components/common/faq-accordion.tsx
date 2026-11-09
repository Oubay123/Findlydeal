import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/config/faq";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  items: FaqItem[];
  /**
   * `2` when the questions are the page's content (`/faq`), `3` when they sit
   * under a section title (the landing block). Keeps the outline valid in
   * both places.
   */
  headingLevel?: 2 | 3;
  className?: string;
}

/**
 * Card-style accordion, shared by the landing section and the `/faq` page.
 *
 * `forceMount` keeps every answer in the served HTML, folded with CSS until the
 * question is opened. Without it, Radix only inserts an answer when opened, so
 * crawlers and answer engines reading the page saw the questions and none of
 * the answers — and the FAQPage markup described text the page did not hold.
 */
export function FaqAccordion({ items, headingLevel = 3, className }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible className={cn("space-y-3", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.question}
          value={item.question}
          className="rounded-xl border bg-white px-5 last:border-b"
        >
          <AccordionTrigger
            headingLevel={headingLevel}
            className="py-4 text-left text-[15px] font-semibold hover:no-underline"
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent
            forceMount
            className="pb-4 text-sm leading-relaxed text-muted-foreground"
          >
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
