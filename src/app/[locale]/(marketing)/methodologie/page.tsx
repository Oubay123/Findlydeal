import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { JsonLd } from "@/components/common/json-ld";
import { LocaleLink } from "@/components/common/locale-link";
import { SectionTitle } from "@/components/common/section-title";
import { siteConfig } from "@/config/site";
import { isAffiliationActive } from "@/lib/sources/describe";
import {
  DEAL_SCORE_THRESHOLDS,
  MIN_OFFERS_FOR_REFERENCE_PRICE,
  SORT_OPTIONS,
  SUSPICIOUS_DISCOUNT_PERCENT,
} from "@/lib/constants";
import { isDemoCatalogueActive } from "@/lib/mock";
import { CATALOGUE_TTL_SECONDS } from "@/lib/catalogue";
import { SEARCH_TTL_SECONDS } from "@/lib/ebay/client";
import { getAllSources, getConfiguredSources } from "@/lib/sources";
import { buildGraph, pageUrl, schemaIds, webPageNode } from "@/lib/seo/json-ld";
import type { SortOption } from "@/types";

/**
 * How Findlydeal compares and ranks offers.
 *
 * Two jobs. It is the page a French comparator owes its visitors (art. D111-7
 * of the Code de la consommation: ranking criteria, exhaustiveness, paid
 * placement), linked from every results list. And it is the source answer
 * engines can cite when someone asks how the prices or the "bonne affaire"
 * label are produced.
 *
 * Every number below is read from `@/lib/constants`, the same values the code
 * applies, so the explanation can never drift from the behaviour.
 */

const PATH = "/methodologie";
const TITLE = "Méthodologie : comment nous comparons et classons les offres";

/**
 * A score threshold expressed as the gap below the median it takes. The score
 * is the gap scaled so that 50 % below the median scores 100 (`lib/deals`).
 */
/** Discount at which a score threshold is reached (the scale saturates at SUSPICIOUS_DISCOUNT_PERCENT). */
const gapFor = (score: number) =>
  `${Math.round((score / 100) * SUSPICIOUS_DISCOUNT_PERCENT).toLocaleString("fr-FR")}\u00a0%`;

const SORT_EXPLANATIONS: Record<SortOption, string> = {
  relevance:
    "l'ordre dans lequel les marketplaces renvoient leurs résultats. Aucun critère commercial n'intervient.",
  price_asc: "le prix total, livraison comprise, du moins cher au plus cher.",
  price_desc: "le prix total, livraison comprise, du plus cher au moins cher.",
  deal_score: "l'écart avec le prix médian des offres trouvées, du plus grand au plus petit.",
  rating_desc:
    "la note moyenne communiquée par les marketplaces. Un produit sans note est placé en dernier, pas traité comme une mauvaise note.",
  newest: "la date de mise sur le marché du produit, du plus récent au plus ancien.",
};

