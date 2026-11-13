import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import { LocaleLink } from "@/components/common/locale-link";
import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";
import { isAffiliationActive } from "@/lib/sources/describe";
import { slugify } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: localeAlternates(locale, "/legal/affiliate-disclosure"),
    title: "Transparence sur l'affiliation",
    description:
      "Comment Findlydeal prévoit de se financer, l'état réel de ses programmes d'affiliation, et ce que l'affiliation change (et ne change pas) pour le visiteur.",
  };
}

const SECTIONS = [
  { title: "État actuel" },
  { title: "Comment fonctionne un lien d'affiliation" },
  { title: "Ce que l'affiliation ne changera jamais" },
  { title: "Comment vous le saurez" },
  { title: "Pourquoi cette page existe" },
];

/**
 * The page tells the truth at runtime: with no EBAY_CAMPAIGN_ID in the
 * environment, links are plain and the page says so; once the eBay Partner
 * Network application is approved and the variable set, the same deploy
 * flips the copy to the active wording. No manual edit to forget.
 */
export default function AffiliateDisclosurePage() {
  const active = isAffiliationActive();
  return (
    <LegalPage
      title="Transparence sur l'affiliation"
      intro={
        active
          ? "Certains liens vers les marchands sont des liens d'affiliation. Cette page explique ce que cela signifie, et ce que cela ne change pas."
          : "Aucun lien du site n'est affilié aujourd'hui. Cette page explique comment le site prévoit de se financer, et ce qui changera, ou non, ce jour-là."
      }
      lastUpdated="2026-11-13"
      sections={SECTIONS}
    >
      <h2 id={slugify("État actuel")}>1. État actuel</h2>
      {active ? (
        <p>
          Les liens vers eBay sont des liens d&apos;affiliation (programme eBay Partner Network).
          Quand vous achetez après avoir cliqué depuis {siteConfig.name}, eBay peut nous verser une
          commission. Le prix que vous payez est strictement le même, avec ou sans notre lien.
        </p>
      ) : (
        <>
          <p>
            <strong>
              {siteConfig.name} ne perçoit aujourd&apos;hui aucune commission, d&apos;aucun
              marchand.
            </strong>{" "}
            Les liens vers les annonces sont des liens ordinaires, sans identifiant de suivi qui
            nous soit rattaché. Le site est en développement et ses candidatures aux programmes
            d&apos;affiliation des marketplaces, à commencer par l&apos;eBay Partner Network, sont
            en cours.
          </p>
          <p>
            Le site n&apos;a donc, à ce jour, aucune source de revenus : il est financé par son
            éditeur.
          </p>
        </>
      )}

      <h2 id={slugify("Comment fonctionne un lien d'affiliation")}>
        2. Comment fonctionne un lien d&apos;affiliation
      </h2>
      <p>
        Un lien d&apos;affiliation porte un identifiant de campagne. Quand un visiteur clique, la
        marketplace reconnaît cet identifiant sur son propre site et, si un achat suit dans un délai
        qu&apos;elle définit, verse au site apporteur une commission prélevée sur sa marge.
        C&apos;est la marketplace qui dépose, sur son propre domaine, le cookie servant à cette
        attribution&nbsp;; {siteConfig.name} ne dépose aucun traceur (voir la{" "}
        <LocaleLink href="/legal/cookies">politique de cookies</LocaleLink>).
      </p>
      <p>
        Le prix payé par l&apos;acheteur est identique avec ou sans lien d&apos;affiliation&nbsp;:
        la commission rémunère la mise en relation, elle ne s&apos;ajoute pas au prix.
      </p>

      <h2 id={slugify("Ce que l'affiliation ne changera jamais")}>
        3. Ce que l&apos;affiliation ne changera jamais
      </h2>
      <ul>
        <li>
          <strong>Le classement.</strong> Les offres sont triées par prix livré, du moins cher au
          plus cher. Aucune commission, existante ou espérée, n&apos;entre dans ce tri&nbsp;; les
          règles complètes sont publiées sur la page{" "}
          <LocaleLink href="/methodologie">Méthodologie</LocaleLink>.
        </li>
        <li>
          <strong>La sélection du catalogue.</strong> Les produits suivis sont choisis par la
          rédaction pour leur intérêt en seconde main, jamais vendus par un marchand.
        </li>
        <li>
          <strong>Les guides.</strong> Aucun marchand ne paie pour être cité, en bien ou en mal,
          dans un article.
        </li>
        <li>
          <strong>Les prix affichés.</strong> Ils restent ceux relevés chez les marchands, livraison
          comprise.
        </li>
      </ul>

      <h2 id={slugify("Comment vous le saurez")}>4. Comment vous le saurez</h2>
      <p>
        Le jour où un programme d&apos;affiliation devient actif, cette page est mise à jour pour
        nommer le programme concerné, le bandeau «&nbsp;site en développement&nbsp;» est adapté, et
        la page Méthodologie décrit la rémunération. L&apos;information est donnée de manière
        claire, conformément à l&apos;obligation de loyauté de l&apos;article L.&nbsp;111-7 du Code
        de la consommation français et aux règles suisses contre la concurrence déloyale (LCD).
      </p>

      <h2 id={slugify("Pourquoi cette page existe")}>5. Pourquoi cette page existe</h2>
      <p>
        Un comparateur ne vaut que par la confiance qu&apos;on peut lui accorder. Publier dès
        maintenant l&apos;état réel du financement, y compris quand il est nul, coûte une page et
        évite tout malentendu&nbsp;: vous savez ce que le site gagne (rien aujourd&apos;hui),
        comment il compte gagner demain, et ce que cela ne changera pas.
      </p>
    </LegalPage>
  );
}
