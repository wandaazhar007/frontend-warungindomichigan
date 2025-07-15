import axios from 'axios';
import type { Product } from '@/types/product';

const API_URL = 'http://192.168.0.52:8080/api/products'; // Using your network IP
import { API_BASE_URL } from '@/lib/config';
const PRODUCTS_API_URL = `${API_BASE_URL}/products`;

// Define API response shapes for clarity
interface ListApiResponse { data: { products: Product[], lastVisible: string | null } }
interface SingleApiResponse { data: Product }


// Define the shape of the API response for a list of products
interface PaginatedProductsResponse {
  products: Product[];
  lastVisible: string | null;
}

interface ListApiResponse {
  message: string;
  data: PaginatedProductsResponse;
}

// Define the shape of the API response for a single product
interface SingleProductApiResponse {
  message: string;
  data: Product;
}

/**
 * Fetches a single product by its ID from the backend.
 * This function will be called from our server-side page component.
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    // We use fetch directly with caching disabled. This is crucial for server components.
    const res = await fetch(`${PRODUCTS_API_URL}/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      return null;
    }
    const response: SingleApiResponse = await res.json();
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    return null;
  }
};

/**
 * Fetches a paginated list of all products.
 * @param lastVisible The cursor for pagination.
 * @param searchTerm The term to search for.
 * @param category The category to filter by.
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
    const response = await axios.get<ListApiResponse>(`${API_URL}?${params.toString()}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // Return a default structure on error to prevent crashes
    return { products: [], lastVisible: null };
  }
};
