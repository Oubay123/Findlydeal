import { cached } from "./cache";
import { getEbayConfig, type EbayConfig } from "./config";
import type { EbayItem, EbaySearchResponse, EbayTokenResponse } from "./types";

/**
 * Thin client for the eBay Browse API: an application token (OAuth client
 * credentials), `item_summary/search` and `item/{id}`. No mapping here: the
 * adapter in `src/lib/sources/ebay.ts` turns these payloads into `Offer`s.
 */

/** Seconds a search answer is reused before eBay is asked again. */
export const SEARCH_TTL_SECONDS = 60 * 60;

/**
 * Listing conditions worth comparing. 7000 ("for parts or not working") is
 * left out on purpose: a broken phone is not a cheaper offer for the same one.
 */
const COMPARABLE_CONDITION_IDS = [
  1000, 1500, 1750, 2000, 2010, 2020, 2030, 2500, 2750, 3000, 4000, 5000, 6000,
];

export class EbayApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "EbayApiError";
  }
}

// --- Application token ------------------------------------------------------

let token: { value: string; expiresAt: number } | null = null;

/**
 * Kept in this isolate's memory only (never in a shared cache): it is a
 * credential. eBay issues it for two hours; it is renewed five minutes early.
 */
async function getAccessToken(config: EbayConfig): Promise<string> {
  if (token && token.expiresAt > Date.now()) return token.value;

  const response = await fetch(`${config.apiBaseUrl}/identity/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: `Basic ${btoa(`${config.clientId}:${config.clientSecret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "https://api.ebay.com/oauth/api_scope",
    }),
  });

  if (!response.ok) {
    throw new EbayApiError(response.status, `eBay token request failed (${response.status})`);
  }
  const data = (await response.json()) as EbayTokenResponse;
  if (!data.access_token) throw new EbayApiError(502, "eBay token response without access_token");

  const lifetime = Math.max((data.expires_in ?? 7200) - 300, 60);
  token = { value: data.access_token, expiresAt: Date.now() + lifetime * 1000 };
  return token.value;
}

// --- Requests ---------------------------------------------------------------

/**
 * Headers every Browse call carries. `X-EBAY-C-ENDUSERCTX` with the EPN
 * campaign id makes eBay return `itemAffiliateWebUrl`, the tracked link that
 * credits the sale to Findlydeal; `contextualLocation` asks for shipping costs
 * to France.
 */
function browseHeaders(config: EbayConfig, accessToken: string): HeadersInit {
  const context = [
    config.campaignId ? `affiliateCampaignId=${config.campaignId}` : null,
    config.campaignId ? `affiliateReferenceId=${config.referenceId}` : null,
    `contextualLocation=${encodeURIComponent("country=FR")}`,
  ].filter(Boolean);

  return {
    authorization: `Bearer ${accessToken}`,
    "x-ebay-c-marketplace-id": config.marketplaceId,
    "x-ebay-c-enduserctx": context.join(","),
    "accept-language": "fr-FR",
  };
}

async function browseGet<T>(config: EbayConfig, path: string): Promise<T> {
  const accessToken = await getAccessToken(config);
  const response = await fetch(`${config.apiBaseUrl}/buy/browse/v1${path}`, {
    headers: browseHeaders(config, accessToken),
  });

  if (response.status === 401) token = null; // expired early: renew next time
  if (!response.ok) {
    throw new EbayApiError(response.status, `eBay Browse API error ${response.status} on ${path}`);
  }
  return (await response.json()) as T;
}

export interface EbaySearchOptions {
  query: string;
  /** eBay condition ids to keep; defaults to every comparable condition. */
  conditionIds?: number[];
  /** Euros. */
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
  /** Default true. False when the caller caches the result as a whole. */
  cache?: boolean;
}

/** `GET /item_summary/search`, fixed-price listings deliverable to France. */
export async function searchItems(options: EbaySearchOptions): Promise<EbaySearchResponse> {
  const config = getEbayConfig();
  if (!config) throw new EbayApiError(503, "eBay is not configured");

  const conditionIds = options.conditionIds?.length
    ? options.conditionIds
    : COMPARABLE_CONDITION_IDS;
  const filters = [
    `conditionIds:{${conditionIds.join("|")}}`,
    "buyingOptions:{FIXED_PRICE}",
    "deliveryCountry:FR",
  ];
  if (options.minPrice !== undefined || options.maxPrice !== undefined) {
    filters.push(`price:[${options.minPrice ?? ""}..${options.maxPrice ?? ""}]`);
    filters.push("priceCurrency:EUR");
  }

  const params = new URLSearchParams({
    q: options.query,
    filter: filters.join(","),
    limit: String(Math.min(Math.max(options.limit ?? 50, 1), 200)),
    offset: String(options.offset ?? 0),
  });

  const path = `/item_summary/search?${params.toString()}`;
  if (options.cache === false) return browseGet<EbaySearchResponse>(config, path);
  return cached(`ebay:${config.marketplaceId}:${path}`, SEARCH_TTL_SECONDS, () =>
    browseGet<EbaySearchResponse>(config, path),
  );
}

/** `GET /item/{item_id}`, `itemId` in eBay's RESTful form (`v1|123|0`). */
export async function getItem(itemId: string): Promise<EbayItem | null> {
  const config = getEbayConfig();
  if (!config) throw new EbayApiError(503, "eBay is not configured");

  const path = `/item/${encodeURIComponent(itemId)}`;
  try {
    return await cached(`ebay:${config.marketplaceId}:${path}`, SEARCH_TTL_SECONDS, () =>
      browseGet<EbayItem>(config, path),
    );
  } catch (error) {
    // Ended or removed listing: an expected outcome, not an incident.
    if (error instanceof EbayApiError && (error.status === 404 || error.status === 400)) {
      return null;
    }
    throw error;
  }
}
