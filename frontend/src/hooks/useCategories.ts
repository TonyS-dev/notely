// frontend/src/hooks/useCategories.ts
import { useContext } from 'react';
import { CategoriesContext } from '../context/CategoriesContextTypes';
import type { CategoriesContextType } from '../context/CategoriesContextTypes';

export const useCategories = (): CategoriesContextType => {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
