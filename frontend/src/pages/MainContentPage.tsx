// frontend/src/pages/MainContentPage.tsx
import { NoteItem } from '../components/NoteItem';
import { useModal } from '../hooks/useModal';
import { useNotesContext } from '../hooks/useNotesContext';

export function MainContentPage() {
  const { openEditNoteModal } = useModal();
  const { notes, isLoading, error } = useNotesContext(); // This effect runs once when the component mounts

  if (isLoading) {
    return (
      <main className="main-content">
        <header className="main-header">
          <h1>Welcome back!</h1>
        </header>
        <section className="dashboard">
          <div className="notes-section">
            <h2>My notes</h2>
            <div className="loading-state">Loading Notes...</div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <header className="main-header">
          <h1>Welcome back!</h1>
        </header>
        <section className="dashboard">
          <div className="notes-section">
            <h2>My notes</h2>
            <div className="error-state">{error}</div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="main-content">
      <header className="main-header">
        <h1>Welcome back!</h1>
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
                  onEdit={() => openEditNoteModal(note)}
                />
              ))
            ) : (
              <p>
                You have no active notes. Click "+ New note" in the sidebar to
                create one!
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
