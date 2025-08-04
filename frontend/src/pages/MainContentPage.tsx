// frontend/src/pages/MainContentPage.tsx
import { useState } from 'react';
import { NoteItem } from '../components/NoteItem';
import { CategoryFilter } from '../components/CategoryFilter';
import { useModal } from '../hooks/useModal';
import { useNotesContext } from '../hooks/useNotesContext';
import { useSortedNotes } from '../hooks/useSortedNotes';

export function MainContentPage({ showArchived }: { showArchived: boolean }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const { openEditNoteModal } = useModal();
  const {
    notes,
    isLoading,
    error,
    handleDuplicate,
    handleArchive,
    handleUnarchive,
    handleDelete,
  } = useNotesContext();
  const sortedNotes = useSortedNotes(
    notes
      .filter((note) => (showArchived ? !note.isActive : note.isActive))
      .filter(
        (note) =>
          selectedCategoryId === null ||
          note.categories.some((cat) => cat.id === selectedCategoryId),
      ),
  );
  if (isLoading) {
    return (
      <main className="main-content">
        <header className="main-header">
          <h1>Welcome Back!</h1>
        </header>
        <section className="dashboard">
          <div className="notes-section">
            <h2>📝 My notes</h2>
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
          <h1>It has occurred an Error</h1>
        </header>
        <section className="dashboard">
          <div className="notes-section">
            <h2>Error: {error}</h2>
            <div className="error-state">{error}</div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="main-content">
      <header className="main-header">
        <h1>Welcome Back!</h1>
      </header>
      <section className="dashboard">
        <div className="notes-section">
          <h2>{showArchived ? '📁 Archived notes' : '📝 My notes'}</h2>
          {!showArchived && (
            <CategoryFilter
              selectedCategoryId={selectedCategoryId}
              onCategoryChange={setSelectedCategoryId}
            />
          )}
          <div className="notes-list">
            {sortedNotes.length > 0 ? (
              sortedNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onEdit={() => openEditNoteModal(note)}
                  onDuplicate={() => handleDuplicate(note)}
                  onArchive={() => handleArchive(note)}
                  onUnarchive={() => handleUnarchive(note)}
                  onDelete={() => handleDelete(note)}
                  isArchived={!note.isActive}
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
