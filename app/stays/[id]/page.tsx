import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  ChevronLeft,
  Share2,
  Heart,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageGallery } from "@/components/stays/image-gallery";
import { AmenitiesList } from "@/components/stays/amenities-list";
import { HostCard } from "@/components/stays/host-card";
import { formatPrice, formatRating } from "@/lib/utils";
import { APP_NAME, APP_URL } from "@/lib/constants";
import staysData from "@/data/stays.json";
import type { Stay } from "@/lib/types";

// ISR - Incremental Static Regeneration
export const revalidate = 3600; // Revalidate every hour

// Generate static params for all stays
export async function generateStaticParams() {
  const stays = staysData.stays as Stay[];
  return stays.map((stay) => ({
    id: stay.id,
  }));
}

// Generate metadata for each stay
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const stays = staysData.stays as Stay[];
  const stay = stays.find((s) => s.id === id);

  if (!stay) {
    return {
      title: "Stay Not Found",
    };
  }

  return {
    title: stay.name,
    description: stay.description.slice(0, 160),
    openGraph: {
      title: `${stay.name} | ${APP_NAME}`,
      description: stay.description.slice(0, 160),
      url: `${APP_URL}/stays/${stay.id}`,
      images: [
        {
          url: stay.images[0],
          width: 1200,
          height: 630,
          alt: stay.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: stay.name,
      description: stay.description.slice(0, 160),
      images: [stay.images[0]],
    },
  };
}

interface StayDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function StayDetailPage({ params }: StayDetailPageProps) {
  const { id } = await params;
  const stays = staysData.stays as Stay[];
  const stay = stays.find((s) => s.id === id);

  if (!stay) {
    notFound();
  }

  // JSON-LD structured data for the listing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: stay.name,
    description: stay.description,
    image: stay.images,
    address: {
      "@type": "PostalAddress",
      streetAddress: stay.location.address,
      addressLocality: stay.location.city,
      addressCountry: stay.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: stay.location.coordinates.lat,
      longitude: stay.location.coordinates.lng,
    },
    priceRange: `$${stay.pricePerNight}/night`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stay.rating,
      reviewCount: stay.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    amenityFeature: stay.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
    numberOfRooms: stay.bedrooms,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: stay.maxGuests,
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pb-16">
        {/* Back Navigation & Actions */}
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/stays"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Back to stays
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Share this stay">
                <Share2 className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Save to favorites">
                <Heart className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Container>

        {/* Image Gallery */}
        <Container>
          <ImageGallery images={stay.images} alt={stay.name} />
        </Container>

        {/* Content */}
        <Container className="mt-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <header>
                <div className="flex flex-wrap items-start gap-2">
                  {stay.featured && <Badge variant="default">Featured</Badge>}
                  {stay.host.isSuperhost && (
                    <Badge variant="secondary">Superhost</Badge>
                  )}
                  <Badge variant="outline" className="capitalize">
                    {stay.propertyType}
                  </Badge>
                </div>

                <h1 className="mt-4 text-2xl font-bold text-white md:text-3xl">
                  {stay.name}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-neutral-400">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star
                      className="h-5 w-5 fill-amber-500 text-amber-500"
                      aria-hidden="true"
                    />
                    <span className="font-medium text-white">
                      {formatRating(stay.rating)}
                    </span>
                    <span>({stay.reviewCount} reviews)</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {stay.location.city}, {stay.location.country}
                    </span>
                  </div>
                </div>
              </header>

              {/* Property Stats */}
              <div className="mt-6 flex flex-wrap gap-6 border-y border-neutral-800 py-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-neutral-500" aria-hidden="true" />
                  <span>
                    {stay.maxGuests} {stay.maxGuests === 1 ? "guest" : "guests"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-neutral-500" aria-hidden="true" />
                  <span>
                    {stay.bedrooms} {stay.bedrooms === 1 ? "bedroom" : "bedrooms"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-neutral-500" aria-hidden="true" />
                  <span>
                    {stay.beds} {stay.beds === 1 ? "bed" : "beds"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-neutral-500" aria-hidden="true" />
                  <span>
                    {stay.bathrooms}{" "}
                    {stay.bathrooms === 1 ? "bathroom" : "bathrooms"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <section className="mt-8" aria-labelledby="description-heading">
                <h2
                  id="description-heading"
                  className="text-xl font-semibold text-white"
                >
                  About this place
                </h2>
                <p className="mt-4 whitespace-pre-line text-neutral-300 leading-relaxed">
                  {stay.description}
                </p>
              </section>

              {/* Amenities */}
              <section className="mt-10" aria-labelledby="amenities-heading">
                <h2
                  id="amenities-heading"
                  className="text-xl font-semibold text-white"
                >
                  What this place offers
                </h2>
                <div className="mt-4">
                  <AmenitiesList amenities={stay.amenities} showAll />
                </div>
              </section>

              {/* Location */}
              <section className="mt-10" aria-labelledby="location-heading">
                <h2
                  id="location-heading"
                  className="text-xl font-semibold text-white"
                >
                  Location
                </h2>
                <p className="mt-2 text-neutral-400">
                  {stay.location.address}
                </p>
                <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-neutral-800">
                  {/* Map placeholder - in production, integrate with Google Maps or Mapbox */}
                  <div className="flex h-full items-center justify-center text-neutral-500">
                    <div className="text-center">
                      <MapPin className="mx-auto h-12 w-12" aria-hidden="true" />
                      <p className="mt-2">
                        {stay.location.city}, {stay.location.country}
                      </p>
                      <p className="text-sm text-neutral-600">
                        Map integration available in production
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Booking Card */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold text-white">
                        {formatPrice(stay.pricePerNight)}
                      </span>
                      <span className="text-neutral-400"> / night</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star
                        className="h-4 w-4 fill-amber-500 text-amber-500"
                        aria-hidden="true"
                      />
                      <span className="font-medium text-white">
                        {formatRating(stay.rating)}
                      </span>
                    </div>
                  </div>

                  {/* Booking Form Placeholder */}
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg border border-neutral-700 bg-neutral-800 p-3">
                        <label className="block text-xs font-medium text-neutral-400">
                          CHECK-IN
                        </label>
                        <p className="mt-1 text-sm text-white">Add date</p>
                      </div>
                      <div className="rounded-lg border border-neutral-700 bg-neutral-800 p-3">
                        <label className="block text-xs font-medium text-neutral-400">
                          CHECK-OUT
                        </label>
                        <p className="mt-1 text-sm text-white">Add date</p>
                      </div>
                    </div>
                    <div className="rounded-lg border border-neutral-700 bg-neutral-800 p-3">
                      <label className="block text-xs font-medium text-neutral-400">
                        GUESTS
                      </label>
                      <p className="mt-1 text-sm text-white">1 guest</p>
                    </div>
                  </div>

                  <Button className="mt-6 w-full" size="lg">
                    Reserve
                  </Button>

                  <p className="mt-4 text-center text-sm text-neutral-500">
                    You won&apos;t be charged yet
                  </p>
                </div>

                {/* Host Card */}
                <HostCard host={stay.host} />
              </div>
            </aside>
          </div>
        </Container>
      </article>
    </>
  );
}
