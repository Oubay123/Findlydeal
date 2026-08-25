import Image from "next/image";
import type { ImageProps } from "next/image";
import { IMAGE_BLUR_DATA_URL, IMAGE_SIZES, type ImageContext } from "@/lib/utils/images";

type SmartImageProps = Omit<ImageProps, "sizes" | "placeholder" | "blurDataURL"> & {
  /** Display slot, which decides the responsive `sizes` attribute. */
  context: ImageContext;
};

/**
 * The single way images are rendered in this app.
 *
 * Wraps `next/image` so three things can never be forgotten:
 * - a `sizes` attribute matched to the display slot, otherwise the browser
 *   downloads a full-width file for a thumbnail;
 * - a blur placeholder, so a slow photo does not flash grey;
 * - `alt`, which stays required by the type.
 *
 * Lazy loading and AVIF/WebP negotiation are handled by `next/image` itself
 * (formats are configured in next.config.ts). Pass `priority` on the one
 * image that is the LCP of a page — and only that one.
 */
export function SmartImage({ context, alt, ...props }: SmartImageProps) {
  return (
    <Image
      alt={alt}
      sizes={IMAGE_SIZES[context]}
      placeholder="blur"
      blurDataURL={IMAGE_BLUR_DATA_URL}
      {...props}
    />
  );
}
