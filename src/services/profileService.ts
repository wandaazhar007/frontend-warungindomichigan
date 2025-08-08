import axios from 'axios';
import { API_BASE_URL } from '@/lib/config';
import { getIdToken } from './authService';
import type { Customer } from '@/types/customer'; // We can reuse the Customer type

/**
 * Fetches the profile for the currently logged-in user.
 */
export const getMyProfile = async (): Promise<Customer | null> => {
  const token = await getIdToken();
  if (!token) throw new Error("User not authenticated");

  try {
    const response = await axios.get(`${API_BASE_URL}/profile/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return null;
  }
};

/**
 * Updates the profile for the currently logged-in user.
 * @param profileData The data to update (e.g., name, shippingAddress)
 */
export const updateMyProfile = async (profileData: any): Promise<void> => {
  const token = await getIdToken();
  if (!token) throw new Error("User not authenticated");

  try {
    await axios.put(`${API_BASE_URL}/profile/me`, profileData, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
};