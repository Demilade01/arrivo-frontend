"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section
      className="border-t border-neutral-900 bg-neutral-950/95 py-16 md:py-20"
      aria-labelledby="cta-heading"
    >
      <Container className="space-y-6">
        {/* Slider meta row */}
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>01 of 03</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition-colors hover:border-violet-500 hover:text-white"
              aria-label="Previous highlight"
            >
              &#8592;
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition-colors hover:border-violet-500 hover:text-white"
              aria-label="Next highlight"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* Main CTA panel */}
        <div className="relative overflow-hidden rounded-2xl border border-neutral-900 bg-linear-to-r from-neutral-900 via-neutral-950 to-neutral-950 px-6 py-8 md:px-10 md:py-10">
          {/* Subtle background pattern */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(112,59,247,0.25),transparent_55%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.7),transparent_55%)] opacity-40"
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2
                id="cta-heading"
                className="text-2xl font-bold text-white md:text-3xl"
              >
                Start Your Real Estate Journey Today
              </h2>
              <p className="mt-3 text-sm text-neutral-300 md:text-base">
                Whether you&apos;re booking a short stay, exploring investment
                properties, or hosting your own space, Arrivo makes it simple to
                take the next step with confidence.
              </p>
            </div>

            <Button
              size="lg"
              className="shrink-0 px-5"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/stays";
                }
              }}
            >
              Explore Properties
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

