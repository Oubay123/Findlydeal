"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterPillProps {
  label: string;
  active?: boolean;
  /** Show a clear affordance — used for pills that represent an applied filter. */
  removable?: boolean;
  onToggle?: () => void;
}

/** A single toggleable filter chip. Stateless: the URL owns the truth. */
export function FilterPill({ label, active, removable, onToggle }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition-colors",
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent",
      )}
    >
      {label}
      {removable && active ? <X className="size-3" aria-hidden /> : null}
    </button>
  );
}
