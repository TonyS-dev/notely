// frontend/src/pages/MainContentPage.tsx
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NoteItem } from '../components/NoteItem';
import { CategoryFilter } from '../components/CategoryFilter';
import { useModal } from '../hooks/useModal';
import { useNotesContext } from '../hooks/useNotesContext';
import type { Note, Category } from '../types'; // Import types

export function MainContentPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const { openEditNoteModal } = useModal();
  const location = useLocation();
  const isArchivedView = location.pathname === '/archived';

  const {
    activeNotes,
    archivedNotes,
    isLoading,
    error,
    handleDuplicate,
    handleArchive,
    handleUnarchive,
    handleDelete,
    loadMoreActive,
    loadMoreArchived,
    hasMoreActive,
    hasMoreArchived,
  } = useNotesContext();

  const notes = isArchivedView ? archivedNotes : activeNotes;
  const hasMore = isArchivedView ? hasMoreArchived : hasMoreActive;
  const loadMore = isArchivedView ? loadMoreArchived : loadMoreActive;

  const filteredNotes = notes.filter(
    (note: Note) =>
      selectedCategoryId === null ||
      note.categories.some((cat: Category) => cat.id === selectedCategoryId),
  );

  if (isLoading) {
    return (
      <main className="main-content">
        <header className="main-header">
          <h1>Welcome Back!</h1>
        </header>
        <section className="dashboard">
          <div className="notes-section">
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
          <h2>{isArchivedView ? '📁 Archived notes' : '📝 My notes'}</h2>
          {!isArchivedView && (
            <CategoryFilter
              selectedCategoryId={selectedCategoryId}
              onCategoryChange={setSelectedCategoryId}
            />
          )}
          <div className="notes-list">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note: Note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onEdit={() => openEditNoteModal(note)}
                  onDuplicate={() => handleDuplicate(note.id)}
                  onArchive={() => handleArchive(note.id)}
                  onUnarchive={() => handleUnarchive(note.id)}
                  onDelete={() => handleDelete(note.id)}
                  isArchived={!note.isActive}
                />
              ))
            ) : (
              <p>
                {isArchivedView
                  ? 'No archived notes.'
                  : 'You have no active notes.'}
              </p>
            )}
          </div>
          {hasMore && (
            <div className="load-more-container">
              <button onClick={loadMore} className="load-more-btn">
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
