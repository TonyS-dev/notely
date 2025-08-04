// frontend/src/context/ModalContextTypes.ts
import { createContext } from 'react';
import type { ModalContextType } from '../types';

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);
