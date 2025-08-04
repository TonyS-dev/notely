// frontend/src/hooks/useModal.ts
import { useContext } from 'react';
import { ModalContext } from '../context/ModalContextTypes';

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
