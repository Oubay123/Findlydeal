import type { SearchFilters, SortOption } from "@/types";

/** Query string keys, kept in one place so URL and UI never drift apart. */
export const SEARCH_PARAM_KEYS = {
  term: "q",
  category: "category",
  sort: "sort",
  minPrice: "min",
  maxPrice: "max",
  condition: "condition",
  source: "source",
  dealsOnly: "deals",
  page: "page",
  view: "view",
  compare: "compare",
} as const;

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Pertinence" },
  { value: "price_asc", label: "Prix croissant" },
  { value: "price_desc", label: "Prix décroissant" },
  { value: "deal_score", label: "Meilleures affaires" },
  { value: "rating_desc", label: "Meilleures notes" },
  { value: "newest", label: "Nouveautés" },
];

export const DEFAULT_FILTERS: SearchFilters = {
  sort: "relevance",
};

export const RESULTS_PER_PAGE = 24;

/** Debounce applied to the search input before firing a query, in ms. */
export const SEARCH_DEBOUNCE_MS = 300;

/** How results are laid out. Grid is the default.*/
export type ResultsView = "grid" | "list";

/** It takes at least two products for a comparison to mean anything. */
export const MIN_COMPARED_PRODUCTS = 2;

/** Above six columns, the table stops being readable even on a large screen. */
export const MAX_COMPARED_PRODUCTS = 6;
