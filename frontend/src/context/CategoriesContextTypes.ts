// frontend/src/context/CategoriesContextTypes.ts
import { createContext } from 'react';
import type { Category } from '../types';

export interface CategoriesContextType {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  refetchCategories: () => Promise<void>;
  createCategory: (name: string) => Promise<Category | null>;
}

export const CategoriesContext = createContext<
  CategoriesContextType | undefined
>(undefined);
