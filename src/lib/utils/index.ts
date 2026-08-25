/**
 * Generic, dependency-free helpers.
 *
 * Imported as `@/lib/utils` — the alias shadcn/ui expects for `cn`.
 * Anything that knows about search, sources or deals belongs in its own
 * `src/lib/<domain>/` folder instead.
 */
export * from "./cn";
export * from "./format";
export * from "./currency";
export * from "./slug";
export * from "./images";
