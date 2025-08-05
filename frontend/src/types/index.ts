// frontend/src/types/index.ts

// --- API & Auth Types ---
export interface DecodedToken {
  sub: string;
  username: string;
  email?: string;
  iat: number;
  exp: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
}

// --- Entity Types ---
export interface Category {
  id: string;
  name: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string; // Dates will come as ISO strings from the API
  updatedAt: string;
  categories: Category[];
  user: User;
}

// --- Data Transfer Object Types (for creating/updating) ---
export interface CreateCategoryData {
  name: string;
}

export interface CreateNoteData {
  title: string;
  content?: string;
  categoryIds?: string[];
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  categoryIds?: string[];
}

// --- Context Types ---
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ModalContextType {
  openCreateNoteModal: () => void;
  openEditNoteModal: (note: Note) => void;
  closeModal: () => void;
}

export interface NotesContextType {
  activeNotes: Note[];
  archivedNotes: Note[];
  isLoading: boolean;
  error: string | null;
  refetchNotes: () => void;
  loadMoreActive: () => Promise<void>;
  loadMoreArchived: () => Promise<void>;
  hasMoreActive: boolean;
  hasMoreArchived: boolean;
  handleDuplicate: (noteId: string) => Promise<void>;
  handleArchive: (noteId: string) => Promise<void>;
  handleDelete: (noteId: string) => Promise<void>;
  handleUnarchive: (noteId: string) => Promise<void>;
}

// --- Component Prop Types ---
export interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDuplicate: (noteId: string) => void;
  onArchive: (noteId: string) => void;
  onUnarchive: (noteId: string) => void;
  onDelete: (noteId: string) => void;
  isArchived?: boolean;
}

export interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNoteSaved: () => void;
  noteToEdit?: Note | null;
}

export interface SidebarProps {
  user: User | null;
}

export interface DropdownMenuProps {
  onDuplicate: () => void;
  onArchive: () => void;
  onUnarchive: () => void;
  onDelete: () => void;
  isArchived: boolean;
}
