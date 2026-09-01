import {
  HeaderSkeleton,
  LoadingShell,
  ProductGridSkeleton,
} from "@/components/common/page-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryLoading() {
  return (
    <LoadingShell>
      <HeaderSkeleton />
      <Skeleton className="h-12 w-full max-w-2xl rounded-full" />
      <ProductGridSkeleton />
    </LoadingShell>
  );
}
