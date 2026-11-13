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

/**
 * Whether outbound links actually carry an affiliate tag right now.
 *
 * True only when `EBAY_CAMPAIGN_ID` is set in the environment, which is also
 * exactly when `itemAffiliateWebUrl` / `buildAffiliateUrl` produce tracked
 * links. Every page that talks about affiliation reads this instead of
 * assuming, so the site never claims commissions it does not earn.
 */
export function isAffiliationActive(): boolean {
  return Boolean(process.env.EBAY_CAMPAIGN_ID?.trim());
}
