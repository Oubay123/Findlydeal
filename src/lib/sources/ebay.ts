import { sourcePresentation } from "@/config/sources";
import { getEbayConfig, isEbayConfigured } from "@/lib/ebay/config";
import { getItem, searchItems } from "@/lib/ebay/client";
import type { EbayItemSummary } from "@/lib/ebay/types";
import { fromMajorUnits } from "@/lib/utils";
import type { Locale, Offer, ProductCondition } from "@/types";
import {
  SourceError,
  type SourceAdapter,
  type SourceSearchParams,
  type SourceSearchResponse,
} from "./types";

/**
 * eBay adapter: eBay Browse API + eBay Partner Network.
 *
 * The HTTP client (auth, cache, headers) lives in `src/lib/ebay/`; this file
 * only turns eBay listings into `Offer`s. It is the one place that knows what
 * an eBay `conditionId` or `shippingOptions` means.
 */

/** eBay condition ids grouped into the three conditions Findlydeal compares. */
const CONDITION_IDS: Record<Exclude<ProductCondition, "unknown">, number[]> = {
  new: [1000, 1500, 1750],
  refurbished: [2000, 2010, 2020, 2030, 2500],
  used: [2750, 3000, 4000, 5000, 6000],
};

function toCondition(conditionId?: string): ProductCondition {
  const id = Number(conditionId);
  for (const [condition, ids] of Object.entries(CONDITION_IDS)) {
    if (ids.includes(id)) return condition as ProductCondition;
  }
  return "unknown";
}

export function conditionIdsFor(conditions?: ProductCondition[]): number[] | undefined {
  if (!conditions?.length) return undefined;
  return conditions.flatMap((condition) =>
    condition === "unknown" ? [] : CONDITION_IDS[condition],
  );
}

/** eBay serves `s-l225` thumbnails in search; `s-l500` is sharp on a card. */
function largerImage(url?: string): string | undefined {
  return url?.replace(/\/s-l\d+\./, "/s-l500.");
}

/** A listing as an `Offer`, or `null` when it cannot be compared honestly. */
export function toOffer(item: EbayItemSummary, locale: Locale = "fr"): Offer | null {
  if (!item.itemId || !item.title || !item.price?.value) return null;
  if (item.price.currency !== "EUR") return null;

  const price = fromMajorUnits(Number(item.price.value), "EUR");
  if (!Number.isFinite(price.amount) || price.amount <= 0) return null;

  const shippingCost = item.shippingOptions?.[0]?.shippingCost;
  const shippingKnown = shippingCost?.value !== undefined && shippingCost.currency === "EUR";
  const shipping = shippingKnown ? fromMajorUnits(Number(shippingCost.value), "EUR") : undefined;

  const webUrl = item.itemAffiliateWebUrl ?? item.itemWebUrl;
  if (!webUrl) return null;

  const feedback = Number(item.seller?.feedbackPercentage);

  return {
    id: `ebay:${item.itemId}`,
    source: "ebay",
    title: item.title,
    url: item.itemAffiliateWebUrl ?? ebaySource.buildAffiliateUrl(webUrl),
    imageUrl: largerImage(item.image?.imageUrl ?? item.thumbnailImages?.[0]?.imageUrl),
    price,
    shippingPrice: shipping && shipping.amount > 0 ? shipping : undefined,
    shippingUnknown: shippingKnown ? undefined : true,
    totalPrice: { amount: price.amount + (shipping?.amount ?? 0), currency: "EUR" },
    condition: toCondition(item.conditionId),
    // A search only returns listings that are live and purchasable.
    availability: "in_stock",
    seller: item.seller?.username
      ? {
          id: item.seller.username,
          name: item.seller.username,
          rating: Number.isFinite(feedback) ? Math.round((feedback / 20) * 10) / 10 : undefined,
          reviewCount: item.seller.feedbackScore,
          countryCode: item.itemLocation?.country,
        }
      : undefined,
    sellerType:
      item.seller?.sellerAccountType === "INDIVIDUAL"
        ? "individual"
        : item.seller?.sellerAccountType === "BUSINESS"
          ? "business"
          : undefined,
    locale,
    fetchedAt: new Date().toISOString(),
  };
}

export const ebaySource: SourceAdapter = {
  id: "ebay",
  label: sourcePresentation.ebay.label,
  categories: ["tech", "home-appliances", "watches-jewelry", "fashion", "leisure", "second-hand"],

  isConfigured() {
    return isEbayConfigured();
  },

  async search(params: SourceSearchParams): Promise<SourceSearchResponse> {
    // The Browse API needs keywords; browsing a category goes through the
    // catalogue instead (src/lib/catalogue).
    if (!params.term.trim()) return { source: "ebay", offers: [], hasMore: false };

    try {
      const response = await searchItems({
        query: params.term,
        conditionIds: conditionIdsFor(params.conditions),
        minPrice: params.minPrice !== undefined ? params.minPrice / 100 : undefined,
        maxPrice: params.maxPrice !== undefined ? params.maxPrice / 100 : undefined,
        limit: params.limit,
        offset: (params.page - 1) * params.limit,
      });
      const offers = (response.itemSummaries ?? [])
        .map((item) => toOffer(item, params.locale))
        .filter((offer): offer is Offer => offer !== null);

      return {
        source: "ebay",
        offers,
        totalCount: response.total,
        hasMore: Boolean(response.next),
      };
    } catch (error) {
      console.error(`[ebay] search: ${error instanceof Error ? error.message : String(error)}`);
      throw new SourceError("ebay", "eBay est momentanément indisponible.", error);
    }
  },

  async getOffer(externalId: string, locale: Locale): Promise<Offer | null> {
    const item = await getItem(externalId);
    return item ? toOffer(item, locale) : null;
  },

  /**
   * Fallback only: with `EBAY_CAMPAIGN_ID` set, eBay already returns a tracked
   * `itemAffiliateWebUrl` for every listing, which is what offers use.
   */
  buildAffiliateUrl(rawUrl: string): string {
    const config = getEbayConfig();
    if (!config?.campaignId) return rawUrl;

    const url = new URL(rawUrl);
    url.searchParams.set("mkcid", "1");
    url.searchParams.set("campid", config.campaignId);
    url.searchParams.set("customid", config.referenceId);
    url.searchParams.set("toolid", "10001");
    url.searchParams.set("mkevt", "1");
    return url.toString();
  },
};
