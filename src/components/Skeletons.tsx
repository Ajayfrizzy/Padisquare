/**
 * ProductCardSkeleton - Loading placeholder for product cards
 * Matches the layout of ProductCard for seamless loading states
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden 
                    border border-gray-100 dark:border-gray-700 animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200 dark:bg-gray-700" />
      
      {/* Content skeleton */}
      <div className="p-4">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
        
        {/* Price and button skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>
    </div>
  );
}

/**
 * ProductGridSkeleton - Loading grid of product skeletons
 */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

/**
 * HeroSkeleton - Loading placeholder for vendor hero section
 */
export function HeroSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero image skeleton */}
      <div className="relative h-48 sm:h-64 md:h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8" />
      
      {/* Vendor info skeleton */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-72" />
        </div>
      </div>
    </div>
  );
}

/**
 * FilterBarSkeleton - Loading placeholder for search and sort controls
 */
export function FilterBarSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-pulse">
      <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      <div className="w-full sm:w-48 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
    </div>
  );
}

/**
 * Full page loading skeleton combining all elements
 */
export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSkeleton />
        <FilterBarSkeleton />
        <ProductGridSkeleton />
      </div>
    </div>
  );
}
