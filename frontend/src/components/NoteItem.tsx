// frontend/src/components/NoteItem.tsx
import type { NoteItemProps } from '../types';

export const NoteItem = ({ note, onEdit }: NoteItemProps) => {
  const formattedDate = new Date(note.createdAt).toLocaleDateString();

  return (
    <div className="note-item">
      <div className="note-header">
        <p className="date">{formattedDate}</p>
        <div className="note-actions">
          <button
            className="note-action-btn"
            title="Edit"
            onClick={() => onEdit(note)}
          >
            ✏️
          </button>
          <button className="note-action-btn" title="More">
            ⋯
          </button>
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
