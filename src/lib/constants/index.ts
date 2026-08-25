/**
 * Barrel for domain constants.
 *
 * Note the split with `src/config/`: `config/` describes *the site* (name,
 * navigation, category catalogue), `lib/constants/` describes *the domain*
 * (locales, filter defaults, deal thresholds).
 */
export * from "./languages";
export * from "./search";
export * from "./deals";
export * from "./products";
