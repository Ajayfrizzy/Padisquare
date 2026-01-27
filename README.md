# Multi-Vendor Storefront

A modern, responsive multi-vendor marketplace built with Next.js 14+ App Router and TailwindCSS. Each vendor has their own mini storefront with product listings, search, sorting, and pagination.

## 🚀 Live Demo

Visit vendor storefronts at:
- `/site/techzone` - TechZone Electronics
- `/site/fashion-hub` - Fashion Hub
- `/site/home-essentials` - Home Essentials

## ✨ Features

- **Dynamic Vendor Pages**: Each vendor has a unique storefront at `/site/[vendorSlug]`
- **Product Search**: Real-time search filtering by product name
- **Sorting Options**: Sort by price (low to high, high to low) or most recent
- **Pagination**: Navigate through products with page controls
- **Responsive Design**: Fully responsive layout for all screen sizes
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Loading States**: Skeleton loading for better UX
- **Error Handling**: User-friendly error and 404 pages
- **SEO Optimized**: Dynamic metadata per vendor using `generateMetadata()`
- **Accessibility**: ARIA labels, keyboard navigation, and focus management

## 🏗️ Architecture

### Project Structure

```
storefront/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── products/[vendorSlug]/route.ts  # Product API endpoint
│   │   ├── site/[vendorSlug]/
│   │   │   ├── page.tsx          # Vendor page (Server Component)
│   │   │   ├── loading.tsx       # Loading state
│   │   │   ├── error.tsx         # Error boundary
│   │   │   └── not-found.tsx     # 404 page
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── ProductCard.tsx       # Product display card
│   │   ├── ProductGrid.tsx       # Product grid with filters (Client)
│   │   ├── SearchBar.tsx         # Search input (Client)
│   │   ├── SortSelect.tsx        # Sort dropdown (Client)
│   │   ├── Pagination.tsx        # Page navigation (Client)
│   │   ├── VendorHero.tsx        # Vendor header section
│   │   ├── EmptyState.tsx        # No results display
│   │   ├── Skeletons.tsx         # Loading skeletons
│   │   └── index.ts              # Component exports
│   └── lib/
│       ├── types.ts              # TypeScript interfaces
│       ├── data.ts               # Mock data (vendors & products)
│       └── api.ts                # Data fetching functions
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # TailwindCSS configuration
└── package.json
```

### Key Architecture Decisions

1. **Server Components by Default**: The vendor page and hero section are Server Components for optimal performance and SEO. Data is fetched on the server and passed to client components.

2. **Client Components for Interactivity**: Search, sort, and pagination use Client Components (`'use client'`) since they require user interaction and state management.

3. **URL-Based State Management**: Filter state (search, sort, page) is stored in URL search params for shareability and browser history support.

4. **API Routes for Client-Side Filtering**: An API route (`/api/products/[vendorSlug]`) enables client-side filtering without full page reloads.

5. **ISR (Incremental Static Regeneration)**: Pages are revalidated every 60 seconds for a balance between performance and freshness.

6. **Mock Data Layer**: Data is stored in TypeScript files (`lib/data.ts`) with an API abstraction (`lib/api.ts`) for easy replacement with a real backend.

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Icons**: Heroicons
- **Images**: Next.js Image Optimization

## 🎨 Brand Customization

The primary brand color `#159C47` is used throughout the application:
- Primary buttons and CTAs
- Active states and focus rings
- Accent text and badges

To customize, update the hex values in:
- Component Tailwind classes (search for `#159C47`)
- CSS custom properties in `globals.css`

## 📦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Navigate to the project directory
cd storefront

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the homepage, then navigate to a vendor page:
- [http://localhost:3000/site/techzone](http://localhost:3000/site/techzone)

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```


## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Focus visible indicators
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance

## 🚀 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel]](https://padisquare-indol.vercel.app/)

Or deploy manually:

```bash
npm run build
npm start
```

## 📄 License

This project is for demonstration purposes.

---

Built with using Next.js 14+ and TailwindCSS
