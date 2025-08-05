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
  categories: Category[]; // A note will have an array of full Category objects
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
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  refetchNotes: () => void;
  handleDuplicate: (note: Note) => Promise<void>;
  handleArchive: (note: Note) => Promise<void>;
  handleDelete: (note: Note) => Promise<void>;
  handleUnarchive: (note: Note) => Promise<void>;
}

// --- Component Prop Types ---
export interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDuplicate: (note: Note) => void;
  onArchive: (note: Note) => void;
  onUnarchive: (note: Note) => void;
  onDelete: (note: Note) => void;
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
