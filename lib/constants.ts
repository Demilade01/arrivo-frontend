// App Constants
export const APP_NAME = "StayDiscovery";
export const APP_DESCRIPTION =
  "Discover unique stays and experiences around the world";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// SEO Constants
export const DEFAULT_OG_IMAGE = "/og-image.jpg";
export const TWITTER_HANDLE = "@staydiscovery";

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;

// Price Range
export const MIN_PRICE = 0;
export const MAX_PRICE = 10000;
export const PRICE_STEP = 50;

// Guest Limits
export const MIN_GUESTS = 1;
export const MAX_GUESTS = 16;

// Amenities List
export const AMENITIES = [
  { id: "wifi", label: "WiFi", icon: "Wifi" },
  { id: "parking", label: "Free Parking", icon: "Car" },
  { id: "pool", label: "Pool", icon: "Waves" },
  { id: "gym", label: "Gym", icon: "Dumbbell" },
  { id: "ac", label: "Air Conditioning", icon: "Wind" },
  { id: "heating", label: "Heating", icon: "Flame" },
  { id: "kitchen", label: "Kitchen", icon: "UtensilsCrossed" },
  { id: "washer", label: "Washer", icon: "WashingMachine" },
  { id: "dryer", label: "Dryer", icon: "Wind" },
  { id: "tv", label: "TV", icon: "Tv" },
  { id: "workspace", label: "Dedicated Workspace", icon: "Monitor" },
  { id: "pets", label: "Pets Allowed", icon: "PawPrint" },
  { id: "smoking", label: "Smoking Allowed", icon: "Cigarette" },
  { id: "breakfast", label: "Breakfast", icon: "Coffee" },
  { id: "hottub", label: "Hot Tub", icon: "Bath" },
  { id: "fireplace", label: "Fireplace", icon: "Flame" },
  { id: "beachfront", label: "Beachfront", icon: "Umbrella" },
  { id: "mountainview", label: "Mountain View", icon: "Mountain" },
] as const;

// Property Types
export const PROPERTY_TYPES = [
  { id: "apartment", label: "Apartment" },
  { id: "house", label: "House" },
  { id: "villa", label: "Villa" },
  { id: "cabin", label: "Cabin" },
  { id: "cottage", label: "Cottage" },
  { id: "loft", label: "Loft" },
  { id: "studio", label: "Studio" },
  { id: "penthouse", label: "Penthouse" },
] as const;

// Popular Locations
export const POPULAR_LOCATIONS = [
  { city: "New York", country: "USA", image: "/locations/new-york.jpg" },
  { city: "Paris", country: "France", image: "/locations/paris.jpg" },
  { city: "Tokyo", country: "Japan", image: "/locations/tokyo.jpg" },
  { city: "London", country: "UK", image: "/locations/london.jpg" },
  { city: "Dubai", country: "UAE", image: "/locations/dubai.jpg" },
  { city: "Barcelona", country: "Spain", image: "/locations/barcelona.jpg" },
] as const;

// Navigation Links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/stays", label: "Explore" },
] as const;

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
  ],
  support: [
    { href: "/help", label: "Help Center" },
    { href: "/safety", label: "Safety" },
    { href: "/cancellation", label: "Cancellation Options" },
  ],
  legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
} as const;

// Social Links
export const SOCIAL_LINKS = [
  { href: "https://twitter.com", label: "Twitter", icon: "Twitter" },
  { href: "https://facebook.com", label: "Facebook", icon: "Facebook" },
  { href: "https://instagram.com", label: "Instagram", icon: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn", icon: "Linkedin" },
] as const;
