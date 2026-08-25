import type { Locale, Offer } from "@/types";
import {
  SourceNotConfiguredError,
  type SourceAdapter,
  type SourceSearchParams,
  type SourceSearchResponse,
} from "./types";

/**
 * Creation Watches adapter — NOT IMPLEMENTED YET.
 *
 * Pending: affiliate programme approval. Until then the catalogue links to
 * plain, public Creation Watches URLs, built by `buildStoreUrl` below.
 *
 * **This file is the single place a Creation Watches URL is constructed.**
 * The day the affiliate access is granted, fill in `CREATIONWATCHES_AFFILIATE_ID`
 * and `buildAffiliateUrl` starts tagging every outbound link — nothing else in
 * the codebase needs to change.
 *
 * Implementation notes for later:
 * - The store is Singapore-based and prices in several currencies; the feed
 *   exposes SGD by default, so the adapter will have to convert to EUR.
 * - Watches are catalogued by brand, which maps cleanly onto `Product.brand`.
 */
const STORE_ORIGIN = "https://www.creationwatches.com";

/** Public search URL. No tracking parameter: none has been granted yet. */
export function buildStoreSearchUrl(term: string): string {
  return `${STORE_ORIGIN}/products/search.html?keywords=${encodeURIComponent(term)}`;
}

export const creationWatchesSource: SourceAdapter = {
  id: "creationwatches",
  label: "Creation Watches",
  categories: ["watches-jewelry"],

  isConfigured() {
    return Boolean(process.env.CREATIONWATCHES_AFFILIATE_ID);
  },

  async search(_params: SourceSearchParams): Promise<SourceSearchResponse> {
    throw new SourceNotConfiguredError("creationwatches");
  },

  async getOffer(_externalId: string, _locale: Locale): Promise<Offer | null> {
    throw new SourceNotConfiguredError("creationwatches");
  },

  /**
   * Returns the URL untouched while no affiliate id is configured, which is
   * exactly what we want today: a plain link to a real store page, with no
   * pretence of an affiliate relationship that does not exist yet.
   */
  buildAffiliateUrl(rawUrl: string): string {
    const affiliateId = process.env.CREATIONWATCHES_AFFILIATE_ID;
    if (!affiliateId) return rawUrl;

    const url = new URL(rawUrl);
    url.searchParams.set("aff", affiliateId);
    return url.toString();
  },
};
