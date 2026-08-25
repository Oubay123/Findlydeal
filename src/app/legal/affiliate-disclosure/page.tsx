import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";
import { getAllSources } from "@/lib/sources";

export const metadata: Metadata = {
  alternates: { canonical: "/legal/affiliate-disclosure" },
  title: "Affiliation",
  description: `Comment ${siteConfig.name} gagne de l'argent et ce que cela change pour vous.`,
};

/**
 * Exigé par la plupart des programmes d'affiliation et par les règles
 * consommateurs. La liste des sources est générée pour rester à jour.
 */
export default function AffiliateDisclosurePage() {
  const sources = getAllSources();

  return (
    <LegalPage title="Transparence sur l'affiliation" lastUpdated="2026-08-19">
      <h2>Comment nous gagnons de l&apos;argent</h2>
      <p>
        {siteConfig.name} est gratuit pour vous. Certains liens vers les marketplaces sont des liens
        affiliés : si vous achetez après avoir suivi l&apos;un d&apos;eux, nous percevons une
        commission de la part de la marketplace. Le prix que vous payez est strictement identique.
      </p>

      <h2>Les programmes auxquels nous participons</h2>
      <ul>
        {sources.map((source) => (
          <li key={source.id}>{source.label}</li>
        ))}
      </ul>

      <h2>Statut actuel du service</h2>
      <p>
        Findlydeal est en préparation. Tant que nos partenariats marchands ne sont pas activés, les
        produits, prix, notes et avis présentés sur le site sont des{" "}
        <strong>exemples de démonstration</strong> et non des offres relevées en temps réel. Un
        bandeau le signale sur chaque page affichant des produits, et chaque fiche porte la mention
        « Exemple ». Ces données seront intégralement remplacées par des relevés en direct dès
        l&apos;ouverture des accès API.
      </p>

      <h2>Ce que cela ne change pas</h2>
      <p>
        La commission n&apos;influence jamais le classement des offres. Les résultats sont triés par
        prix total ou par score de bonne affaire, et le montant qu&apos;une source nous reverse
        n&apos;entre dans aucun des deux. Les liens affiliés sortants portent l&apos;attribut{" "}
        <code>rel=&quot;sponsored&quot;</code>.
      </p>

      <p>
        <strong>TODO :</strong> ajouter la formulation exacte exigée par chaque programme une fois
        les candidatures validées.
      </p>
    </LegalPage>
  );
}
