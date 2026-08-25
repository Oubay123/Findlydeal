import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { DemoBanner } from "@/components/common/demo-notice";
import { CompareBar } from "@/components/search/compare-bar";
import { SearchBar } from "@/components/search/search-bar";
import { SearchFilters } from "@/components/search/search-filters";
import { SearchResults, SearchResultsSkeleton } from "@/components/search/search-results";
import { ViewToggle } from "@/components/search/view-toggle";
import { SEARCH_PARAM_KEYS, type ResultsView } from "@/lib/constants";
import { parseSearchParams, searchAllSources } from "@/lib/search";
import { getAllSources } from "@/lib/sources";
import type { RawSearchParams } from "@/lib/search/params";
import type { SearchQuery } from "@/types";

export const metadata: Metadata = {
  title: "Comparateur de prix",
  description:
    "Recherchez un produit et comparez son prix sur toutes les plateformes en une fois : filtres par catégorie, budget, état et plateforme, tri par meilleure affaire.",
  alternates: { canonical: "/search" },
};

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
  const view: ResultsView = first(params[SEARCH_PARAM_KEYS.view]) === "list" ? "list" : "grid";

  // Two labels, not the adapters themselves — see `SearchFilters`.
  const sources = getAllSources().map((source) => ({ id: source.id, label: source.label }));

  return (
    <>
      <DemoBanner />

      <Container className="space-y-6 py-8">
        <Breadcrumbs items={[{ name: "Comparateur" }]} />

        <div className="space-y-2">
          <h1 className="text-2xl font-bold sm:text-3xl">Comparateur de prix</h1>
          <p className="text-sm text-muted-foreground">
            Une recherche, toutes les plateformes, le prix livraison comprise.
          </p>
        </div>

        <div className="max-w-2xl">
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <Suspense fallback={null}>
            <SearchFilters sources={sources} />
          </Suspense>

          <div className="min-w-0 space-y-5">
            <div className="flex items-center justify-end">
              <Suspense fallback={null}>
                <ViewToggle active={view} />
              </Suspense>
            </div>

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
