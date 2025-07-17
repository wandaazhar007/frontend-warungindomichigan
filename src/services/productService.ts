import axios from 'axios';
import type { Product } from '@/types/product';
import { API_BASE_URL } from '@/lib/config'; // Use the centralized base URL

// Define the single source of truth for the product API endpoint
const PRODUCTS_API_URL = `${API_BASE_URL}/products`;

// Define API response shapes for clarity
interface PaginatedProductsResponse {
  products: Product[];
  lastVisible: string | null;
}
interface ListApiResponse { data: PaginatedProductsResponse }
interface SingleApiResponse { data: Product }

/**
 * Fetches a single product by its ID. (Used for server-side rendering)
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${PRODUCTS_API_URL}/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const response: SingleApiResponse = await res.json();
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    return null;
  }
};

/**
 * Fetches a paginated list of all products. (Used for the All Products page)
 */
export const getProducts = async (
  lastVisible: string | null,
  searchTerm: string,
  category: string | null
): Promise<PaginatedProductsResponse> => {
  const params = new URLSearchParams();
  if (lastVisible) params.append('lastVisible', lastVisible);
  if (searchTerm) params.append('searchTerm', searchTerm);
  if (category) params.append('category', category);

  try {
    // This now correctly uses the centralized URL
    const response = await axios.get<ListApiResponse>(`${PRODUCTS_API_URL}?${params.toString()}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: [], lastVisible: null };
  }
};
