import {
  Wifi,
  Car,
  Waves,
  Dumbbell,
  Wind,
  Flame,
  UtensilsCrossed,
  Tv,
  Monitor,
  PawPrint,
  Cigarette,
  Coffee,
  Bath,
  Umbrella,
  Mountain,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const amenityIcons: Record<string, LucideIcon> = {
  wifi: Wifi,
  parking: Car,
  pool: Waves,
  gym: Dumbbell,
  ac: Wind,
  heating: Flame,
  kitchen: UtensilsCrossed,
  washer: Wind,
  dryer: Wind,
  tv: Tv,
  workspace: Monitor,
  pets: PawPrint,
  smoking: Cigarette,
  breakfast: Coffee,
  hottub: Bath,
  fireplace: Flame,
  beachfront: Umbrella,
  mountainview: Mountain,
};

const amenityLabels: Record<string, string> = {
  wifi: "WiFi",
  parking: "Free Parking",
  pool: "Pool",
  gym: "Gym",
  ac: "Air Conditioning",
  heating: "Heating",
  kitchen: "Kitchen",
  washer: "Washer",
  dryer: "Dryer",
  tv: "TV",
  workspace: "Dedicated Workspace",
  pets: "Pets Allowed",
  smoking: "Smoking Allowed",
  breakfast: "Breakfast Included",
  hottub: "Hot Tub",
  fireplace: "Fireplace",
  beachfront: "Beachfront",
  mountainview: "Mountain View",
};

interface AmenitiesListProps {
  amenities: string[];
  variant?: "grid" | "inline";
  showAll?: boolean;
}

export function AmenitiesList({
  amenities,
  variant = "grid",
  showAll = false,
}: AmenitiesListProps) {
  const displayAmenities = showAll ? amenities : amenities.slice(0, 8);
  const remainingCount = amenities.length - displayAmenities.length;

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap gap-2" role="list" aria-label="Amenities">
        {displayAmenities.map((amenity) => {
          const Icon = amenityIcons[amenity];
          const label = amenityLabels[amenity] || amenity;

          return (
            <span
              key={amenity}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800/50 px-3 py-1 text-sm text-neutral-300"
              role="listitem"
            >
              {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
              {label}
            </span>
          );
        })}
        {remainingCount > 0 && (
          <span className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-800/50 px-3 py-1 text-sm text-neutral-400">
            +{remainingCount} more
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-4",
        variant === "grid" && "grid-cols-1 sm:grid-cols-2"
      )}
      role="list"
      aria-label="Amenities"
    >
      {displayAmenities.map((amenity) => {
        const Icon = amenityIcons[amenity];
        const label = amenityLabels[amenity] || amenity;

        return (
          <div
            key={amenity}
            className="flex items-center gap-3 text-neutral-300"
            role="listitem"
          >
            {Icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
            )}
            <span>{label}</span>
          </div>
        );
      })}
      {remainingCount > 0 && !showAll && (
        <div className="flex items-center gap-3 text-neutral-400">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800">
            <span className="text-sm font-medium">+{remainingCount}</span>
          </div>
          <span>more amenities</span>
        </div>
      )}
    </div>
  );
}
