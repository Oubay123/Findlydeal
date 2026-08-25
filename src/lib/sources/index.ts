import type { CategorySlug, SourceId } from "@/types";
import { backMarketSource } from "./backmarket";
import { creationWatchesSource } from "./creationwatches";
import { ebaySource } from "./ebay";
import type { SourceAdapter } from "./types";

export * from "./types";

/**
 * Registry of every affiliate source.
 * Register a new adapter here and the search aggregator picks it up.
 */
const adapters: SourceAdapter[] = [ebaySource, backMarketSource, creationWatchesSource];

const adaptersById = new Map<SourceId, SourceAdapter>(
  adapters.map((adapter) => [adapter.id, adapter]),
);

export function getAllSources(): SourceAdapter[] {
  return adapters;
}

export function getSource(id: SourceId): SourceAdapter | undefined {
  return adaptersById.get(id);
}

/** Sources whose credentials are present — the only ones worth querying. */
export function getConfiguredSources(): SourceAdapter[] {
  return adapters.filter((adapter) => adapter.isConfigured());
}

export function getSourcesForCategory(categorySlug: CategorySlug): SourceAdapter[] {
  return adapters.filter((adapter) => adapter.categories.includes(categorySlug));
}
