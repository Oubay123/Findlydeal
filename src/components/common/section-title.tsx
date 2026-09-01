import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  description?: string;
  /**
   * Heading level. Pass `"h1"` when this is the page's main title.
   *
   * Defaults to `h2` because the component was written for landing-page
   * sections, and that default silently left 16 pages with **no h1 at all** —
   * the single biggest content issue in the SEO audit. A page's main title
   * must say `as="h1"`.
   */
  as?: "h1" | "h2";
  /** Centre the block, used by the full-width landing sections. */
  centered?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  description,
  as: Heading = "h2",
  centered,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("space-y-2", centered && "text-center", className)}>
      <Heading className="text-3xl font-bold sm:text-[2rem]">{title}</Heading>
      {description ? (
        <p className={cn("max-w-2xl text-muted-foreground", centered && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
