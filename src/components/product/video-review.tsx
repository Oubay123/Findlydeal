"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { CollapsibleSection } from "@/components/common/collapsible-section";

interface VideoReviewProps {
  /** YouTube video id. Nothing renders without one. */
  videoId?: string;
  /** Video title, announced to screen readers and shown on the facade. */
  title?: string;
}

/**
 * YouTube review, loaded as a *facade*.
 *
 * A plain `<iframe>` pulls roughly a megabyte of YouTube JavaScript on page
 * load, whether or not anyone presses play — enough to move Core Web Vitals,
 * which feed back into search ranking. So the component paints a thumbnail
 * from `img.youtube.com` and only mounts the real iframe on click.
 *
 * The thumbnail host is deliberately *not* in `remotePatterns`: it is served
 * through a plain `<img>` so that adding video reviews later needs no config
 * change. `next/image` would refuse it.
 */
export function VideoReview({ videoId, title }: VideoReviewProps) {
  const [playing, setPlaying] = useState(false);

  // No video attached yet — the section simply does not exist.
  if (!videoId) return null;

  const label = title ?? "Test vidéo du produit";

  return (
    <CollapsibleSection title="Test en vidéo" defaultOpen>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Lire la vidéo : ${label}`}
            className="group absolute inset-0 size-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnail, kept out of remotePatterns on purpose */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="size-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                <Play className="size-7 translate-x-0.5" fill="currentColor" aria-hidden />
              </span>
            </span>
          </button>
        )}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        La vidéo n&apos;est chargée qu&apos;après un clic, et sert par youtube-nocookie.com : aucun
        cookie YouTube n&apos;est déposé avant.
      </p>
    </CollapsibleSection>
  );
}
