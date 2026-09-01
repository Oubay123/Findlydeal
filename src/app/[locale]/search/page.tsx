import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { DemoBanner } from "@/components/common/demo-notice";
import { CompareBar } from "@/components/search/compare-bar";
import { SearchBar } from "@/components/search/search-bar";
import { ActiveFilters } from "@/components/search/active-filters";
import { FiltersDrawer } from "@/components/search/filters-drawer";
import { SearchFilters } from "@/components/search/search-filters";
import { SearchResults, SearchResultsSkeleton } from "@/components/search/search-results";
import { ViewToggle } from "@/components/search/view-toggle";
import { SEARCH_PARAM_KEYS, type ResultsView } from "@/lib/constants";
import { parseSearchParams, searchAllSources } from "@/lib/search";
import { getServerDictionary } from "@/i18n/server";
import { getAllSources } from "@/lib/sources";
import type { RawSearchParams } from "@/lib/search/params";
import type { SearchQuery } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Comparateur de prix",
    description:
      "Recherchez un produit et comparez son prix sur toutes les plateformes : filtres par catégorie, budget, état et plateforme, tri par meilleure affaire.",
    alternates: localeAlternates(locale, "/search"),
  };
}

interface SearchPageProps {
  searchParams: Promise<RawSearchParams>;
}

/**
 * The comparator.
 *
 * The URL holds the whole query — term, filters, layout and comparison basket —
 * so this server component renders results directly: no client-side fetching,
 * shareable links, cacheable responses.
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = parseSearchParams(params);
  const t = await getServerDictionary();
  const view: ResultsView = first(params[SEARCH_PARAM_KEYS.view]) === "list" ? "list" : "grid";

  // Two labels, not the adapters themselves — see `SearchFilters`.
  const sourceIds = getAllSources().map((source) => source.id);

  return (
    <>
      <DemoBanner />

      <Container className="space-y-6 py-8">
        <Breadcrumbs items={[{ name: t.nav.search }]} />

        <div className="space-y-2">
          <h1 className="text-2xl font-bold sm:text-3xl">{t.search.title}</h1>
          <p className="text-sm text-muted-foreground">{t.search.subtitle}</p>
        </div>

        <div className="max-w-2xl">
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
          {/* Hidden below lg, where the drawer takes over. */}
          <div className="hidden lg:block">
            <Suspense fallback={null}>
              <SearchFilters sourceIds={sourceIds} />
            </Suspense>
          </div>

          <div className="min-w-0 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <Suspense fallback={null}>
                <FiltersDrawer sourceIds={sourceIds} />
              </Suspense>
              <Suspense fallback={null}>
                <ViewToggle active={view} />
              </Suspense>
            </div>

            <Suspense fallback={null}>
              <ActiveFilters />
            </Suspense>

            <Suspense key={JSON.stringify(params)} fallback={<SearchResultsSkeleton />}>
              <Results query={query} view={view} />
            </Suspense>
          </div>
        </div>
      </Container>

      <Suspense fallback={null}>
        <CompareBar />
      </Suspense>
    </>
  );
}

/** Split out so the results can stream in behind their own Suspense boundary. */
async function Results({ query, view }: { query: SearchQuery; view: ResultsView }) {
  const result = await searchAllSources(query);
  return <SearchResults result={result} view={view} selectable />;
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
