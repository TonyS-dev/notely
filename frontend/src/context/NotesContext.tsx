// frontend/src/context/NotesContext.tsx
import type { ReactNode } from 'react';
import { useNotes } from '../hooks/useNotes';
import { NotesContext } from './NotesContextTypes';
import * as api from '../api/apiClient';
import type { NotesContextType } from '../types';
import type { AxiosResponse } from 'axios';

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const notesData = useNotes();

  const handleNoteAction = async (action: Promise<AxiosResponse<unknown>>) => {
    await action;
    notesData.refetchNotes(); // Refetch all notes after any modification
  };

  const handleDuplicate = (noteId: string) =>
    handleNoteAction(api.duplicateNote(noteId));

  const handleArchive = (noteId: string) =>
    handleNoteAction(api.archiveNote(noteId));

  const handleUnarchive = (noteId: string) =>
    handleNoteAction(api.unarchiveNote(noteId));

  const handleDelete = (noteId: string) =>
    handleNoteAction(api.deleteNote(noteId));

  const value: NotesContextType = {
    ...notesData,
    handleDuplicate,
    handleArchive,
    handleUnarchive,
    handleDelete,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
