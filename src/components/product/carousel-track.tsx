"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselTrackProps {
  /** Accessible name of the shelf, used on the two arrow buttons. */
  label: string;
  previousLabel: string;
  nextLabel: string;
  /**
   * The cards. They are rendered by the *server* and passed through as
   * children, so this shell hydrates while the cards themselves stay out of
   * the client bundle entirely.
   */
  children: React.ReactNode;
  className?: string;
}

/** Below this, a scroll position counts as "at the end". Sub-pixel safety. */
const EDGE_TOLERANCE = 4;

/**
 * A horizontal shelf driven by two arrow buttons.
 *
 * The element is still a real scroll container, which is what keeps it usable
 * where arrows are not the natural input: a touch drag, a trackpad swipe, the
 * arrow keys when the region has focus. The buttons drive that same scroll
 * rather than replacing it, so there is one source of truth for the position
 * and no state to keep in sync.
 *
 * The native scrollbar is hidden (`no-scrollbar`): with visible arrows it said
 * the same thing twice, right under the cards.
 */
export function CarouselTrack({
  label,
  previousLabel,
  nextLabel,
  children,
  className,
}: CarouselTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    setCanScrollBack(track.scrollLeft > EDGE_TOLERANCE);
    setCanScrollForward(track.scrollLeft < max - EDGE_TOLERANCE);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    measure();
    track.addEventListener("scroll", measure, { passive: true });

    // The arrows must also settle after a resize: rotating a phone or opening
    // a devtools panel changes how much of the shelf fits, and with it whether
    // there is anything left to scroll to.
    const observer = new ResizeObserver(measure);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    // Just under a full viewport, so the card at the edge stays half visible
    // and the reader keeps their place instead of losing the thread.
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <ArrowButton
        side="left"
        label={previousLabel}
        disabled={!canScrollBack}
        onClick={() => scrollBy(-1)}
      />

      {/*
        `tabIndex` + `role="region"` so the shelf can be scrolled from the
        keyboard; without them the cards past the fold are reachable only by
        tabbing through every link inside them.
      */}
      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="-mx-4 no-scrollbar overflow-x-auto px-4 pb-2 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none sm:mx-0 sm:px-0"
      >
        {children}
      </div>

      <ArrowButton
        side="right"
        label={nextLabel}
        disabled={!canScrollForward}
        onClick={() => scrollBy(1)}
      />
    </div>
  );
}

function ArrowButton({
  side,
  label,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "absolute top-[38%] z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-foreground shadow-md transition sm:size-10",
        "hover:border-primary hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none",
        // Dimmed rather than hidden at the ends: an arrow that vanishes reads
        // as a rendering glitch, and the shelf would shift as it came and
        // went. `disabled` already tells assistive tech it is inert, so it
        // stays in the accessibility tree.
        "disabled:cursor-default disabled:border-border disabled:text-muted-foreground/50 disabled:opacity-45 disabled:shadow-none disabled:hover:border-border disabled:hover:text-muted-foreground/50",
        side === "left" ? "-left-1 sm:-left-4" : "-right-1 sm:-right-4",
      )}
    >
      <Icon className="size-5" aria-hidden />
    </button>
  );
}
