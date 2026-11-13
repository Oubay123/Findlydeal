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
    title: "Politique de confidentialité",
    description:
      "Politique de confidentialité de Findlydeal : quelles données sont traitées (très peu), par qui, combien de temps, et vos droits selon le RGPD et la LPD suisse.",
  };
}

const SECTIONS = [
  { title: "Responsable du traitement" },
  { title: "Le principe : un site consultable sans données personnelles" },
  { title: "Données traitées et finalités" },
  { title: "Bases juridiques" },
  { title: "Destinataires et sous-traitants" },
  { title: "Transferts hors de Suisse et de l'UE" },
  { title: "Durées de conservation" },
  { title: "Vos droits" },
  { title: "Sécurité" },
  { title: "Mineurs" },
  { title: "Modifications de cette politique" },
];

/**
 * GENERIC TEMPLATE, NOT LEGAL ADVICE.
 *
 * Written for the site as it actually runs today: no account, no analytics,
 * no advertising, no non-essential cookie, browser storage only for the
 * comparison basket, personal data limited to technical logs and voluntary
 * e-mails. Aligned on both the EU GDPR and the Swiss nLPD (in force since
 * 1 September 2023), which is what a Swiss-operated site addressing French
 * visitors needs. Anything added later (analytics, accounts, alerts) must be
 * reflected here BEFORE it ships. The controller's identity comes from
 * `siteConfig.publisher` and stays blank until filled in.
 */
