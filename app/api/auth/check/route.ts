'use server'

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { headers } from 'next/headers';

export async function GET() {
  try {
    // Log the raw cookie header
    const headersList = await headers();
    const cookieHeader = headersList.get('cookie');
    console.log('Raw cookie header:', cookieHeader);

    const cookieStore = await cookies();
    console.log('Cookie store:', cookieStore);
    const allCookies = cookieStore.getAll();
    console.log('All cookies:', allCookies);
    
    const token = cookieStore.get('token')?.value;
    console.log('Token cookie:', token);

    if (!token) {
      console.log('No token found');
      return new NextResponse('Unauthorized - No token', { status: 401 });
    }

    try {
      // Verify the token and get the decoded data
      const decoded = verify(token, process.env.SESSION_SECRET || 'your-secret-key');
      console.log('Token verified:', decoded);
      return new NextResponse('Authenticated', { status: 200 });
    } catch (verifyError) {
      console.log('Token verification failed:', verifyError);
      return new NextResponse('Unauthorized - Invalid token', { status: 401 });
    }
  } catch (error) {
    console.log('General error:', error);
    return new NextResponse('Unauthorized - Server error', { status: 401 });
  }
}