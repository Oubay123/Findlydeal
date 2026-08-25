import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/legal/legal-notice" },
  title: "Mentions légales",
  description: `Mentions légales de ${siteConfig.name}.`,
};

/** PLACEHOLDER — obligatoire en France, à compléter avant mise en ligne. */
export default function LegalNoticePage() {
  return (
    <LegalPage title="Mentions légales" lastUpdated="2026-08-19">
      <h2>Éditeur du site</h2>
      <p>
        {siteConfig.name}, contact :{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
      </p>

      <h2>Hébergement</h2>
      <p>À compléter une fois l&apos;hébergeur de production retenu.</p>

      <p>
        <strong>TODO :</strong> renseigner la raison sociale, la forme juridique, l&apos;adresse du
        siège, le numéro d&apos;immatriculation, le directeur de la publication et les coordonnées
        complètes de l&apos;hébergeur.
      </p>
    </LegalPage>
  );
}
