"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/use-search";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  /** `hero` is the large white pill, `default` the inline page version. */
  variant?: "default" | "hero";
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

/** The single search entry point of the app. Pushes to `/search?q=…`. */
export function SearchBar({
  variant = "default",
  placeholder = "Que recherchez-vous ?",
  autoFocus,
  className,
}: SearchBarProps) {
  const { term, setTerm, submit } = useSearch();
  const isHero = variant === "hero";

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className={cn(
        "flex w-full items-center gap-2 rounded-full bg-white",
        isHero ? "p-1.5 shadow-xl shadow-black/10" : "border p-1",
        className,
      )}
    >
      <Search
        className="ml-3 size-5 shrink-0 text-muted-foreground"
        strokeWidth={2.25}
        aria-hidden
      />
      <input
        type="search"
        name="q"
        value={term}
        autoFocus={autoFocus}
        onChange={(event) => setTerm(event.target.value)}
        placeholder={placeholder}
        aria-label="Rechercher un produit"
        className={cn(
          "min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground",
          isHero ? "h-11 text-base" : "h-9 text-sm",
        )}
      />
      <Button type="submit" variant="brand" size={isHero ? "xl" : "md"} className="rounded-full">
        Rechercher
      </Button>
    </form>
  );
}
