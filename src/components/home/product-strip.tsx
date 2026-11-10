import { SmartImage } from "@/components/common/smart-image";
import type { Product } from "@/types";

/**
 * A strip of product photos that drifts slowly sideways, as a background.
 * Pure CSS (`.strip-drift` in globals.css): the list is rendered twice and
 * translated by half its width, so the loop never shows a seam. Decorative
 * only: hidden from assistive technology, not clickable, and still when the
 * visitor asks for reduced motion.
 */
export function ProductStrip({ products, className }: { products: Product[]; className?: string }) {
  const tiles = products.filter((product) => product.imageUrl).slice(0, 14);
  if (tiles.length < 6) return null;
  const loop = [...tiles, ...tiles];

  return (
    <div aria-hidden className={className}>
      <ul className="strip-drift flex w-max gap-4">
        {loop.map((product, index) => (
          <li
            key={`${product.id}-${index}`}
            className="flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-white sm:size-40"
          >
            <SmartImage
              context="tile"
              src={product.imageUrl as string}
              alt=""
              width={160}
              height={160}
              className="size-36 object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
