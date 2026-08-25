import type { Locale, Offer } from "@/types";
import {
  SourceNotConfiguredError,
  type SourceAdapter,
  type SourceSearchParams,
  type SourceSearchResponse,
} from "./types";

/**
 * Back Market adapter — NOT IMPLEMENTED YET.
 *
 * Pending: Back Market partner programme approval.
 *
 * Implementation notes for later:
 * - Auth: static API key sent as `Authorization: Basic <BACKMARKET_API_KEY>`.
 * - Catalogue is refurbished-only, so every offer maps to
 *   `condition: "refurbished"`; the grade (Fair / Good / Excellent) is worth
 *   surfacing in `Offer.title` or a dedicated field later.
 * - Affiliate: outbound links carry `BACKMARKET_AFFILIATE_ID`.
 * - Prices come back in major units — convert with `fromMajorUnits()`.
 */
export const backMarketSource: SourceAdapter = {
  id: "backmarket",
  label: "Back Market",
  categories: ["tech", "refurbished", "second-hand"],

  isConfigured() {
    return Boolean(process.env.BACKMARKET_API_KEY);
  },

  async search(_params: SourceSearchParams): Promise<SourceSearchResponse> {
    throw new SourceNotConfiguredError("backmarket");
  },

  async getOffer(_externalId: string, _locale: Locale): Promise<Offer | null> {
    throw new SourceNotConfiguredError("backmarket");
  },

  buildAffiliateUrl(rawUrl: string): string {
    const affiliateId = process.env.BACKMARKET_AFFILIATE_ID;
    if (!affiliateId) return rawUrl;

    const url = new URL(rawUrl);
    url.searchParams.set("utm_source", "findlydeal");
    url.searchParams.set("aid", affiliateId);
    return url.toString();
  },
};
