import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";
import staysData from "@/data/stays.json";
import type { Stay } from "@/lib/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = APP_URL;
  const stays = staysData.stays as Stay[];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/stays`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const stayRoutes: MetadataRoute.Sitemap = stays.map((stay) => ({
    url: `${baseUrl}/stays/${stay.id}`,
    lastModified: new Date(stay.availability?.[0]?.start || new Date()),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...stayRoutes];
}

