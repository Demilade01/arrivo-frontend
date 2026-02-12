// Stay/Listing Types
export interface Location {
  city: string;
  country: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Host {
  name: string;
  avatar: string;
  joinedDate: string;
  responseRate: number;
  isSuperhost: boolean;
}

export interface Availability {
  start: string;
  end: string;
}

export interface Stay {
  id: string;
  name: string;
  description: string;
  location: Location;
  images: string[];
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  host: Host;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  availability: Availability[];
  propertyType: string;
  featured?: boolean;
}

// API Response Types
export interface StaysResponse {
  stays: Stay[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface StayFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  propertyType?: string;
}

// Component Props Types
export interface SearchFiltersProps {
  filters: StayFilters;
  onFilterChange: (filters: StayFilters) => void;
}

export interface StayCardProps {
  stay: Stay;
  priority?: boolean;
}

export interface ImageGalleryProps {
  images: string[];
  alt: string;
}
