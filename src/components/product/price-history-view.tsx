"use client";

import { useId, useState } from "react";
import { CONDITION_TONE } from "@/components/product/condition-ladder";
import { CONDITION_LABELS } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";
import type { ProductCondition } from "@/types";

export interface HistoryPoint {
  /** Epoch milliseconds of the capture. */
  t: number;
  /** Median of the typical offers, in cents. */
  median: number;
  /** Cheapest typical offer, in cents. */
  min: number;
  count: number;
}

export interface HistorySeries {
  condition: ProductCondition;
  points: HistoryPoint[];
}

const STROKE: Partial<Record<ProductCondition, { color: string; dash?: string }>> = {
  new: { color: "var(--condition-new)" },
  refurbished: { color: "var(--condition-refurbished)", dash: "7 4" },
  used: { color: "var(--condition-used)", dash: "2 4" },
};

const DAY_MS = 24 * 3600 * 1000;
const MIN_SPAN_MS = 2 * DAY_MS;

const eur = (cents: number) => formatPrice({ amount: cents, currency: "EUR" });
const dateOf = (t: number) =>
  new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

/**
 * The price history as a curve or as a table, one control to switch. The
 * table is the complete record (median and cheapest offer per day); the curve
 * draws the medians once three days exist for a condition.
 */
export function PriceHistoryView({ series }: { series: HistorySeries[] }) {
  const drawable = series.filter(
    (s) => s.points.length >= 3 && (s.points.at(-1)?.t ?? 0) - (s.points[0]?.t ?? 0) >= MIN_SPAN_MS,
  );
  const canDraw = drawable.length > 0;
  const [view, setView] = useState<"chart" | "table">(canDraw ? "chart" : "table");
  const id = useId();
  const span = {
    from: Math.min(...series.flatMap((s) => s.points.map((p) => p.t))),
    to: Math.max(...series.flatMap((s) => s.points.map((p) => p.t))),
  };

  return (
    <section aria-labelledby={`${id}-title`} className="rounded-xl border bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div>
          <h2 id={`${id}-title`} className="text-xl font-semibold">
            Évolution des prix
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Prix médian des offres comparables, par état, du {dateOf(span.from)} au{" "}
            {dateOf(span.to).replace(/\.$/, "")}. Les prix aberrants sont écartés.
          </p>
        </div>
        <div
          role="group"
          aria-label="Affichage de l'historique"
          className="inline-flex rounded-lg border p-0.5 text-sm"
        >
          <ViewButton
            active={view === "chart"}
            onClick={() => setView("chart")}
            disabled={!canDraw}
            title={canDraw ? undefined : "La courbe apparaît après trois jours de relevés"}
          >
            Courbe
          </ViewButton>
          <ViewButton active={view === "table"} onClick={() => setView("table")}>
            Tableau
          </ViewButton>
        </div>
      </div>

      <div className="mt-5">
        {view === "chart" && canDraw ? <Chart series={drawable} /> : <Table series={series} />}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Relevés quotidiens de Findlydeal sur les offres eBay livrables en France. Les prix passés ne
        préjugent pas des prix futurs.
      </p>
    </section>
  );
}

