"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PROPERTY_TYPES } from "@/lib/constants";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const location = searchParams.get("location") || "";
  const guests = searchParams.get("guests") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const propertyType = searchParams.get("propertyType") || "";

  const hasActiveFilters =
    location || guests || minPrice || maxPrice || propertyType;

  const updateFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // Reset to page 1 when filters change
      params.delete("page");

      router.push(`/stays?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push("/stays");
  }, [router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updates: Record<string, string> = {};

    formData.forEach((value, key) => {
      updates[key] = value.toString();
    });

    updateFilters(updates);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 md:p-6"
      role="search"
      aria-label="Filter stays"
    >
      <div className="flex flex-col gap-4">
        {/* Top Row: Location Search */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
            aria-hidden="true"
          />
          <Input
            type="text"
            name="location"
            placeholder="Search by city or country..."
            defaultValue={location}
            className="pl-10"
            aria-label="Location"
          />
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Guests */}
          <div>
            <label
              htmlFor="guests"
              className="mb-1.5 block text-sm font-medium text-neutral-300"
            >
              Guests
            </label>
            <Select
              id="guests"
              name="guests"
              defaultValue={guests}
              aria-label="Number of guests"
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((num) => (
                <option key={num} value={num}>
                  {num}+ {num === 1 ? "guest" : "guests"}
                </option>
              ))}
            </Select>
          </div>

          {/* Min Price */}
          <div>
            <label
              htmlFor="minPrice"
              className="mb-1.5 block text-sm font-medium text-neutral-300"
            >
              Min Price
            </label>
            <Input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="$0"
              min={0}
              defaultValue={minPrice}
              aria-label="Minimum price per night"
            />
          </div>

          {/* Max Price */}
          <div>
            <label
              htmlFor="maxPrice"
              className="mb-1.5 block text-sm font-medium text-neutral-300"
            >
              Max Price
            </label>
            <Input
              type="number"
              id="maxPrice"
              name="maxPrice"
              placeholder="$10,000"
              min={0}
              defaultValue={maxPrice}
              aria-label="Maximum price per night"
            />
          </div>

          {/* Property Type */}
          <div>
            <label
              htmlFor="propertyType"
              className="mb-1.5 block text-sm font-medium text-neutral-300"
            >
              Property Type
            </label>
            <Select
              id="propertyType"
              name="propertyType"
              defaultValue={propertyType}
              aria-label="Property type"
            >
              <option value="">All Types</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              className="h-4 w-4 text-neutral-500"
              aria-hidden="true"
            />
            <span className="text-sm text-neutral-400">
              {hasActiveFilters ? "Filters applied" : "No filters applied"}
            </span>
          </div>
          <div className="flex gap-2">
            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-1"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Clear
              </Button>
            )}
            <Button type="submit" size="sm">
              <Search className="h-4 w-4" aria-hidden="true" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
