import { NextResponse, NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import { verifySession } from '@/server/lib/session';
import Negotiator from 'negotiator';

let locales = ['en', 'ja'];
let defaultLocale = 'ja';

// Define protected and public routes
const protectedRoutes = ['/dashboard', '/profile'];
const publicRoutes = ['/login', '/register', '/'];

function getLocale(req: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // Verify session
  const session = await verifySession();

  // Redirect authenticated users away from auth routes
  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Redirect unauthenticated users away from protected routes
  if (
    isPublicRoute &&
    session?.id &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/profile', req.nextUrl))
  }

  const { pathname } = req.nextUrl
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(req);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        req.url
      )
    );
  }

  const response = NextResponse.next();

  // Add security headers
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  );

  // Add other security headers
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
