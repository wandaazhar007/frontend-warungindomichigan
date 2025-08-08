import axios from 'axios';

// The base URL of our backend API
const API_URL = 'http://localhost:8080/api/categories';

// Define the shape of a Category object
export interface Category {
  id: string;
  name: string;
  description?: string;
}

interface ApiResponse {
  data: Category[];
}

/**
 * Fetches all categories from the backend.
 */
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return []; // Return an empty array on error
  }
};