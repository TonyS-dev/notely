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

  // 👇 CORRECTED logout function. Define it BEFORE the useEffect that uses it.
  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setUser(null);
  }, []); // Empty dependency array is correct here

  useEffect(() => {
    try {
      if (token) {
        const decodedUser = jwtDecode<DecodedToken>(token);

        // Check if token is expired
        if (Date.now() >= decodedUser.exp * 1000) {
          console.error('Token expired, logging out.'); // Good to log this
          logout(); // Now we call the stable logout function
          return; // Stop execution of the effect
        }

        setUser({
          id: decodedUser.sub,
          username: decodedUser.username,
          email: decodedUser.email || '',
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      logout(); // If token is invalid, log out
    }
    // 👇 ADD 'logout' to the dependency array.
  }, [token, logout]);

  const login = useCallback((newToken: string) => {
    localStorage.setItem('accessToken', newToken);
    setToken(newToken);
  }, []); // Empty dependency array is correct here

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
