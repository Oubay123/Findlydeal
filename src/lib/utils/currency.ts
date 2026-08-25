import type { CurrencyCode, Money } from "@/types";

/**
 * Currency arithmetic. Amounts are always in minor units (cents), so every
 * operation here stays in integer space.
 */

export function money(amount: number, currency: CurrencyCode): Money {
  return { amount: Math.round(amount), currency };
}

/** Build a `Money` from a major-unit value, e.g. `fromMajorUnits(19.99, "EUR")`. */
export function fromMajorUnits(amount: number, currency: CurrencyCode): Money {
  return money(amount * 100, currency);
}

export function addMoney(a: Money, b: Money): Money {
  assertSameCurrency(a, b);
  return money(a.amount + b.amount, a.currency);
}

/** Percentage `reference` is above `current`. Returns 0 when there is no saving. */
export function discountPercent(current: Money, reference: Money): number {
  assertSameCurrency(current, reference);
  if (reference.amount <= 0 || current.amount >= reference.amount) return 0;
  return ((reference.amount - current.amount) / reference.amount) * 100;
}

export function compareMoney(a: Money, b: Money): number {
  assertSameCurrency(a, b);
  return a.amount - b.amount;
}

function assertSameCurrency(a: Money, b: Money): void {
  if (a.currency !== b.currency) {
    // TODO: plug a conversion-rate provider (CURRENCY_API_KEY) once sources
    // start returning offers in more than one currency.
    throw new Error(`Cannot combine ${a.currency} and ${b.currency} without a conversion rate.`);
  }
}
