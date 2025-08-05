// frontend/src/context/ModalContext.tsx
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Note } from '../types';
import { NoteModal } from '../components/NoteModal';
import { ViewNoteModal } from '../components/ViewNoteModal';
import { ModalContext } from './ModalContextTypes';
import { useNotesContext } from '../hooks/useNotesContext';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  const [noteToView, setNoteToView] = useState<Note | null>(null);

  const { refetchNotes } = useNotesContext();

  const handleNoteSaved = () => {
    setIsEditModalOpen(false);
    refetchNotes();
  };

  const openCreateNoteModal = () => {
    setNoteToEdit(null);
    setIsEditModalOpen(true);
  };

  const openEditNoteModal = (note: Note) => {
    setNoteToEdit(note);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openViewNoteModal = (note: Note) => {
    setNoteToView(note);
  };

  const closeViewNoteModal = () => {
    setNoteToView(null);
  };

  return (
    <ModalContext.Provider
      value={{
        openCreateNoteModal,
        openEditNoteModal,
        closeModal: closeEditModal,
        openViewNoteModal,
      }}
    >
      {children}

      {/* Render the Edit/Create Modal */}
      <NoteModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onNoteSaved={handleNoteSaved}
        noteToEdit={noteToEdit}
      />

      {/* Render the new View Modal */}
      <ViewNoteModal
        isOpen={!!noteToView}
        onClose={closeViewNoteModal}
        note={noteToView}
      />
    </ModalContext.Provider>
  );
};
