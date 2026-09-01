import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import { LocaleLink } from "@/components/common/locale-link";
import { SourceLogo } from "@/components/common/source-logo";
import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";
import { getAllSources } from "@/lib/sources";
import { slugify } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: localeAlternates(locale, "/legal/affiliate-disclosure"),
    title: "Affiliation",
    description:
      "Transparence sur l'affiliation : comment Findlydeal est rémunéré par les marketplaces, et pourquoi la commission n'influence jamais le classement des offres.",
  };
}

const SECTIONS = [
  { title: "Comment nous gagnons de l'argent" },
  { title: "Ce que cela change pour vous" },
  { title: "Indépendance du classement" },
  { title: "Programmes partenaires" },
  { title: "Fiabilité des prix affichés" },
  { title: "Statut actuel du service" },
];

/**
 * Required by most affiliate programmes and by consumer transparency rules.
 * The partner list is generated from the source registry so it cannot drift.
 *
 * GENERIC TEMPLATE, NOT LEGAL ADVICE: have this reviewed before real
 * commercial operation, and align the wording with each programme's own
 * disclosure requirements once approved.
 *
 * ## Wording still owed once a programme is approved
 *
 * Affiliate networks impose their own disclosure sentence, and eBay Partner
 * Network in particular requires a specific one to be displayed. The reminder
 * that used to sit inside "Programmes partenaires" was removed at the
 * operator's request; the obligation was not. Add each network's exact wording
 * to that section the day its application is accepted, or the account can be
 * suspended for it.
 */
export default function AffiliateDisclosurePage() {
  const sources = getAllSources();

  return (
    <LegalPage
      title="Transparence sur l'affiliation"
      intro="Comment Findlydeal est financé, ce que cela change pour vous, et pourquoi une commission ne fait jamais remonter une offre dans le classement."
      lastUpdated="2026-08-23"
      sections={SECTIONS}
    >
      <h2 id={slugify("Comment nous gagnons de l'argent")}>
        Comment nous gagnons de l&apos;argent
      </h2>
      <p>
        {siteConfig.name} est gratuit et sans publicité. Certains liens vers les marketplaces sont
        des liens affiliés : si vous achetez après avoir suivi l&apos;un d&apos;eux, la marketplace
        nous verse une commission, généralement un pourcentage du montant de la commande.
      </p>
      <p>
        Cette commission est payée par le marchand sur sa propre marge. Elle rémunère l&apos;apport
        d&apos;un client, exactement comme une dépense publicitaire de son côté.
      </p>

      <h2 id={slugify("Ce que cela change pour vous")}>Ce que cela change pour vous</h2>
      <p>
        <strong>Rien sur le prix.</strong> Vous payez exactement le même montant que si vous étiez
        arrivé sur la fiche produit par un autre chemin. Un lien affilié ne majore pas le prix et ne
        vous prive d&apos;aucune promotion.
      </p>
      <p>
        Vous n&apos;avez aucune obligation d&apos;utiliser nos liens. Vous pouvez toujours vous
        rendre directement sur le site du marchand.
      </p>

      <h2 id={slugify("Indépendance du classement")}>Indépendance du classement</h2>
      <p>
        C&apos;est le point sur lequel un comparateur se juge. Les offres sont triées selon le
        critère que vous choisissez : prix total, score de bonne affaire, ou pertinence.{" "}
        <strong>
          Le montant qu&apos;une source nous reverse n&apos;entre dans aucun de ces calculs.
        </strong>
      </p>
      <p>
        Concrètement : une offre non affiliée moins chère passera toujours devant une offre affiliée
        plus chère. Aucun emplacement n&apos;est vendu, aucune mise en avant n&apos;est payante.
      </p>
      <p>
        Les liens sortants portent l&apos;attribut <code>rel=&quot;sponsored&quot;</code>, comme le
        recommandent les moteurs de recherche pour les liens commerciaux.
      </p>

      <h2 id={slugify("Programmes partenaires")}>Programmes partenaires</h2>
      <p>Les marketplaces actuellement intégrées ou en cours d&apos;intégration :</p>
      <ul>
        {sources.map((source) => (
          <li key={source.id}>
            <SourceLogo source={source.id} />
          </li>
        ))}
      </ul>
      <p>
        Les programmes d&apos;affiliation visés sont eBay Partner Network, Awin et CJ Affiliate.
        Cette liste sera mise à jour au fur et à mesure des validations.
      </p>

      <h2 id={slugify("Fiabilité des prix affichés")}>Fiabilité des prix affichés</h2>
      <p>
        Les prix proviennent de sources tierces et peuvent évoluer à tout moment, y compris entre le
        moment où vous consultez une page et celui où vous arrivez chez le marchand. Seul le prix
        affiché sur le site du marchand au moment du paiement fait foi.
      </p>
      <p>
        Nous comparons le prix livraison comprise lorsque l&apos;information est disponible. Des
        frais supplémentaires peuvent s&apos;ajouter selon la destination, le mode de livraison ou
        le pays d&apos;expédition.
      </p>

      <h2 id={slugify("Statut actuel du service")}>Statut actuel du service</h2>
      <p>
        {siteConfig.name} est en préparation. Tant que les partenariats marchands ne sont pas
        activés, les produits, prix, notes et avis présentés sont des{" "}
        <strong>exemples de démonstration</strong> et non des offres relevées en temps réel. Un
        bandeau le signale sur chaque page affichant des produits, et chaque fiche porte la mention
        « Exemple ».
      </p>
      <p>
        Ces données seront intégralement remplacées par des relevés en direct dès l&apos;ouverture
        des accès aux API des marchands. Voir aussi notre{" "}
        <LocaleLink href="/about">page à propos</LocaleLink> et notre{" "}
        <LocaleLink href="/legal/cookies">politique de cookies</LocaleLink>, qui détaille les
        cookies déposés par les marchands lors d&apos;une redirection.
      </p>
    </LegalPage>
  );
}
