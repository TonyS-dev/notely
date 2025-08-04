// frontend/src/context/ModalContext.tsx
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Note } from '../types';
import { NoteModal } from '../components/NoteModal';
import { ModalContext } from './ModalContextTypes';
import { useNotesContext } from '../hooks/useNotesContext';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
  const { refetchNotes } = useNotesContext();

  const handleNoteSaved = () => {
    setIsModalOpen(false);
    refetchNotes();
  };

  const openCreateNoteModal = () => {
    setNoteToEdit(null);
    setIsModalOpen(true);
  };

  const openEditNoteModal = (note: Note) => {
    setNoteToEdit(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ openCreateNoteModal, openEditNoteModal, closeModal }}
    >
      {children}
      <NoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onNoteSaved={handleNoteSaved}
        noteToEdit={noteToEdit}
      />
    </ModalContext.Provider>
  );
};
