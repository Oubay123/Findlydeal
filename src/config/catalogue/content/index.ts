import { diyContent } from "./diy";
import { fashionContent } from "./fashion";
import { gamingContent } from "./gaming";
import { furnitureContent } from "./furniture";
import { homeContent } from "./home";
import { kidsContent } from "./kids";
import { leisureContent } from "./leisure";
import { techContent } from "./tech";
import { watchesContent } from "./watches";
import type { CatalogueContent } from "./define";

export type { CatalogueContent } from "./define";

/**
 * Editorial sheets of the extended catalogue, keyed by slug. The described
 * catalogue (`src/lib/mock/catalog/`) keeps its own richer sheets;
 * `npm run check:catalogue` fails when a product has neither.
 */
export const catalogueContent: Record<string, CatalogueContent> = {
  ...techContent,
  ...homeContent,
  ...watchesContent,
  ...furnitureContent,
  ...fashionContent,
  ...leisureContent,
  ...gamingContent,
  ...kidsContent,
  ...diyContent,
};
