import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/legal/terms" },
  title: "Conditions d'utilisation",
  description: `Conditions d'utilisation de ${siteConfig.name}.`,
};

/** PLACEHOLDER — à faire relire par un juriste avant mise en ligne. */
export default function TermsPage() {
  return (
    <LegalPage title="Conditions d'utilisation" lastUpdated="2026-08-19">
      <h2>Nature du service</h2>
      <p>
        {siteConfig.name} est un comparateur de prix. Nous ne vendons rien : l&apos;achat, le
        paiement, la livraison, la garantie et les retours sont intégralement assurés par la
        marketplace vers laquelle vous êtes redirigé, sous ses propres conditions.
      </p>

      <h2>Exactitude des informations</h2>
      <p>
        Les prix et la disponibilité proviennent de sources tierces et peuvent changer à tout
        moment. Seul le prix affiché sur la marketplace au moment de l&apos;achat fait foi.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Notre responsabilité ne saurait être engagée au titre d&apos;une transaction conclue sur une
        marketplace tierce, ni d&apos;un prix obsolète ou d&apos;une annonce retirée.
      </p>

      <p>
        <strong>TODO :</strong> remplacer ce texte par les conditions validées (éditeur, droit
        applicable, règlement des litiges).
      </p>
    </LegalPage>
  );
}
