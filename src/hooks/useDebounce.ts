'use client';

import { useState, useEffect } from 'react';

/**
 * A custom hook to debounce a value. It delays updating the value until a certain amount of time has passed without any new changes.
 * @param value The value to debounce (e.g., a search term from an input field).
 * @param delay The debounce delay in milliseconds (e.g., 500).
 * @returns The debounced value, which only updates after the delay.
 */
export function useDebounce<T>(value: T, delay: number): T {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer that will update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // This is the cleanup function. It runs if the `value` changes before the timer is finished.
    // It clears the previous timer, effectively resetting the debounce period.
    return () => {
      clearTimeout(handler);
    };
  },
    // Re-run this effect only if the input value or the delay changes
    [value, delay]);

  return debouncedValue;
}
