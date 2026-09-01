import Image from "next/image";
import { getSourcePresentation } from "@/config/sources";
import { cn } from "@/lib/utils";
import type { SourceId } from "@/types";

interface SourceLogoProps {
  source: SourceId | string;
  /** `sm` for inline pills and table headers, `md` for offer rows. */
  size?: "sm" | "md";
  /** Hide the name and keep the badge alone, e.g. in a narrow table header. */
  hideLabel?: boolean;
  className?: string;
}

const SIZES = {
  sm: { badge: "size-5 text-[0.5rem]", label: "text-xs", px: 20 },
  md: { badge: "size-7 text-[0.625rem]", label: "text-sm", px: 28 },
} as const;

/**
 * A partner's badge and name, rendered the same way everywhere: offer rows,
 * comparison table headers, source filters.
 *
 * While a programme has not provided an official asset the badge is a
 * monogram tinted with the partner's brand colour — see the note in
 * `src/config/sources.ts` on why an invented logo would be worse than none.
 * Setting `logoSrc` on the partner switches this component to the real asset
 * with no change at the call sites.
 */
export function SourceLogo({ source, size = "sm", hideLabel, className }: SourceLogoProps) {
  const partner = getSourcePresentation(source);
  const scale = SIZES[size];

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {partner.logoSrc ? (
        <Image
          src={partner.logoSrc}
          alt=""
          width={scale.px}
          height={scale.px}
          className={cn("shrink-0 rounded object-contain", scale.badge)}
          aria-hidden
        />
      ) : (
        <span
          aria-hidden
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded font-bold tracking-tight",
            scale.badge,
          )}
          style={{ backgroundColor: partner.accent, color: partner.accentForeground }}
        >
          {partner.monogram}
        </span>
      )}

      {/*
        The badge is decorative, so the name carries the information. When it
        is hidden visually it stays available to screen readers rather than
        leaving an unlabelled square.
      */}
      <span className={cn("font-medium", scale.label, hideLabel && "sr-only")}>
        {partner.label}
      </span>
    </span>
  );
}
