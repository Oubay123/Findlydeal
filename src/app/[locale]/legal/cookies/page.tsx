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
    title: "Cookies",
    description:
      "Politique de cookies de Findlydeal : cookies strictement nécessaires, mesure d'audience et cookies d'affiliation déposés par les marketplaces partenaires.",
  };
}

const SECTIONS = [
  { title: "Qu'est-ce qu'un cookie" },
  { title: "Ce que Findlydeal dépose aujourd'hui" },
  { title: "Les cookies d'affiliation" },
  { title: "Mesure d'audience" },
  { title: "Gérer vos cookies" },
  { title: "Supprimer les cookies existants" },
];

/**
 * GENERIC TEMPLATE, NOT LEGAL ADVICE.
 *
 * This page describes the site as it actually is today: no analytics, no
 * advertising pixel, no third-party script, and therefore nothing requiring
 * consent. The "Mesure d'audience" section is written as a forward-looking
 * commitment rather than a description of an existing tool.
 *
 * REVISE THIS PAGE the day a measurement tool is added, and flip
 * `CONSENT_REQUIRED` in `src/lib/consent/index.ts` at the same time.
 */
export default function CookiesPage() {
  return (
    <LegalPage
      title="Politique de cookies"
      intro="Ce que le site dépose sur votre appareil, ce que déposent les marchands quand vous suivez un lien, et comment reprendre la main."
      lastUpdated="2026-08-23"
      sections={SECTIONS}
    >
      <h2 id={slugify("Qu'est-ce qu'un cookie")}>Qu&apos;est-ce qu&apos;un cookie</h2>
      <p>
        Un cookie est un petit fichier déposé par un site dans votre navigateur. Il permet de
        mémoriser une information entre deux pages ou entre deux visites : une préférence
        d&apos;affichage, une session, ou l&apos;origine d&apos;une visite.
      </p>
      <p>
        On distingue les cookies <strong>internes</strong>, déposés par le site que vous consultez,
        et les cookies <strong>tiers</strong>, déposés par un autre domaine.
      </p>

      <h2 id={slugify("Ce que Findlydeal dépose aujourd'hui")}>
        Ce que {siteConfig.name} dépose aujourd&apos;hui
      </h2>
      <p>
        <strong>Aucun cookie non essentiel.</strong> Le site n&apos;intègre à ce jour ni outil de
        mesure d&apos;audience, ni pixel publicitaire, ni script tiers.
      </p>
      <p>
        Il utilise en revanche le <strong>stockage de session</strong> de votre navigateur, une
        technologie voisine, pour mémoriser les produits que vous sélectionnez en vue d&apos;une
        comparaison. Cette information reste sur votre appareil, n&apos;est jamais transmise à un
        serveur, et disparaît lorsque vous fermez l&apos;onglet. Elle est strictement nécessaire au
        fonctionnement de la fonction de comparaison et ne requiert pas de consentement.
      </p>

      <h2 id={slugify("Les cookies d'affiliation")}>Les cookies d&apos;affiliation</h2>
      <p>
        C&apos;est le point le plus important de cette page. Lorsque vous cliquez sur une offre et
        que vous êtes redirigé vers une marketplace,{" "}
        <strong>
          c&apos;est cette marketplace, et non {siteConfig.name}, qui dépose un cookie sur votre
          appareil
        </strong>
        . Ce cookie sert à lui indiquer que la visite vient de notre site, afin que la commission
        nous soit attribuée si vous achetez.
      </p>
      <p>
        Ces cookies sont déposés sur le domaine du marchand, sous sa responsabilité et selon sa
        propre politique. Leur durée de vie varie généralement de quelques jours à trente jours
        selon le programme. Nous n&apos;y avons pas accès et ne pouvons ni les lire, ni les
        supprimer.
      </p>
      <p>
        Le fonctionnement de ce modèle est détaillé sur notre page{" "}
        <LocaleLink href="/legal/affiliate-disclosure">
          transparence sur l&apos;affiliation
        </LocaleLink>
        .
      </p>

      <h2 id={slugify("Mesure d'audience")}>Mesure d&apos;audience</h2>
      <p>
        Aucun outil de mesure d&apos;audience n&apos;est actuellement installé. Si nous en ajoutons
        un, nous nous engageons à :
      </p>
      <ul>
        <li>
          recueillir votre consentement préalable par une bannière offrant un refus aussi simple
          qu&apos;une acceptation ;
        </li>
        <li>ne déclencher aucun script de mesure avant ce consentement ;</li>
        <li>mettre à jour cette page et la politique de confidentialité en même temps.</li>
      </ul>

      <h2 id={slugify("Gérer vos cookies")}>Gérer vos cookies</h2>
      <p>
        Tant qu&apos;aucun cookie non essentiel n&apos;est déposé, aucune bannière de consentement
        ne s&apos;affiche : il serait trompeur de vous demander d&apos;accepter ou de refuser
        quelque chose qui n&apos;existe pas. Le mécanisme de recueil est en place et s&apos;activera
        automatiquement le jour où un traitement soumis à consentement sera introduit.
      </p>
      <p>
        Vous gardez la possibilité de bloquer tous les cookies depuis les réglages de votre
        navigateur. Notez que bloquer les cookies tiers empêchera l&apos;attribution des ventes aux
        sites qui, comme le nôtre, vivent de l&apos;affiliation, sans rien changer au prix que vous
        payez.
      </p>

      <h2 id={slugify("Supprimer les cookies existants")}>Supprimer les cookies existants</h2>
      <p>La marche à suivre selon votre navigateur :</p>
      <ul>
        <li>
          <strong>Chrome</strong> : Paramètres, Confidentialité et sécurité, Cookies et autres
          données des sites.
        </li>
        <li>
          <strong>Firefox</strong> : Paramètres, Vie privée et sécurité, Cookies et données de
          sites.
        </li>
        <li>
          <strong>Safari</strong> : Réglages, Confidentialité, Gérer les données de sites web.
        </li>
        <li>
          <strong>Edge</strong> : Paramètres, Cookies et autorisations de site.
        </li>
      </ul>
      <p>
        Pour toute question :{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Voir aussi
        notre <LocaleLink href="/legal/privacy">politique de confidentialité</LocaleLink>.
      </p>
    </LegalPage>
  );
}
