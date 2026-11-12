import { typicalOffers } from "@/lib/deals";
import type { Offer, Product, ProductCondition } from "@/types";

/**
 * Market figures of a product, per condition, from the offers in line with
 * the others (doubtful and outlier listings never set a figure).
 *
 * The "gap with new" compares the cheapest refurbished or used offer to the
 * cheapest new one **at the same moment**. It is a comparison between offers,
 * not a discount: no seller ever charged the new price for that listing, so
 * the site never words it as a reduction (article L. 112-1-1 of the Code de
 * la consommation governs reductions, not comparisons).
 */

export const MARKET_CONDITIONS: ProductCondition[] = ["new", "refurbished", "used"];

export interface ConditionMarket {
  condition: ProductCondition;
  /** Cheapest typical offer, in cents. */
  lowestCents?: number;
  /** Median of the typical offers, in cents. */
  medianCents?: number;
  count: number;
  /** How much cheaper than the cheapest new offer, in percent (> 0 = cheaper). */
  gapWithNewPercent?: number;
}

const median = (sorted: number[]) => {
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : ((sorted[middle - 1] ?? 0) + (sorted[middle] ?? 0)) / 2;
};

export function marketByCondition(offers: Offer[]): ConditionMarket[] {
  const typical = typicalOffers(offers);
  const rows = MARKET_CONDITIONS.map((condition): ConditionMarket => {
    const inCondition = typical.filter((offer) => offer.condition === condition);
    const amounts = inCondition.map((offer) => offer.totalPrice.amount).sort((a, b) => a - b);
    // The lowest price shown is a delivered price: an offer whose shipping
    // is unknown only sets it when no other offer exists in that condition.
    const delivered = inCondition
      .filter((offer) => !offer.shippingUnknown)
      .map((offer) => offer.totalPrice.amount);
    return {
      condition,
      lowestCents: delivered.length ? Math.min(...delivered) : amounts[0],
      medianCents: amounts.length ? Math.round(median(amounts) as number) : undefined,
      count: amounts.length,
    };
  });
  const newLowest = rows[0]?.lowestCents;
  for (const row of rows.slice(1)) {
    if (newLowest && row.lowestCents && row.lowestCents < newLowest) {
      row.gapWithNewPercent = Math.round(((newLowest - row.lowestCents) / newLowest) * 100);
    }
  }
  return rows;
}

/** Most recent capture among the offers: when the prices shown were read. */
export function lastFetchedAt(offers: Offer[]): string | undefined {
  return offers.reduce<string | undefined>(
    (latest, offer) => (!latest || offer.fetchedAt > latest ? offer.fetchedAt : latest),
    undefined,
  );
}

export interface BarometerRow {
  product: Product;
  market: ConditionMarket[];
}

export interface BarometerSummary {
  products: number;
  /** Products priced in new and in at least one second-hand condition. */
  comparable: number;
  /** Median gap with new, over the products that have both. */
  refurbishedGap?: number;
  usedGap?: number;
}

/** Median of the per-product gaps, over the products that have one. */
export function summarize(rows: BarometerRow[]): BarometerSummary {
  const gaps = (condition: ProductCondition) =>
    rows
      .map((row) => row.market.find((cell) => cell.condition === condition)?.gapWithNewPercent)
      .filter((gap): gap is number => gap !== undefined)
      .sort((a, b) => a - b);
  const refurbished = gaps("refurbished");
  const used = gaps("used");
  return {
    products: rows.length,
    comparable: rows.filter((row) =>
      row.market.slice(1).some((cell) => cell.gapWithNewPercent !== undefined),
    ).length,
    refurbishedGap: refurbished.length >= 3 ? Math.round(median(refurbished) as number) : undefined,
    usedGap: used.length >= 3 ? Math.round(median(used) as number) : undefined,
  };
}

/** Lowest delivered new price, in cents, as counted by `marketByCondition`. */
export function lowestNewCents(offers: Offer[]): number | undefined {
  return marketByCondition(offers).find((row) => row.condition === "new")?.lowestCents;
}
