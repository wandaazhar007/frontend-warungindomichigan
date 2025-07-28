'use client';

// Import the initialized auth service from our local config file
import { auth } from '@/lib/firebase';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/config';

// Import all necessary functions and types directly from the 'firebase/auth' library
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User
} from 'firebase/auth';

/**
 * Creates a new user account with email and password, and sets their display name.
 */
export const signUpWithEmail = async (name: string, email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (userCredential.user) {
    await updateProfile(userCredential.user, { displayName: name });

    // --- NEW: Notify backend after signup ---
    const token = await userCredential.user.getIdToken();
    await axios.post(`${API_BASE_URL}/auth/post-signup`,
      { uid: userCredential.user.uid, name, email },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
  }
  return userCredential;
};

/**
 * Signs in a user with their email and password.
 */
export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Initiates the Google Sign-In popup flow.
 */
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  if (user) {
    // --- NEW: Notify backend after Google sign-in ---
    const token = await user.getIdToken();
    await axios.post(`${API_BASE_URL}/auth/post-google-signin`,
      { uid: user.uid, name: user.displayName, email: user.email },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
  }
  return result;
};

/**
 * Signs out the current user.
 */
export const logOut = () => {
  return signOut(auth);
};

/**
 * A listener for changes to the user's authentication state.
 */
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Gets the ID token of the currently signed-in user.
 */
export const getIdToken = async (): Promise<string | null> => {
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken(true);
  }
  return null;
};
