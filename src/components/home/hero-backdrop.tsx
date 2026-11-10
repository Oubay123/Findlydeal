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
 * Photos cross-fading behind the home page headline.
 *
 * - Only the first photo is rendered on the server: it is the LCP of the
 *   page, preloaded. The others are mounted once the browser is idle, so they
 *   never compete with it for bandwidth.
 * - Each photo stays 7 s and fades into the next over 1.5 s. Only opacity
 *   animates: no zoom, which reads as an advert and can cause motion
 *   sickness.
 * - Rotation stops when the tab is hidden, when the visitor presses pause
 *   (WCAG 2.2.2: anything moving for more than five seconds can be stopped),
 *   and never starts for visitors who asked for reduced motion: they keep the
 *   first photo, still, and no button.
 */
export function HeroBackdrop({ photos, intervalMs = 7000 }: HeroBackdropProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const schedule =
      window.requestIdleCallback ??
      ((callback: IdleRequestCallback) => window.setTimeout(callback, 1200));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = schedule(() => setMounted(true));
    return () => cancel(handle as number);
  }, [photos.length]);

  useEffect(() => {
    const update = () => setHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!mounted || paused || hidden) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % photos.length),
      intervalMs,
    );
    return () => window.clearInterval(timer);
  }, [mounted, paused, hidden, photos.length, intervalMs]);

  const visible = mounted ? photos : photos.slice(0, 1);

  return (
    <>
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        {visible.map((src, position) => (
          <SmartImage
            key={src}
            src={src}
            alt=""
            fill
            context="fullBleed"
            preload={position === 0}
            fetchPriority={position === 0 ? "high" : "low"}
            className={cn(
              "object-cover transition-opacity duration-[1500ms] ease-in-out motion-reduce:transition-none",
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
          className="absolute right-4 bottom-4 inline-flex size-9 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white/85 hover:bg-black/40 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:right-6 sm:bottom-6"
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
