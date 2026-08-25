import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Building blocks for the route-level `loading.tsx` files.
 *
 * A skeleton is not decoration: without one, Next holds the previous page on
 * screen until the new one is ready, and the navigation feels frozen. These
 * mirror the real layouts closely enough that nothing jumps when the content
 * lands.
 */
export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="h-80 w-full rounded-2xl" />
      ))}
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="space-y-3" aria-hidden>
      <Skeleton className="h-4 w-56 rounded-md" />
      <Skeleton className="h-9 w-72 rounded-lg" />
    </div>
  );
}

/** Wraps a skeleton with the announcement screen readers need. */
export function LoadingShell({ children }: { children: React.ReactNode }) {
  return (
    <Container className="space-y-8 py-10">
      <span role="status" aria-live="polite" className="sr-only">
        Chargement en cours
      </span>
      {children}
    </Container>
  );
}
