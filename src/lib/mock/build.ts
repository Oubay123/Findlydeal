import { annotateOffersWithDeals } from "@/lib/deals";
import { buildStoreSearchUrl } from "@/lib/sources/creationwatches";
import { fromMajorUnits } from "@/lib/utils";
import type {
  CategorySlug,
  Offer,
  Product,
  ProductCondition,
  ProductRating,
  ProductReview,
  ProductSpec,
  SourceId,
} from "@/types";

/**
 * Seed shapes for the demonstration catalogue, plus the builder that turns
 * them into real `Product` objects.
 *
 * The seeds stay deliberately terse (prices in euros, no ids to write by
 * hand); everything the app actually consumes — cents, deal scores, best
 * offer, price range — is derived here by the *real* domain code, so the mock
 * never duplicates business logic.
 */

export interface MockOfferSeed {
  source: SourceId;
  /** In euros, major units. */
  price: number;
  /** In euros, major units. Omit for free shipping. */
  shipping?: number;
  condition: ProductCondition;
  seller: string;
  sellerRating?: number;
  sellerReviewCount?: number;
}

export interface MockProductSeed {
  /** URL slug, also used as the product id. */
  slug: string;
  title: string;
  brand: string;
  model?: string;
  category: CategorySlug;
  description: string;
  rating: ProductRating;
  images: readonly string[];
  /**
   * Noun phrase prefixed to the title to build the alt text, e.g. "Smartphone"
   * -> "Smartphone Apple iPhone 13 128 Go - Minuit". Short on purpose: the
   * photo is a library shot, so describing a framing we cannot verify would be
   * inventing detail rather than helping a screen reader.
   */
  imageSubject: string;
  /** Optional YouTube review id, see `VideoReview`. */
  videoReviewId?: string;
  /** ISO date the model reached the market. Real dates for real products. */
  releasedAt: string;
  specs: ProductSpec[];
  reviews: Omit<ProductReview, "id">[];
  offers: MockOfferSeed[];
}

/** Fixed timestamp so statically rendered pages stay deterministic. */
const FETCHED_AT = "2026-08-21T08:30:00.000Z";

const SEARCH_URLS: Record<SourceId, (term: string) => string> = {
  ebay: (term) => `https://www.ebay.fr/sch/i.html?_nkw=${term}`,
  backmarket: (term) => `https://www.backmarket.fr/fr-fr/search?q=${term}`,
  wayfair: (term) => `https://www.wayfair.com/keyword.php?keyword=${term}`,
  // Built by the adapter, so the day affiliate tagging arrives there is one
  // place to change. See src/lib/sources/creationwatches.ts.
  creationwatches: (term) => buildStoreSearchUrl(decodeURIComponent(term)),
};

/**
 * Demo offers link to a genuine marketplace search for the product, never to
 * a fabricated listing or a fake affiliate link. Real affiliate URLs will come
 * from each adapter's `buildAffiliateUrl()` once the programmes are approved.
 *
 * The query is built from brand + model rather than the display title: a store
 * search for "Seiko Prospex Turtle SRPE93K1" finds the watch, whereas the full
 * title with its ", plongée 200 m" suffix finds nothing.
 */
function buildOfferUrl(seed: MockProductSeed, source: SourceId): string {
  const query = [seed.brand, seed.model].filter(Boolean).join(" ") || seed.title;
  return SEARCH_URLS[source](encodeURIComponent(query));
}

function toOffer(seed: MockProductSeed, offer: MockOfferSeed, index: number): Offer {
  const price = fromMajorUnits(offer.price, "EUR");
  const shippingPrice = offer.shipping ? fromMajorUnits(offer.shipping, "EUR") : undefined;

  return {
    id: `${offer.source}:${seed.slug}-${index + 1}`,
    source: offer.source,
    title: seed.title,
    url: buildOfferUrl(seed, offer.source),
    imageUrl: seed.images[0],
    price,
    shippingPrice,
    totalPrice: fromMajorUnits(offer.price + (offer.shipping ?? 0), "EUR"),
    condition: offer.condition,
    availability: "in_stock",
    locale: "fr",
    fetchedAt: FETCHED_AT,
    seller: {
      id: `${offer.source}-${index + 1}`,
      name: offer.seller,
      rating: offer.sellerRating,
      reviewCount: offer.sellerReviewCount,
      countryCode: "FR",
    },
  };
}

/** Turn one seed into the `Product` the whole app already knows how to render. */
export function buildMockProduct(seed: MockProductSeed): Product {
  // Deal badges and savings come from the production scorer, not from the seed.
  const offers = annotateOffersWithDeals(
    seed.offers.map((offer, index) => toOffer(seed, offer, index)),
  ).sort((a, b) => a.totalPrice.amount - b.totalPrice.amount);

  const cheapest = offers[0];
  const dearest = offers[offers.length - 1];

  return {
    id: seed.slug,
    title: seed.title,
    brand: seed.brand,
    model: seed.model,
    categorySlug: seed.category,
    imageUrl: seed.images[0],
    imageAlt: `${seed.imageSubject} ${seed.title}`,
    images: [...seed.images],
    videoReviewId: seed.videoReviewId,
    releasedAt: seed.releasedAt,
    description: seed.description,
    rating: seed.rating,
    specs: seed.specs,
    reviews: seed.reviews.map((review, index) => ({
      ...review,
      id: `${seed.slug}-review-${index + 1}`,
    })),
    offers,
    bestOffer: cheapest,
    priceRange:
      cheapest && dearest ? { min: cheapest.totalPrice, max: dearest.totalPrice } : undefined,
  };
}
