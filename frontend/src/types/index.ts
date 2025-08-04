// frontend/src/types/index.ts
export interface DecodedToken {
  sub: string;
  username: string;
  email?: string;
  iat: number;
  exp: number;
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

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface AuthPageProps {
  onLoginSuccess: (token: string) => void;
}

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface CreateCategoryData {
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

export interface CreateNoteData {
  title: string;
  content: string;
  categoryIds?: string[];
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  categoryIds?: string[];
}

export interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDuplicate: (note: Note) => void;
  onArchive: (note: Note) => void;
  onUnarchive?: (note: Note) => void;
  onDelete: (note: Note) => void;
  isArchived?: boolean;
}

export interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNoteSaved: () => void; // A function to tell the parent to refresh the notes list
  noteToEdit?: Note | null; // If a note is passed, we are in "edit" mode
}

export interface SidebarProps {
  user: User | null;
  onLogout: () => void;
  onShowArchived: () => void;
  onShowNotes: () => void;
  showArchived: boolean;
}

export interface DropdownMenuProps {
  onDuplicate: () => void;
  onArchive: () => void;
  onUnarchive?: () => void;
  onDelete: () => void;
  isArchived?: boolean;
}
