// frontend/src/components/MainContent.tsx
import { useState, useEffect } from 'react';
import * as api from '../api/apiClient';
import type { Note } from '../types';

export function MainContent() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.getActiveNotes();
        setNotes(response.data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
        // !TODO: If the error is 401, it means the token is bad, logout should be called
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []); // This effect runs once when the component mounts

  if (isLoading) return <div>Loading notes...</div>;

  return (
    <main className="main-content">
      <header className="main-header">
        <h1>Welcome back!</h1>
      </header>
      <section className="dashboard">
        <div className="notes-section">
          <h2>My notes</h2>
          <div className="notes-list">
            {/* Map over the notes and render a NoteItem component for each */}
            {notes.map((note) => (
              <div key={note.id} className="note-item">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
