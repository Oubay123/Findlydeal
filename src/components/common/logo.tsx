import Link from "next/link";
import { Search } from "lucide-react";
import { localePath, type UiLocale } from "@/i18n";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Which language's home page the wordmark links back to. */
  locale: UiLocale;
  className?: string;
  /** Light wordmark, for the dark footer. */
  inverted?: boolean;
}

/**
 * Findlydeal wordmark: a magnifier tile followed by "Findly" + "deal",
 * the second half carrying the brand orange.
 */
export function Logo({ locale, className, inverted }: LogoProps) {
  return (
    <Link
      href={localePath(locale, "/")}
      aria-label="Findlydeal, retour à l'accueil"
      className={cn("flex items-center gap-2.5", className)}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Search className="size-[18px]" strokeWidth={2.75} aria-hidden />
      </span>
      <span
        className={cn(
          "font-display text-xl leading-none font-bold",
          inverted ? "text-white" : "text-foreground",
        )}
      >
        Findly<span className="text-primary">deal</span>
      </span>
    </Link>
  );
}
