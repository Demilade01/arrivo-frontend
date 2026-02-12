import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";

const locations = [
  {
    city: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop",
    stays: 1240,
  },
  {
    city: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
    stays: 890,
  },
  {
    city: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
    stays: 756,
  },
  {
    city: "London",
    country: "UK",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop",
    stays: 1120,
  },
  {
    city: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
    stays: 645,
  },
  {
    city: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop",
    stays: 520,
  },
];

export function PopularLocations() {
  return (
    <section
      className="bg-neutral-900/50 py-16 md:py-24"
      aria-labelledby="popular-locations-heading"
    >
      <Container>
        {/* Section Header */}
        <div className="text-center">
          <h2
            id="popular-locations-heading"
            className="text-2xl font-bold text-white md:text-3xl"
          >
            Popular Destinations
          </h2>
          <p className="mt-2 text-neutral-400">
            Explore trending locations around the world
          </p>
        </div>

        {/* Locations Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {locations.map((location) => (
            <Link
              key={location.city}
              href={`/stays?location=${encodeURIComponent(location.city)}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              {/* Image */}
              <Image
                src={location.image}
                alt={`${location.city}, ${location.country}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent"
                aria-hidden="true"
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-1 text-amber-500">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="text-xs">{location.country}</span>
                </div>
                <h3 className="mt-1 font-semibold text-white group-hover:text-amber-500 transition-colors">
                  {location.city}
                </h3>
                <p className="mt-0.5 text-xs text-neutral-400">
                  {location.stays.toLocaleString()} stays
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
