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
  className?: string;
}

/** Card-style accordion, shared by the landing section and the `/faq` page. */
export function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible className={cn("space-y-3", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.question}
          value={item.question}
          className="rounded-xl border bg-white px-5 last:border-b"
        >
          <AccordionTrigger className="py-4 text-left text-[15px] font-semibold hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
