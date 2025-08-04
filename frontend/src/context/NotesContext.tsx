// frontend/src/context/NotesContext.tsx
import type { ReactNode } from 'react';
import { useNotes } from '../hooks/useNotes';
import { NotesContext } from './NotesContextTypes';
import * as api from '../api/apiClient';
import type { NotesContextType } from '../types';

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const notesData = useNotes();

  // Handler functions for note actions
  const handleDuplicate: NotesContextType['handleDuplicate'] = async (note) => {
    await api.duplicateNote(note.id);
    notesData.refetchNotes();
  };
  const handleArchive: NotesContextType['handleArchive'] = async (note) => {
    await api.archiveNote(note.id);
    notesData.refetchNotes();
  };
  const handleDelete: NotesContextType['handleDelete'] = async (note) => {
    await api.deleteNote(note.id);
    notesData.refetchNotes();
  };

  const value = {
    ...notesData,
    handleDuplicate,
    handleArchive,
    handleDelete,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
