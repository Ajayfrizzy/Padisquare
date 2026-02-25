import { NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/api';

/**
 * API Route for fetching products by vendor with filtering, sorting, and pagination.
 * This enables client-side filtering without full page reloads.
 * 
 * GET /api/products/[vendorSlug]?search=query&sort=price-asc&page=1
 */
export async function GET(request, { params }) {
  try {
    const { vendorSlug } = await params;
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'recent';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '8', 10);
    
    // Fetch products with filters
    const products = await fetchProducts(vendorSlug, {
      search,
      sort,
      page,
      limit,
    });
    
    // Return JSON response with cache headers
    return NextResponse.json(products, {
      headers: {
        // Cache for 60 seconds, revalidate in background
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