/** Runtime: the demonstration notice depends on the Worker's secrets. */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: localeAlternates(locale, PATH),
    title: { absolute: TITLE },
    description:
      "D'où viennent les prix de Findlydeal, comment les offres sont classées, comment une bonne affaire est repérée par rapport au prix médian, et comment le site est rémunéré.",
  };
}

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}) {
  const { locale } = await params;
  const url = pageUrl(locale, PATH);
  const isDemo = isDemoCatalogueActive();
  // Live: only the marketplaces actually queried. Demo: the planned ones.
  const sources = (isDemo ? getAllSources() : getConfiguredSources()).map((source) => source.label);
  const affiliationActive = isAffiliationActive();

  return (
    <Container className="max-w-3xl space-y-10 py-16">
      <JsonLd
        data={buildGraph(
          webPageNode({
            url,
            name: TITLE,
            type: "AboutPage",
            about: schemaIds.organization(),
            hasBreadcrumb: true,
          }),
        )}
      />
      <Breadcrumbs path={PATH} items={[{ name: "Méthodologie" }]} />

      <SectionTitle
        as="h1"
        title={TITLE}
        description={`${siteConfig.name} compare le prix total des offres des marketplaces interrogées. Aucune position n'est payante, et aucune rémunération ne change l'ordre des offres.`}
      />

      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground">
        <section className="space-y-3">
          <h2>D&apos;où viennent les prix</h2>
          <p>
            Les offres proviennent des marketplaces interrogées par {siteConfig.name} :{" "}
            {sources.join(", ")}. Elles sont relevées via leurs interfaces officielles, puis
            ramenées à un format commun : prix, frais de livraison, état du produit, disponibilité
            et vendeur.
          </p>
          <p>
            Le prix affiché est le <strong className="text-foreground">prix total</strong> : prix de
            l&apos;article et frais de livraison communiqués par le marchand. Quand le marchand ne
            communique pas ses frais de port, l&apos;offre l&apos;indique. Sur eBay, un achat auprès
            d&apos;un vendeur particulier entraîne des frais de Protection des acheteurs
            (0,10&nbsp;€ par objet, plus 7&nbsp;% du prix jusqu&apos;à 20&nbsp;€, 4&nbsp;% de 20 à
            300&nbsp;€ et 2&nbsp;% au-delà, selon le barème annoncé par eBay le 1er septembre 2026).
            Nous en affichons une estimation sous l&apos;offre, sans l&apos;ajouter au total : eBay
            les indique sur l&apos;annonce elle-même. Vérifiez toujours le montant final sur le site
            du marchand avant de payer.
          </p>
          <p>
            Les prix des fiches produit sont relevés au plus toutes les{" "}
            {CATALOGUE_TTL_SECONDS / 3600}&nbsp;heures, ceux des recherches au plus toutes les{" "}
            {SEARCH_TTL_SECONDS / 3600}&nbsp;heure : chaque offre affiche l&apos;heure de son
            relevé. Une annonce n&apos;est rattachée à une fiche que si son titre désigne exactement
            le même modèle (même capacité, même référence) ; les appareils vendus pour pièces,
            bloqués ou défectueux sont écartés.
          </p>
          {isDemo ? (
            <p className="rounded-lg bg-cream p-4 text-foreground">
              Le service est en préparation : les produits et les prix actuellement visibles sont
              des exemples de démonstration, pas des relevés réels.
            </p>
          ) : null}
        </section>

        <section className="space-y-3">
          <h2>Comment les offres sont classées</h2>
          <p>
            Sur une fiche produit, les offres sont classées par prix total croissant. Dans les
            résultats de recherche, le classement suit l&apos;option affichée en tête de la liste :
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            {SORT_OPTIONS.map((option) => (
              <li key={option.value}>
                <strong className="text-foreground">{option.label}</strong> :{" "}
                {SORT_EXPLANATIONS[option.value]}
              </li>
            ))}
          </ul>
          <p>
            La liste n&apos;est pas exhaustive : seules les marketplaces listées ci-dessus sont
            interrogées, et d&apos;autres vendeurs peuvent proposer le même produit. Aucun marchand
            ne paie pour apparaître ou pour être mieux placé.
          </p>
        </section>

        <section className="space-y-3">
          <h2>Comment une bonne affaire est repérée</h2>
          <p>
            Pour chaque produit, nous calculons le{" "}
            <strong className="text-foreground">prix médian</strong> des offres{" "}
            <strong className="text-foreground">dans le même état</strong> : une occasion est
            comparée aux autres occasions, jamais au neuf. Il faut au moins{" "}
            {MIN_OFFERS_FOR_REFERENCE_PRICE} offres dans cet état ; en dessous, aucune offre
            n&apos;est signalée, l&apos;échantillon est trop mince pour juger.
          </p>
          <p>
            Les prix très éloignés du groupe (méthode des quartiles : plus d&apos;une fois et demie
            l&apos;écart interquartile au-delà du premier ou du troisième quartile) sont écartés du
            calcul de la médiane, pour qu&apos;une annonce isolée ne la fausse pas.
          </p>
          <p>
            Une offre est signalée selon son écart avec cette médiane : « Bonne affaire » à partir
            d&apos;environ {gapFor(DEAL_SCORE_THRESHOLDS.good)} sous la médiane, « Très bonne
            affaire » à partir d&apos;environ {gapFor(DEAL_SCORE_THRESHOLDS.great)}, « Affaire
            exceptionnelle » à partir d&apos;environ {gapFor(DEAL_SCORE_THRESHOLDS.exceptional)}.
          </p>
          <p>
            Au-delà de {SUSPICIOUS_DISCOUNT_PERCENT}&nbsp;% sous la médiane, ou très en dessous du
            groupe, une offre n&apos;est <strong className="text-foreground">pas</strong> présentée
            comme une affaire : elle porte la mention « Prix inhabituel, à vérifier ». Sur une
            marketplace, un prix trop beau est plus souvent une annonce mal décrite qu&apos;une
            aubaine. Elle reste dans le comparatif, mais n&apos;est jamais affichée comme le prix «
            dès » du produit.
          </p>
          <p>
            Cet écart est une <strong className="text-foreground">comparaison</strong> avec les
            autres vendeurs, pas une réduction accordée par le vendeur : c&apos;est pourquoi il
            s&apos;affiche sous la forme « 18&nbsp;% sous la médiane » et jamais comme un prix
            barré. Quand l&apos;historique des prix sera disponible, la référence deviendra la
            médiane observée sur 30 jours.
          </p>
        </section>

        <section className="space-y-3">
          <h2>Neuf, reconditionné, occasion</h2>
          <p>
            L&apos;état affiché est celui que déclare le vendeur. Un produit{" "}
            <strong className="text-foreground">reconditionné</strong> a été testé sur toutes ses
            fonctionnalités et ses données ont été effacées : c&apos;est la définition légale fixée
            par le décret n°&nbsp;2022-190 du 17 février 2022, qui interdit aussi les mentions «
            état neuf », « comme neuf » ou « à neuf » pour ces produits. Un produit d&apos;occasion
            n&apos;a pas forcément été testé.
          </p>
          <p>
            Le grade (Parfait état, Très bon état, Bon état, État correct) ne décrit que
            l&apos;aspect extérieur : voir{" "}
            <LocaleLink
              href="/blog/grades-reconditionnement-expliques"
              className="text-primary underline underline-offset-2"
            >
              les grades de reconditionnement expliqués
            </LocaleLink>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2>Comment {siteConfig.name} est financé</h2>
          <p>
            {affiliationActive ? (
              <>
                Les liens vers les marchands sont des liens d&apos;affiliation : quand vous achetez
                après avoir cliqué, la marketplace peut nous verser une commission. Le prix que vous
                payez ne change pas, et le montant de la commission n&apos;entre dans aucun calcul
                de classement.
              </>
            ) : (
              <>
                Le site ne perçoit aujourd&apos;hui aucune rémunération : les liens vers les
                marchands ne sont pas affiliés. À terme, il a vocation à être financé par les
                programmes d&apos;affiliation des marketplaces ; le jour où l&apos;un sera actif,
                cette page et la page Affiliation le diront, et cela ne changera ni les prix ni
                l&apos;ordre des offres.
              </>
            )}{" "}
            <LocaleLink
              href="/legal/affiliate-disclosure"
              className="text-primary underline underline-offset-2"
            >
              Détail de nos partenariats
            </LocaleLink>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2>Signaler une erreur</h2>
          <p>
            Un prix faux, une offre mal rattachée à un produit, un état mal indiqué :{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-primary underline underline-offset-2"
            >
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
