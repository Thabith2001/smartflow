
import { cookies } from 'next/headers';
import Header from './Header';
import { verifyToken } from '@/util/jwt';
import type { SafeUser } from '@/types/users.type';

export default async function HeaderServer() {
  // Read the HttpOnly cookie on the server
  const ck = await cookies();
  const token = ck.get('token')?.value ?? null;
  let user: SafeUser | null = null;
  if (token) {
    try {
      const decoded = verifyToken(token);
      if (decoded) user = decoded as SafeUser;
    } catch {
      user = null;
    }
  }


  return <Header initialUser={user} />;
}
