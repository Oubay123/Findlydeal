/**
 * Image helpers: URL building, responsive `sizes` presets and the shared
 * loading placeholder.
 *
 * Unsplash serves resized, cropped derivatives straight from its CDN, so a
 * single photo id covers every use (tile, card, full-bleed hero). Its licence
 * allows free commercial use without attribution - https://unsplash.com/license
 *
 * Every id used in this project was checked to return HTTP 200. The host is
 * declared in `images.remotePatterns` (next.config.ts); next/image rejects any
 * hostname that is not.
 */
const UNSPLASH_HOST = "https://images.unsplash.com";

export function unsplash(photoId: string, width = 900): string {
  return `${UNSPLASH_HOST}/${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

/**
 * Where an image is displayed, which is the only thing that determines the
 * right `sizes` attribute. Getting this wrong makes the browser download a
 * 2000px file for a 300px slot, so it lives here rather than being retyped at
 * each call site.
 */
export type ImageContext =
  | "productCardGrid"
  | "productCardList"
  | "productCardRow"
  | "productHero"
  | "thumbnail"
  | "blogCard"
  | "blogCover"
  | "fullBleed";

export const IMAGE_SIZES: Record<ImageContext, string> = {
  // 1 col mobile, 2 tablet, 3-4 desktop
  productCardGrid: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  // fixed-width card inside a horizontally scrolling shelf (ProductRow)
  productCardRow: "(max-width: 640px) 60vw, 264px",
  // fixed-width thumbnail on the left of a list row
  productCardList: "(max-width: 640px) 100vw, 220px",
  // half the page on desktop, full width on mobile
  productHero: "(max-width: 1024px) 100vw, 45vw",
  thumbnail: "(max-width: 1024px) 25vw, 120px",
  blogCard: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  blogCover: "(max-width: 1024px) 100vw, 800px",
  fullBleed: "100vw",
};

/**
 * Tiny warm-grey PNG blurred behind every photo while it loads.
 *
 * One shared placeholder rather than a per-image LQIP: it keeps the layout
 * stable and avoids the grey flash, without a build step that would have to
 * download and re-encode every remote photo. Swap for real per-image
 * `blurDataURL`s if the marketplaces ever expose them.
 */
export const IMAGE_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAIAAABxZ0isAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAEUlEQVQI12N48+wBVsQwkBIA7CGBYZf4YrwAAAAASUVORK5CYII=";
