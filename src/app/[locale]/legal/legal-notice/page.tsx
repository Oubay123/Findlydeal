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
    alternates: localeAlternates(locale, "/legal/legal-notice"),
    title: "Mentions légales",
    description:
      "Mentions légales de Findlydeal : éditeur, hébergeur, nature du service de comparaison de prix, propriété intellectuelle et signalement d'un contenu.",
  };
}

const SECTIONS = [
  { title: "Éditeur du site" },
  { title: "Directeur de la publication" },
  { title: "Hébergement" },
  { title: "Nature du service" },
  { title: "Textes de référence" },
  { title: "Propriété intellectuelle" },
  { title: "Crédits photographiques" },
  { title: "Signaler un contenu" },
];

/**
 * GENERIC TEMPLATE, NOT LEGAL ADVICE.
 *
 * The identity blocks are driven by `siteConfig.publisher`, still empty: both
 * France's LCEN (art. 6, III) and Switzerland's LCD (art. 3, al. 1, let. s)
 * require a commercial site to identify its publisher, so every missing field
 * is shown as explicitly "to be published", never invented. Fill in
 * src/config/site.ts before real commercial operation, and have the page
 * reviewed by a lawyer: required fields differ with the legal form (RC/IDE
 * number in Switzerland, SIREN/RCS and share capital in France, VAT number…).
 */
