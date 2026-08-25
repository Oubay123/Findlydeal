import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "À propos",
  description: `Ce qu'est ${siteConfig.name}, qui est derrière et comment le service gagne de l'argent.`,
};

export default function AboutPage() {
  return (
    <Container className="max-w-3xl space-y-8 py-16">
      <SectionTitle title={`À propos de ${siteConfig.name}`} description={siteConfig.tagline} />

      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          {siteConfig.name} est né d&apos;une frustration simple : acheter le moindre produit un peu
          technique impose d&apos;ouvrir une dizaine d&apos;onglets, de comparer des prix qui
          n&apos;incluent pas la livraison, et de ne jamais savoir si la remise affichée est réelle.
        </p>
        <p>
          Nous agrégeons plusieurs marketplaces en même temps, nous normalisons leurs offres dans un
          format comparable, et nous évaluons chacune d&apos;elles par rapport au prix constaté,
          pour qu&apos;un badge « bonne affaire » veuille enfin dire quelque chose.
        </p>
        <p>
          {siteConfig.name} est gratuit et le restera. Nous sommes rémunérés par les marketplaces
          via des commissions d&apos;affiliation, ce qui n&apos;influence jamais le classement des
          offres.
        </p>
        <p>
          <strong className="text-foreground">Le service est en préparation.</strong> Nos
          partenariats marchands sont en cours de validation : les produits, prix et avis
          actuellement visibles sur le site sont des exemples de démonstration, destinés à illustrer
          le fonctionnement du comparateur. Ils seront remplacés par des relevés en temps réel dès
          l&apos;activation des sources.
        </p>
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
