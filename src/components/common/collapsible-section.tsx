import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  /** Rendered next to the title, inside the trigger (counts, ratings…). */
  meta?: ReactNode;
  /** Open on first render. Off by default — the section is a disclosure. */
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * A page section the visitor unfolds on demand.
 *
 * Used by the product page for the spec sheet and the reviews, so a long page
 * stays scannable. Built on the same Accordion primitive as the FAQ, with
 * `defaultValue` rather than local state so it stays a server component.
 */
export function CollapsibleSection({
  title,
  meta,
  defaultOpen = false,
  className,
  children,
}: CollapsibleSectionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? "section" : undefined}
      className={cn("rounded-2xl border bg-white", className)}
    >
      <AccordionItem value="section" className="border-b-0 px-5 sm:px-6">
        <AccordionTrigger className="py-5 hover:no-underline">
          <span className="flex flex-1 flex-wrap items-center justify-between gap-3 pr-3">
            <span className="font-display text-xl font-semibold">{title}</span>
            {meta}
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-6">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
