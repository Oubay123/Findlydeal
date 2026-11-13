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
    alternates: localeAlternates(locale, "/legal/cookies"),
    title: "Politique de cookies",
    description:
      "Politique de cookies de Findlydeal : aucun cookie non essentiel, pas de bandeau parce qu'il n'y a rien à accepter, et le détail du stockage local utilisé.",
  };
}

const SECTIONS = [
  { title: "L'essentiel" },
  { title: "Pourquoi il n'y a pas de bandeau cookies" },
  { title: "Stockage utilisé par le site" },
  { title: "Cookies déposés par l'hébergeur" },
  { title: "Ce qui se passe quand vous cliquez vers un marchand" },
  { title: "Si un outil de mesure d'audience est ajouté un jour" },
  { title: "Gérer et supprimer le stockage" },
];

/**
 * GENERIC TEMPLATE, NOT LEGAL ADVICE.
 *
 * Grounded in the code as it ships: no analytics script, no third-party tag,
 * no advertising cookie; sessionStorage for the comparison basket and
 * localStorage for a dormant consent record (see src/lib/consent). The legal
 * frame is the ePrivacy rules as implemented by article 82 of the French
 * loi Informatique et Libertés (CNIL doctrine: strictly necessary storage is
 * exempt from consent) and article 45c let. b of the Swiss LTC (information
 * and opt-out). If any tracker ships later, this page AND a consent banner
 * must land in the same release.
 */
export default function CookiesPage() {
  return (
    <LegalPage
      title="Politique de cookies"
      intro="Le site n'utilise aujourd'hui aucun cookie non essentiel et n'embarque aucun traceur tiers. Cette page détaille le peu qui existe."
      lastUpdated="2026-11-13"
      sections={SECTIONS}
    >
      <h2 id={slugify("L'essentiel")}>1. L&apos;essentiel</h2>
      <ul>
        <li>Aucun cookie publicitaire, aucun pistage entre sites.</li>
        <li>Aucun outil de mesure d&apos;audience à ce jour.</li>
        <li>Aucun bouton de partage ni script de réseau social.</li>
        <li>
          Le site n&apos;écrit dans votre navigateur que deux informations, décrites ci-dessous, et
          elles ne sont jamais transmises à nos serveurs.
        </li>
      </ul>

      <h2 id={slugify("Pourquoi il n'y a pas de bandeau cookies")}>
        2. Pourquoi il n&apos;y a pas de bandeau cookies
      </h2>
      <p>
        Le consentement n&apos;est requis que pour les cookies et traceurs non essentiels au service
        demandé (article 82 de la loi française «&nbsp;Informatique et Libertés&nbsp;», transposant
        la directive ePrivacy, et lignes directrices de la CNIL&nbsp;; article 45c, let.&nbsp;b de
        la loi suisse sur les télécommunications). Le site n&apos;en utilisant aucun, il n&apos;y a
        rien à accepter ni à refuser&nbsp;: afficher un bandeau serait de la décoration. Le
        mécanisme de consentement est prêt dans le code et sera activé <em>avant</em> tout ajout
        d&apos;un traceur soumis à consentement.
      </p>

      <h2 id={slugify("Stockage utilisé par le site")}>3. Stockage utilisé par le site</h2>
      <ul>
        <li>
          <strong>findlydeal:compare</strong> (stockage de session)&nbsp;: la liste des produits que
          vous avez ajoutés au comparateur, pour la durée de l&apos;onglet. Supprimée
          automatiquement à sa fermeture. Strictement nécessaire à la fonction
          «&nbsp;Comparer&nbsp;», donc exemptée de consentement.
        </li>
        <li>
          <strong>findlydeal:consent</strong> (stockage local)&nbsp;: l&apos;enregistrement de votre
          choix si un consentement devait être demandé un jour. Tant qu&apos;aucun traceur
          n&apos;existe, rien n&apos;y est écrit.
        </li>
      </ul>

      <h2 id={slugify("Cookies déposés par l'hébergeur")}>
        4. Cookies déposés par l&apos;hébergeur
      </h2>
      <p>
        Le site est diffusé par Cloudflare, qui peut déposer des cookies strictement techniques de
        sécurité et d&apos;équilibrage (par exemple <code>__cf_bm</code>, protection contre les
        robots, durée de vie d&apos;environ trente minutes). Ils ne servent qu&apos;à protéger le
        service, ne suivent pas votre navigation d&apos;un site à l&apos;autre, et relèvent de la
        catégorie des cookies essentiels exemptés de consentement.
      </p>

      <h2 id={slugify("Ce qui se passe quand vous cliquez vers un marchand")}>
        5. Ce qui se passe quand vous cliquez vers un marchand
      </h2>
      <p>
        Quand vous ouvrez une annonce, vous arrivez sur le site de la marketplace (eBay
        aujourd&apos;hui), qui applique sa propre politique de cookies et vous présente ses propres
        choix de consentement. Si un programme d&apos;affiliation devient actif un jour, c&apos;est
        la marketplace qui déposerait, sur son propre site, le cookie servant à attribuer
        l&apos;achat&nbsp;; la page{" "}
        <LocaleLink href="/legal/affiliate-disclosure">
          Transparence sur l&apos;affiliation
        </LocaleLink>{" "}
        décrit ce mécanisme et son état actuel (inactif).
      </p>

      <h2 id={slugify("Si un outil de mesure d'audience est ajouté un jour")}>
        6. Si un outil de mesure d&apos;audience est ajouté un jour
      </h2>
      <p>
        Le besoin viendra peut-être de mesurer la fréquentation. Le choix se portera d&apos;abord
        sur une solution sans cookie et sans donnée personnelle, exemptée de consentement au sens
        des lignes directrices de la CNIL. Si une solution soumise à consentement était retenue, le
        bandeau serait activé au préalable et cette page mise à jour, avec le nom de l&apos;outil,
        les données traitées et la durée de vie exacte de chaque traceur.
      </p>

      <h2 id={slugify("Gérer et supprimer le stockage")}>7. Gérer et supprimer le stockage</h2>
      <p>
        Vous pouvez à tout moment supprimer cookies et stockage local depuis les réglages de votre
        navigateur (généralement «&nbsp;Confidentialité&nbsp;» puis «&nbsp;Données de sites&nbsp;»),
        ou naviguer en fenêtre privée&nbsp;: le site reste entièrement utilisable, seule la
        sélection du comparateur se vide. Pour toute question&nbsp;:{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
