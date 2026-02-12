import { Container } from "@/components/layout/container";
import { StayCardSkeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export default function StaysLoadingPage() {
  return (
    <section className="py-8 md:py-12" aria-label="Loading stays">
      <Container>
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Spinner size="lg" />
          <div>
            <p className="text-sm font-medium text-white">
              Finding the best stays for you...
            </p>
            <p className="text-xs text-neutral-400">
              This should only take a moment.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <StayCardSkeleton key={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

