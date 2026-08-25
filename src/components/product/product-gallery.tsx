import { ImageOff } from "lucide-react";
import { DemoBadge } from "@/components/common/demo-notice";
import { SmartImage } from "@/components/common/smart-image";

interface ProductGalleryProps {
  /** Product title, used as the alt fallback. */
  title: string;
  /** Descriptive alt for the product, e.g. "Smartphone Apple iPhone 13…". */
  alt?: string;
  images: string[];
}

/**
 * Product imagery on the comparison page: one large shot plus thumbnails.
 * Server component — a click-to-swap version can come later, but the static
 * grid already shows every photo without shipping any JavaScript.
 */
export function ProductGallery({ title, alt, images }: ProductGalleryProps) {
  const [primary, ...rest] = images;
  const label = alt ?? title;

  if (!primary) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <ImageOff className="size-8" strokeWidth={1.5} aria-hidden />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
        {/* The one image worth prioritising on this page: it is the LCP. */}
        <SmartImage
          src={primary}
          alt={label}
          fill
          priority
          context="productHero"
          className="object-cover"
        />
        <DemoBadge className="absolute bottom-3 left-3" />
      </div>

      {rest.length > 0 ? (
        <ul className="grid grid-cols-4 gap-3">
          {rest.slice(0, 4).map((image, index) => (
            <li
              key={image}
              className="relative aspect-square overflow-hidden rounded-xl border bg-muted"
            >
              <SmartImage
                src={image}
                alt={`${label}, photo ${index + 2} sur ${Math.min(images.length, 5)}`}
                fill
                context="thumbnail"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
