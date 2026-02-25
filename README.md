# Padisquare — Multi-Vendor Storefront

A modern, responsive multi-vendor marketplace built with Next.js 16 App Router and TailwindCSS v4. Each vendor has their own mini storefront with product listings, search, sorting, and pagination.

## Live Demo

[https://padisquare-indol.vercel.app/](https://padisquare-indol.vercel.app/)

Visit vendor storefronts at:

- `/site/techzone` — TechZone Electronics
- `/site/fashion-hub` — Fashion Hub
- `/site/home-essentials` — Home Essentials

## Features

- **Dynamic Vendor Pages**: Each vendor has a unique storefront at `/site/[vendorSlug]`
- **Product Search**: Real-time search filtering by product name
- **Sorting Options**: Sort by price (low to high, high to low) or most recent
- **Pagination**: Navigate through products with page controls (8 products per page)
- **Responsive Design**: Fully responsive layout for all screen sizes
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Loading States**: Skeleton loading for better UX
- **Error Handling**: User-friendly error and 404 pages
- **SEO Optimized**: Dynamic metadata (including Open Graph & Twitter cards) per vendor using `generateMetadata()`
- **Accessibility**: ARIA labels, keyboard navigation, and focus management

## Architecture

### Project Structure

``
Padisquare/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── products/[vendorSlug]/route.js   # Product API endpoint
│   │   ├── site/[vendorSlug]/
│   │   │   ├── page.jsx          # Vendor page (Server Component)
│   │   │   ├── loading.jsx       # Loading state
│   │   │   ├── error.jsx         # Error boundary
│   │   │   └── not-found.jsx     # 404 page
│   │   ├── layout.jsx            # Root layout
│   │   ├── page.jsx              # Homepage — lists all vendors
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── ProductCard.jsx       # Product display card
│   │   ├── ProductGrid.jsx       # Product grid with filters (Client Component)
│   │   ├── SearchBar.jsx         # Search input (Client Component)
│   │   ├── SortSelect.jsx        # Sort dropdown (Client Component)
│   │   ├── Pagination.jsx        # Page navigation (Client Component)
│   │   ├── VendorHero.jsx        # Vendor header section (Server Component)
│   │   ├── EmptyState.jsx        # No results display
│   │   ├── Skeletons.jsx         # Loading skeletons
│   │   └── index.js              # Component exports
│   └── lib/
│       ├── data.js               # Mock data — vendors & products
│       └── api.js                # Data fetching functions (with simulated delay)
├── next.config.mjs               # Next.js configuration
├── postcss.config.mjs            # PostCSS / TailwindCSS v4 configuration
├── jsconfig.json                 # JS path aliases (@/ → src/)
└── package.json
``

### Key Architecture Decisions

1. **Server Components by Default**: The vendor page and hero section are Server Components for optimal performance and SEO. Data is fetched on the server and passed down to client components.

2. **Client Components for Interactivity**: Search, sort, and pagination use Client Components (`'use client'`) since they require user interaction and state management.

3. **URL-Based State Management**: Filter state (search, sort, page) is stored in URL search params for shareability and browser history support.

4. **API Route for Client-Side Filtering**: An API route (`/api/products/[vendorSlug]`) enables client-side filtering without full page reloads.

5. **Simulated Network Delay**: `lib/api.js` adds a 300 ms artificial delay to produce realistic loading states during development.

6. **Mock Data Layer**: Vendor and product data lives in `lib/data.js` with an API abstraction in `lib/api.js` for easy replacement with a real backend.

## Technology Stack

| Technology | Version |

|---|---|

| Next.js (App Router) | 16.1.4 |
| React | 19.2.3 |
| TailwindCSS | v4 |
| @heroicons/react | v2 |
| Language | JavaScript (JSX) |

## Vendors & Products (Mock Data)

| Vendor Slug | Store Name | Category |

|---|---|---|

| `techzone` | TechZone Electronics | Electronics & Gadgets |
| `fashion-hub` | Fashion Hub | Clothing & Accessories |
| `home-essentials` | Home Essentials | Home & Living |

## Brand Customization

The primary brand color `#159C47` is used throughout the application:

- Hero section background
- Primary buttons and CTAs
- Active states and focus rings

To customize, search for `#159C47` in the component files and replace with your preferred color.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Ajayfrizzy/Padisquare.git
cd Padisquare

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the homepage, then navigate to a vendor storefront:

- [http://localhost:3000/site/techzone](http://localhost:3000/site/techzone)
- [http://localhost:3000/site/fashion-hub](http://localhost:3000/site/fashion-hub)
- [http://localhost:3000/site/home-essentials](http://localhost:3000/site/home-essentials)

### Available Scripts

| Command | Description |

|---|---|

| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px – 1024px
- **Desktop**: > 1024px

## Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Focus visible indicators
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance

## Deployment

Deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ajayfrizzy/Padisquare)

Or deploy manually:

```bash
npm run build
npm start
```

## License

This project is for demonstration purposes.

---

Built with Next.js 16 and TailwindCSS v4
