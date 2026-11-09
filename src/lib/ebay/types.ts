/**
 * The subset of the eBay Browse API responses Findlydeal reads.
 *
 * Every field is optional on purpose: eBay omits fields freely depending on
 * the listing, and the mapping in `src/lib/sources/ebay.ts` must cope with
 * whatever is missing rather than trust a shape.
 * Reference: https://developer.ebay.com/api-docs/buy/browse/overview.html
 */

export interface EbayAmount {
  value?: string;
  currency?: string;
}

export interface EbayImage {
  imageUrl?: string;
}

export interface EbayShippingOption {
  shippingCostType?: string;
  shippingCost?: EbayAmount;
}

export interface EbaySeller {
  username?: string;
  feedbackPercentage?: string;
  feedbackScore?: number;
  /** `BUSINESS` or `INDIVIDUAL`, when eBay returns it. */
  sellerAccountType?: string;
}

export interface EbayItemSummary {
  itemId?: string;
  legacyItemId?: string;
  title?: string;
  image?: EbayImage;
  thumbnailImages?: EbayImage[];
  additionalImages?: EbayImage[];
  price?: EbayAmount;
  condition?: string;
  conditionId?: string;
  itemWebUrl?: string;
  /** Present when the request carried the EPN campaign id. */
  itemAffiliateWebUrl?: string;
  shippingOptions?: EbayShippingOption[];
  seller?: EbaySeller;
  buyingOptions?: string[];
  itemLocation?: { country?: string };
  epid?: string;
}

export interface EbaySearchResponse {
  total?: number;
  next?: string;
  itemSummaries?: EbayItemSummary[];
}

export interface EbayItem extends EbayItemSummary {
  estimatedAvailabilities?: { estimatedAvailabilityStatus?: string }[];
}

export interface EbayTokenResponse {
  access_token?: string;
  expires_in?: number;
}
