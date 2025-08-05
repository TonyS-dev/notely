// frontend/src/pages/MainContentPage.tsx
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NoteItem } from '../components/NoteItem';
import { CategoryFilter } from '../components/CategoryFilter';
import { useModal } from '../hooks/useModal';
import { useNotesContext } from '../hooks/useNotesContext';
import { useSortedNotes } from '../hooks/useSortedNotes';

export function MainContentPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const { openEditNoteModal } = useModal();

  // Get the current URL location to determine if we are on the archived page
  const location = useLocation();
  const isArchivedView = location.pathname === '/archived';

  const {
    notes,
    isLoading,
    error,
    handleDuplicate,
    handleArchive,
    handleUnarchive,
    handleDelete,
  } = useNotesContext();

  // Filter notes based on the current view (active or archived) and selected category
  const filteredNotes = notes
    .filter((note) => (isArchivedView ? !note.isActive : note.isActive))
    .filter(
      (note) =>
        selectedCategoryId === null ||
        note.categories.some((cat) => cat.id === selectedCategoryId),
    );

  const sortedNotes = useSortedNotes(filteredNotes);

  if (isLoading) {
    return (
      <main className="main-content">
        <header className="main-header">
          <h1>Welcome Back!</h1>
        </header>
        <section className="dashboard">
          <div className="notes-section">
            <h2>{isArchivedView ? '📁 Archived Notes' : '📝 My Notes'}</h2>
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
          <h1>An Error Occurred</h1>
        </header>
        <section className="dashboard">
          <div className="notes-section">
            <div className="error-state">Error: {error}</div>
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
          <h2>{isArchivedView ? '📁 Archived notes' : '📝 My notes'}</h2>

          {/* Only show the category filter on the active notes page */}
          {!isArchivedView && (
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
                {isArchivedView
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
