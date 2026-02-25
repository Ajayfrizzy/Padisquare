import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { fetchVendor, fetchProducts } from '@/lib/api';
import { VendorHero, ProductGrid } from '@/components';
import { ProductGridSkeleton, FilterBarSkeleton } from '@/components/Skeletons';

/**
 * Generate dynamic metadata for SEO based on vendor information.
 * This runs on the server and provides unique meta tags per vendor.
 */
export async function generateMetadata({ params }) {
  const { vendorSlug } = await params;
  const vendor = await fetchVendor(vendorSlug);
  
  if (!vendor) {
    return {
      title: 'Vendor Not Found',
      description: 'The requested vendor could not be found.',
    };
  }
  
  return {
    title: `${vendor.name} | Storefront`,
    description: vendor.description || `Shop the latest products from ${vendor.name}`,
    openGraph: {
      title: vendor.name,
      description: vendor.description || `Shop the latest products from ${vendor.name}`,
      images: [
        {
          url: vendor.heroImage,
          width: 1200,
          height: 630,
          alt: vendor.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: vendor.name,
      description: vendor.description || `Shop the latest products from ${vendor.name}`,
      images: [vendor.heroImage],
    },
  };
}

/**
 * Vendor Page Component
 * 
 * Server Component that fetches vendor and product data.
 * Passes initial data to client components for hydration.
 * 
 * Features:
 * - Dynamic routing based on vendorSlug
 * - Server-side data fetching
 * - SEO metadata generation
 * - Suspense boundaries for progressive loading
 */
export default async function VendorPage({ params, searchParams }) {
  const { vendorSlug } = await params;
  const resolvedSearchParams = await searchParams;
  
  // Fetch vendor data (server-side)
  const vendor = await fetchVendor(vendorSlug);
  
  // Show 404 if vendor not found
  if (!vendor) {
    notFound();
  }
  
  // Parse search params with defaults
  const search = resolvedSearchParams.search || '';
  const sort = resolvedSearchParams.sort || 'recent';
  const page = parseInt(resolvedSearchParams.page || '1', 10);
  
  // Fetch initial products (server-side)
  const initialProducts = await fetchProducts(vendorSlug, {
    search,
    sort,
    page,
    limit: 8,
  });
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Vendor Hero Section - Server Component */}
        <VendorHero vendor={vendor} />
        
        {/* Products Section with Client-side Interactivity */}
        <Suspense 
          fallback={
            <>
              <FilterBarSkeleton />
              <ProductGridSkeleton count={8} />
            </>
          }
        >
          <ProductGrid 
            initialData={initialProducts} 
            vendorSlug={vendorSlug} 
          />
        </Suspense>
      </div>
    </main>
  );
}

/**
 * Enable ISR (Incremental Static Regeneration)
 * Pages will be revalidated every 60 seconds
 */
export const revalidate = 60;
