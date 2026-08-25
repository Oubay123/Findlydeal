import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/legal/privacy" },
  title: "Confidentialité",
  description: `Comment ${siteConfig.name} collecte et utilise les données.`,
};

/**
 * PLACEHOLDER — à faire relire par un juriste avant mise en ligne.
 * Les programmes d'affiliation et le RGPD imposent une politique exacte ici.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité" lastUpdated="2026-08-19">
      <h2>Les données que nous collectons</h2>
      <p>
        {siteConfig.name} fonctionne sans compte. Nous collectons les termes de recherche que vous
        saisissez, afin d&apos;exécuter la recherche et d&apos;améliorer les résultats, ainsi que
        des données de mesure d&apos;audience anonymes.
      </p>

      <h2>Cookies</h2>
      <p>
        Les liens affiliés peuvent déposer un cookie sur la marketplace de destination afin que la
        vente nous soit attribuée. Ce cookie est déposé par la marketplace, sous sa propre
        politique.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données à{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>

      <p>
        <strong>TODO :</strong> remplacer ce texte par la politique validée (hébergeur, outil de
        mesure d&apos;audience, durées de conservation, base légale).
      </p>
    </LegalPage>
  );
}
