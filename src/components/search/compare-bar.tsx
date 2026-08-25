"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/hooks/use-compare";
import { MAX_COMPARED_PRODUCTS, MIN_COMPARED_PRODUCTS } from "@/lib/constants";

/**
 * Floating summary of the comparison basket, shown on every page that lets a
 * visitor pick products.
 *
 * Renders nothing until something is selected, so it never eats screen space
 * on a first visit. It also renders its own spacer: the bar is `fixed`, and
 * without one it would cover the last row of results.
 */
export function CompareBar() {
  const { selected, remove, clear, canCompare, compareHref } = useCompare();
  if (selected.length === 0) return null;

  return (
    <>
      {/* Reserves the height the fixed bar occupies. */}
      <div aria-hidden className="h-28 sm:h-24" />

      <div
        role="region"
        aria-label="Produits sélectionnés pour comparaison"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4"
      >
        <div className="pointer-events-auto mx-auto flex max-w-4xl flex-wrap items-center gap-3 rounded-2xl border bg-white p-3 shadow-xl shadow-black/10">
          <p className="shrink-0 pl-1 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{selected.length}</span> /{" "}
            {MAX_COMPARED_PRODUCTS} sélectionné{selected.length > 1 ? "s" : ""}
          </p>

          <ul className="flex min-w-0 flex-1 flex-wrap gap-2">
            {selected.map((entry) => (
              <li key={entry.id}>
                <span className="flex max-w-[12rem] items-center gap-1.5 rounded-full bg-cream py-1 pr-1 pl-3 text-xs sm:max-w-[14rem]">
                  <span className="truncate">{entry.title}</span>
                  <button
                    type="button"
                    onClick={() => remove(entry.id)}
                    aria-label={`Retirer ${entry.title}`}
                    className="rounded-full p-1 transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <X className="size-3" aria-hidden />
                  </button>
                </span>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Button variant="ghost" size="sm" onClick={clear}>
              Vider
            </Button>
            <Button asChild size="md" disabled={!canCompare}>
              {canCompare ? (
                <Link href={compareHref}>
                  Comparer
                  <ArrowRight data-icon="inline-end" aria-hidden />
                </Link>
              ) : (
                <span aria-disabled className="cursor-not-allowed opacity-60">
                  Choisissez-en {MIN_COMPARED_PRODUCTS}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
