"use client";

import { X } from "lucide-react";
import { categories } from "@/config/categories";
import { getSourcePresentation } from "@/config/sources";
import { CONDITION_LABELS, SEARCH_PARAM_KEYS } from "@/lib/constants";
import { useFilters } from "@/hooks/use-filters";
import { useDictionary } from "@/i18n/use-locale";
import type { ProductCondition } from "@/types";

interface ActiveChip {
  /** Unique across the row, since the same key can appear several times. */
  id: string;
  label: string;
  remove: () => void;
}

/**
 * The filters currently applied, each removable in one click.
 *
 * The side panel already shows what is active, but it is off-screen on mobile
 * and easy to miss on desktop once you have scrolled into the results. A
 * visitor who cannot see why a search returns four products will blame the
 * catalogue, not the filter they set two clicks ago.
 *
 * Renders nothing when no filter is applied.
 */
export function ActiveFilters() {
  const { get, getAll, apply, toggle, clear } = useFilters();
  const t = useDictionary();

  const chips: ActiveChip[] = [];

  const categorySlug = get(SEARCH_PARAM_KEYS.category);
  if (categorySlug) {
    const category = categories.find((item) => item.slug === categorySlug);
    chips.push({
      id: "category",
      label: category?.name ?? categorySlug,
      remove: () => apply({ [SEARCH_PARAM_KEYS.category]: null }),
    });
  }

  for (const condition of getAll(SEARCH_PARAM_KEYS.condition)) {
    chips.push({
      id: `condition:${condition}`,
      label: CONDITION_LABELS[condition as ProductCondition] ?? condition,
      remove: () => toggle(SEARCH_PARAM_KEYS.condition, condition),
    });
  }

  for (const source of getAll(SEARCH_PARAM_KEYS.source)) {
    chips.push({
      id: `source:${source}`,
      label: getSourcePresentation(source).label,
      remove: () => toggle(SEARCH_PARAM_KEYS.source, source),
    });
  }

  // One chip for the price, whichever bound is set: "de 100 à 500 €" reads
  // better than two chips a visitor has to remove one at a time.
  const min = get(SEARCH_PARAM_KEYS.minPrice);
  const max = get(SEARCH_PARAM_KEYS.maxPrice);
  if (min || max) {
    const label =
      min && max ? `${min} à ${max} €` : min ? `à partir de ${min} €` : `jusqu'à ${max} €`;
    chips.push({
      id: "price",
      label,
      remove: () =>
        apply({ [SEARCH_PARAM_KEYS.minPrice]: null, [SEARCH_PARAM_KEYS.maxPrice]: null }),
    });
  }

  if (get(SEARCH_PARAM_KEYS.dealsOnly) === "1") {
    chips.push({
      id: "deals",
      label: "Bonnes affaires uniquement",
      remove: () => apply({ [SEARCH_PARAM_KEYS.dealsOnly]: null }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label={t.search.activeFilters}>
      <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {t.search.activeFilters}
      </span>

      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={chip.remove}
          aria-label={`${t.search.removeFilter} ${chip.label}`}
          className="inline-flex items-center gap-1 rounded-full border border-transparent bg-cream px-3 py-1 text-sm text-foreground transition-colors hover:bg-brand-100 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
        >
          {chip.label}
          <X className="size-3.5 text-muted-foreground" aria-hidden />
        </button>
      ))}

      {chips.length > 1 ? (
        <button
          type="button"
          onClick={clear}
          className="rounded-md px-1 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
        >
          {t.search.clearAll}
        </button>
      ) : null}
    </div>
  );
}

/**
 * How many filters are applied, for the mobile trigger's badge.
 * Counts the same things `ActiveFilters` renders, price as one.
 */
export function useActiveFilterCount(): number {
  const { get, getAll } = useFilters();

  return (
    (get(SEARCH_PARAM_KEYS.category) ? 1 : 0) +
    getAll(SEARCH_PARAM_KEYS.condition).length +
    getAll(SEARCH_PARAM_KEYS.source).length +
    (get(SEARCH_PARAM_KEYS.minPrice) || get(SEARCH_PARAM_KEYS.maxPrice) ? 1 : 0) +
    (get(SEARCH_PARAM_KEYS.dealsOnly) === "1" ? 1 : 0)
  );
}
