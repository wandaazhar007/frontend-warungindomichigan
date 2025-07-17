import axios from 'axios';

const API_URL = 'http://192.168.0.52:8080/api/shipping';

// Define the shape of a single shipping rate object from Shippo
export interface ShippingRate {
  object_id: string;
  amount: string;
  currency: string;
  provider: string;
  servicelevel: {
    name: string;
    token: string;
  };
  duration_terms: string;
}

interface ApiResponse {
  data: ShippingRate[];
}

/**
 * Fetches available shipping rates for a given address.
 * @param addressData The customer's shipping address.
 */
export const getShippingRates = async (addressData: any): Promise<ShippingRate[]> => {
  try {
    const response = await axios.post<ApiResponse>(`${API_URL}/calculate`, addressData);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch shipping rates:', error);
    throw error;
  }
};