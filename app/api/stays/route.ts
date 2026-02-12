import { NextRequest, NextResponse } from "next/server";
import staysData from "@/data/stays.json";
import type { Stay, StaysResponse } from "@/lib/types";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const location = searchParams.get("location")?.toLowerCase();
    const minPrice = searchParams.get("minPrice")
      ? parseInt(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseInt(searchParams.get("maxPrice")!)
      : undefined;
    const guests = searchParams.get("guests")
      ? parseInt(searchParams.get("guests")!)
      : undefined;
    const propertyType = searchParams.get("propertyType")?.toLowerCase();
    const amenities = searchParams.getAll("amenities");
    const featured = searchParams.get("featured") === "true";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, parseInt(searchParams.get("pageSize") || String(DEFAULT_PAGE_SIZE)))
    );

    // Filter stays
    let filteredStays: Stay[] = staysData.stays as Stay[];

    // Filter by location (city or country)
    if (location) {
      filteredStays = filteredStays.filter(
        (stay) =>
          stay.location.city.toLowerCase().includes(location) ||
          stay.location.country.toLowerCase().includes(location)
      );
    }

    // Filter by price range
    if (minPrice !== undefined) {
      filteredStays = filteredStays.filter(
        (stay) => stay.pricePerNight >= minPrice
      );
    }
    if (maxPrice !== undefined) {
      filteredStays = filteredStays.filter(
        (stay) => stay.pricePerNight <= maxPrice
      );
    }

    // Filter by guests
    if (guests !== undefined) {
      filteredStays = filteredStays.filter((stay) => stay.maxGuests >= guests);
    }

    // Filter by property type
    if (propertyType) {
      filteredStays = filteredStays.filter(
        (stay) => stay.propertyType.toLowerCase() === propertyType
      );
    }

    // Filter by amenities (must have all specified amenities)
    if (amenities.length > 0) {
      filteredStays = filteredStays.filter((stay) =>
        amenities.every((amenity) =>
          stay.amenities.includes(amenity.toLowerCase())
        )
      );
    }

    // Filter by featured
    if (featured) {
      filteredStays = filteredStays.filter((stay) => stay.featured === true);
    }

    // Calculate pagination
    const total = filteredStays.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedStays = filteredStays.slice(startIndex, endIndex);

    const response: StaysResponse = {
      stays: paginatedStays,
      total,
      page,
      pageSize,
      totalPages,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching stays:", error);
    return NextResponse.json(
      { error: "Failed to fetch stays" },
      { status: 500 }
    );
  }
}
