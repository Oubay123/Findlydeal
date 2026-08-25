import type { CategorySlug, Locale, Offer, ProductCondition, SourceId } from "@/types";

/**
 * The contract every affiliate source must implement.
 *
 * The point of this file is isolation: the rest of the app only ever sees
 * `Offer` objects. Auth, pagination quirks, rate limits, XML vs JSON, currency
 * and affiliate-link tagging are all the adapter's problem and stop here.
 *
 * To add a source:
 *   1. add its id to `SourceId` in `@/types`;
 *   2. create `src/lib/sources/<source>.ts` exporting a `SourceAdapter`;
 *   3. register it in `src/lib/sources/index.ts`;
 *   4. document its env vars in `.env.example`.
 */

/** Normalised parameters handed to every adapter for a single query. */
export interface SourceSearchParams {
  /** Already normalised and, when relevant, translated search term. */
  term: string;
  locale: Locale;
  categorySlug?: CategorySlug;
  conditions?: ProductCondition[];
  /** Bounds in minor units (cents), same currency as the source's market. */
  minPrice?: number;
  maxPrice?: number;
  limit: number;
  /** 1-based. */
  page: number;
  /** Lets the aggregator cancel slow sources without blocking the response. */
  signal?: AbortSignal;
}

export interface SourceSearchResponse {
  source: SourceId;
  offers: Offer[];
  /** Total matches reported by the source, when it exposes one. */
  totalCount?: number;
  hasMore: boolean;
}

export interface SourceAdapter {
  readonly id: SourceId;
  /** Display name shown on offer rows and in the source filter. */
  readonly label: string;
  /** Categories this source is worth querying for. */
  readonly categories: CategorySlug[];

  /**
   * `false` when the required credentials are missing, so the aggregator can
   * skip the source instead of failing the whole search.
   */
  isConfigured(): boolean;

  /** Query the source and return already-normalised offers. */
  search(params: SourceSearchParams): Promise<SourceSearchResponse>;

  /** Fetch one offer by its source-local id. Optional. */
  getOffer?(externalId: string, locale: Locale): Promise<Offer | null>;

  /** Wrap a product URL with the affiliate tracking parameters. */
  buildAffiliateUrl(rawUrl: string): string;
}

/** Thrown by adapters so the aggregator can report a partial failure cleanly. */
export class SourceError extends Error {
  constructor(
    readonly source: SourceId,
    message: string,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "SourceError";
  }
}

/** Raised by an adapter whose credentials are not configured yet. */
export class SourceNotConfiguredError extends SourceError {
  constructor(source: SourceId) {
    super(source, `Source "${source}" is not configured. See .env.example.`);
    this.name = "SourceNotConfiguredError";
  }
}
