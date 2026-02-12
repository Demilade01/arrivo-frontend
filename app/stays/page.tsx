import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SearchFilters } from "@/components/stays/search-filters";
import { StayGrid } from "@/components/stays/stay-grid";
import { StayCardSkeleton } from "@/components/ui/skeleton";
import { APP_NAME, APP_URL, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import type { Stay, StaysResponse } from "@/lib/types";

// Force dynamic rendering for this page (SSR)
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explore Stays",
  description:
    "Browse and filter through our collection of unique stays around the world. Find apartments, villas, cabins, and more.",
  openGraph: {
    title: `Explore Stays | ${APP_NAME}`,
    description:
      "Browse and filter through our collection of unique stays around the world.",
    url: `${APP_URL}/stays`,
  },
};

interface StaysPageProps {
  searchParams: Promise<{
    location?: string;
    guests?: string;
    minPrice?: string;
    maxPrice?: string;
    propertyType?: string;
    featured?: string;
    page?: string;
  }>;
}

async function getStays(searchParams: {
  location?: string;
  guests?: string;
  minPrice?: string;
  maxPrice?: string;
  propertyType?: string;
  featured?: string;
  page?: string;
}): Promise<StaysResponse> {
  const params = new URLSearchParams();

  if (searchParams.location) params.set("location", searchParams.location);
  if (searchParams.guests) params.set("guests", searchParams.guests);
  if (searchParams.minPrice) params.set("minPrice", searchParams.minPrice);
  if (searchParams.maxPrice) params.set("maxPrice", searchParams.maxPrice);
  if (searchParams.propertyType)
    params.set("propertyType", searchParams.propertyType);
  if (searchParams.featured) params.set("featured", searchParams.featured);
  if (searchParams.page) params.set("page", searchParams.page);
  params.set("pageSize", String(DEFAULT_PAGE_SIZE));

  // In production, use absolute URL. For dev, use relative URL with fetch
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/stays?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stays");
  }

  return res.json();
}

function StaysLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <StayCardSkeleton key={i} />
      ))}
    </div>
  );
}

async function StaysResults({
  searchParams,
}: {
  searchParams: {
    location?: string;
    guests?: string;
    minPrice?: string;
    maxPrice?: string;
    propertyType?: string;
    featured?: string;
    page?: string;
  };
}) {
  const data = await getStays(searchParams);

  // JSON-LD for search results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data.stays.map((stay: Stay, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "LodgingBusiness",
        name: stay.name,
        description: stay.description,
        image: stay.images[0],
        address: {
          "@type": "PostalAddress",
          addressLocality: stay.location.city,
          addressCountry: stay.location.country,
        },
        priceRange: `$${stay.pricePerNight}/night`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: stay.rating,
          reviewCount: stay.reviewCount,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Results Header */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-neutral-400">
          {data.total === 0 ? (
            "No stays found"
          ) : (
            <>
              Showing{" "}
              <span className="font-medium text-white">{data.stays.length}</span>{" "}
              of <span className="font-medium text-white">{data.total}</span>{" "}
              stays
            </>
          )}
        </p>
        {data.totalPages > 1 && (
          <p className="text-sm text-neutral-500">
            Page {data.page} of {data.totalPages}
          </p>
        )}
      </div>

      {/* Results Grid */}
      <StayGrid stays={data.stays} />

      {/* Pagination */}
      {data.totalPages > 1 && (
        <Pagination
          currentPage={data.page}
          totalPages={data.totalPages}
          searchParams={searchParams}
        />
      )}
    </>
  );
}

function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") params.set(key, value);
    });
    params.set("page", String(page));
    return `/stays?${params.toString()}`;
  };

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {currentPage > 1 && (
        <a
          href={createPageUrl(currentPage - 1)}
          className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
        >
          Previous
        </a>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum: number;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <a
              key={pageNum}
              href={createPageUrl(pageNum)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                pageNum === currentPage
                  ? "bg-violet-600 text-white"
                  : "border border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700"
              }`}
              aria-current={pageNum === currentPage ? "page" : undefined}
            >
              {pageNum}
            </a>
          );
        })}
      </div>

      {currentPage < totalPages && (
        <a
          href={createPageUrl(currentPage + 1)}
          className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
        >
          Next
        </a>
      )}
    </nav>
  );
}

export default async function StaysPage({ searchParams }: StaysPageProps) {
  const params = await searchParams;

  return (
    <section className="py-8 md:py-12" aria-labelledby="stays-heading">
      <Container>
        {/* Page Header */}
        <div className="mb-8">
          <h1
            id="stays-heading"
            className="text-3xl font-bold text-white md:text-4xl"
          >
            Explore Stays
          </h1>
          <p className="mt-2 text-neutral-400">
            Find your perfect accommodation from our curated collection
          </p>
        </div>

        {/* Search Filters */}
        <div className="mb-8">
          <Suspense fallback={<div className="h-[200px] animate-pulse rounded-xl bg-neutral-800" />}>
            <SearchFilters />
          </Suspense>
        </div>

        {/* Results */}
        <Suspense fallback={<StaysLoading />}>
          <StaysResults searchParams={params} />
        </Suspense>
      </Container>
    </section>
  );
}
