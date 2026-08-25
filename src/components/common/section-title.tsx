import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  description?: string;
  /** Centre the block — used by the full-width landing sections. */
  centered?: boolean;
  className?: string;
}

export function SectionTitle({ title, description, centered, className }: SectionTitleProps) {
  return (
    <div className={cn("space-y-2", centered && "text-center", className)}>
      <h2 className="text-3xl font-bold sm:text-[2rem]">{title}</h2>
      {description ? (
        <p className={cn("max-w-2xl text-muted-foreground", centered && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
