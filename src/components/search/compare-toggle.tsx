"use client";

import { Check, Plus } from "lucide-react";
import { MAX_COMPARED_PRODUCTS } from "@/lib/constants";
import { useCompare } from "@/hooks/use-compare";
import { cn } from "@/lib/utils";

interface CompareToggleProps {
  productId: string;
  productTitle: string;
  className?: string;
}

/**
 * Adds or removes one product from the side-by-side comparison.
 *
 * Used both in the results grid and on a product page, which is why the title
 * travels with the id: the basket labels its chips from what it was handed,
 * not from a catalogue lookup.
 */
export function CompareToggle({ productId, productTitle, className }: CompareToggleProps) {
  const { isSelected, isFull, toggle } = useCompare();
  const selected = isSelected(productId);
  const disabled = !selected && isFull;

  return (
    <button
      type="button"
      onClick={() => toggle({ id: productId, title: productTitle })}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={
        selected
          ? `Retirer ${productTitle} de la comparaison`
          : `Ajouter ${productTitle} à la comparaison`
      }
      title={disabled ? `Comparaison limitée à ${MAX_COMPARED_PRODUCTS} produits` : undefined}
      className={cn(
        "inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border text-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none",
        selected
          ? "border-primary bg-brand-100 font-medium text-primary"
          : "text-muted-foreground hover:border-primary/60 hover:text-primary",
        disabled && "cursor-not-allowed opacity-45 hover:border-current hover:text-current",
        className,
      )}
    >
      {selected ? (
        <Check className="size-4" aria-hidden />
      ) : (
        <Plus className="size-4" aria-hidden />
      )}
      {selected ? "Sélectionné" : "Comparer"}
    </button>
  );
}
