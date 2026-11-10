import type { PricePoint } from "@/lib/catalogue";
import { PriceHistoryView, type HistorySeries } from "@/components/product/price-history-view";
import type { ProductCondition } from "@/types";

/**
 * "Évolution des prix": the price history of a product, one series per
 * condition, shown as a curve or as a table at the visitor's choice.
 *
 * Each point is the **median of the typical offers** at one refresh of the
 * catalogue, not the single cheapest listing, which would make the curve
 * jump with every doubtful ad. The cheapest typical offer of the day is kept
 * for the table. Several refreshes a day say nothing new: one point per day.
 *
 * The section appears once two days of history exist for one condition.
 * Before that, the current prices are already at the top of the page, and a
 * block with the same figures would add nothing.
 */

const CONDITION_ORDER: ProductCondition[] = ["new", "refurbished", "used"];
const DAY_MS = 24 * 3600 * 1000;

function toSeries(history: PricePoint[]): HistorySeries[] {
  return CONDITION_ORDER.flatMap((condition) => {
    const of = history.filter((point) => point.condition === condition);
    if (of.length === 0) return [];
    const byDay = new Map<number, PricePoint>();
    for (const point of of) byDay.set(Math.floor(point.capturedAt / DAY_MS), point);
    const points = [...byDay.values()]
      .sort((a, b) => a.capturedAt - b.capturedAt)
      .map((point) => ({
        t: point.capturedAt,
        median: point.medianCents,
        min: point.minCents,
        count: point.offerCount,
      }));
    return [{ condition, points }];
  });
}

export function PriceHistory({ history }: { history: PricePoint[] }) {
  const series = toSeries(history);
  const days = new Set(series.flatMap((s) => s.points.map((p) => Math.floor(p.t / DAY_MS))));
  if (days.size < 2) return null;
  return <PriceHistoryView series={series} />;
}
