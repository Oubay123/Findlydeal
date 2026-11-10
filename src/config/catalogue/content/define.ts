import type { ProductSpec } from "@/types";

/**
 * Editorial sheet of an extended-catalogue product: what a buyer should know
 * before comparing offers. Written by hand, factual, no marketing claims.
 * `specs` sticks to well-established characteristics of the model.
 */
export interface CatalogueContent {
  description: string;
  specs?: ProductSpec[];
}

export const spec = (label: string, value: string): ProductSpec => ({ label, value });
