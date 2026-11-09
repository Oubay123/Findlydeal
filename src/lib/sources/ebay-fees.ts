import type { Money } from "@/types";

/**
 * eBay's Buyer Protection fee on items sold by private sellers registered in
 * France (since 1 September 2026): €0.10 per item, plus 7 % of the item price
 * up to €20, 4 % from €20 to €300 and 2 % from €300 to €4,000. Shipping is
 * not part of the base.
 *
 * Source: eBay's announcement, as reported by Value Added Resource
 * (valueaddedresource.net/ebay-fee-free-private-sellers-france-italy).
 *
 * This is an **estimate** shown next to the offer. It is not added to the
 * total: eBay shows the fee on the listing itself, and the Browse API does
 * not say whether the price it returns already includes it.
 */
const FIXED_FEE_CENTS = 10;
const TIERS: { upTo: number; rate: number }[] = [
  { upTo: 2_000, rate: 0.07 },
  { upTo: 30_000, rate: 0.04 },
  { upTo: 400_000, rate: 0.02 },
];

export function estimateBuyerProtectionFee(itemPrice: Money): Money {
  let fee = FIXED_FEE_CENTS;
  let floor = 0;
  for (const tier of TIERS) {
    const slice = Math.min(itemPrice.amount, tier.upTo) - floor;
    if (slice <= 0) break;
    fee += slice * tier.rate;
    floor = tier.upTo;
  }
  return { amount: Math.round(fee), currency: itemPrice.currency };
}
