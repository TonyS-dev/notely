// frontend/src/context/AuthContextTypes.ts
import { createContext } from 'react';
import type { AuthContextType } from '../types';

// The AuthContext will provide user and authentication state
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
