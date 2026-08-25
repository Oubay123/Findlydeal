import { HeaderSkeleton, LoadingShell } from "@/components/common/page-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompareLoading() {
  return (
    <LoadingShell>
      <HeaderSkeleton />
      <Skeleton className="h-[30rem] w-full rounded-2xl" />
    </LoadingShell>
  );
}
