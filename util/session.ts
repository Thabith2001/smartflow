import { cookies } from 'next/headers';
import { signToken } from '@/util/jwt';
import { sessionType } from '@/types/users.type';

export async function  createSession(sessions: sessionType) {
  const token = signToken({
    id: sessions._id.toString(),
    role: sessions.role,
  });

  (await cookies()).set({
    name: 'token',
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}
