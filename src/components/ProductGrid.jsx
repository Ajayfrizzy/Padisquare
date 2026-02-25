'use client';

import { useCallback, useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import SortSelect from './SortSelect';
import Pagination from './Pagination';
import EmptyState from './EmptyState';
import { ProductGridSkeleton } from './Skeletons';
import { getSortOptions } from '@/lib/api';

/**
 * ProductGrid component with search, sort, and pagination.
 * Client component to handle user interactions and URL state management.
 * Uses URL search params for shareable filter states.
 */
export default function ProductGrid({ initialData, vendorSlug }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  // Initialize state from URL params or defaults
  const [products, setProducts] = useState(initialData.data);
  const [pagination, setPagination] = useState({
    total: initialData.total,
    page: initialData.page,
    totalPages: initialData.totalPages,
  });
  
  // Get current filter values from URL
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'recent';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  const sortOptions = getSortOptions();

  /**
   * Updates URL search params and triggers data refetch
   * This approach keeps filter state in the URL for shareability
   */
  const updateFilters = useCallback((updates) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || (key === 'page' && value === 1)) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [searchParams, pathname, router]);

  // Handle search
  const handleSearch = useCallback((query) => {
    updateFilters({ search: query, page: 1 }); // Reset to page 1 on new search
  }, [updateFilters]);

  // Handle sort change
  const handleSortChange = useCallback((sort) => {
    updateFilters({ sort, page: 1 }); // Reset to page 1 on sort change
  }, [updateFilters]);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    updateFilters({ page });
    // Scroll to top of product grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [updateFilters]);

  // Fetch products when URL params change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams({
          search: currentSearch,
          sort: currentSort,
          page: String(currentPage),
        });
        
        const response = await fetch(`/api/products/${vendorSlug}?${params}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data.data);
        setPagination({
          total: data.total,
          page: data.page,
          totalPages: data.totalPages,
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Always fetch products when URL params change to ensure fresh data
    fetchProducts();
  }, [currentSearch, currentSort, currentPage, vendorSlug]);

  return (
    <section aria-labelledby="products-heading">
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>
      
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar 
            defaultValue={currentSearch} 
            onSearch={handleSearch}
            placeholder="Search products..."
          />
        </div>
        <SortSelect
          options={sortOptions}
          value={currentSort}
          onChange={handleSortChange}
        />
      </div>
      
      {/* Results count */}
      <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {isPending ? (
          <span className="animate-pulse">Loading...</span>
        ) : (
          <span>
            Showing {products.length} of {pagination.total} products
            {currentSearch && (
              <span> for &ldquo;{currentSearch}&rdquo;</span>
            )}
          </span>
        )}
      </div>
      
      {/* Product Grid or Loading/Empty State */}
      {isPending ? (
        <ProductGridSkeleton count={8} />
      ) : products.length === 0 ? (
        <EmptyState
          title="No products found"
          message={
            currentSearch
              ? `No products match "${currentSearch}". Try a different search term.`
              : 'This vendor has no products yet.'
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-8 sm:mt-12">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}
