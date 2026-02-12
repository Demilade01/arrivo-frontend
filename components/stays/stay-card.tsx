import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatRating, truncateText } from "@/lib/utils";
import type { Stay } from "@/lib/types";

interface StayCardProps {
  stay: Stay;
  priority?: boolean;
}

export function StayCard({ stay, priority = false }: StayCardProps) {
  return (
    <article className="group">
      <Link
        href={`/stays/${stay.id}`}
        className="block rounded-xl border border-neutral-800 bg-neutral-900/50 overflow-hidden transition-all hover:border-neutral-700 hover:shadow-lg hover:shadow-amber-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
        aria-label={`View ${stay.name} - ${formatPrice(stay.pricePerNight)} per night`}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={stay.images[0]}
            alt={`${stay.name} - ${stay.location.city}, ${stay.location.country}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
          {/* Featured Badge */}
          {stay.featured && (
            <Badge className="absolute left-3 top-3" variant="default">
              Featured
            </Badge>
          )}
          {/* Superhost Badge */}
          {stay.host.isSuperhost && (
            <Badge
              className="absolute right-3 top-3"
              variant="secondary"
            >
              Superhost
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Header: Title and Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-white line-clamp-1 group-hover:text-amber-500 transition-colors">
              {truncateText(stay.name, 40)}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star
                className="h-4 w-4 fill-amber-500 text-amber-500"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-white">
                {formatRating(stay.rating)}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="mt-1 flex items-center gap-1 text-neutral-400">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-sm">
              {stay.location.city}, {stay.location.country}
            </span>
          </div>

          {/* Property Details */}
          <p className="mt-2 text-sm text-neutral-500">
            {stay.bedrooms} {stay.bedrooms === 1 ? "bedroom" : "bedrooms"} ·{" "}
            {stay.beds} {stay.beds === 1 ? "bed" : "beds"} ·{" "}
            {stay.maxGuests} {stay.maxGuests === 1 ? "guest" : "guests"}
          </p>

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-lg font-bold text-white">
              {formatPrice(stay.pricePerNight)}
            </span>
            <span className="text-sm text-neutral-400">/ night</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
