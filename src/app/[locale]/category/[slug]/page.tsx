import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import { CategoryGuide } from "@/components/category/category-guide";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { JsonLd } from "@/components/common/json-ld";
import { Container } from "@/components/common/container";
import { DemoBanner } from "@/components/common/demo-notice";
import { SectionTitle } from "@/components/common/section-title";
import { SearchBar } from "@/components/search/search-bar";
import { SearchResults } from "@/components/search/search-results";
import { getCategoryBySlug, getCategorySlugs } from "@/config/categories";
import { DEFAULT_FILTERS, DEFAULT_LOCALE, RESULTS_PER_PAGE } from "@/lib/constants";
import { isDemoCatalogueActive } from "@/lib/mock";
import { searchAllSources } from "@/lib/search";
import { buildGraph, itemListNode, pageUrl, schemaIds, webPageNode } from "@/lib/seo/json-ld";
import type { CategorySlug } from "@/types";

interface CategoryPageProps {
  params: Promise<{ locale: UiLocale; slug: string }>;
}

/**
 * Rendered on each request, never at build time: whether prices come from
 * the demonstration catalogue or from live eBay offers depends on the
 * Worker's runtime secrets, which the build machine does not have. Live
 * marketplace answers are cached by the adapters (src/lib/ebay/cache.ts).
 */
export const dynamic = "force-dynamic";

/** Categories are a fixed, known set: pre-render them all at build time. */
export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

/**
 * A category page is a browse, not a keyword search: no term, just the
 * category filter. Same pipeline, same components. Memoised so metadata and
 * page share one lookup.
 */
const browseCategory = cache(async (categorySlug: CategorySlug) =>
  searchAllSources({
    term: "",
    locale: DEFAULT_LOCALE,
    page: 1,
    perPage: RESULTS_PER_PAGE,
    filters: { ...DEFAULT_FILTERS, sort: "deal_score", categorySlug },
  }),
);

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: { absolute: category.seoTitle ?? category.name },
    description: category.metaDescription ?? category.description,
    alternates: localeAlternates(locale, `/category/${category.slug}`),
    // Not indexed: a listing of example prices, or a category with no live
    // offer right now (an empty page).
    ...(isDemoCatalogueActive() || (await browseCategory(category.slug)).products.length === 0
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const result = await browseCategory(category.slug);

  const path = `/category/${category.slug}`;
  const url = pageUrl(locale, path);
  const isDemo = isDemoCatalogueActive();
  // The list points at real product pages only, never at example offers.
  const listsProducts = !isDemo && result.products.length > 0;

  return (
    <>
      <DemoBanner />
      <JsonLd
        data={buildGraph(
          webPageNode({
            url,
            name: category.seoTitle ?? category.name,
            description: category.metaDescription ?? category.description,
            type: "CollectionPage",
            mainEntity: listsProducts ? schemaIds.itemList(url) : undefined,
            hasBreadcrumb: true,
          }),
          listsProducts &&
            itemListNode(
              url,
              result.products.map((product) => ({
                name: product.title,
                url: pageUrl(locale, `/product/${encodeURIComponent(product.id)}`),
              })),
            ),
        )}
      />

      <Container className="space-y-8 py-10">
        <Breadcrumbs
          path={path}
          items={[{ name: "Comparateur", href: "/search" }, { name: category.name }]}
        />

        <SectionTitle
          as="h1"
          title={`${category.name} : comparateur de prix`}
          description={category.description}
        />

        <div className="max-w-2xl">
          <Suspense fallback={null}>
            <SearchBar placeholder={`Rechercher dans ${category.name}`} />
          </Suspense>
        </div>

        <SearchResults result={result} emptyTermLabel={category.name} />

        <CategoryGuide slug={category.slug} name={category.name} />
      </Container>
    </>
  );
}
