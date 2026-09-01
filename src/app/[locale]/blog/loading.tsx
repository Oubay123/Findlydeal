import { HeaderSkeleton, LoadingShell } from "@/components/common/page-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <LoadingShell>
      <HeaderSkeleton />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-32 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-64 w-full rounded-2xl" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-80 w-full rounded-2xl" />
        ))}
      </div>
    </LoadingShell>
  );
}
