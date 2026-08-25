import type { ReactNode } from "react";
import { Container } from "@/components/common/container";

interface LegalPageProps {
  title: string;
  /** ISO date, rendered as the "last updated" line legal pages need. */
  lastUpdated: string;
  children: ReactNode;
}

/**
 * Shared shell for every page under `/legal`.
 * One layout, so the three legal pages can never drift apart visually.
 */
export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <Container className="max-w-3xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
      </p>

      <div className="mt-8 space-y-4 text-sm leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-medium [&_p]:text-muted-foreground [&_ul]:list-inside [&_ul]:list-disc [&_ul]:text-muted-foreground">
        {children}
      </div>
    </Container>
  );
}
