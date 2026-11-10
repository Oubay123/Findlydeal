import { slugify } from "@/lib/utils/slug";
import type { CategorySlug } from "@/types";

/**
 * One product of the extended catalogue: a model we compare, and how to find
 * its listings on eBay. See `src/config/catalogue-ebay.ts` for the matching
 * rules (`require`, `exclude`, `minPrice`, `maxPrice`).
 */
export interface CatalogueProductDefinition {
  slug: string;
  title: string;
  brand: string;
  category: CategorySlug;
  /** Noun phrase for the image alt text: "Smartphone", "Montre"… */
  subject: string;
  query: string;
  require: string[][];
  exclude?: string[];
  /** Global exclusions that do not apply here ("pièces" for a puzzle). */
  allow?: string[];
  minPrice: number;
  maxPrice: number;
}

interface Options {
  allow?: string[];
  /** Keywords sent to eBay when the title is not the best query. */
  query?: string;
  exclude?: string[];
}

/**
 * Compact declaration: `define("tech", "Smartphone")` returns a function
 * taking `(brand, title, require, minPrice, maxPrice, options)`. `require`
 * is written `"iphone 14 | 128"`: groups separated by `|`, alternatives
 * inside a group by `/`.
 */
export function define(category: CategorySlug, subject: string, defaults: Options = {}) {
  return (
    brand: string,
    title: string,
    require: string,
    minPrice: number,
    maxPrice: number,
    options: Options = {},
  ): CatalogueProductDefinition => ({
    slug: slugify(title),
    title,
    brand,
    category,
    subject,
    query: options.query ?? title,
    require: require.split("|").map((group) => group.split("/").map((word) => word.trim())),
    exclude: options.exclude ?? defaults.exclude,
    allow: options.allow ?? defaults.allow,
    minPrice,
    maxPrice,
  });
}
