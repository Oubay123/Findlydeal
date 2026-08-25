"use client";

import { LayoutGrid, List } from "lucide-react";
import { SEARCH_PARAM_KEYS, type ResultsView } from "@/lib/constants";
import { useFilters } from "@/hooks/use-filters";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  active: ResultsView;
}

/** Switches the result layout between cards and rows. Persisted in the URL. */
export function ViewToggle({ active }: ViewToggleProps) {
  const { apply } = useFilters();

  return (
    <div
      role="group"
      aria-label="Affichage des résultats"
      className="inline-flex rounded-lg border p-0.5"
    >
      <ViewButton
        label="Vue grille"
        isActive={active === "grid"}
        onSelect={() => apply({ [SEARCH_PARAM_KEYS.view]: null })}
      >
        <LayoutGrid className="size-4" aria-hidden />
      </ViewButton>
      <ViewButton
        label="Vue liste"
        isActive={active === "list"}
        onSelect={() => apply({ [SEARCH_PARAM_KEYS.view]: "list" })}
      >
        <List className="size-4" aria-hidden />
      </ViewButton>
    </div>
  );
}

function ViewButton({
  label,
  isActive,
  onSelect,
  children,
}: {
  label: string;
  isActive: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      aria-label={label}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md transition-colors focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}
