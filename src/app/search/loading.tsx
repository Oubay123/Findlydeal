import {
  HeaderSkeleton,
  LoadingShell,
  ProductGridSkeleton,
} from "@/components/common/page-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <LoadingShell>
      <HeaderSkeleton />
      <Skeleton className="h-12 w-full max-w-2xl rounded-full" />
      <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
        <Skeleton className="hidden h-[32rem] w-full rounded-2xl lg:block" />
        <ProductGridSkeleton />
      </div>
    </LoadingShell>
  );
}
