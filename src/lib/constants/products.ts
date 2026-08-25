import type { ProductCondition } from "@/types";

/**
 * Condition labels, in one place: they appear on cards, on offer rows and in
 * the filter panel, and three copies would eventually say three things.
 */
export const CONDITION_LABELS: Record<ProductCondition, string> = {
  new: "Neuf",
  refurbished: "Reconditionné",
  used: "Occasion",
  unknown: "État inconnu",
};

/** The conditions a visitor can actually filter on, in display order. */
export const CONDITION_OPTIONS: ProductCondition[] = ["new", "refurbished", "used"];
