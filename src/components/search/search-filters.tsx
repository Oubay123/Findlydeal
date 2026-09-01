"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SourceLogo } from "@/components/common/source-logo";
import { FilterPill } from "@/components/search/filter-pill";
import { getSourcePresentation } from "@/config/sources";
import { PriceRangeFilter } from "@/components/search/price-range-filter";
import { categories } from "@/config/categories";
import {
  CONDITION_LABELS,
  CONDITION_OPTIONS,
  SEARCH_PARAM_KEYS,
  SORT_OPTIONS,
} from "@/lib/constants";
import { useFilters } from "@/hooks/use-filters";
import { useDictionary } from "@/i18n/use-locale";

interface SearchFiltersProps {
  /**
   * Which platforms exist, handed down by the page.
   *
   * Deliberately a prop and not `getAllSources()`: importing the source
   * registry here would pull the adapters — their env reads, their error
   * classes, their future HTTP clients — into the browser bundle. Only the ids
   * travel; names and colours come from `@/config/sources`, which is plain
   * data and safe on the client.
   */
  sourceIds: string[];
  /** Off inside the drawer, which already has a title and a close button. */
  showHeading?: boolean;
}

/**
 * Filter panel of the search page.
 *
 * Every control writes to the URL through `useFilters`, so the server
 * component re-renders the results with no client-side state to keep in sync.
 */
export function SearchFilters({ sourceIds, showHeading = true }: SearchFiltersProps) {
  const { get, isActive, apply, toggle, clear } = useFilters();
  const t = useDictionary();

  return (
    <aside className="space-y-6" aria-label={t.search.filters}>
      {showHeading ? (
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold">{t.search.filters}</h2>
          <Button variant="ghost" size="sm" onClick={clear} className="text-primary">
            {t.search.reset}
          </Button>
        </div>
      ) : (
        <Button variant="ghost" size="sm" onClick={clear} className="-ml-2 text-primary">
          {t.search.reset}
        </Button>
      )}

      <FilterGroup label={t.search.sortBy}>
        <Select
          value={get(SEARCH_PARAM_KEYS.sort) ?? "relevance"}
          onValueChange={(value) => apply({ [SEARCH_PARAM_KEYS.sort]: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pertinence" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup label={t.search.category}>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <FilterPill
              key={category.slug}
              label={category.name}
              active={isActive(SEARCH_PARAM_KEYS.category, category.slug)}
              onToggle={() =>
                apply({
                  [SEARCH_PARAM_KEYS.category]: isActive(SEARCH_PARAM_KEYS.category, category.slug)
                    ? null
                    : category.slug,
                })
              }
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label={t.search.price}>
        <PriceRangeFilter />
      </FilterGroup>

      <FilterGroup label={t.search.condition}>
        <div className="flex flex-wrap gap-2">
          {CONDITION_OPTIONS.map((condition) => (
            <FilterPill
              key={condition}
              label={CONDITION_LABELS[condition]}
              active={isActive(SEARCH_PARAM_KEYS.condition, condition)}
              onToggle={() => toggle(SEARCH_PARAM_KEYS.condition, condition)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label={t.search.platform}>
        <div className="flex flex-wrap gap-2">
          {sourceIds.map((sourceId) => (
            <FilterPill
              key={sourceId}
              label={<SourceLogo source={sourceId} />}
              ariaLabel={getSourcePresentation(sourceId).label}
              active={isActive(SEARCH_PARAM_KEYS.source, sourceId)}
              onToggle={() => toggle(SEARCH_PARAM_KEYS.source, sourceId)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label={t.search.deals}>
        <FilterPill
          label={t.search.dealsOnly}
          active={isActive(SEARCH_PARAM_KEYS.dealsOnly, "1")}
          onToggle={() =>
            apply({
              [SEARCH_PARAM_KEYS.dealsOnly]: isActive(SEARCH_PARAM_KEYS.dealsOnly, "1")
                ? null
                : "1",
            })
          }
        />
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
      {children}
    </div>
  );
}
