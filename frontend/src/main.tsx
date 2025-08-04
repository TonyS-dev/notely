// frontend/src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.css';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';
import { NotesProvider } from './context/NotesContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <NotesProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </NotesProvider>
    </AuthProvider>
  </StrictMode>,
);
