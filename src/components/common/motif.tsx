import type { SelectionMotif } from "@/config/selections";
import { cn } from "@/lib/utils";

/**
 * Quiet line drawings used as backgrounds where a band would otherwise be
 * empty: thin strokes in the current text colour, at low opacity, no photo,
 * no gradient. They sit behind the content (`aria-hidden`) and never carry
 * information. Hidden on phones, where they would sit under the text.
 */
export function Motif({ kind, className }: { kind: SelectionMotif | "dots"; className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 hidden h-full w-full sm:block",
        className,
      )}
      preserveAspectRatio="xMaxYMid slice"
      viewBox="0 0 800 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      {kind === "winter" ? <Winter /> : null}
      {kind === "sales" ? <Sales /> : null}
      {kind === "school" ? <School /> : null}
      {kind === "summer" ? <Summer /> : null}
      {kind === "dots" ? <Dots /> : null}
    </svg>
  );
}

/** Six-armed snow crystals, a few sizes, scattered on the right. */
function Winter() {
  const crystals: [number, number, number][] = [
    [560, 40, 14],
    [660, 120, 22],
    [740, 50, 10],
    [610, 230, 9],
    [720, 200, 16],
    [500, 150, 7],
    [780, 270, 12],
    [460, 260, 11],
  ];
  return (
    <g>
      {crystals.map(([cx, cy, r], index) => (
        <g key={index} transform={`translate(${cx} ${cy})`}>
          {[0, 60, 120].map((angle) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <line x1={-r} x2={r} y1="0" y2="0" />
              <line x1={r * 0.55} x2={r * 0.8} y1="0" y2={-r * 0.25} />
              <line x1={r * 0.55} x2={r * 0.8} y1="0" y2={r * 0.25} />
              <line x1={-r * 0.55} x2={-r * 0.8} y1="0" y2={-r * 0.25} />
              <line x1={-r * 0.55} x2={-r * 0.8} y1="0" y2={r * 0.25} />
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

/** Price tags, outlined only. */
function Sales() {
  const tags: [number, number, number][] = [
    [600, 60, -20],
    [700, 170, 15],
    [520, 220, -35],
    [760, 40, 30],
  ];
  return (
    <g>
      {tags.map(([x, y, angle], index) => (
        <g key={index} transform={`translate(${x} ${y}) rotate(${angle})`}>
          <path d="M0 0h54l22 22-22 22H0z" strokeLinejoin="round" />
          <circle cx="12" cy="22" r="3" />
        </g>
      ))}
    </g>
  );
}

/** Ruled paper with its margin line. */
function School() {
  return (
    <g>
      {Array.from({ length: 9 }, (_, index) => (
        <line key={index} x1="440" x2="800" y1={30 + index * 30} y2={30 + index * 30} />
      ))}
      <line x1="500" x2="500" y1="0" y2="300" strokeWidth="1.5" />
    </g>
  );
}

/** A sun as concentric arcs, cut by the edge. */
function Summer() {
  return (
    <g>
      {[60, 110, 160, 210].map((r) => (
        <circle key={r} cx="760" cy="40" r={r} />
      ))}
    </g>
  );
}

/** Sparse dots, for a hero that has only text and a search field. */
function Dots() {
  const dots: [number, number][] = [];
  for (let x = 480; x <= 800; x += 40) {
    for (let y = 20; y <= 300; y += 40) dots.push([x + ((y / 40) % 2) * 20, y]);
  }
  return (
    <g fill="currentColor" stroke="none">
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" />
      ))}
    </g>
  );
}
