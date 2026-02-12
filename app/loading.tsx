import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="py-8">
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-neutral-800 bg-neutral-900/50 overflow-hidden"
            >
              <Skeleton className="aspect-[4/3] w-full rounded-none" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
