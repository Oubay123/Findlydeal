import type { DealLevel } from "@/types";

/**
 * Score thresholds that turn a raw deal score (0..100) into a label.
 * Tune these once real price data is flowing — they are deliberately the only
 * place where the boundaries are defined.
 */
export const DEAL_SCORE_THRESHOLDS: Record<Exclude<DealLevel, "none">, number> = {
  good: 40,
  great: 65,
  exceptional: 85,
};

/** Below this discount an offer is not worth flagging as a deal at all. */
export const MIN_DISCOUNT_PERCENT = 10;

/** A price sample smaller than this is too thin to compute a reference price. */
export const MIN_OFFERS_FOR_REFERENCE_PRICE = 3;

export const DEAL_LEVEL_LABELS: Record<DealLevel, string> = {
  none: "",
  good: "Bonne affaire",
  great: "Très bonne affaire",
  exceptional: "Affaire exceptionnelle",
};
