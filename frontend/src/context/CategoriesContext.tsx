// frontend/src/context/CategoriesContext.tsx

import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import * as api from '../api/apiClient'; // Ensure this path is correct for your project structure
import type { Category } from '../types';
import { CategoriesContext } from './CategoriesContextTypes';
import { useAuth } from '../hooks/useAuth';

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get the authentication state from the AuthContext
  const { isAuthenticated } = useAuth();

  // Create a stable function for fetching categories that only runs when authenticated
  const fetchCategories = useCallback(async () => {
    // Guard clause: If the user is not authenticated, do not attempt to fetch.
    // Reset the state to its default and exit.
    if (!isAuthenticated) {
      setCategories([]);
      setIsLoading(false); // Set loading to false as we are not fetching
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getCategories();
      setCategories(response.data);
    } catch (err) {
      // The global API interceptor will handle 401s that might slip through.
      // We can set a generic error for other issues.
      setError('Failed to fetch categories.');
      console.error('Error fetching categories:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]); // This function will be re-created only when `isAuthenticated` changes

  // Function to create a new category. It will implicitly use the auth token
  // from the apiClient interceptor.
  const createCategory = async (name: string): Promise<Category | null> => {
    try {
      const response = await api.createCategory({ name });
      const newCategory = response.data;
      // Add the new category to the existing state
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      return newCategory;
    } catch (err) {
      console.error('Failed to create category:', err);
      // You might want to set an error state here as well for the UI
      return null;
    }
  };

  // This effect will run once on mount, and then again any time `fetchCategories`
  // function changes (which happens when `isAuthenticated` changes).
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // The value provided to consumers of this context
  const value = {
    categories,
    isLoading,
    error,
    refetchCategories: fetchCategories,
    createCategory,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
