import {
  DEAL_SCORE_THRESHOLDS,
  MIN_DISCOUNT_PERCENT,
  MIN_OFFERS_FOR_REFERENCE_PRICE,
} from "@/lib/constants";
import { discountPercent, money } from "@/lib/utils";
import type { DealLevel, DealSignal, Money, Offer } from "@/types";

/**
 * Deal detection.
 *
 * A "deal" is only meaningful relative to a reference price. Today that
 * reference is the median of the competing offers we found in the same search
 * — the only baseline available without stored history. Once prices are being
 * persisted, `referencePrice` should become the 30-day median instead, and the
 * rest of this module keeps working unchanged.
 */

/**
 * Median total price of a set of offers.
 * Returns `undefined` when the sample is too small to mean anything.
 */
export function computeReferencePrice(offers: Offer[]): Money | undefined {
  if (offers.length < MIN_OFFERS_FOR_REFERENCE_PRICE) return undefined;

  const currency = offers[0]?.totalPrice.currency;
  if (!currency) return undefined;
  if (offers.some((offer) => offer.totalPrice.currency !== currency)) return undefined;

  const amounts = offers.map((offer) => offer.totalPrice.amount).sort((a, b) => a - b);
  const middle = Math.floor(amounts.length / 2);
  const median =
    amounts.length % 2 === 0
      ? ((amounts[middle - 1] ?? 0) + (amounts[middle] ?? 0)) / 2
      : (amounts[middle] ?? 0);

  return money(median, currency);
}

/**
 * Score one offer against a reference price.
 * Returns `undefined` when the offer is not worth flagging.
 */
export function scoreOffer(offer: Offer, referencePrice?: Money): DealSignal | undefined {
  if (!referencePrice) return undefined;

  const percent = discountPercent(offer.totalPrice, referencePrice);
  if (percent < MIN_DISCOUNT_PERCENT) return undefined;

  // A 50% discount is already exceptional, so the scale saturates there.
  const score = Math.min(100, Math.round((percent / 50) * 100));
  const level = toDealLevel(score);
  if (level === "none") return undefined;

  return {
    score,
    level,
    discountPercent: percent,
    referencePrice,
    reasons: [`${Math.round(percent)} % sous le prix médian des offres trouvées`],
  };
}

/** Annotate a set of competing offers in one pass. */
export function annotateOffersWithDeals(offers: Offer[]): Offer[] {
  const referencePrice = computeReferencePrice(offers);
  return offers.map((offer) => ({ ...offer, deal: scoreOffer(offer, referencePrice) }));
}

export function toDealLevel(score: number): DealLevel {
  if (score >= DEAL_SCORE_THRESHOLDS.exceptional) return "exceptional";
  if (score >= DEAL_SCORE_THRESHOLDS.great) return "great";
  if (score >= DEAL_SCORE_THRESHOLDS.good) return "good";
  return "none";
}
