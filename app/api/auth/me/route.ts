import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '../../../../util/jwt'; // project-root util/jwt

export async function GET() {
  try {
    const ck = await cookies();
    const token = ck.get('token')?.value ?? null;
    if (!token) return NextResponse.json({ ok: false, user: null }, { status: 200 });

    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ ok: false, user: null }, { status: 200 });

    return NextResponse.json({ ok: true, user: decoded }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, user: null }, { status: 500 });
  }
}