export default function LegalNoticePage() {
  const { publisher, host } = siteConfig;
  return (
    <LegalPage
      title="Mentions légales"
      intro="Qui édite le site, qui l'héberge, ce que le service fait exactement, et comment nous signaler un problème sur une page."
      lastUpdated="2026-11-13"
      sections={SECTIONS}
    >
      <h2 id={slugify("Éditeur du site")}>1. Éditeur du site</h2>
      {publisher.name ? (
        <p>
          {publisher.name}
          {publisher.legalForm ? `, ${publisher.legalForm}` : ""}
          {publisher.address ? (
            <>
              <br />
              {publisher.address}
            </>
          ) : null}
          <br />
          Contact : <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>
      ) : (
        <>
          <p>
            Le site est en cours de développement et son exploitation commerciale n&apos;a pas
            commencé. L&apos;identification complète de l&apos;éditeur sera publiée ici avant ce
            lancement, avec les éléments requis par l&apos;article 6, III de la loi française
            n°&nbsp;2004-575 pour la confiance dans l&apos;économie numérique (LCEN) et par
            l&apos;article 3, al.&nbsp;1, let.&nbsp;s de la loi fédérale suisse contre la
            concurrence déloyale (LCD)&nbsp;:
          </p>
          <ul>
            <li>dénomination ou nom, et forme juridique&nbsp;;</li>
            <li>adresse du siège ou de l&apos;établissement&nbsp;;</li>
            <li>
              numéro d&apos;immatriculation (RCS et SIREN en France, IDE et registre du commerce en
              Suisse) et, le cas échéant, capital social et numéro de TVA&nbsp;;
            </li>
            <li>adresse de courrier électronique et moyen de contact rapide.</li>
          </ul>
          <p>
            Dans l&apos;intervalle, l&apos;éditeur répond à toute demande, y compris des autorités,
            à l&apos;adresse{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          </p>
        </>
      )}

      <h2 id={slugify("Directeur de la publication")}>2. Directeur de la publication</h2>
      <p>
        {publisher.director || publisher.name
          ? `${publisher.director || publisher.name}.`
          : "Le directeur de la publication sera désigné et nommé ici en même temps que l'éditeur."}
      </p>

      <h2 id={slugify("Hébergement")}>3. Hébergement</h2>
      <p>
        Le site est hébergé et diffusé par {host.name}, {host.address} (
        <a href={host.website} rel="noopener noreferrer" target="_blank">
          cloudflare.com
        </a>
        ). La base de données du catalogue est hébergée par Supabase (
        <a href="https://supabase.com" rel="noopener noreferrer" target="_blank">
          supabase.com
        </a>
        ).
      </p>

      <h2 id={slugify("Nature du service")}>4. Nature du service</h2>
      <p>
        {siteConfig.name} est un comparateur de prix. Le site ne vend aucun produit, ne détient
        aucun stock et n&apos;intervient dans aucune transaction. Il présente des offres provenant
        de marketplaces tierces, relevées via leurs interfaces officielles, et redirige le visiteur
        vers celles-ci. L&apos;achat, le paiement, la livraison, la garantie et le service
        après-vente relèvent exclusivement du marchand choisi.
      </p>
      <p>
        Le site est en développement et ne perçoit aujourd&apos;hui aucune rémunération. Son mode de
        financement prévu est décrit sur la page{" "}
        <LocaleLink href="/legal/affiliate-disclosure">
          transparence sur l&apos;affiliation
        </LocaleLink>
        , et ses règles de classement sur la page{" "}
        <LocaleLink href="/methodologie">méthodologie</LocaleLink>.
      </p>

      <h2 id={slugify("Textes de référence")}>5. Textes de référence</h2>
      <ul>
        <li>
          Loi française n°&nbsp;2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie
          numérique (LCEN), article 6.
        </li>
        <li>
          Code de la consommation français, articles L.&nbsp;111-7 et D.&nbsp;111-7 et suivants
          (information des utilisateurs de comparateurs en ligne) et L.&nbsp;112-1-1 (annonces de
          réduction de prix).
        </li>
        <li>
          Loi fédérale suisse contre la concurrence déloyale (LCD), notamment l&apos;article 3,
          al.&nbsp;1, let.&nbsp;s.
        </li>
        <li>
          Règlement (UE) 2016/679 (RGPD) et loi fédérale suisse sur la protection des données (LPD),
          pour les traitements décrits dans la{" "}
          <LocaleLink href="/legal/privacy">politique de confidentialité</LocaleLink>.
        </li>
      </ul>

      <h2 id={slugify("Propriété intellectuelle")}>6. Propriété intellectuelle</h2>
      <p>
        La structure du site, sa charte graphique, ses textes éditoriaux, son code source et sa base
        de données sont protégés par le droit d&apos;auteur et, pour la base, par le droit sui
        generis des producteurs de bases de données. Toute reproduction ou représentation, totale ou
        partielle, sans autorisation écrite préalable est interdite, à l&apos;exception des courtes
        citations avec mention de la source.
      </p>
      <p>
        Les marques, dénominations commerciales et logos des marchands et des fabricants cités
        appartiennent à leurs titulaires respectifs. Ils sont utilisés pour identifier les produits
        comparés, sans impliquer aucun partenariat ni aucune approbation.
      </p>

      <h2 id={slugify("Crédits photographiques")}>7. Crédits photographiques</h2>
      <p>
        Les photographies des offres proviennent des annonces des marketplaces, via leurs interfaces
        officielles, et restent la propriété de leurs auteurs. Les photographies d&apos;illustration
        (accueil, catégories, articles) proviennent de banques d&apos;images sous licence autorisant
        l&apos;usage commercial (Unsplash). Aucune photographie de personne identifiable n&apos;est
        utilisée à des fins promotionnelles.
      </p>

      <h2 id={slugify("Signaler un contenu")}>8. Signaler un contenu</h2>
      <p>
        Pour signaler une information erronée, une atteinte à un droit (marque, droit d&apos;auteur,
        données personnelles) ou un contenu inapproprié, écrivez à{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> en précisant
        l&apos;adresse de la page concernée, la nature du problème et, pour une atteinte à un droit,
        les éléments qui fondent votre qualité à agir. Toute demande motivée reçoit une réponse, et
        les contenus manifestement illicites sont retirés sans délai.
      </p>
    </LegalPage>
  );
}
