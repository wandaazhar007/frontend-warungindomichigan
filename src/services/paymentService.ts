import axios from 'axios';
import { API_BASE_URL } from '@/lib/config';
import { getIdToken } from './authService'; // Import our function to get the token

/**
 * Creates a Stripe Payment Intent on the backend.
 * @param amount The total amount of the order in cents.
 */
export const createPaymentIntent = async (amount: number): Promise<string | null> => {
  // --- THIS IS THE FIX ---
  // 1. Get the current user's authentication token.
  const token = await getIdToken();
  if (!token) {
    console.error("Authentication token not found. User might be logged out.");
    // We throw an error here to be caught by the calling function
    throw new Error("User not authenticated");
  }

  try {
    // 2. Include the token in the 'Authorization' header of the request.
    const response = await axios.post(`${API_BASE_URL}/payments/create-intent`,
      { amount },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data.clientSecret;
  } catch (error) {
    console.error('Failed to create payment intent:', error);
    // Re-throw the error so the component can display a message
    throw error;
  }
};
