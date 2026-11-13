import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { LocaleLink } from "@/components/common/locale-link";
import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { siteConfig } from "@/config/site";
import { isDemoCatalogueActive } from "@/lib/mock";
import { describeLiveSources } from "@/lib/sources/describe";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: localeAlternates(locale, "/about"),
    title: "À propos",
    description:
      "À propos de Findlydeal : un comparateur de prix indépendant qui relève les offres eBay livrables en France, les ramène au prix livré et signale les vraies remises.",
  };
}

/** What the page says about the sources depends on the runtime keys. */
export const dynamic = "force-dynamic";

export default function AboutPage() {
  const isDemo = isDemoCatalogueActive();
  return (
    <Container className="max-w-3xl space-y-8 py-16">
      <Breadcrumbs items={[{ name: "À propos" }]} />

      <SectionTitle
        as="h1"
        title={`À propos de ${siteConfig.name}`}
        description={siteConfig.tagline}
      />

      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          {siteConfig.name} est né d&apos;une frustration simple : acheter le moindre produit un peu
          technique impose d&apos;ouvrir une dizaine d&apos;onglets, de comparer des prix qui
          n&apos;incluent pas la livraison, et de ne jamais savoir si la remise affichée est réelle.
        </p>
        <p>
          Nous relevons les offres des marketplaces interrogées, nous les ramenons à un format
          comparable (prix total, état, vendeur), et nous évaluons chacune d&apos;elles par rapport
          aux offres du même produit dans le même état, pour qu&apos;un badge « bonne affaire »
          veuille enfin dire quelque chose.
        </p>
        <p>
          {siteConfig.name} est gratuit et le restera. Le site est en développement et ne perçoit
          aujourd&apos;hui aucune commission ; des candidatures aux programmes d&apos;affiliation
          des marketplaces sont en cours. Si l&apos;une aboutit, elle sera annoncée sur la page{" "}
          <LocaleLink
            href="/legal/affiliate-disclosure"
            className="text-primary underline underline-offset-4"
          >
            Affiliation
          </LocaleLink>
          , et cela ne changera ni les prix affichés ni l&apos;ordre des offres.
        </p>
        {isDemo ? (
          <p>
            <strong className="text-foreground">Le service est en préparation.</strong> Nos
            partenariats marchands sont en cours de validation : les produits, prix et avis
            actuellement visibles sur le site sont des exemples de démonstration, destinés à
            illustrer le fonctionnement du comparateur. Ils seront remplacés par des relevés en
            temps réel dès l&apos;activation des sources.
          </p>
        ) : (
          <p>
            Aujourd&apos;hui, les offres viennent de{" "}
            <strong className="text-foreground">{describeLiveSources()}</strong>, livrables en
            France. D&apos;autres marketplaces seront ajoutées quand leurs conditions d&apos;accès
            le permettront ; chacune sera indiquée sur la page Méthodologie.
          </p>
        )}
        <p>
          Une question, une remarque :{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-primary underline underline-offset-4"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
      </div>
    </Container>
  );
}
