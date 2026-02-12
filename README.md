# Arrivo - Frontend Assessment

A production-quality Stay Discovery mini application built with Next.js 16, demonstrating UI accuracy, SEO discipline, performance optimization, and clean frontend architecture.

## Live Demo

[View Live Demo](#https://arrivo-frontend-three.vercel.app/)

## Features

- **Home Page** - Hero section with search, featured stays, and popular destinations
- **Search Results** - Filterable listing grid with location, price, guests, and property type filters
- **Listing Detail** - Image gallery, amenities, host information, and booking interface
- **Responsive Design** - Mobile-first approach with dark theme
- **SEO Optimized** - Meta tags, JSON-LD structured data, semantic HTML
- **Accessible** - WCAG compliant with keyboard navigation support

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/arrivo-assessment.git
cd arrivo-assessment

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture & Rendering Strategy

### Page Rendering

| Page | Route | Strategy | Rationale |
|------|-------|----------|-----------|
| Home | `/` | SSG (Static) | Content rarely changes, optimal for SEO and performance |
| Search Results | `/stays` | SSR (Dynamic) | Filters require server-side processing for fresh data |
| Listing Detail | `/stays/[id]` | ISR (Incremental) | Static with hourly revalidation for balance of performance and freshness |

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        Client                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Home (SSG) │  │ Stays (SSR) │  │ Stay Detail (ISR)   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Routes                              │
│  ┌─────────────────────┐  ┌─────────────────────────────┐   │
│  │ GET /api/stays      │  │ GET /api/stays/[id]         │   │
│  │ (with filters)      │  │ (single listing)            │   │
│  └─────────────────────┘  └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                                │
│                  /data/stays.json                            │
└─────────────────────────────────────────────────────────────┘
```

### Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Home page (SSG)
│   ├── globals.css             # Global styles
│   ├── loading.tsx             # Global loading state
│   ├── error.tsx               # Error boundary
│   ├── not-found.tsx           # 404 page
│   ├── stays/
│   │   ├── page.tsx            # Search results (SSR)
│   │   └── [id]/
│   │       └── page.tsx        # Listing detail (ISR)
│   └── api/
│       └── stays/
│           ├── route.ts        # GET all stays
│           └── [id]/
│               └── route.ts    # GET single stay
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── layout/                 # Header, Footer, Container
│   ├── stays/                  # Stay-specific components
│   └── home/                   # Home page components
├── data/
│   └── stays.json              # Mock data
└── lib/
    ├── types.ts                # TypeScript interfaces
    ├── utils.ts                # Helper functions
    └── constants.ts            # App constants
```

## SEO Implementation

### Meta Tags
- Dynamic `generateMetadata()` for each page
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs

### Structured Data (JSON-LD)
- **Home Page**: Organization schema
- **Search Results**: ItemList schema
- **Listing Detail**: LodgingBusiness schema with:
  - Address and geo coordinates
  - Price range
  - Aggregate ratings
  - Amenities

### Semantic HTML
- Proper heading hierarchy (h1, h2, h3)
- Semantic elements (`<main>`, `<article>`, `<section>`, `<nav>`, `<aside>`)
- ARIA landmarks and labels

## Performance Optimization

### Core Web Vitals

| Metric | Target | Implementation |
|--------|--------|----------------|
| LCP | < 2.5s | Priority image loading, optimized fonts |
| FID/INP | < 100ms | Minimal client-side JS, Server Components |
| CLS | < 0.1 | Image dimensions, skeleton loaders |

### Optimizations Applied

- **Images**: `next/image` with lazy loading and blur placeholders
- **Fonts**: `next/font` with font-display: swap
- **Code Splitting**: Dynamic imports where appropriate
- **Caching**: ISR for static content, API response caching
- **Bundle Size**: Tree-shaking, minimal dependencies

## Accessibility (WCAG 2.1)

### Features Implemented

- **Skip to Main Content**: Hidden link for keyboard users
- **Keyboard Navigation**: Full tab support with visible focus states
- **ARIA Labels**: All interactive elements properly labeled
- **Color Contrast**: WCAG AA compliant (4.5:1 ratio)
- **Alt Text**: Descriptive alt text for all images
- **Focus Management**: Focus trap in image gallery modal
- **Reduced Motion**: Respects `prefers-reduced-motion`

### Testing

```bash
# Run Lighthouse accessibility audit
npx lighthouse http://localhost:3000 --only-categories=accessibility
```

## API Reference

### GET /api/stays

Fetch all stays with optional filters.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| location | string | Filter by city or country |
| guests | number | Minimum guest capacity |
| minPrice | number | Minimum price per night |
| maxPrice | number | Maximum price per night |
| propertyType | string | Filter by property type |
| featured | boolean | Only featured stays |
| page | number | Page number (default: 1) |
| pageSize | number | Items per page (default: 12, max: 50) |

**Response:**
```json
{
  "stays": [...],
  "total": 15,
  "page": 1,
  "pageSize": 12,
  "totalPages": 2
}
```

### GET /api/stays/[id]

Fetch a single stay by ID.

**Response:**
```json
{
  "id": "stay-001",
  "name": "Luxury Penthouse...",
  "description": "...",
  "location": {...},
  "images": [...],
  "pricePerNight": 850,
  ...
}
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Performance Checklist

- [x] Next.js Image optimization enabled
- [x] Fonts preloaded with next/font
- [x] Lazy loading for below-fold images
- [x] Skeleton loaders for loading states
- [x] Server Components used where possible
- [x] Minimal client-side JavaScript
- [x] Static generation for home page
- [x] ISR for listing details

## SEO Checklist

- [x] Unique title and description per page
- [x] Open Graph meta tags
- [x] Twitter Card meta tags
- [x] JSON-LD structured data
- [x] Semantic HTML structure
- [x] Clean URL structure
- [x] Internal linking
- [x] Alt text for images

## Accessibility Checklist

- [x] Skip to main content link
- [x] Keyboard navigation support
- [x] ARIA labels on interactive elements
- [x] Color contrast compliance
- [x] Focus visible states
- [x] Screen reader friendly
- [x] Reduced motion support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for the Arrivo Frontend Engineer Assessment.

---

Built with Next.js, TypeScript, and Tailwind CSS
