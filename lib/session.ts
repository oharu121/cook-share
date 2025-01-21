import { cookies } from 'next/headers';
import { verify, sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

type SessionUser = {
  email: string;
  id: string;
};

export async function createSession(user: SessionUser) {
  const token = sign(
    { email: user.email, id: user.id },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1d' }
  );

  const response = new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

  response.cookies.set({
    name: 'session',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    const verified = verify(token, process.env.SESSION_SECRET || 'your-secret-key');
    return verified as SessionUser;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
} 