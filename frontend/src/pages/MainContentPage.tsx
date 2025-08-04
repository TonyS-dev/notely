// frontend/src/pages/MainContentPage.tsx
import { NoteItem } from '../components/NoteItem';
import { useModal } from '../hooks/useModal';
import { useNotesContext } from '../hooks/useNotesContext';
import { useSortedNotes } from '../hooks/useSortedNotes';

export function MainContentPage({ showArchived }: { showArchived: boolean }) {
  const { openEditNoteModal } = useModal();
  const {
    notes,
    isLoading,
    error,
    handleDuplicate,
    handleArchive,
    handleDelete,
  } = useNotesContext();
  const sortedNotes = useSortedNotes(
    notes.filter((note) => (showArchived ? !note.isActive : note.isActive)),
  );
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
          <h2>{showArchived ? 'Archived notes' : 'My notes'}</h2>
          <div className="notes-list">
            {sortedNotes.length > 0 ? (
              sortedNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onEdit={() => openEditNoteModal(note)}
                  onDuplicate={() => handleDuplicate(note)}
                  onArchive={() => handleArchive(note)}
                  onDelete={() => handleDelete(note)}
                />
              ))
            ) : (
              <p>
                {showArchived
                  ? 'No archived notes.'
                  : 'You have no active notes. Click "+ New note" in the sidebar to create one!'}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
