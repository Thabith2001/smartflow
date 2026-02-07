// Client-only helpers for token stored in localStorage
import type { SafeUser } from '@/types/users.type';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
}

export function getUserFromToken(): SafeUser | null {
  const token = getToken();
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload as SafeUser;
  } catch {
    return null;
  }
}

export function clearToken(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('token');
  } catch {
    // ignore
  }
}

