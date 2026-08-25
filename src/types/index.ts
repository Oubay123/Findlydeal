/**
 * Shared domain model for Findlydeal.
 *
 * Everything in this file is source-agnostic: it describes the *normalised*
 * shape the whole app works with, whatever marketplace the data came from.
 * Source-specific payloads must never leak outside `src/lib/sources/`.
 *
 * Rule of thumb:
 * - a type used by more than one folder lives here;
 * - a type used by a single module stays next to that module.
 */

/** Identifier of an affiliate source. Add a new source here first. */
export type SourceId = "ebay" | "backmarket" | "wayfair" | "creationwatches";

/** Top-level product categories. Mirrored by `src/config/categories.ts`. */
export type CategorySlug =
  | "tech"
  | "home-appliances"
  | "furniture"
  | "watches-jewelry"
  | "refurbished"
  | "fashion"
  | "second-hand"
  | "leisure";

/** Locales the search engine can query sources in (multilingual search). */
export type Locale = "fr" | "en" | "de" | "es" | "it";

export type CurrencyCode = "EUR" | "USD" | "GBP";

export type ProductCondition = "new" | "refurbished" | "used" | "unknown";

export type Availability = "in_stock" | "out_of_stock" | "unknown";

/**
 * Money is stored in **minor units** (cents) to avoid floating point drift.
 * Use `formatPrice()` from `@/lib/utils` to render it.
 */
export interface Money {
  amount: number;
  currency: CurrencyCode;
}

/** The seller behind an offer (a marketplace seller, not the source itself). */
export interface Merchant {
  id: string;
  name: string;
  /** 0..5, when the source exposes it. */
  rating?: number;
  reviewCount?: number;
  countryCode?: string;
}

/** How good a deal an offer is. Produced by `src/lib/deals/`. */
export type DealLevel = "none" | "good" | "great" | "exceptional";

export interface DealSignal {
  /** 0..100, higher is better. */
  score: number;
  level: DealLevel;
  /** Human readable justifications, e.g. "18% below the median price". */
  reasons: string[];
  discountPercent?: number;
  /** Baseline the discount was computed against. */
  referencePrice?: Money;
}

/**
 * A single buyable listing on one source. This is the unit every source
 * adapter must return.
 */
export interface Offer {
  /** Stable id, namespaced by source: `ebay:1234567890`. */
  id: string;
  source: SourceId;
  title: string;
  /** Affiliate-tagged outbound URL. */
  url: string;
  imageUrl?: string;
  price: Money;
  shippingPrice?: Money;
  /** price + shipping, precomputed so sorting never has to guess. */
  totalPrice: Money;
  condition: ProductCondition;
  availability: Availability;
  seller?: Merchant;
  /** Locale the listing was found in, for multilingual result labelling. */
  locale?: Locale;
  /** ISO 8601 timestamp of when the offer was fetched. */
  fetchedAt: string;
  deal?: DealSignal;
}

/** One key/value line of a product spec sheet. */
export interface ProductSpec {
  label: string;
  value: string;
}

/** A customer review, as exposed by a marketplace. */
export interface ProductReview {
  id: string;
  author: string;
  /** 0..5. */
  rating: number;
  comment: string;
  /** ISO 8601 date. */
  date: string;
}

/** Aggregate rating of a product across the sources that expose one. */
export interface ProductRating {
  /** 0..5, averaged. */
  value: number;
  count: number;
}

/**
 * Several offers grouped as "the same product", across sources.
 * Grouping happens in `src/lib/search/aggregate.ts`.
 */
export interface Product {
  id: string;
  title: string;
  brand?: string;
  model?: string;
  categorySlug?: CategorySlug;
  imageUrl?: string;
  /**
   * Descriptive alternative text for `imageUrl` and `images`, e.g.
   * "Smartphone Apple iPhone 13 128 Go - Minuit". Falls back to the title.
   */
  imageAlt?: string;
  offers: Offer[];
  /** Cheapest offer by `totalPrice`. */
  bestOffer?: Offer;
  priceRange?: { min: Money; max: Money };

  /**
   * Editorial / marketplace-supplied detail, all optional: a source that does
   * not expose them stays a perfectly valid `Product`. They power the
   * comparison page (`/product/[id]`).
   */
  description?: string;
  rating?: ProductRating;
  specs?: ProductSpec[];
  reviews?: ProductReview[];
  /** Extra photos for the gallery; `imageUrl` stays the primary one. */
  images?: string[];
  /**
   * YouTube id of a review video. Rendered as a click-to-load facade by
   * `VideoReview`; the section disappears when unset.
   */
  videoReviewId?: string;
}

export type SortOption = "relevance" | "price_asc" | "price_desc" | "deal_score";

export interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  conditions?: ProductCondition[];
  sources?: SourceId[];
  categorySlug?: CategorySlug;
  dealsOnly?: boolean;
  sort: SortOption;
}

/** A fully resolved search request, ready to be dispatched to the sources. */
export interface SearchQuery {
  term: string;
  locale: Locale;
  filters: SearchFilters;
  page: number;
  perPage: number;
}

/** Reported per source so the UI can show partial results honestly. */
export interface SourceError {
  source: SourceId;
  message: string;
}

export interface SearchResult {
  query: SearchQuery;
  products: Product[];
  totalCount: number;
  sourcesQueried: SourceId[];
  errors: SourceError[];
}

/** A category as declared in `src/config/categories.ts`. */
export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  /** Lucide icon name, resolved by `CategoryCard`. */
  icon: string;
  /**
   * Optional photo for the category tile (put files in `public/images/`).
   * Without one the card falls back to a branded gradient + icon.
   */
  image?: string;
  /** Sources that are relevant for this category. */
  sources: SourceId[];
}

/** A single entry in the site navigation (`src/config/site.ts`). */
export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}