export default function PrivacyPage() {
  const { publisher } = siteConfig;
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Ce que le site fait, et surtout ne fait pas, avec vos données. Rédigée au regard du RGPD européen et de la loi suisse sur la protection des données (LPD)."
      lastUpdated="2026-11-13"
      sections={SECTIONS}
    >
      <h2 id={slugify("Responsable du traitement")}>1. Responsable du traitement</h2>
      {publisher.name ? (
        <p>
          Le responsable du traitement est {publisher.name}
          {publisher.legalForm ? `, ${publisher.legalForm}` : ""}
          {publisher.address ? `, ${publisher.address}` : ""}. Contact&nbsp;:{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      ) : (
        <p>
          L&apos;identification complète du responsable du traitement (identité, forme juridique,
          adresse) sera publiée sur cette page et dans les{" "}
          <LocaleLink href="/legal/legal-notice">mentions légales</LocaleLink> avant
          l&apos;exploitation commerciale du service. Dans l&apos;intervalle, le responsable du
          traitement répond à toute demande relative aux données personnelles à l&apos;adresse{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      )}
      <p>
        Aucun délégué à la protection des données (DPO) n&apos;est désigné à ce jour, le volume et
        la nature des traitements ne l&apos;exigeant pas&nbsp;; l&apos;adresse de contact ci-dessus
        tient lieu de point de contact unique.
      </p>

      <h2 id={slugify("Le principe : un site consultable sans données personnelles")}>
        2. Le principe&nbsp;: un site consultable sans données personnelles
      </h2>
      <p>Le site est conçu pour fonctionner avec le moins de données possible&nbsp;:</p>
      <ul>
        <li>aucun compte utilisateur, aucune inscription&nbsp;;</li>
        <li>aucun outil de mesure d&apos;audience ni traceur publicitaire à ce jour&nbsp;;</li>
        <li>
          aucun cookie non essentiel (détail dans la{" "}
          <LocaleLink href="/legal/cookies">politique de cookies</LocaleLink>)&nbsp;;
        </li>
        <li>
          aucune revente ni location de données, aucun profilage, aucune décision individuelle
          automatisée&nbsp;;
        </li>
        <li>
          les listes de produits que vous comparez restent dans le stockage de votre navigateur et
          ne sont jamais transmises à nos serveurs.
        </li>
      </ul>

      <h2 id={slugify("Données traitées et finalités")}>3. Données traitées et finalités</h2>
      <h3>a. Journaux techniques</h3>
      <p>
        Comme tout site, le serveur et l&apos;hébergeur (Cloudflare) enregistrent lors de chaque
        requête des données techniques&nbsp;: adresse IP, horodatage, page demandée, navigateur.
        Finalités&nbsp;: acheminer les pages, assurer la sécurité du service (détection d&apos;abus,
        protection contre les attaques) et diagnostiquer les pannes. Ces journaux ne servent à aucun
        profilage.
      </p>
      <h3>b. Correspondance</h3>
      <p>
        Si vous nous écrivez (signalement d&apos;un prix erroné, question), nous traitons votre
        adresse e-mail et le contenu de votre message, aux seules fins de traiter votre demande et
        d&apos;en garder la trace.
      </p>
      <h3>c. Stockage local du navigateur</h3>
      <p>
        Le panier de comparaison (références des produits sélectionnés) est conservé dans le
        stockage de session de votre navigateur et disparaît à la fermeture de l&apos;onglet. Un
        éventuel choix de consentement serait conservé dans le stockage local. Ces informations ne
        quittent pas votre navigateur.
      </p>
      <h3>d. Ce que nous ne collectons pas</h3>
      <p>
        Ni nom, ni adresse postale, ni données de paiement, ni historique d&apos;achat&nbsp;: vos
        achats se font sur les sites des marchands, qui en sont seuls responsables. Dès que vous
        cliquez vers une annonce, le site du marchand (par exemple eBay) traite vos données selon sa
        propre politique de confidentialité.
      </p>

      <h2 id={slugify("Bases juridiques")}>4. Bases juridiques</h2>
      <ul>
        <li>
          Journaux techniques et sécurité&nbsp;: intérêt légitime à fournir et protéger le service
          (article 6, par.&nbsp;1, let.&nbsp;f du RGPD&nbsp;; article 31, al.&nbsp;1 LPD).
        </li>
        <li>
          Correspondance&nbsp;: mesures prises à votre demande et intérêt légitime à y répondre
          (article 6, par.&nbsp;1, let.&nbsp;b et f du RGPD).
        </li>
        <li>
          Si un traitement fondé sur le consentement est introduit un jour (mesure d&apos;audience
          non exemptée, alertes de prix), il ne sera activé qu&apos;après recueil de ce
          consentement, librement révocable.
        </li>
      </ul>

      <h2 id={slugify("Destinataires et sous-traitants")}>5. Destinataires et sous-traitants</h2>
      <ul>
        <li>
          <strong>Cloudflare, Inc.</strong> (États-Unis, avec infrastructure européenne)&nbsp;:
          hébergement et diffusion du site, journaux techniques.
        </li>
        <li>
          <strong>Supabase</strong>&nbsp;: base de données du catalogue (produits, offres, relevés
          de prix). Elle ne contient aucune donnée personnelle de visiteur.
        </li>
        <li>
          <strong>eBay</strong>&nbsp;: les offres sont relevées de serveur à serveur&nbsp;; votre
          navigation sur {siteConfig.name} n&apos;est pas transmise à eBay. eBay ne traite vos
          données qu&apos;à partir du moment où vous ouvrez une annonce sur son site.
        </li>
        <li>
          Le prestataire de messagerie de l&apos;éditeur, pour la correspondance reçue à{" "}
          {siteConfig.contactEmail}.
        </li>
      </ul>
      <p>Aucune donnée n&apos;est vendue, louée ni transmise à des fins publicitaires.</p>

      <h2 id={slugify("Transferts hors de Suisse et de l'UE")}>
        6. Transferts hors de Suisse et de l&apos;UE
      </h2>
      <p>
        L&apos;hébergement par Cloudflare peut impliquer un traitement aux États-Unis. Ce transfert
        repose sur les mécanismes reconnus par le RGPD et la LPD&nbsp;: cadre de protection des
        données UE-États-Unis et Suisse-États-Unis pour les entreprises certifiées, et clauses
        contractuelles types complétées au besoin. Vous pouvez demander une copie des garanties
        applicables à l&apos;adresse de contact.
      </p>

      <h2 id={slugify("Durées de conservation")}>7. Durées de conservation</h2>
      <ul>
        <li>
          Journaux techniques&nbsp;: durée brève fixée par l&apos;hébergeur et par nos besoins de
          sécurité, de l&apos;ordre de quelques jours à quelques semaines.
        </li>
        <li>
          Correspondance&nbsp;: le temps de traiter la demande, puis au plus douze mois pour en
          garder la trace, sauf obligation légale plus longue ou litige en cours.
        </li>
        <li>
          Stockage du navigateur&nbsp;: contrôlé par vous&nbsp;; le panier de comparaison expire
          avec l&apos;onglet, et tout se supprime depuis les réglages du navigateur.
        </li>
      </ul>

      <h2 id={slugify("Vos droits")}>8. Vos droits</h2>
      <p>
        Selon votre situation, le RGPD (articles 15 à 22) et la LPD (articles 25 et suivants) vous
        donnent les droits suivants&nbsp;: accès à vos données, rectification, effacement,
        limitation du traitement, opposition aux traitements fondés sur l&apos;intérêt légitime,
        portabilité, et retrait à tout moment d&apos;un consentement donné. Pour les exercer,
        écrivez à <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> en
        décrivant votre demande&nbsp;; une réponse vous est adressée dans les délais légaux (un mois
        selon le RGPD, trente jours selon la LPD, prolongeables dans les cas prévus par la loi).
      </p>
      <p>
        Vous pouvez aussi saisir une autorité de contrôle&nbsp;: en France, la CNIL (3&nbsp;place de
        Fontenoy, 75007 Paris,{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          cnil.fr
        </a>
        )&nbsp;; en Suisse, le Préposé fédéral à la protection des données et à la transparence
        (PFPDT,{" "}
        <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer">
          edoeb.admin.ch
        </a>
        )&nbsp;; ou l&apos;autorité de votre pays de résidence.
      </p>

      <h2 id={slugify("Sécurité")}>9. Sécurité</h2>
      <p>
        Le site est servi exclusivement en HTTPS. Les accès aux systèmes d&apos;administration sont
        limités et authentifiés, et le catalogue est séparé de toute donnée de correspondance. En
        cas de violation de données susceptible d&apos;engendrer un risque pour vos droits, les
        autorités compétentes et, si la loi l&apos;exige, les personnes concernées seraient
        notifiées dans les délais légaux.
      </p>

      <h2 id={slugify("Mineurs")}>10. Mineurs</h2>
      <p>
        Le site ne s&apos;adresse pas spécifiquement aux mineurs et ne collecte pas sciemment de
        données les concernant&nbsp;; l&apos;absence de compte et de formulaire d&apos;inscription
        limite ce risque par construction.
      </p>

      <h2 id={slugify("Modifications de cette politique")}>11. Modifications de cette politique</h2>
      <p>
        Toute évolution du site qui toucherait aux données (mesure d&apos;audience, comptes, alertes
        de prix) sera précédée d&apos;une mise à jour de cette page, datée en tête. En cas de
        changement substantiel, une information visible sera affichée sur le site.
      </p>
    </LegalPage>
  );
}
