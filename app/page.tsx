import { Hero } from "@/components/home/hero";
import { FeaturedStays } from "@/components/home/featured-stays";
import { PopularLocations } from "@/components/home/popular-locations";
import staysData from "@/data/stays.json";
import type { Stay } from "@/lib/types";

// Static generation - this page is generated at build time
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default function HomePage() {
  // Get featured stays for the home page
  const featuredStays = (staysData.stays as Stay[])
    .filter((stay) => stay.featured)
    .slice(0, 6);

  // JSON-LD structured data for the organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "StayDiscovery",
    url: "https://staydiscovery.com",
    logo: "https://staydiscovery.com/logo.png",
    description:
      "Discover unique stays and experiences around the world. From cozy cabins to luxury villas, find the perfect place for your next getaway.",
    sameAs: [
      "https://twitter.com/staydiscovery",
      "https://facebook.com/staydiscovery",
      "https://instagram.com/staydiscovery",
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <Hero />

      {/* Featured Stays Section */}
      <FeaturedStays stays={featuredStays} />

      {/* Popular Locations Section */}
      <PopularLocations />
    </>
  );
}
