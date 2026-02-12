import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { StayGrid } from "@/components/stays/stay-grid";
import type { Stay } from "@/lib/types";

interface FeaturedStaysProps {
  stays: Stay[];
}

export function FeaturedStays({ stays }: FeaturedStaysProps) {
  return (
    <section
      className="py-16 md:py-24"
      aria-labelledby="featured-stays-heading"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              id="featured-stays-heading"
              className="text-2xl font-bold text-white md:text-3xl"
            >
              Featured Stays
            </h2>
            <p className="mt-2 text-neutral-400">
              Hand-picked properties loved by our guests
            </p>
          </div>
          <Link href="/stays?featured=true">
            <Button variant="ghost" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>

        {/* Stays Grid */}
        <div className="mt-8">
          <StayGrid stays={stays} />
        </div>
      </Container>
    </section>
  );
}
