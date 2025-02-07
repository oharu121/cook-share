import { NextResponse, NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import { verifySession } from "@/server/lib/session";
import Negotiator from "negotiator";

let locales = ["en", "ja"];
let defaultLocale = "ja";

// Define protected and public routes
const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/recipes",
  "/shopping-lists",
];
const publicRoutes = ["/login", "/register", "/", "/browse"];

function getLocale(req: NextRequest): string {
  const path = req.nextUrl.pathname;
  const localeMatch = path.split("/")[1];

  if (locales.includes(localeMatch)) {
    return localeMatch;
  }

  const negotiatorHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  console.log("Languages detected:", languages);

  // Ensure languages array is valid
  if (!languages || languages.length === 0) {
    console.warn("No valid language detected, using default:", defaultLocale);
    return defaultLocale;
  }

  try {
    return match(languages, locales, defaultLocale);
  } catch (error) {
    console.error("Locale matching error:", error);
    return defaultLocale;
  }
}

export async function middleware(req: NextRequest) {
  const lang = getLocale(req);
  const path = req.nextUrl.pathname;

  // Function to remove locale from path (e.g., "/en/recipes/create" → "/recipes/create")
  const removeLocalePrefix = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}/`)) {
        return path.replace(`/${locale}`, ""); // Remove only the locale prefix
      }
    }
    return path;
  };

  const normalizedPath = removeLocalePrefix(path);
  const isProtectedRoute = protectedRoutes.some((route) =>
    normalizedPath.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) => normalizedPath === route);

  // Verify session **ONLY for protected routes**
  let session = null;
  if (isProtectedRoute) {
    session = await verifySession();
    if (!session?.id) {
      return NextResponse.redirect(new URL(`/${lang}/login`, req.nextUrl));
    }
  }

  // Redirect authenticated users away from public routes
  if (isPublicRoute && session?.id) {
    return NextResponse.redirect(new URL(`/${lang}/recipes`, req.nextUrl));
  }

  // Handle locale redirection
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !path.startsWith(`/${locale}/`) && path !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${lang}${path.startsWith("/") ? "" : "/"}${path}`, req.url)
    );
  }

  // Add pathname to headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", path);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // Security headers
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  );
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
