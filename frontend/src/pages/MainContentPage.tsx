// frontend/src/pages/MainContentPage.tsx
import { useState, useEffect } from 'react';
import * as api from '../api/apiClient';
import type { Note } from '../types';
import { NoteItem } from '../components/NoteItem';
import { NoteModal } from '../components/NoteModal';

export function MainContentPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State to control the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await api.getActiveNotes();
      setNotes(response.data);
    } catch (err) {
      setError('Failed to fetch notes.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleOpenCreateModal = () => {
    setNoteToEdit(null); // Setting noteToEdit to null means "Create Mode"
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (note: Note) => {
    setNoteToEdit(note); // Passing a note means "Edit Mode"
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNoteSaved = () => {
    handleCloseModal(); // Close the modal first
    fetchNotes(); // Then refresh the notes list
  };

  if (isLoading)
    return (
      <main className="main-content">
        <div className="loading-state">Loading Notes...</div>
      </main>
    );
  if (error)
    return (
      <main className="main-content">
        <div className="error-state">{error}</div>
      </main>
    );

  return (
    <>
      <main className="main-content">
        <header className="main-header">
          <h1>Welcome back!</h1>
          {/* !TODO: This button is now temporary, the sidebar one should be used */}
          <button className="new-note" onClick={handleOpenCreateModal}>
            + New Note
          </button>
        </header>
        <section className="dashboard">
          <div className="notes-section">
            <h2>My notes</h2>
            <div className="notes-list">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <NoteItem
                    key={note.id}
                    note={note}
                    onEdit={() => handleOpenEditModal(note)}
                  />
                ))
              ) : (
                <p>You don't have any active notes yet. Create one!</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNoteSaved={handleNoteSaved}
        noteToEdit={noteToEdit}
      />
    </>
  );
}
