"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/layout/container";

export function Hero() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const location = formData.get("location")?.toString() || "";
    const guests = formData.get("guests")?.toString() || "";

    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (guests) params.set("guests", guests);

    router.push(`/stays?${params.toString()}`);
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 py-20 md:py-32"
      aria-labelledby="hero-heading"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"
        aria-hidden="true"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-violet-600/10"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* Left column: Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
              </span>
              Discover Your Dream Stay
            </div>

            {/* Heading */}
            <h1
              id="hero-heading"
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Discover Your{" "}
              <span className="bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
                Perfect Property
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-4 text-base text-neutral-300 md:mt-6 md:text-lg">
              From short city breaks to long stays, Arrivo helps you find
              verified apartments, homes, and villas that match your lifestyle
              and budget.
            </p>

            {/* Primary Actions */}
            <div className="mt-6 flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => router.push("/stays")}
                className="min-w-[160px]"
              >
                Browse Stays
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-w-[160px]"
              >
                Learn More
              </Button>
            </div>

            {/* Stats row */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-left">
                <p className="text-2xl font-semibold text-white">200+</p>
                <p className="mt-1 text-xs text-neutral-400">
                  Happy Guests
                </p>
              </div>
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-left">
                <p className="text-2xl font-semibold text-white">10K+</p>
                <p className="mt-1 text-xs text-neutral-400">
                  Verified Stays
                </p>
              </div>
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-left">
                <p className="text-2xl font-semibold text-white">4.9</p>
                <p className="mt-1 text-xs text-neutral-400">
                  Average Rating
                </p>
              </div>
            </div>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 backdrop-blur-sm md:p-5"
              role="search"
              aria-label="Search for stays"
            >
              <div className="grid gap-4 md:grid-cols-[1.2fr_0.9fr_auto]">
                {/* Location */}
                <div className="relative">
                  <label htmlFor="hero-location" className="sr-only">
                    Location
                  </label>
                  <MapPin
                    className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
                    aria-hidden="true"
                  />
                  <Input
                    id="hero-location"
                    name="location"
                    type="text"
                    placeholder="Where are you going?"
                    className="h-11 pl-10 text-sm md:h-12 md:text-base"
                  />
                </div>

                {/* Guests */}
                <div className="relative">
                  <label htmlFor="hero-guests" className="sr-only">
                    Number of guests
                  </label>
                  <Users
                    className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
                    aria-hidden="true"
                  />
                  <Input
                    id="hero-guests"
                    name="guests"
                    type="number"
                    min={1}
                    max={16}
                    placeholder="Guests"
                    className="h-11 pl-10 text-sm md:h-12 md:text-base"
                  />
                </div>

                {/* Search Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="h-11 w-full text-sm md:h-12 md:text-base"
                >
                  <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                  Search Stays
                </Button>
              </div>
            </form>
          </div>

          {/* Right column: Hero image card */}
          <div className="relative mx-auto h-[320px] w-full max-w-md sm:h-[380px] lg:h-[440px]">
            <div className="absolute inset-0 rounded-[2rem] border border-violet-500/20 bg-gradient-to-b from-violet-500/20 via-neutral-900 to-neutral-950 shadow-[0_40px_90px_rgba(0,0,0,0.7)]">
              <Image
                src="https://images.unsplash.com/photo-1469796466635-455ede028aca?w=900&h=1200&fit=crop"
                alt="Modern high‑rise apartments"
                fill
                sizes="(max-width: 1024px) 60vw, 400px"
                className="rounded-[2rem] object-cover object-center"
                priority
              />

              {/* Circular badge */}
              <div className="pointer-events-none absolute -left-10 top-10 hidden h-24 w-24 items-center justify-center rounded-full border border-violet-500/40 bg-neutral-950/80 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-100 shadow-[0_0_40px_rgba(112,59,247,0.5)] md:flex">
                <span>
                  Find Dream
                  <br />
                  Stays
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
