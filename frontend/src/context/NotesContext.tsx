// frontend/src/context/NotesContext.tsx

import type { ReactNode } from 'react';
import { useNotes } from '../hooks/useNotes';
import { NotesContext } from './NotesContextTypes';

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const notesData = useNotes();

  return (
    <NotesContext.Provider value={notesData}>{children}</NotesContext.Provider>
  );
};
