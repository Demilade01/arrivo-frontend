import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-neutral-800",
        className
      )}
      {...props}
    />
  );
}

function StayCardSkeleton() {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

function StayDetailSkeleton() {
  return (
    <div className="space-y-8">
      {/* Image Gallery Skeleton */}
      <div className="grid grid-cols-4 gap-2 h-[400px]">
        <Skeleton className="col-span-2 row-span-2 rounded-l-xl" />
        <Skeleton className="rounded-none" />
        <Skeleton className="rounded-tr-xl" />
        <Skeleton className="rounded-none" />
        <Skeleton className="rounded-br-xl" />
      </div>
      
      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-px w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[300px] rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export { Skeleton, StayCardSkeleton, StayDetailSkeleton };
