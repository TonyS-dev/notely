// frontend/src/components/ViewNoteModal.tsx
import type { Note } from '../types';

interface ViewNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
}

export const ViewNoteModal = ({
  isOpen,
  onClose,
  note,
}: ViewNoteModalProps) => {
  if (!isOpen || !note) {
    return null;
  }

  // A simple mechanism to handle closing animation
  const handleClose = () => {
    const modalContent = document.querySelector('.modal-content-view');
    modalContent?.classList.add('closing');
    setTimeout(onClose, 280);
  };

  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="modal-overlay active" onClick={handleClose}>
      <div
        className="modal-content modal-content-view"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="view-modal-title">{note.title}</h3>
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className="view-modal-body">
          <div className="view-modal-meta">
            <span>Created on: {formattedDate}</span>
          </div>
          <p className="view-modal-content">{note.content}</p>
          {note.categories.length > 0 && (
            <div className="view-modal-categories">
              <h4>Categories:</h4>
              <div className="categories">
                {note.categories.map((cat) => (
                  <div key={cat.id} className="note-category">
                    {cat.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
