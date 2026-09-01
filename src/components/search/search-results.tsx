import { LocaleLink } from "@/components/common/locale-link";
import { FilterX, PackageSearch, SearchX, TriangleAlert } from "lucide-react";
import { DemoFootnote } from "@/components/common/demo-notice";
import { ProductCard } from "@/components/product/product-card";
import { ProductListRow } from "@/components/product/product-list-row";
import { CompareToggle } from "@/components/search/compare-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import type { ResultsView } from "@/lib/constants";
import type { SearchFilters, SearchQuery, SearchResult } from "@/types";

interface SearchResultsProps {
  result: SearchResult;
  /** Shown instead of the search term on browse pages (categories). */
  emptyTermLabel?: string;
  view?: ResultsView;
  /** Adds the compare checkbox. Off on category pages, which are browsing. */
  selectable?: boolean;
}

/**
 * Renders the outcome of a search: results, partial-failure notices, or the
 * right empty state. Server component — no interactivity of its own.
 */
export function SearchResults({
  result,
  emptyTermLabel,
  view = "grid",
  selectable = false,
}: SearchResultsProps) {
  const { products, errors, query } = result;
  const label = query.term || emptyTermLabel;

  return (
    <section aria-labelledby="resultats" className="space-y-6">
      {/*
        Visually hidden, but it is what makes the outline valid: product card
        titles are h3, and without an h2 here the page jumps from its h1
        straight to them.
      */}
      <h2 id="resultats" className="sr-only">
        Résultats de recherche
      </h2>

      {errors.length > 0 ? (
        <div className="flex items-start gap-2 rounded-xl border p-4 text-sm text-muted-foreground">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          <p>
            Certaines sources n&apos;ont pas répondu : {errors.map((e) => e.source).join(", ")}. Les
            résultats ci-dessous sont partiels.
          </p>
        </div>
      ) : null}

      {products.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {result.totalCount} produit{result.totalCount > 1 ? "s" : ""}
            {label ? (
              <>
                {" "}
                pour <span className="font-medium text-foreground">«&nbsp;{label}&nbsp;»</span>
              </>
            ) : null}
          </p>

          {view === "list" ? (
            <div className="space-y-4">
              {products.map((product) => (
                <ProductListRow
                  key={product.id}
                  product={product}
                  action={
                    selectable ? (
                      <CompareToggle productId={product.id} productTitle={product.title} />
                    ) : null
                  }
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  action={
                    selectable ? (
                      <CompareToggle productId={product.id} productTitle={product.title} />
                    ) : null
                  }
                />
              ))}
            </div>
          )}

          <DemoFootnote className="pt-2" />
        </>
      ) : (
        <EmptyState query={query} />
      )}
    </section>
  );
}

/** Any filter beyond the sort order, which is always set. */
function hasActiveFilters(filters: SearchFilters): boolean {
  return Boolean(
    filters.categorySlug ||
    filters.conditions?.length ||
    filters.sources?.length ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.dealsOnly,
  );
}

/**
 * Three different situations, three different messages.
 *
 * The distinction matters: a visitor who set a price ceiling and got nothing
 * back was told "Lancez une recherche", which reads as if their filter had
 * never been applied. Zero results caused by a filter has to say so, and give
 * a way out.
 */
function EmptyState({ query }: { query: SearchQuery }) {
  const filtered = hasActiveFilters(query.filters);

  if (!query.term && !filtered) {
    return (
      <Placeholder
        icon={<PackageSearch className="size-6" aria-hidden />}
        title="Lancez une recherche"
        description="Tapez ce que vous cherchez et Findlydeal compare toutes les plateformes en une fois."
      />
    );
  }

  if (filtered) {
    return (
      <Placeholder
        icon={<FilterX className="size-6" aria-hidden />}
        title="Aucun produit ne passe ces filtres"
        description={
          query.term
            ? "Aucune offre ne correspond à la fois à votre recherche et aux filtres appliqués."
            : "Les filtres appliqués ne laissent passer aucune offre du catalogue."
        }
        action={
          <LocaleLink
            href={query.term ? `/search?q=${encodeURIComponent(query.term)}` : "/search"}
            className="rounded-md font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
          >
            Réinitialiser les filtres
          </LocaleLink>
        }
      />
    );
  }

  return (
    <Placeholder
      icon={<SearchX className="size-6" aria-hidden />}
      title="Aucune offre trouvée"
      description="Essayez un terme plus large, ou une autre orthographe."
    />
  );
}

function Placeholder({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  /** A way out of the empty state, when one exists. */
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-cream py-20 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-primary">
        {icon}
      </span>
      <h3 className="font-display font-semibold">{title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      {action ? <div className="pt-1 text-sm">{action}</div> : null}
    </div>
  );
}

/** Shown while results stream in, via the page's Suspense boundary. */
export function SearchResultsSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-80 w-full rounded-2xl" />
      ))}
    </div>
  );
}
