import { LoadingShell } from "@/components/common/page-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <LoadingShell>
      <Skeleton className="h-4 w-72 rounded-md" />
      <div className="grid gap-10 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-5 w-40 rounded-md" />
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-56 w-full rounded-2xl" />
    </LoadingShell>
  );
}
