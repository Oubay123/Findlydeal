import type { Offer, ProductCondition } from "@/types";
import { compareOffers } from "./score";

/** Offers listed per marketplace on a product page. */
export const OFFERS_PER_SOURCE = 4;
/** One more is listed when every offer of the selection is priced like the market. */
export const OFFERS_PER_SOURCE_MAX = 5;

const CONDITIONS: ProductCondition[] = ["new", "refurbished", "used"];

/**
 * Priced like the rest of the market, with a known delivered price: not a
 * statistical outlier, not flagged as doubtful, shipping known.
 */
export function isRelevantOffer(offer: Offer): boolean {
  return !offer.priceOutlier && !offer.deal?.suspicious && !offer.shippingUnknown;
}

function selectForSource(offers: Offer[]): Offer[] {
  const sorted = [...offers].sort(compareOffers);
  const relevant = sorted.filter(isRelevantOffer);
  const picked: Offer[] = [];

  // The cheapest relevant offer of each condition first: four used listings
  // must not push the only refurbished one out of the list.
  for (const condition of CONDITIONS) {
    const first = relevant.find((offer) => offer.condition === condition);
    if (first) picked.push(first);
  }
  for (const offer of [...relevant, ...sorted]) {
    if (picked.length >= OFFERS_PER_SOURCE) break;
    if (!picked.includes(offer)) picked.push(offer);
  }

  // A fifth only when the four and the candidate are all relevant.
  const next = relevant.find((offer) => !picked.includes(offer));
  if (next && picked.length === OFFERS_PER_SOURCE && picked.every(isRelevantOffer)) {
    picked.push(next);
  }
  return picked.sort(compareOffers);
}

/**
 * The offers listed on a product page: at most four per marketplace, five
 * when all five are priced in line with the market, always including the
 * cheapest offer of each condition. Every offer still counts in the prices by
 * condition, the history and the structured data.
 */
export function selectDisplayedOffers(offers: Offer[]): Offer[] {
  const bySource = new Map<string, Offer[]>();
  for (const offer of offers) {
    bySource.set(offer.source, [...(bySource.get(offer.source) ?? []), offer]);
  }
  return [...bySource.values()].flatMap(selectForSource).sort(compareOffers);
}
