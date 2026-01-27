// Type definitions for the multi-vendor storefront

export interface Vendor {
  slug: string;
  name: string;
  logo: string;
  heroImage: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  createdAt: string;
  vendorSlug: string;
  description?: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'recent';

export interface ProductFilters {
  search?: string;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
