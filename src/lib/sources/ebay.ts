import { sourcePresentation } from "@/config/sources";
import type { Locale, Offer } from "@/types";
import {
  SourceNotConfiguredError,
  type SourceAdapter,
  type SourceSearchParams,
  type SourceSearchResponse,
} from "./types";

/**
 * eBay adapter — NOT IMPLEMENTED YET.
 *
 * Pending: eBay Partner Network approval.
 *
 * Implementation notes for later:
 * - Auth: OAuth2 client credentials (`EBAY_CLIENT_ID` / `EBAY_CLIENT_SECRET`),
 *   token cached until expiry.
 * - Search: Browse API `GET /buy/browse/v1/item_summary/search`, with the
 *   `X-EBAY-C-MARKETPLACE-ID` header driving the locale (EBAY_FR, EBAY_DE, …).
 * - Affiliate: append `mkcid` / `campid` (`EBAY_CAMPAIGN_ID`) to item URLs.
 * - Mapping: `itemSummaries[].price` -> `Offer.price`,
 *   `shippingOptions[0].shippingCost` -> `Offer.shippingPrice`,
 *   `condition` -> `ProductCondition`. Keep the mapping in this file only.
 */
export const ebaySource: SourceAdapter = {
  id: "ebay",
  label: sourcePresentation.ebay.label,
  categories: ["tech", "home-appliances", "watches-jewelry", "fashion", "leisure", "second-hand"],

  isConfigured() {
    return Boolean(process.env.EBAY_CLIENT_ID && process.env.EBAY_CLIENT_SECRET);
  },

  async search(_params: SourceSearchParams): Promise<SourceSearchResponse> {
    throw new SourceNotConfiguredError("ebay");
  },

  async getOffer(_externalId: string, _locale: Locale): Promise<Offer | null> {
    throw new SourceNotConfiguredError("ebay");
  },

  buildAffiliateUrl(rawUrl: string): string {
    const campaignId = process.env.EBAY_CAMPAIGN_ID;
    if (!campaignId) return rawUrl;

    const url = new URL(rawUrl);
    url.searchParams.set("mkcid", "1");
    url.searchParams.set("campid", campaignId);
    return url.toString();
  },
};
