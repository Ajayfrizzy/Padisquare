import { vendors, products, getVendorBySlug, getProductsByVendor } from './data';

// Simulated network delay for realistic loading states
const SIMULATED_DELAY = 300;

/**
 * Simulates an API call with optional delay
 */
async function simulateDelay() {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

/**
 * Fetches a vendor by their slug
 */
export async function fetchVendor(slug) {
  await simulateDelay();
  
  const vendor = getVendorBySlug(slug);
  return vendor || null;
}

/**
 * Fetches all vendors
 */
export async function fetchAllVendors() {
  await simulateDelay();
  return vendors;
}

/**
 * Fetches products for a vendor with filtering, sorting, and pagination
 * 
 * @param {string} vendorSlug - The vendor's unique slug
 * @param {Object} filters - Object containing search, sort, page, and limit options
 * @returns Paginated response with products and metadata
 */
export async function fetchProducts(vendorSlug, filters = {}) {
  await simulateDelay();
  
  const { search = '', sort = 'recent', page = 1, limit = 8 } = filters;
  
  // Get all products for this vendor
  let filteredProducts = getProductsByVendor(vendorSlug);
  
  // Apply search filter (case-insensitive)
  if (search.trim()) {
    const searchLower = search.toLowerCase().trim();
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply sorting
  filteredProducts = sortProducts(filteredProducts, sort);
  
  // Calculate pagination
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  // Get paginated slice
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return {
    data: paginatedProducts,
    total,
    page,
    limit,
    totalPages,
  };
}

/**
 * Sorts products based on the specified sort option
 */
function sortProducts(products, sort) {
  const sorted = [...products];
  
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'recent':
    default:
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

/**
 * Fetches a single product by ID
 */
export async function fetchProductById(productId) {
  await simulateDelay();
  
  const product = products.find((p) => p.id === productId);
  return product || null;
}

/**
 * Gets available sort options for the UI
 */
export function getSortOptions() {
  return [
    { value: 'recent', label: 'Most Recent' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];
}
