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
 * Wraps `next/image` so two things can never be forgotten:
 * - a `sizes` attribute matched to the display slot, otherwise the browser
 *   downloads a full-width file for a thumbnail;
 * - `alt`, which stays required by the type.
 *
 * Lazy loading and AVIF/WebP negotiation are handled by `next/image` itself
 * (formats are configured in next.config.ts). Pass `priority` on the one
 * image that is the LCP of a page — and only that one.
 *
 * ## Why the blur placeholder is tied to `priority`
 *
 * `placeholder="blur"` inlines a ~2.6 KB SVG blur filter into the image's
 * `style` attribute. On the LCP image that is a good trade: it fills the slot
 * while the photo downloads. On a page carrying sixty product cards it added
 * close to 200 KB of HTML to decorate images the visitor may never scroll to,
 * and those images are lazy anyway — they load off-screen, behind a container
 * that already paints `bg-muted`. So the placeholder follows `priority`.
 */
export function SmartImage({ context, alt, ...props }: SmartImageProps) {
  const placeholder = props.priority
    ? ({ placeholder: "blur", blurDataURL: IMAGE_BLUR_DATA_URL } as const)
    : undefined;

  return <Image alt={alt} sizes={IMAGE_SIZES[context]} {...placeholder} {...props} />;
}
