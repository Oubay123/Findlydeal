import { getCategoryBySlug } from "@/config/categories";
import { DEFAULT_LOCALE, RESULTS_PER_PAGE, SEARCH_PARAM_KEYS, SORT_OPTIONS } from "@/lib/constants";
import type { ProductCondition, SearchQuery, SortOption, SourceId } from "@/types";
import { getAllSources } from "@/lib/sources";

/**
 * The URL is the single source of truth for a search: it makes results
 * shareable, bookmarkable and server-renderable. This module is the only
 * place that reads and writes that URL shape.
 */

export type RawSearchParams = Record<string, string | string[] | undefined>;

const CONDITIONS: ProductCondition[] = ["new", "refurbished", "used"];

/** Parse Next.js `searchParams` into a validated `SearchQuery`. */
export function parseSearchParams(params: RawSearchParams): SearchQuery {
  const term = first(params[SEARCH_PARAM_KEYS.term])?.trim() ?? "";
  const page = Math.max(1, toInt(first(params[SEARCH_PARAM_KEYS.page])) ?? 1);

  return {
    term,
    locale: DEFAULT_LOCALE,
    page,
    perPage: RESULTS_PER_PAGE,
    filters: {
      sort: parseSort(first(params[SEARCH_PARAM_KEYS.sort])),
      categorySlug: getCategoryBySlug(first(params[SEARCH_PARAM_KEYS.category]) ?? "")?.slug,
      minPrice: toInt(first(params[SEARCH_PARAM_KEYS.minPrice])),
      maxPrice: toInt(first(params[SEARCH_PARAM_KEYS.maxPrice])),
      conditions: parseConditions(params[SEARCH_PARAM_KEYS.condition]),
      sources: parseSources(params[SEARCH_PARAM_KEYS.source]),
      dealsOnly: first(params[SEARCH_PARAM_KEYS.dealsOnly]) === "1",
    },
  };
}

/** Serialise a query back into a `/search?…` URL. Omits every default. */
export function buildSearchUrl(query: SearchQuery): string {
  const search = new URLSearchParams();
  const { filters } = query;

  if (query.term) search.set(SEARCH_PARAM_KEYS.term, query.term);
  if (filters.categorySlug) search.set(SEARCH_PARAM_KEYS.category, filters.categorySlug);
  if (filters.sort !== "relevance") search.set(SEARCH_PARAM_KEYS.sort, filters.sort);
  if (filters.minPrice !== undefined) {
    search.set(SEARCH_PARAM_KEYS.minPrice, String(filters.minPrice));
  }
  if (filters.maxPrice !== undefined) {
    search.set(SEARCH_PARAM_KEYS.maxPrice, String(filters.maxPrice));
  }
  filters.conditions?.forEach((condition) => {
    search.append(SEARCH_PARAM_KEYS.condition, condition);
  });
  filters.sources?.forEach((source) => search.append(SEARCH_PARAM_KEYS.source, source));
  if (filters.dealsOnly) search.set(SEARCH_PARAM_KEYS.dealsOnly, "1");
  if (query.page > 1) search.set(SEARCH_PARAM_KEYS.page, String(query.page));

  const queryString = search.toString();
  return queryString ? `/search?${queryString}` : "/search";
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function toAll(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function toInt(value: string | undefined): number | undefined {
  if (value === undefined) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseSort(value: string | undefined): SortOption {
  const match = SORT_OPTIONS.find((option) => option.value === value);
  return match?.value ?? "relevance";
}

function parseConditions(value: string | string[] | undefined): ProductCondition[] | undefined {
  const parsed = toAll(value).filter((item): item is ProductCondition =>
    CONDITIONS.includes(item as ProductCondition),
  );
  return parsed.length > 0 ? parsed : undefined;
}

function parseSources(value: string | string[] | undefined): SourceId[] | undefined {
  const known = new Set<string>(getAllSources().map((source) => source.id));
  const parsed = toAll(value).filter((item): item is SourceId => known.has(item));
  return parsed.length > 0 ? parsed : undefined;
}
