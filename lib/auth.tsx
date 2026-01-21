'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Role } from './roles';

type User = {
  id: string;
  name: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: Role) => {
    setUser({
      id: 'u1',
      name: 'Demo User',
      role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
