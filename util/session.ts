import { cookies } from 'next/headers';
import { signToken } from '@/util/jwt';


export async function createSession(payload: {
  _id: any;
  role: string;
}) {
  const token = signToken({
    id: payload._id.toString(),
    role: payload.role,
  });

  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return token;
}
