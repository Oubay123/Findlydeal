"use client";

import { useEffect, useState } from "react";
import { SmartImage } from "@/components/common/smart-image";
import { cn } from "@/lib/utils";

interface HeroSlideshowProps {
  images: string[];
  /** Milliseconds each photo stays on screen. */
  intervalMs?: number;
}

/**
 * Cross-fading photo backdrop for the hero.
 *
 * Performance shape, and the reason this component is not naive:
 * only the **first** slide is rendered on the server and during hydration.
 * The others are mounted once the browser goes idle. Mounting all five at
 * once put four full-bleed images in the viewport — invisible at opacity 0,
 * but still downloaded immediately, competing for bandwidth with the very
 * image that decides the LCP.
 *
 * Once mounted, only opacity animates, so a transition never waits on the
 * network. Visitors who asked for reduced motion keep the first photo, still.
 */
export function HeroSlideshow({ images, intervalMs = 5000 }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [secondaryReady, setSecondaryReady] = useState(false);

  // Bring in the remaining slides only after the main thread is free.
  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const schedule =
      window.requestIdleCallback ??
      ((callback: IdleRequestCallback) => window.setTimeout(callback, 1200));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;

    const handle = schedule(() => setSecondaryReady(true));
    return () => cancel(handle as number);
  }, [images.length]);

  // Rotation starts only once there is something to rotate to.
  useEffect(() => {
    if (!secondaryReady) return;

    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % images.length),
      intervalMs,
    );
    return () => window.clearInterval(timer);
  }, [secondaryReady, images.length, intervalMs]);

  const visible = secondaryReady ? images : images.slice(0, 1);

  return (
    <div aria-hidden className="absolute inset-0 -z-20">
      {visible.map((src, position) => (
        // Decorative backdrop behind the headline: alt="" is deliberate.
        <SmartImage
          key={src}
          src={src}
          alt=""
          fill
          context="fullBleed"
          // The first slide is the LCP candidate of the landing page.
          priority={position === 0}
          className={cn(
            "object-cover transition-opacity duration-[1500ms] ease-in-out motion-reduce:transition-none",
            position === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}