function ViewButton({
  active,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "rounded-md px-3 py-1 font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        active ? "bg-foreground text-white" : "text-muted-foreground hover:text-foreground",
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Table                                                               */
/* ------------------------------------------------------------------ */

function Table({ series }: { series: HistorySeries[] }) {
  const days = [
    ...new Set(series.flatMap((s) => s.points.map((p) => Math.floor(p.t / DAY_MS)))),
  ].sort((a, b) => b - a);
  const at = (s: HistorySeries, day: number) =>
    s.points.find((p) => Math.floor(p.t / DAY_MS) === day);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <caption className="sr-only">
          Prix médian et offre la moins chère par jour et par état
        </caption>
        <thead>
          <tr className="border-b text-left text-xs text-muted-foreground">
            <th scope="col" className="py-2 pr-4 font-medium">
              Date
            </th>
            {series.map((s) => (
              <th key={s.condition} scope="col" className="py-2 pr-4 font-medium">
                <span className={`rounded-md px-1.5 py-0.5 ${CONDITION_TONE[s.condition]}`}>
                  {CONDITION_LABELS[s.condition]}
                </span>
                <span className="mt-1 block font-normal">médiane, la moins chère</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day} className="border-b last:border-b-0">
              <th
                scope="row"
                className="py-2.5 pr-4 font-normal whitespace-nowrap text-muted-foreground"
              >
                {dateOf(day * DAY_MS)}
              </th>
              {series.map((s) => {
                const point = at(s, day);
                return (
                  <td key={s.condition} className="py-2.5 pr-4 whitespace-nowrap tabular-nums">
                    {point ? (
                      <>
                        <span className="font-semibold">{eur(point.median)}</span>
                        <span className="text-muted-foreground">
                          , {eur(point.min)} <span className="text-xs">({point.count})</span>
                        </span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Aucune offre</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-muted-foreground">
        Entre parenthèses, le nombre d&apos;offres comparées ce jour-là.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chart                                                               */
/* ------------------------------------------------------------------ */

const WIDTH = 640;
const HEIGHT = 200;
const PAD = { top: 12, right: 12, bottom: 24, left: 56 };

function Chart({ series }: { series: HistorySeries[] }) {
  const all = series.flatMap((s) => s.points);
  const t0 = Math.min(...all.map((p) => p.t));
  const t1 = Math.max(...all.map((p) => p.t));
  let low = Math.min(...all.map((p) => p.median));
  let high = Math.max(...all.map((p) => p.median));
  const margin = Math.max((high - low) * 0.12, high * 0.02, 200);
  low = Math.max(0, low - margin);
  high = high + margin;

  const x = (t: number) =>
    PAD.left + ((t - t0) / Math.max(1, t1 - t0)) * (WIDTH - PAD.left - PAD.right);
  const y = (cents: number) =>
    PAD.top + (1 - (cents - low) / Math.max(1, high - low)) * (HEIGHT - PAD.top - PAD.bottom);
  const ticks = [low, (low + high) / 2, high];
  const euros = (cents: number) => `${Math.round(cents / 100).toLocaleString("fr-FR")} €`;

  return (
    <figure>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Prix médian par état du ${dateOf(t0)} au ${dateOf(t1)}`}
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
              fillOpacity="0.6"
            >
              {euros(tick)}
            </text>
          </g>
        ))}
        <text x={PAD.left} y={HEIGHT - 6} fontSize="11" fill="currentColor" fillOpacity="0.6">
          {dateOf(t0)}
        </text>
        <text
          x={WIDTH - PAD.right}
          y={HEIGHT - 6}
          textAnchor="end"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.6"
        >
          {dateOf(t1)}
        </text>
        {series.map(({ condition, points }) => {
          const style = STROKE[condition] ?? { color: "currentColor" };
          const path = points
            .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.t)},${y(p.median)}`)
            .join(" ");
          const last = points.at(-1);
          return (
            <g key={condition}>
              <path
                d={path}
                fill="none"
                stroke={style.color}
                strokeWidth="2"
                strokeDasharray={style.dash}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {last ? (
                <circle cx={x(last.t)} cy={y(last.median)} r="3.5" fill={style.color} />
              ) : null}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
        {series.map(({ condition, points }) => {
          const style = STROKE[condition] ?? { color: "currentColor" };
          const last = points.at(-1);
          return (
            <span key={condition} className="inline-flex items-center gap-1.5">
              <svg width="18" height="6" aria-hidden>
                <line
                  x1="1"
                  x2="17"
                  y1="3"
                  y2="3"
                  stroke={style.color}
                  strokeWidth="2"
                  strokeDasharray={style.dash}
                />
              </svg>
              {CONDITION_LABELS[condition]}
              {last ? (
                <span className="font-medium text-foreground tabular-nums">{eur(last.median)}</span>
              ) : null}
            </span>
          );
        })}
      </figcaption>
    </figure>
  );
}
