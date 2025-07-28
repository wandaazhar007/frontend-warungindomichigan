'use client';

import { useState, useEffect } from 'react';
import { onAuthChange } from '@/services/authService';
import { User } from 'firebase/auth';

export const useAuthStatus = () => {
  const [user, setUser] = useState<User | null>(null);
  // Add a loading state to wait for the Firebase check to complete
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthChange returns an unsubscribe function to prevent memory leaks
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return { user, isLoading };
};