import { Container } from "@/components/layout/container";
import { StayDetailSkeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export default function StayDetailLoadingPage() {
  return (
    <section className="py-8 md:py-12" aria-label="Loading stay details">
      <Container className="space-y-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Spinner size="lg" />
          <div>
            <p className="text-sm font-medium text-white">
              Loading stay details...
            </p>
            <p className="text-xs text-neutral-400">
              Fetching photos, amenities, and host information.
            </p>
          </div>
        </div>

        <StayDetailSkeleton />
      </Container>
    </section>
  );
}

