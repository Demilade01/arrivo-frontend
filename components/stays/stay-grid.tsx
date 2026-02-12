import { StayCard } from "./stay-card";
import { StayCardSkeleton } from "@/components/ui/skeleton";
import type { Stay } from "@/lib/types";

interface StayGridProps {
  stays: Stay[];
  loading?: boolean;
  emptyMessage?: string;
}

export function StayGrid({
  stays,
  loading = false,
  emptyMessage = "No stays found matching your criteria.",
}: StayGridProps) {
  if (loading) {
    return (
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-busy="true"
        aria-label="Loading stays"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <StayCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (stays.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-neutral-800 p-4">
          <svg
            className="h-8 w-8 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-medium text-white">No stays found</h3>
        <p className="mt-2 max-w-sm text-neutral-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Stay listings"
    >
      {stays.map((stay, index) => (
        <div key={stay.id} role="listitem">
          <StayCard stay={stay} priority={index < 3} />
        </div>
      ))}
    </div>
  );
}
