// frontend/src/hooks/useNotesContext.ts
import { useContext } from 'react';
import { NotesContext } from '../context/NotesContextTypes';
import type { NotesContextType } from '../types';

export const useNotesContext = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  return context;
};
