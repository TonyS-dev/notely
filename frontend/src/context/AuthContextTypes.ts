// frontend/src/context/AuthContextTypes.tsx
import { createContext } from 'react';
import type { AuthContextType } from '../types';

/**
 * This context provides authentication-related data and functions to the application.
 * - `user`: The currently logged-in user object, or null.
 * - `token`: The JWT access token.
 * - `login`: Function to set the token and user state after a successful login.
 * - `logout`: Function to clear the auth state.
 * - `isAuthenticated`: A boolean flag indicating if the user is logged in.
 * - `isLoading`: A boolean flag to indicate if the initial auth state is being determined.
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
