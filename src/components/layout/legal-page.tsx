import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { slugify } from "@/lib/utils";

export interface LegalSection {
  /** Heading text, reused verbatim as the `h2` inside the body. */
  title: string;
}

interface LegalPageProps {
  title: string;
  /** Trail shown above the title, minus the automatic "Accueil". */
  breadcrumb?: Crumb[];
  /** Short sentence under the title, explaining what the page covers. */
  intro?: string;
  /** ISO date, rendered as the "last updated" line legal pages need. */
  lastUpdated: string;
  /**
   * Section headings. When provided, a table of contents is rendered and each
   * entry links to the matching `h2`, which must carry `id={slugify(title)}`.
   */
  sections?: LegalSection[];
  children: ReactNode;
}

/**
 * Shared shell for every page under `/legal`.
 *
 * One layout, so the five legal pages can never drift apart visually, and one
 * place to change the reading width or the anchor behaviour.
 */
export function LegalPage({
  title,
  breadcrumb,
  intro,
  lastUpdated,
  sections,
  children,
}: LegalPageProps) {
  return (
    <Container className="max-w-3xl py-16">
      <Breadcrumbs items={breadcrumb ?? [{ name: title }]} className="mb-6" />

      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

      {intro ? (
        <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">{intro}</p>
      ) : null}

      <p className="mt-3 text-sm text-muted-foreground">
        Dernière mise à jour : <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
      </p>

      {sections && sections.length > 0 ? (
        <nav aria-labelledby="sommaire" className="mt-8 rounded-2xl bg-cream p-6">
          <h2 id="sommaire" className="font-display text-sm font-semibold">
            Sommaire
          </h2>
          <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
            {sections.map((section, index) => (
              <li key={section.title}>
                <a
                  href={`#${slugify(section.title)}`}
                  className="transition-colors hover:text-primary"
                >
                  <span className="mr-2 text-foreground/50 tabular-nums">{index + 1}.</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div className="mt-10 max-w-[68ch] space-y-4 text-sm leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_p]:text-muted-foreground [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:text-muted-foreground">
        {children}
      </div>
    </Container>
  );
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}
