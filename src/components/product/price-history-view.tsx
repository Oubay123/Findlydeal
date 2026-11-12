"use client";

import { useId, useState } from "react";
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

/** Ink, brand green and grey: told apart by tone and dash, not by hue. */
const STROKE: Partial<Record<ProductCondition, { color: string; dash?: string }>> = {
  new: { color: "var(--foreground)" },
  refurbished: { color: "var(--primary)", dash: "7 4" },
  used: { color: "var(--muted-foreground)", dash: "2 4" },
};

const DAY_MS = 24 * 3600 * 1000;

const eur = (cents: number) => formatPrice({ amount: cents, currency: "EUR" });
const dateOf = (t: number) =>
  new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }).replace(/\.$/, "");
const dayOf = (t: number) => Math.floor(t / DAY_MS);

/**
 * The price history as a chart (shown first) or as a table, one control to
 * switch. The table is the complete record (median and cheapest offer per
 * day); the chart draws the medians, with a readout of the day under the
 * pointer, the finger or the arrow keys.
 */
export function PriceHistoryView({ series }: { series: HistorySeries[] }) {
  const [view, setView] = useState<"chart" | "table">("chart");
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
            {dateOf(span.to)}. Les prix aberrants sont écartés.
          </p>
        </div>
        <div
          role="group"
          aria-label="Affichage de l'historique"
          className="inline-flex rounded-lg border p-0.5 text-sm"
        >
          <ViewButton active={view === "chart"} onClick={() => setView("chart")}>
            Graphique
          </ViewButton>
          <ViewButton active={view === "table"} onClick={() => setView("table")}>
            Tableau
          </ViewButton>
        </div>
      </div>

      <div className="mt-5">
        {view === "chart" ? <Chart series={series} /> : <Table series={series} />}
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
        "min-h-9 rounded-md px-3.5 py-1 font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none",
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
  const days = [...new Set(series.flatMap((s) => s.points.map((p) => dayOf(p.t))))].sort(
    (a, b) => b - a,
  );
  const at = (s: HistorySeries, day: number) => s.points.find((p) => dayOf(p.t) === day);

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
                <span className="font-semibold text-foreground">
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
const HEIGHT = 220;
const PAD = { top: 16, right: 16, bottom: 26, left: 58 };

function Chart({ series }: { series: HistorySeries[] }) {
  const all = series.flatMap((s) => s.points);
  const days = [...new Set(all.map((p) => dayOf(p.t)))].sort((a, b) => a - b);
  const [active, setActive] = useState(days.length - 1);

  const d0 = days[0] ?? 0;
  const d1 = days.at(-1) ?? 0;
  let low = Math.min(...all.map((p) => p.median));
  let high = Math.max(...all.map((p) => p.median));
  const margin = Math.max((high - low) * 0.12, high * 0.03, 200);
  low = Math.max(0, low - margin);
  high = high + margin;

  const innerW = WIDTH - PAD.left - PAD.right;
  const x = (day: number) =>
    PAD.left + (d1 === d0 ? innerW / 2 : ((day - d0) / (d1 - d0)) * innerW);
  const y = (cents: number) =>
    PAD.top + (1 - (cents - low) / Math.max(1, high - low)) * (HEIGHT - PAD.top - PAD.bottom);
  const ticks = [low, (low + high) / 2, high];
  const euros = (cents: number) => `${Math.round(cents / 100).toLocaleString("fr-FR")} €`;

  const activeDay = days[Math.min(active, days.length - 1)] ?? d1;
  const readout = series.map((s) => ({
    condition: s.condition,
    point: s.points.find((p) => dayOf(p.t) === activeDay),
  }));

  /** Nearest captured day to a horizontal position in the SVG. */
  const pick = (event: React.PointerEvent<SVGSVGElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const svgX = ((event.clientX - box.left) / box.width) * WIDTH;
    let best = 0;
    days.forEach((day, index) => {
      if (Math.abs(x(day) - svgX) < Math.abs(x(days[best] ?? day) - svgX)) best = index;
    });
    setActive(best);
  };

  return (
    <figure>
      <p aria-live="polite" className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-sm">
        <span className="font-medium">{dateOf(activeDay * DAY_MS)}</span>
        {readout.map(({ condition, point }) => (
          <span
            key={condition}
            className="inline-flex items-baseline gap-1.5 text-muted-foreground"
          >
            <svg width="16" height="6" aria-hidden className="self-center">
              <line
                x1="1"
                x2="15"
                y1="3"
                y2="3"
                stroke={STROKE[condition]?.color ?? "currentColor"}
                strokeWidth="2"
                strokeDasharray={STROKE[condition]?.dash}
              />
            </svg>
            {CONDITION_LABELS[condition]}
            <span className="font-semibold text-foreground tabular-nums">
              {point ? eur(point.median) : "-"}
            </span>
          </span>
        ))}
      </p>
      <div className="reveal-wipe relative mt-3">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={`Prix médian par état du ${dateOf(d0 * DAY_MS)} au ${dateOf(d1 * DAY_MS)}. Flèches gauche et droite pour parcourir les jours.`}
          tabIndex={0}
          onPointerMove={pick}
          onPointerDown={pick}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") setActive((i) => Math.max(0, i - 1));
            else if (event.key === "ArrowRight") setActive((i) => Math.min(days.length - 1, i + 1));
            else return;
            event.preventDefault();
          }}
          className="h-auto w-full cursor-crosshair touch-pan-y rounded-md focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
        >
          {ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={PAD.left}
                x2={WIDTH - PAD.right}
                y1={y(tick)}
                y2={y(tick)}
                stroke="currentColor"
                strokeOpacity="0.1"
              />
              <text
                x={PAD.left - 10}
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
          <text x={PAD.left} y={HEIGHT - 6} fontSize="11" fill="currentColor" fillOpacity="0.55">
            {dateOf(d0 * DAY_MS)}
          </text>
          <text
            x={WIDTH - PAD.right}
            y={HEIGHT - 6}
            textAnchor="end"
            fontSize="11"
            fill="currentColor"
            fillOpacity="0.55"
          >
            {dateOf(d1 * DAY_MS)}
          </text>
          <line
            x1={x(activeDay)}
            x2={x(activeDay)}
            y1={PAD.top}
            y2={HEIGHT - PAD.bottom}
            stroke="currentColor"
            strokeOpacity="0.25"
          />
          {series.map(({ condition, points }) => {
            const style = STROKE[condition] ?? { color: "currentColor" };
            const path = points
              .map((p, i) => `${i === 0 ? "M" : "L"}${x(dayOf(p.t))},${y(p.median)}`)
              .join(" ");
            const current = points.find((p) => dayOf(p.t) === activeDay);
            return (
              <g key={condition}>
                {points.length > 1 ? (
                  <path
                    d={path}
                    fill="none"
                    stroke={style.color}
                    strokeWidth="2"
                    strokeDasharray={style.dash}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                ) : null}
                {points.length === 1 || current ? (
                  <circle
                    cx={x(dayOf((current ?? points[0]!).t))}
                    cy={y((current ?? points[0]!).median)}
                    r="4"
                    fill={style.color}
                    stroke="white"
                    strokeWidth="1.5"
                  />
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
