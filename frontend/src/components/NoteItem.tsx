// frontend/src/components/NoteItem.tsx
import type { NoteItemProps } from '../types';
import { DropdownMenu } from './DropdownMenu';
import { useModal } from '../hooks/useModal';

export const NoteItem = ({
  note,
  onEdit,
  onDuplicate,
  onArchive,
  onUnarchive,
  onDelete,
  isArchived = false,
}: NoteItemProps) => {
  const formattedDate = new Date(note.createdAt).toLocaleDateString();
  const { openViewNoteModal } = useModal();

  // This function stops the click from bubbling up to the main div
  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className="note-item" onClick={() => openViewNoteModal(note)}>
      <div className="note-header">
        <p className="date">{formattedDate}</p>
        <div className="note-actions">
          <button
            className="note-action-btn"
            title="Edit"
            onClick={(e) => handleActionClick(e, () => onEdit(note))}
          >
            ✏️
          </button>
          <DropdownMenu
            onDuplicate={() => onDuplicate(note.id)}
            onArchive={() => onArchive(note.id)}
            onUnarchive={() => onUnarchive(note.id)}
            onDelete={() => onDelete(note.id)}
            isArchived={isArchived}
          />
        </div>
      </div>

      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>

      <div className="categories">
        {note.categories.map((cat) => (
          <div key={cat.id} className="note-category">
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
};
