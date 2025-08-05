import axios from 'axios';
import type { Order } from '@/types/order';
import { API_BASE_URL } from '@/lib/config';
import { getIdToken } from './authService';

const API_URL = `${API_BASE_URL}/orders`;

// Define the shape of a paginated API response
interface PaginatedOrdersResponse {
  orders: Order[];
  lastVisible: string | null;
}

interface ApiResponse {
  message: string;
  data: PaginatedOrdersResponse;
}

/**
 * Fetches the order history for the currently logged-in user.
 * This is for the "My Account" page.
 */
export const getMyOrders = async (lastVisible: string | null = null): Promise<PaginatedOrdersResponse> => {
  const token = await getIdToken();
  if (!token) throw new Error("User not authenticated");

  try {
    const params = lastVisible ? { lastVisible } : {};
    const response = await axios.get<ApiResponse>(`${API_URL}/my-orders`, {
      headers: { 'Authorization': `Bearer ${token}` },
      params
    });
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch user orders:`, error);
    throw error;
  }
};
