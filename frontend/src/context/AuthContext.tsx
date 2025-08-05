// frontend/src/context/AuthContext.tsx
import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { User, DecodedToken } from '../types';
import { AuthContext } from './AuthContextTypes';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('accessToken'),
  );
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    try {
      if (token) {
        const decodedUser = jwtDecode<DecodedToken>(token);

        if (Date.now() >= decodedUser.exp * 1000) {
          console.error('Token expired, logging out.');
          logout();
        } else {
          setUser({
            id: decodedUser.sub,
            username: decodedUser.username,
            email: decodedUser.email || '',
          });
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [token, logout]);

  const login = useCallback((newToken: string) => {
    localStorage.setItem('accessToken', newToken);
    setToken(newToken);
  }, []);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
