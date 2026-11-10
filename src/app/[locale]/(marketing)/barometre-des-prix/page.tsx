import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { JsonLd } from "@/components/common/json-ld";
import { LocaleLink } from "@/components/common/locale-link";
import { SectionTitle } from "@/components/common/section-title";
import { categories } from "@/config/categories";
import { siteConfig } from "@/config/site";
import type { UiLocale } from "@/i18n";
import { getPricedCatalogue } from "@/lib/catalogue";
import {
  lastFetchedAt,
  marketByCondition,
  summarize,
  type BarometerRow,
  type BarometerSummary,
} from "@/lib/catalogue/market";
import { isDemoCatalogueActive } from "@/lib/mock";
import { buildGraph, pageUrl, schemaIds, webPageNode } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/locale";
import { formatArticleDate, formatPrice } from "@/lib/utils";

/** Figures are computed from the catalogue as it is right now. */
export const dynamic = "force-dynamic";

const PATH = "/barometre-des-prix";
const TITLE = "Baromètre des prix : neuf, reconditionné, occasion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { absolute: TITLE },
    description:
      "Combien coûte un produit reconditionné ou d'occasion par rapport au neuf ? Écarts de prix relevés sur les offres eBay, par catégorie et par modèle, mis à jour plusieurs fois par jour.",
    alternates: localeAlternates(locale, PATH),
    ...(isDemoCatalogueActive() ? { robots: { index: false, follow: true } } : {}),
  };
}

const eur = (cents?: number) => (cents ? formatPrice({ amount: cents, currency: "EUR" }) : "—");
const gap = (value?: number) => (value === undefined ? "—" : `−${value} %`);

/** Products shown per category before "see the others". */
const VISIBLE_ROWS = 8;

const maxGap = ({ market }: BarometerRow) =>
  Math.max(market[1]?.gapWithNewPercent ?? 0, market[2]?.gapWithNewPercent ?? 0);

