import type { PricePoint } from "@/lib/catalogue";
import { CONDITION_LABELS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { Money, ProductCondition } from "@/types";

/**
 * "Prix du marché" : the price history of a product, one curve per condition,
 * drawn server-side as inline SVG (no client JavaScript).
 *
 * Each point is the **median of the typical offers** at one refresh of the
 * catalogue — not the single cheapest listing, which would make the curve
 * jump with every doubtful ad. The section renders only once at least two
 * days of history exist for one condition; before that the page simply says
 * the history is building up, so nothing here ever shows an invented trend.
 */

const CONDITION_ORDER: ProductCondition[] = ["new", "refurbished", "used"];

/** Styles per condition; distinguishable shapes/dashes, not colour alone. */
const LINE_STYLE: Record<string, { stroke: string; dash?: string }> = {
  new: { stroke: "var(--color-primary, #2563eb)" },
  refurbished: { stroke: "#0d9488", dash: "7 4" },
  used: { stroke: "#b45309", dash: "2 4" },
};

const MIN_SPAN_MS = 2 * 24 * 3600 * 1000;
/** One point per day at most: several refreshes a day say nothing new. */
const DAY_MS = 24 * 3600 * 1000;

interface Series {
  condition: ProductCondition;
  points: { t: number; cents: number }[];
  last: PricePoint;
}

function toSeries(history: PricePoint[]): Series[] {
  return CONDITION_ORDER.flatMap((condition) => {
    const of = history.filter((point) => point.condition === condition);
    if (of.length === 0) return [];
    // Keep the last capture of each day.
    const byDay = new Map<number, PricePoint>();
    for (const point of of) byDay.set(Math.floor(point.capturedAt / DAY_MS), point);
    const points = [...byDay.values()]
      .sort((a, b) => a.capturedAt - b.capturedAt)
      .map((point) => ({ t: point.capturedAt, cents: point.medianCents }));
    return [{ condition, points, last: of[of.length - 1] as PricePoint }];
  });
}

const money = (cents: number): Money => ({ amount: cents, currency: "EUR" });

export function PriceHistory({ history }: { history: PricePoint[] }) {
  const series = toSeries(history);
  if (series.length === 0) return null;

  const drawable = series.filter(
    (candidate) =>
      candidate.points.length >= 3 &&
      (candidate.points.at(-1)?.t ?? 0) - (candidate.points[0]?.t ?? 0) >= MIN_SPAN_MS,
  );
  // Until a curve can be drawn, the current prices are already shown at the
  // top of the page: a second block of the same figures adds nothing.
  if (drawable.length === 0) return null;

  return (
    <section aria-labelledby="price-history" className="rounded-xl border bg-white p-6">
      <h2 id="price-history" className="text-xl font-semibold">
        Évolution des prix
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Prix médian des offres comparables relevées par Findlydeal, par état. Les prix aberrants
        sont écartés du calcul.
      </p>

      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        {series.map(({ condition, points, last }) => {
          const first = points[0];
          const current = points.at(-1);
          const delta = first && current && first.cents > 0 ? current.cents - first.cents : 0;
          const deltaPercent = first && first.cents > 0 ? (delta / first.cents) * 100 : 0;
          return (
            <div key={condition} className="rounded-xl bg-cream px-4 py-3">
              <dt className="text-xs font-medium text-muted-foreground">
                {CONDITION_LABELS[condition]}, médiane
              </dt>
              <dd className="mt-0.5 font-display text-lg font-bold tabular-nums">
                {formatPrice(money(last.medianCents))}
              </dd>
              <dd className="text-xs text-muted-foreground">
                {points.length > 1 ? (
                  <>
                    {delta === 0
                      ? "stable"
                      : `${delta > 0 ? "+" : "−"}${Math.abs(deltaPercent).toFixed(1).replace(".", ",")} %`}{" "}
                    sur {Math.max(1, Math.round(((current?.t ?? 0) - (first?.t ?? 0)) / DAY_MS))}{" "}
                    jours, {last.offerCount} offres
                  </>
                ) : (
                  <>{last.offerCount} offres comparées</>
                )}
              </dd>
            </div>
          );
        })}
      </dl>

      {drawable.length > 0 ? <Chart series={drawable} /> : null}

      <p className="mt-3 text-xs text-muted-foreground">
        {drawable.length > 0
          ? "Relevés quotidiens Findlydeal sur les marketplaces partenaires. Les prix passés ne préjugent pas des prix futurs."
          : "L'historique se construit : la courbe apparaîtra après quelques jours de relevés."}
      </p>
    </section>
  );
}

const WIDTH = 640;
const HEIGHT = 180;
const PAD = { top: 10, right: 12, bottom: 22, left: 56 };

function Chart({ series }: { series: Series[] }) {
  const all = series.flatMap((candidate) => candidate.points);
  const t0 = Math.min(...all.map((point) => point.t));
  const t1 = Math.max(...all.map((point) => point.t));
  let low = Math.min(...all.map((point) => point.cents));
  let high = Math.max(...all.map((point) => point.cents));
  const margin = Math.max((high - low) * 0.12, high * 0.02, 200);
  low = Math.max(0, low - margin);
  high = high + margin;

  const x = (t: number) =>
    PAD.left + ((t - t0) / Math.max(1, t1 - t0)) * (WIDTH - PAD.left - PAD.right);
  const y = (cents: number) =>
    PAD.top + (1 - (cents - low) / Math.max(1, high - low)) * (HEIGHT - PAD.top - PAD.bottom);

  const ticks = [low, (low + high) / 2, high];
  const dateOf = (t: number) =>
    new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  const euros = (cents: number) => `${Math.round(cents / 100).toLocaleString("fr-FR")} €`;

  return (
    <figure className="mt-5">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Évolution du prix médian du ${dateOf(t0)} au ${dateOf(t1)}`}
        className="h-auto w-full"
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              x2={WIDTH - PAD.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke="currentColor"
              strokeOpacity="0.12"
            />
            <text
              x={PAD.left - 8}
              y={y(tick) + 4}
              textAnchor="end"
              fontSize="11"
              fill="currentColor"
              fillOpacity="0.55"
            >
              {euros(tick)}
            </text>
          </g>
        ))}
        <text x={PAD.left} y={HEIGHT - 5} fontSize="11" fill="currentColor" fillOpacity="0.55">
          {dateOf(t0)}
        </text>
        <text
          x={WIDTH - PAD.right}
          y={HEIGHT - 5}
          textAnchor="end"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.55"
        >
          {dateOf(t1)}
        </text>
        {series.map(({ condition, points }) => {
          const style = LINE_STYLE[condition] ?? { stroke: "currentColor" };
          const path = points
            .map((point, index) => `${index === 0 ? "M" : "L"}${x(point.t)},${y(point.cents)}`)
            .join(" ");
          const last = points.at(-1);
          return (
            <g key={condition}>
              <path
                d={path}
                fill="none"
                stroke={style.stroke}
                strokeWidth="2"
                strokeDasharray={style.dash}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {last ? <circle cx={x(last.t)} cy={y(last.cents)} r="3" fill={style.stroke} /> : null}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {series.map(({ condition }) => {
          const style = LINE_STYLE[condition] ?? { stroke: "currentColor" };
          return (
            <span key={condition} className="inline-flex items-center gap-1.5">
              <svg width="18" height="6" aria-hidden>
                <line
                  x1="1"
                  x2="17"
                  y1="3"
                  y2="3"
                  stroke={style.stroke}
                  strokeWidth="2"
                  strokeDasharray={style.dash}
                />
              </svg>
              {CONDITION_LABELS[condition]}
            </span>
          );
        })}
      </figcaption>
    </figure>
  );
}
