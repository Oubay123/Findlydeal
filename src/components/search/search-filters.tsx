"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterPill } from "@/components/search/filter-pill";
import { PriceRangeFilter } from "@/components/search/price-range-filter";
import { categories } from "@/config/categories";
import {
  CONDITION_LABELS,
  CONDITION_OPTIONS,
  SEARCH_PARAM_KEYS,
  SORT_OPTIONS,
} from "@/lib/constants";
import { useFilters } from "@/hooks/use-filters";

interface SearchFiltersProps {
  /**
   * Platform list, handed down by the page.
   *
   * Deliberately a prop and not `getAllSources()`: importing the source
   * registry here would pull the adapters — their env reads, their error
   * classes, their future HTTP clients — into the browser bundle, to render
   * two labels.
   */
  sources: { id: string; label: string }[];
}

/**
 * Filter panel of the search page.
 *
 * Every control writes to the URL through `useFilters`, so the server
 * component re-renders the results with no client-side state to keep in sync.
 */
export function SearchFilters({ sources }: SearchFiltersProps) {
  const { get, isActive, apply, toggle, clear } = useFilters();

  return (
    <aside className="space-y-6" aria-label="Filtres de recherche">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold">Filtres</h2>
        <Button variant="ghost" size="sm" onClick={clear} className="text-primary">
          Réinitialiser
        </Button>
      </div>

      <FilterGroup label="Trier par">
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

      <FilterGroup label="Catégorie">
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

      <FilterGroup label="Prix (€, livraison comprise)">
        <PriceRangeFilter />
      </FilterGroup>

      <FilterGroup label="État">
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

      <FilterGroup label="Plateforme">
        <div className="flex flex-wrap gap-2">
          {sources.map((source) => (
            <FilterPill
              key={source.id}
              label={source.label}
              active={isActive(SEARCH_PARAM_KEYS.source, source.id)}
              onToggle={() => toggle(SEARCH_PARAM_KEYS.source, source.id)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Bonnes affaires">
        <FilterPill
          label="Bonnes affaires uniquement"
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
