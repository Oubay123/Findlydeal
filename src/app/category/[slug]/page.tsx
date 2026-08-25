import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { DemoBanner } from "@/components/common/demo-notice";
import { SectionTitle } from "@/components/common/section-title";
import { SearchBar } from "@/components/search/search-bar";
import { SearchResults } from "@/components/search/search-results";
import { getCategoryBySlug, getCategorySlugs } from "@/config/categories";
import { DEFAULT_FILTERS, DEFAULT_LOCALE, RESULTS_PER_PAGE } from "@/lib/constants";
import { searchAllSources } from "@/lib/search";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

/** See the note on `revalidate` in `/product/[id]` — same reasoning. */
export const revalidate = 3600;

/** Categories are a fixed, known set: pre-render them all at build time. */
export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  // A category page is a browse, not a keyword search: no term, just the
  // category filter. Same pipeline, same components.
  const result = await searchAllSources({
    term: "",
    locale: DEFAULT_LOCALE,
    page: 1,
    perPage: RESULTS_PER_PAGE,
    filters: { ...DEFAULT_FILTERS, sort: "deal_score", categorySlug: category.slug },
  });

  return (
    <>
      <DemoBanner />

      <Container className="space-y-8 py-10">
        <Breadcrumbs items={[{ name: "Comparateur", href: "/search" }, { name: category.name }]} />

        <SectionTitle title={category.name} description={category.description} />

        <div className="max-w-2xl">
          <Suspense fallback={null}>
            <SearchBar placeholder={`Rechercher dans ${category.name}`} />
          </Suspense>
        </div>

        <SearchResults result={result} emptyTermLabel={category.name} />
      </Container>
    </>
  );
}
