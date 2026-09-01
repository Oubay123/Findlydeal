"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useActiveFilterCount } from "@/components/search/active-filters";
import { SearchFilters } from "@/components/search/search-filters";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/use-locale";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FiltersDrawerProps {
  sourceIds: string[];
}

/**
 * The filter panel on small screens.
 *
 * Below `lg` the sidebar is hidden, which until now meant the filters were
 * simply unreachable on a phone — the majority of the traffic a comparison
 * site gets. This puts them behind a button that carries the number of
 * applied filters, so their existence is visible even when the panel is not.
 *
 * The panel itself is the same `SearchFilters` as on desktop, not a copy:
 * Radix unmounts the sheet's content while it is closed, so the second render
 * costs nothing until a visitor opens it.
 */
export function FiltersDrawer({ sourceIds }: FiltersDrawerProps) {
  const [open, setOpen] = useState(false);
  const count = useActiveFilterCount();
  const t = useDictionary();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline-brand" size="md" className="lg:hidden">
          <SlidersHorizontal aria-hidden />
          {t.search.filters}
          {count > 0 ? (
            <span className="ml-1 inline-flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {count}
            </span>
          ) : null}
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[88vw] gap-0 overflow-y-auto p-6 sm:max-w-sm">
        <SheetHeader className="p-0">
          <SheetTitle>{t.search.filters}</SheetTitle>
          <SheetDescription>
            Les résultats se mettent à jour à chaque choix. Fermez le panneau pour les voir.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          <SearchFilters sourceIds={sourceIds} showHeading={false} />
        </div>

        <SheetFooter className="sticky bottom-0 bg-popover p-0 pt-2">
          <Button size="md" className="w-full" onClick={() => setOpen(false)}>
            {t.search.seeResults}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
