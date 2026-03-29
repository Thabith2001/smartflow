import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/util/jwt';
import { customerRepository } from '@/repositories/customer.repository';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

    let payload: unknown;
    try {
      payload = verifyToken(token);
    } catch {
      return NextResponse.json({ ok: false, error: 'invalid token' }, { status: 401 });
    }

    // Only allow MANAGER or ADMIN to access
    const role = (payload as { role?: string })?.role;
    if (!role || (role !== 'MANAGER' && role !== 'ADMIN')) {
      return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
    }

    // Fetch customers via dedicated repository
    const customers = await customerRepository.findAll();

    return NextResponse.json({ ok: true, customers }, { status: 200 });
  } catch (err: unknown) {
    console.error('API /api/manager/customers error', err);
    return NextResponse.json({ ok: false, error: 'server error' }, { status: 500 });
  }
}
