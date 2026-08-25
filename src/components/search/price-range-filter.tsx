"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEARCH_PARAM_KEYS } from "@/lib/constants";
import { useFilters } from "@/hooks/use-filters";

/**
 * Min / max price bounds, in euros.
 *
 * Applied on submit rather than on every keystroke: typing "1200" would
 * otherwise fire four navigations, three of them on nonsense bounds.
 */
export function PriceRangeFilter() {
  const { get, apply } = useFilters();
  const urlMin = get(SEARCH_PARAM_KEYS.minPrice) ?? "";
  const urlMax = get(SEARCH_PARAM_KEYS.maxPrice) ?? "";

  const [draft, setDraft] = useState({ min: urlMin, max: urlMax });
  const [syncedWith, setSyncedWith] = useState({ min: urlMin, max: urlMax });

  // The inputs are a draft of the URL, so they must follow it back when it
  // changes elsewhere (Reset, a menu shortcut, the back button). Adjusting
  // state during render is React's documented answer here — an effect would
  // render the stale values first, then immediately render again.
  if (syncedWith.min !== urlMin || syncedWith.max !== urlMax) {
    setSyncedWith({ min: urlMin, max: urlMax });
    setDraft({ min: urlMin, max: urlMax });
  }

  const invalid = draft.min !== "" && draft.max !== "" && Number(draft.min) > Number(draft.max);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (invalid) return;
        apply({
          [SEARCH_PARAM_KEYS.minPrice]: draft.min || null,
          [SEARCH_PARAM_KEYS.maxPrice]: draft.max || null,
        });
      }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2">
        <Input
          type="number"
          inputMode="numeric"
          min={0}
          value={draft.min}
          onChange={(event) => setDraft((current) => ({ ...current, min: event.target.value }))}
          placeholder="Min"
          aria-label="Prix minimum en euros"
          aria-invalid={invalid}
          className="w-full"
        />
        <span className="text-sm text-muted-foreground" aria-hidden>
          à
        </span>
        <Input
          type="number"
          inputMode="numeric"
          min={0}
          value={draft.max}
          onChange={(event) => setDraft((current) => ({ ...current, max: event.target.value }))}
          placeholder="Max"
          aria-label="Prix maximum en euros"
          aria-invalid={invalid}
          className="w-full"
        />
      </div>

      {invalid ? (
        <p role="alert" className="text-xs text-destructive">
          Le minimum doit être inférieur au maximum.
        </p>
      ) : null}

      <Button type="submit" variant="outline" size="sm" disabled={invalid} className="w-full">
        Appliquer
      </Button>
    </form>
  );
}
