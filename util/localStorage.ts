import type { SafeUser } from '@/types/users.type';
import { cookies } from 'next/headers';
import { verifyToken } from '@/util/jwt';

// Server-side helper to read token cookie synchronously
export function getUserFromCookies(): SafeUser | null {
  try {
    // cookies() returns a RequestCookies in server components/env
    const token = (cookies() as any).get?.('token')?.value ?? null;
    if (!token) return null;
    const decoded = verifyToken(token);
    if (!decoded) return null;
    return decoded as SafeUser;
  } catch {
    return null;
  }
}

// Delete session (logout) - server helper
export function clearSession() {
  try {
    (cookies() as any).set?.({ name: 'token', value: '', path: '/', expires: new Date(0) });
  } catch {
    // ignore
  }
}