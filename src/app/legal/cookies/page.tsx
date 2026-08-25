import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/legal/cookies" },
  title: "Cookies",
  description: `Les cookies utilisés par ${siteConfig.name}.`,
};

/** PLACEHOLDER — à compléter avec l'outil de mesure d'audience retenu. */
export default function CookiesPage() {
  return (
    <LegalPage title="Politique de cookies" lastUpdated="2026-08-19">
      <h2>Cookies strictement nécessaires</h2>
      <p>
        {siteConfig.name} fonctionne sans compte et sans cookie publicitaire propre. Seuls des
        cookies techniques nécessaires à l&apos;affichage du site peuvent être déposés.
      </p>

      <h2>Cookies d&apos;affiliation</h2>
      <p>
        Lorsque vous suivez un lien vers une marketplace partenaire, celle-ci peut déposer un cookie
        de suivi afin d&apos;attribuer la vente. Ce cookie relève de la politique de la marketplace
        concernée, pas de la nôtre.
      </p>

      <p>
        <strong>TODO :</strong> compléter avec la liste nominative des cookies, leur durée de vie et
        le mécanisme de consentement une fois l&apos;outil de mesure d&apos;audience choisi.
      </p>
    </LegalPage>
  );
}