function PriceTable({ rows, caption }: { rows: BarometerRow[]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white">
      <table className="w-full min-w-[640px] text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="border-b bg-cream/60 text-left text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-2.5 font-medium">
              Produit
            </th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium">
              Neuf dès
            </th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium">
              Reconditionné dès
            </th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium">
              Occasion dès
            </th>
            <th scope="col" className="px-4 py-2.5 text-right font-medium">
              Écart max. avec le neuf
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row) => {
            const [fresh, refurbished, used] = row.market;
            const best = maxGap(row);
            return (
              <tr key={row.product.id}>
                <th scope="row" className="px-4 py-2.5 text-left font-medium">
                  <LocaleLink
                    href={`/product/${encodeURIComponent(row.product.id)}`}
                    className="hover:text-primary hover:underline"
                  >
                    {row.product.title}
                  </LocaleLink>
                </th>
                <td className="px-3 py-2.5 text-right tabular-nums">{eur(fresh?.lowestCents)}</td>
                <td className="px-3 py-2.5 text-right tabular-nums">
                  {eur(refurbished?.lowestCents)}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums">{eur(used?.lowestCents)}</td>
                <td className="px-4 py-2.5 text-right font-semibold text-emerald-800 tabular-nums">
                  {best > 0 ? `−${best} %` : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SummaryCards({ summary }: { summary: BarometerSummary }) {
  const cards = [
    { label: "Produits suivis", value: String(summary.products) },
    {
      label: "Reconditionné face au neuf",
      value: gap(summary.refurbishedGap),
      hint: "écart médian",
    },
    { label: "Occasion face au neuf", value: gap(summary.usedGap), hint: "écart médian" },
  ];
  return (
    <dl className="grid gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl border bg-white px-5 py-4">
          <dt className="text-xs font-medium text-muted-foreground">{card.label}</dt>
          <dd className="mt-1 font-display text-2xl font-bold tabular-nums">{card.value}</dd>
          {card.hint ? <dd className="text-xs text-muted-foreground">{card.hint}</dd> : null}
        </div>
      ))}
    </dl>
  );
}

export default async function BarometerPage({ params }: { params: Promise<{ locale: UiLocale }> }) {
  const { locale } = await params;
  const url = pageUrl(locale, PATH);
  const isDemo = isDemoCatalogueActive();
  const products = await getPricedCatalogue();

  const rows: BarometerRow[] = products.map((product) => ({
    product,
    market: marketByCondition(product.offers),
  }));
  const overall = summarize(rows);
  const capturedAt = lastFetchedAt(products.flatMap((product) => product.offers));
  const byCategory = categories
    .filter((category) => !["refurbished", "second-hand"].includes(category.slug))
    .map((category) => {
      // Largest gap with new first: what a reader of a barometer looks for.
      const inCategory = rows
        .filter((row) => row.product.categorySlug === category.slug)
        .sort((a, b) => maxGap(b) - maxGap(a));
      return { category, rows: inCategory, summary: summarize(inCategory) };
    })
    .filter((group) => group.rows.length > 0);

  return (
    <Container className="max-w-5xl space-y-10 py-16">
      <JsonLd
        data={buildGraph(
          webPageNode({
            url,
            name: TITLE,
            hasBreadcrumb: true,
            mainEntity: isDemo || !capturedAt ? undefined : `${url}#dataset`,
            dateModified: capturedAt,
          }),
          !isDemo && capturedAt
            ? {
                "@type": "Dataset",
                "@id": `${url}#dataset`,
                name: TITLE,
                description:
                  "Prix le plus bas relevé par produit et par état (neuf, reconditionné, occasion) sur les offres eBay livrables en France, et écart avec le neuf.",
                url,
                creator: { "@id": schemaIds.organization() },
                license: "https://creativecommons.org/licenses/by/4.0/",
                isAccessibleForFree: true,
                temporalCoverage: capturedAt.slice(0, 10),
                spatialCoverage: "France",
                dateModified: capturedAt,
                variableMeasured: [
                  "Prix le plus bas en neuf (EUR, livraison comprise)",
                  "Prix le plus bas en reconditionné (EUR, livraison comprise)",
                  "Prix le plus bas en occasion (EUR, livraison comprise)",
                  "Écart avec le neuf (%)",
                ],
              }
            : false,
        )}
      />
      <Breadcrumbs path={PATH} items={[{ name: "Baromètre des prix" }]} />

      <SectionTitle
        as="h1"
        title={TITLE}
        description={
          capturedAt
            ? `Combien coûte un produit reconditionné ou d'occasion par rapport au neuf, relevé sur ${overall.products} produits le ${formatArticleDate(capturedAt)}. Chaque produit est relevé au moins toutes les quatre heures.`
            : "Les relevés sont en cours : revenez dans quelques heures."
        }
      />

      {rows.length > 0 ? <SummaryCards summary={overall} /> : null}

      <section className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Comment lire ces chiffres
        </h2>
        <p>
          Pour chaque produit, nous prenons l&apos;offre la moins chère de chaque état, livraison
          comprise, parmi les offres au prix habituel : une annonce très en dessous des autres
          (souvent mal décrite) est écartée. L&apos;écart compare l&apos;offre reconditionnée ou
          d&apos;occasion la moins chère à l&apos;offre neuve la moins chère{" "}
          <strong className="text-foreground">au même moment</strong>. Ce n&apos;est pas une remise
          : aucun vendeur n&apos;a pratiqué le prix neuf sur ces annonces.
        </p>
        <p>
          L&apos;écart médian d&apos;une catégorie ne porte que sur les produits disponibles à la
          fois en neuf et dans l&apos;état comparé. Les offres viennent d&apos;eBay, vendeurs
          professionnels et particuliers ; voir notre{" "}
          <LocaleLink href="/methodologie" className="text-primary underline underline-offset-2">
            méthodologie
          </LocaleLink>
          . Vous pouvez reprendre ces chiffres en citant {siteConfig.name} (licence CC BY 4.0).
        </p>
      </section>

      {byCategory.map(({ category, rows: categoryRows, summary }) => (
        <section key={category.slug} aria-labelledby={`cat-${category.slug}`} className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id={`cat-${category.slug}`} className="font-display text-xl font-bold">
              {category.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              Reconditionné {gap(summary.refurbishedGap)}, occasion {gap(summary.usedGap)},{" "}
              {summary.products} produits
            </p>
          </div>
          <PriceTable
            caption={`Prix les plus bas par état, ${category.name}`}
            rows={categoryRows.slice(0, VISIBLE_ROWS)}
          />
          {categoryRows.length > VISIBLE_ROWS ? (
            <details className="group">
              <summary className="cursor-pointer text-sm font-semibold text-primary hover:underline">
                Voir les {categoryRows.length - VISIBLE_ROWS} autres produits
              </summary>
              <div className="mt-3">
                <PriceTable
                  caption={`Autres produits, ${category.name}`}
                  rows={categoryRows.slice(VISIBLE_ROWS)}
                />
              </div>
            </details>
          ) : null}
        </section>
      ))}
    </Container>
  );
}
