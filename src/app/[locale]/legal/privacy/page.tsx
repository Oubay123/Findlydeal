import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import { LocaleLink } from "@/components/common/locale-link";
import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";
import { slugify } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: localeAlternates(locale, "/legal/privacy"),
    title: "Confidentialité",
    description:
      "Politique de confidentialité de Findlydeal : données collectées, finalités, durées de conservation, cookies d'affiliation et exercice de vos droits RGPD.",
  };
}

const SECTIONS = [
  { title: "Responsable du traitement" },
  { title: "Données que nous collectons" },
  { title: "Finalités et bases légales" },
  { title: "Destinataires et transferts" },
  { title: "Durées de conservation" },
  { title: "Vos droits" },
  { title: "Réclamation auprès d'une autorité" },
  { title: "Sécurité" },
  { title: "Modification de cette politique" },
];

/**
 * GENERIC TEMPLATE, NOT LEGAL ADVICE.
 *
 * Written against both the Swiss FADP (nLPD, in force since September 2023)
 * and the EU GDPR, since the site is operated from Switzerland and addresses
 * French visitors. The two overlap heavily but differ on details such as the
 * supervisory authority and the legal bases available.
 *
 * IMPORTANT: this document must be revised the moment any analytics tool or
 * third-party script is added. It currently describes a site that loads none.
 * Have it reviewed by a legal professional before real commercial operation.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Quelles données le site traite, pourquoi, combien de temps, et comment exercer vos droits. Findlydeal fonctionne sans compte et collecte le strict minimum."
      lastUpdated="2026-08-23"
      sections={SECTIONS}
    >
      <h2 id={slugify("Responsable du traitement")}>Responsable du traitement</h2>
      <p>
        Le responsable du traitement est l&apos;éditeur du site, présenté sur la page{" "}
        <LocaleLink href="/legal/legal-notice">mentions légales</LocaleLink>.
      </p>
      <p>
        Contact pour toute question relative aux données personnelles :{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>

      <h2 id={slugify("Données que nous collectons")}>Données que nous collectons</h2>
      <p>
        {siteConfig.name} fonctionne <strong>sans compte utilisateur</strong>. Nous ne demandons ni
        nom, ni adresse, ni moyen de paiement.
      </p>
      <h3>Données de navigation</h3>
      <p>
        Comme tout site web, le serveur enregistre techniquement les requêtes reçues : adresse IP,
        date et heure, page demandée, type de navigateur. Ces journaux servent à assurer le
        fonctionnement et la sécurité du service.
      </p>
      <h3>Termes de recherche</h3>
      <p>
        Les mots que vous saisissez dans le comparateur figurent dans l&apos;adresse de la page de
        résultats. Ils sont traités pour exécuter la recherche et peuvent être analysés de manière
        agrégée pour améliorer la pertinence.
      </p>
      <h3>Préférences locales</h3>
      <p>
        Certains choix d&apos;interface, comme les produits que vous sélectionnez pour une
        comparaison, sont enregistrés dans le stockage de session de votre navigateur. Ces données
        ne quittent jamais votre appareil et disparaissent à la fermeture de l&apos;onglet.
      </p>
      <h3>Ce que nous ne collectons pas</h3>
      <p>
        À ce jour, le site n&apos;intègre{" "}
        <strong>
          aucun outil de mesure d&apos;audience, aucun pixel publicitaire et aucun script tiers
        </strong>
        . Aucun profilage n&apos;est réalisé et aucune décision automatisée n&apos;est prise à votre
        égard.
      </p>

      <h2 id={slugify("Finalités et bases légales")}>Finalités et bases légales</h2>
      <ul>
        <li>
          <strong>Fournir le service</strong> (exécuter une recherche, afficher des offres) :
          intérêt légitime à faire fonctionner le site que vous avez choisi de consulter.
        </li>
        <li>
          <strong>Sécurité et prévention des abus</strong> (journaux techniques, limitation du
          moissonnage) : intérêt légitime à protéger le service.
        </li>
        <li>
          <strong>Amélioration du service</strong> (analyse agrégée des recherches) : intérêt
          légitime, sur des données qui ne permettent pas de vous identifier.
        </li>
        <li>
          <strong>Suivi d&apos;affiliation</strong> : réalisé par le marchand sur son propre site,
          sur la base qu&apos;il détermine et sous sa propre politique.
        </li>
      </ul>
      <p>
        Si un outil de mesure d&apos;audience non essentiel est ajouté un jour, il sera soumis à
        votre consentement préalable, recueilli par une bannière dédiée.
      </p>

      <h2 id={slugify("Destinataires et transferts")}>Destinataires et transferts</h2>
      <p>
        Nous ne vendons ni ne louons aucune donnée. Les seuls tiers en contact avec vos données sont
        :
      </p>
      <ul>
        <li>
          <strong>l&apos;hébergeur</strong>, qui traite les journaux techniques pour notre compte
          (voir les <LocaleLink href="/legal/legal-notice">mentions légales</LocaleLink>) ;
        </li>
        <li>
          <strong>les marketplaces</strong> vers lesquelles vous choisissez d&apos;être redirigé.
          Dès que vous quittez notre site, c&apos;est leur politique de confidentialité qui
          s&apos;applique.
        </li>
      </ul>
      <p>
        Notre hébergeur opère un réseau mondial : des données techniques peuvent transiter par des
        serveurs situés hors de Suisse et de l&apos;Union européenne, encadrées par les garanties
        contractuelles appropriées, notamment les clauses contractuelles types.
      </p>

      <h2 id={slugify("Durées de conservation")}>Durées de conservation</h2>
      <ul>
        <li>Journaux techniques du serveur : quelques semaines au maximum.</li>
        <li>Statistiques agrégées de recherche : sans limite, car non identifiantes.</li>
        <li>
          Préférences stockées dans votre navigateur : jusqu&apos;à la fermeture de la session.
        </li>
      </ul>

      <h2 id={slugify("Vos droits")}>Vos droits</h2>
      <p>
        Selon le règlement européen et la loi suisse sur la protection des données, vous disposez
        d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation,
        d&apos;opposition et de portabilité.
      </p>
      <p>
        Pour les exercer, écrivez à{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Nous répondons
        dans un délai d&apos;un mois. Une précision utile : comme le site n&apos;utilise pas de
        compte, il nous est souvent impossible de relier une donnée de navigation à une personne. Si
        nous ne pouvons pas vous identifier, nous vous le dirons plutôt que de collecter davantage
        d&apos;informations pour y parvenir.
      </p>

      <h2 id={slugify("Réclamation auprès d'une autorité")}>
        Réclamation auprès d&apos;une autorité
      </h2>
      <p>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir le Préposé fédéral
        à la protection des données et à la transparence (PFPDT) en Suisse, ou, si vous résidez dans
        l&apos;Union européenne, l&apos;autorité de contrôle de votre pays, par exemple la CNIL en
        France.
      </p>

      <h2 id={slugify("Sécurité")}>Sécurité</h2>
      <p>
        Le site est servi exclusivement en HTTPS. Nous appliquons des mesures techniques et
        organisationnelles raisonnables pour protéger les données traitées, sans pouvoir garantir
        une sécurité absolue, qu&apos;aucun service en ligne ne peut promettre.
      </p>

      <h2 id={slugify("Modification de cette politique")}>Modification de cette politique</h2>
      <p>
        Cette politique évoluera avec le service, en particulier lors de l&apos;ajout d&apos;un
        outil de mesure d&apos;audience ou de l&apos;activation des programmes d&apos;affiliation.
        La date de mise à jour figure en tête de page. Voir aussi notre{" "}
        <LocaleLink href="/legal/cookies">politique de cookies</LocaleLink>.
      </p>
    </LegalPage>
  );
}
