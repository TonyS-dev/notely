// frontend/src/context/NotesContextTypes.ts
import { createContext } from 'react';
import type { NotesContextType } from '../types';

export const NotesContext = createContext<NotesContextType | undefined>(
  undefined,
);
