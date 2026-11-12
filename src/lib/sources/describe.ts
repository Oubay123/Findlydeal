import { getAllSources, getConfiguredSources } from "./index";

/**
 * The marketplaces offers actually come from, as a French list:
 * "eBay", "eBay et Wayfair".
 *
 * Copy that names sources goes through here, so the site never claims more
 * marketplaces than are connected. In demonstration mode (nothing
 * configured), every planned source is named, as the demo shows them all.
 */
export function describeLiveSources(): string {
  const configured = getConfiguredSources();
  const labels = (configured.length > 0 ? configured : getAllSources()).map(
    (source) => source.label,
  );
  if (labels.length <= 1) return labels[0] ?? "";
  return `${labels.slice(0, -1).join(", ")} et ${labels[labels.length - 1]}`;
}
