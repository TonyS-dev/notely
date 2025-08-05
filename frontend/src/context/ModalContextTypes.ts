// frontend/src/context/ModalContextTypes.tsx
import { createContext } from 'react';
import type {
  Note,
  ModalContextType as ModalContextTypeFromIndex,
} from '../types';

// Extend the type to include the new view modal function
export interface ExtendedModalContextType extends ModalContextTypeFromIndex {
  openViewNoteModal: (note: Note) => void;
}

export const ModalContext = createContext<ExtendedModalContextType | undefined>(
  undefined,
);
