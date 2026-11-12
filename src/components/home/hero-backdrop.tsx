"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { SmartImage } from "@/components/common/smart-image";
import { cn } from "@/lib/utils";

interface HeroBackdropProps {
  photos: string[];
  /** Milliseconds each photo stays on screen. */
  intervalMs?: number;
}

/**
 * Photos dissolving one into the next behind the home page headline.
 *
 * - Only the first photo is rendered on the server: it is the LCP of the
 *   page, preloaded. The others are mounted shortly after, so they never
 *   compete with it for bandwidth.
 * - The show only moves on to a photo that has finished loading: a slow
 *   network never fades the headline onto an empty background.
 * - Each photo stays 6 s and dissolves into the next over 1.5 s. Only opacity
 *   changes, nothing moves or zooms: a dissolve is also what iOS and macOS
 *   use in place of motion when "Reduce motion" is on, so it plays for those
 *   visitors too (an earlier version froze on the first photo for them).
 * - Rotation stops while the tab is hidden and when the visitor presses
 *   pause (WCAG 2.2.2: anything changing for more than five seconds can be
 *   stopped).
 */
export function HeroBackdrop({ photos, intervalMs = 6000 }: HeroBackdropProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(() => new Set([0]));
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (photos.length < 2) return;
    const timer = window.setTimeout(() => setMounted(true), 800);
    return () => window.clearTimeout(timer);
  }, [photos.length]);

  useEffect(() => {
    const update = () => setHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!mounted || paused || hidden) return;
    const timer = window.setTimeout(() => {
      // Next photo that is ready; stay put if none is yet.
      for (let step = 1; step < photos.length; step++) {
        const candidate = (index + step) % photos.length;
        if (loaded.has(candidate)) {
          setIndex(candidate);
          return;
        }
      }
    }, intervalMs);
    return () => window.clearTimeout(timer);
  }, [mounted, paused, hidden, index, loaded, photos.length, intervalMs]);

  const visible = mounted ? photos : photos.slice(0, 1);

  return (
    <>
      <div aria-hidden className="hero-parallax absolute inset-0 -z-20 overflow-hidden">
        {visible.map((src, position) => (
          <SmartImage
            key={src}
            src={src}
            alt=""
            fill
            context="fullBleed"
            preload={position === 0}
            loading={position === 0 ? undefined : "eager"}
            fetchPriority={position === 0 ? "high" : "low"}
            onLoad={() =>
              setLoaded((current) =>
                current.has(position) ? current : new Set(current).add(position),
              )
            }
            className={cn(
              "object-cover transition-opacity duration-[1500ms] ease-in-out",
              position === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>
      {mounted ? (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          className="absolute right-4 bottom-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white/85 hover:bg-black/40 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:right-6 sm:bottom-6"
        >
          {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
          <span className="sr-only">
            {paused
              ? "Reprendre le défilement des photos"
              : "Mettre en pause le défilement des photos"}
          </span>
        </button>
      ) : null}
    </>
  );
}
