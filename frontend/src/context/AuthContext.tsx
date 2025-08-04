// frontend/src/context/AuthContext.tsx
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { User, DecodedToken } from '../types';
import { AuthContext } from './AuthContextTypes';

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('accessToken'),
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      if (token) {
        // Decode the JWT token to extract user information
        const decodedUser = jwtDecode<DecodedToken>(token);

        // Check if token is expired
        if (Date.now() >= decodedUser.exp * 1000) {
          throw new Error('Token expired');
        }

        setUser({
          id: decodedUser.sub,
          username: decodedUser.username,
          email: decodedUser.email || '',
        });
        localStorage.setItem('accessToken', token);
      } else {
        setUser(null);
        localStorage.removeItem('accessToken');
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      setUser(null);
      localStorage.removeItem('accessToken');
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
