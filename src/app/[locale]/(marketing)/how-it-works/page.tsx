import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { SourceLogo } from "@/components/common/source-logo";
import type { Metadata } from "next";
import { LocaleLink } from "@/components/common/locale-link";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { HOW_IT_WORKS_STEPS } from "@/components/home/how-it-works";
import { Button } from "@/components/ui/button";
import { getAllSources } from "@/lib/sources";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: localeAlternates(locale, "/how-it-works"),
    title: "Comment ça marche",
    description:
      "Comment marche Findlydeal : une seule recherche interroge plusieurs marketplaces, normalise leurs offres dans un format comparable et note les vraies bonnes affaires.",
  };
}

export default function HowItWorksPage() {
  const sources = getAllSources();

  return (
    <Container className="max-w-3xl space-y-12 py-16">
      <Breadcrumbs items={[{ name: "Comment ça marche" }]} />

      <SectionTitle
        as="h1"
        title="Comment fonctionne le comparateur Findlydeal"
        description="Un comparateur, pas une boutique : nous ne vendons rien, nous comparons."
      />

      <ol className="space-y-8">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-100 font-display text-sm font-bold text-primary">
              {index + 1}
            </span>
            <div className="space-y-1.5">
              <h2 className="text-base font-semibold">{step.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="space-y-3 rounded-2xl bg-cream p-8">
        <h2 className="text-xl font-semibold">Les plateformes comparées</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {sources.map((source) => (
            <li key={source.id}>
              <SourceLogo source={source.id} size="md" />
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          D&apos;autres marketplaces s&apos;ajoutent au fur et à mesure que leurs programmes
          d&apos;affiliation sont validés.
        </p>
      </section>

      <Button asChild size="md">
        <LocaleLink href="/search">Essayer une recherche</LocaleLink>
      </Button>
    </Container>
  );
}
