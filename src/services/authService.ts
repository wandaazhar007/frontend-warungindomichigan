'use client';

// --- THIS IS THE FIX ---
// Import auth from our config, but import all auth functions directly from 'firebase/auth'
import { auth } from '@/lib/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

/**
 * Initiates the Google Sign-In popup flow.
 */
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

/**
 * Signs out the current user.
 */
export const logOut = () => {
  return signOut(auth);
};

/**
 * A listener for changes to the user's authentication state.
 * @param callback A function to call with the user object when the state changes.
 */
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Gets the ID token of the currently signed-in user.
 * This token is required for making secure API calls to our backend.
 * @returns A promise that resolves with the ID token string, or null if no user is signed in.
 */
export const getIdToken = async (): Promise<string | null> => {
  if (auth.currentUser) {
    // The 'true' forces a token refresh if the current one is expired.
    return await auth.currentUser.getIdToken(true);
  }
  return null;
};
