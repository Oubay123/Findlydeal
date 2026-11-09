import {
  DEAL_SCORE_THRESHOLDS,
  MIN_DISCOUNT_PERCENT,
  MIN_OFFERS_FOR_REFERENCE_PRICE,
  SUSPICIOUS_DISCOUNT_PERCENT,
} from "@/lib/constants";
import { discountPercent, money } from "@/lib/utils";
import type { DealLevel, DealSignal, Money, Offer } from "@/types";

/**
 * Deal detection.
 *
 * A "deal" is only meaningful relative to a reference price. Today that
 * reference is the median of the competing offers for the same product **in
 * the same condition** — a used phone is never measured against new ones —
 * the only baseline available without stored history. Once prices are
 * persisted, `referencePrice` should become the 30-day median instead, and the
 * rest of this module keeps working unchanged.
 *
 * Prices far outside the group (Tukey fences: below Q1 − 1.5·IQR or above
 * Q3 + 1.5·IQR) are left out of the median, so one listing at three times the
 * price cannot inflate it. A price far *below* the group is not presented as
 * a deal: it is flagged "à vérifier" — on a marketplace, a price too good to
 * be true is more often a mislabelled listing or a scam than a bargain.
 */

/** Offers of the same product compared together: same condition class. */
function conditionGroup(offer: Offer): string {
  return offer.condition === "unknown" ? "used" : offer.condition;
}

/** Linear-interpolated quantile of an ascending list. */
function quantile(sorted: number[], q: number): number {
  const position = (sorted.length - 1) * q;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  const low = sorted[lower] ?? 0;
  const high = sorted[upper] ?? low;
  return low + (high - low) * (position - lower);
}

function medianOf(sorted: number[]): number {
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? ((sorted[middle - 1] ?? 0) + (sorted[middle] ?? 0)) / 2
    : (sorted[middle] ?? 0);
}

interface PriceBounds {
  low: number;
  high: number;
}

/** Tukey fences of a sample, or none when it is too small to tell. */
function priceBounds(amounts: number[]): PriceBounds | undefined {
  if (amounts.length < MIN_OFFERS_FOR_REFERENCE_PRICE) return undefined;
  const sorted = [...amounts].sort((a, b) => a - b);
  const q1 = quantile(sorted, 0.25);
  const q3 = quantile(sorted, 0.75);
  const spread = q3 - q1;
  return { low: q1 - 1.5 * spread, high: q3 + 1.5 * spread };
}

/**
 * Median total price of a set of comparable offers, outliers left out.
 * Returns `undefined` when the sample is too small to mean anything.
 */
export function computeReferencePrice(offers: Offer[]): Money | undefined {
  if (offers.length < MIN_OFFERS_FOR_REFERENCE_PRICE) return undefined;

  const currency = offers[0]?.totalPrice.currency;
  if (!currency) return undefined;
  if (offers.some((offer) => offer.totalPrice.currency !== currency)) return undefined;

  const amounts = offers.map((offer) => offer.totalPrice.amount);
  const bounds = priceBounds(amounts);
  const kept = amounts
    .filter((amount) => !bounds || (amount >= bounds.low && amount <= bounds.high))
    .sort((a, b) => a - b);
  if (kept.length < MIN_OFFERS_FOR_REFERENCE_PRICE) return undefined;

  return money(medianOf(kept), currency);
}

/**
 * Score one offer against a reference price.
 * Returns `undefined` when the offer is not worth flagging.
 */
export function scoreOffer(
  offer: Offer,
  referencePrice?: Money,
  options: { suspicious?: boolean } = {},
): DealSignal | undefined {
  if (!referencePrice) return undefined;

  const percent = discountPercent(offer.totalPrice, referencePrice);
  if (percent < MIN_DISCOUNT_PERCENT) return undefined;

  if (options.suspicious || percent >= SUSPICIOUS_DISCOUNT_PERCENT) {
    return {
      score: 0,
      level: "none",
      suspicious: true,
      discountPercent: percent,
      referencePrice,
      reasons: [
        `${Math.round(percent)} % sous le prix médian des offres comparables : prix inhabituel, vérifiez l'annonce avant d'acheter`,
      ],
    };
  }

  // The scale saturates where an offer starts being suspicious.
  const score = Math.min(100, Math.round((percent / SUSPICIOUS_DISCOUNT_PERCENT) * 100));
  const level = toDealLevel(score);
  if (level === "none") return undefined;

  return {
    score,
    level,
    discountPercent: percent,
    referencePrice,
    reasons: [`${Math.round(percent)} % sous le prix médian des offres comparables`],
  };
}

/**
 * Annotate the competing offers of **one product** in one pass: each offer
 * is measured against the offers in the same condition, and marked
 * `priceOutlier` when its price is far outside them.
 */
export function annotateOffersWithDeals(offers: Offer[]): Offer[] {
  const groups = new Map<string, Offer[]>();
  for (const offer of offers) {
    const key = conditionGroup(offer);
    groups.set(key, [...(groups.get(key) ?? []), offer]);
  }

  const context = new Map<string, { reference?: Money; bounds?: PriceBounds }>();
  for (const [key, group] of groups) {
    context.set(key, {
      reference: computeReferencePrice(group),
      bounds: priceBounds(group.map((offer) => offer.totalPrice.amount)),
    });
  }

  return offers.map((offer) => {
    const { reference, bounds } = context.get(conditionGroup(offer)) ?? {};
    const amount = offer.totalPrice.amount;
    const priceOutlier = bounds
      ? amount < bounds.low
        ? ("low" as const)
        : amount > bounds.high
          ? ("high" as const)
          : undefined
      : undefined;
    return {
      ...offer,
      priceOutlier,
      deal: scoreOffer(offer, reference, { suspicious: priceOutlier === "low" }),
    };
  });
}

/**
 * The offer a product is headlined with: the cheapest one that is not
 * flagged as suspicious. A doubtful listing stays in the comparison table,
 * with its warning, but never becomes the "from" price.
 */
export function pickBestOffer(offers: Offer[]): Offer | undefined {
  const byPrice = [...offers].sort((a, b) => a.totalPrice.amount - b.totalPrice.amount);
  return byPrice.find((offer) => !offer.deal?.suspicious) ?? byPrice[0];
}

/** Offers whose price is in line with the others: no outlier, no warning. */
export function typicalOffers(offers: Offer[]): Offer[] {
  const typical = offers.filter((offer) => !offer.priceOutlier && !offer.deal?.suspicious);
  return typical.length > 0 ? typical : offers;
}

/**
 * Headline price and price range of a product. The range spans the typical
 * offers only, so "de 211 € à 277 €" is not stretched by one listing at 822 €.
 */
export function summarizeOffers(offers: Offer[]): {
  bestOffer?: Offer;
  priceRange?: { min: Money; max: Money };
} {
  const amounts = typicalOffers(offers).sort((a, b) => a.totalPrice.amount - b.totalPrice.amount);
  const min = amounts[0];
  const max = amounts[amounts.length - 1];
  return {
    bestOffer: pickBestOffer(offers),
    priceRange: min && max ? { min: min.totalPrice, max: max.totalPrice } : undefined,
  };
}

export function toDealLevel(score: number): DealLevel {
  if (score >= DEAL_SCORE_THRESHOLDS.exceptional) return "exceptional";
  if (score >= DEAL_SCORE_THRESHOLDS.great) return "great";
  if (score >= DEAL_SCORE_THRESHOLDS.good) return "good";
  return "none";
}
