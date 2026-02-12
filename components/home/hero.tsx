"use client";

import { useRouter } from "next/navigation";
import { Search, MapPin, Users, Calendar } from "lucide-react";
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
        className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            Discover Your Perfect Stay
          </div>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Find Your Next{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg text-neutral-400 md:text-xl">
            Explore unique stays and experiences around the world. From cozy
            cabins to luxury villas, find the perfect place for your next
            getaway.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 backdrop-blur-sm md:p-6"
            role="search"
            aria-label="Search for stays"
          >
            <div className="grid gap-4 md:grid-cols-3">
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
                  className="h-12 pl-10 text-base"
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
                  placeholder="Number of guests"
                  className="h-12 pl-10 text-base"
                />
              </div>

              {/* Search Button */}
              <Button type="submit" size="lg" className="h-12 text-base">
                <Search className="h-5 w-5" aria-hidden="true" />
                Search Stays
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center md:gap-16">
            <div>
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="mt-1 text-sm text-neutral-400">Unique Stays</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">150+</div>
              <div className="mt-1 text-sm text-neutral-400">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">4.9</div>
              <div className="mt-1 text-sm text-neutral-400">Avg. Rating</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
