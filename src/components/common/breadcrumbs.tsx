import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/common/json-ld";
import { buildBreadcrumbSchema } from "@/lib/seo/json-ld";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  /** Omit on the current page — the last crumb is never a link. */
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/**
 * Visible trail plus its `BreadcrumbList` structured data.
 *
 * Both are emitted from the same array on purpose: a breadcrumb that says one
 * thing to visitors and another to crawlers is a bug waiting to happen.
 * "Accueil" is prepended automatically.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const trail: Crumb[] = [{ name: "Accueil", href: "/" }, ...items];

  return (
    <>
      <nav aria-label="Fil d'ariane" className={cn("text-xs text-muted-foreground", className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={`${crumb.name}-${index}`} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
                ) : null}
                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className="transition-colors hover:text-primary">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="max-w-[18rem] truncate text-foreground" aria-current="page">
                    {crumb.name}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <JsonLd data={buildBreadcrumbSchema(trail)} />
    </>
  );
}
