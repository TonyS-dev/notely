// frontend/src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { ModalProvider } from './context/ModalContext.tsx';
import { NotesProvider } from './context/NotesContext.tsx';

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
