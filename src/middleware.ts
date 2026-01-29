import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Define protected routes
const protectedRoutes = [
  '/profile',
  '/admin',
  '/add-schedule',
  '/hub',
  '/swap',
  '/schedule'
];

// Define public routes (accessible without authentication)
const publicRoutes = [
  '/',
  '/login',
  '/signup'
];

// Define admin-only routes
const adminRoutes = [
  '/admin'
];

// Define teacher/admin routes
const teacherRoutes = [
  '/add-schedule'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/sw.js') ||
    pathname.startsWith('/manifest.json') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Get token from cookies or Authorization header
  const token = request.cookies.get('auth-token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.includes(pathname);

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If it's a protected route and no token, redirect to login
  if (isProtectedRoute && !token) {
    console.log('🔒 Protected route accessed without token, redirecting to login');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists, verify it
  if (token) {
    try {
      const payload = verifyToken(token);
      
      if (!payload) {
        console.log('🔒 Invalid token, redirecting to login');
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }

      // Check role-based access
      const userRole = payload.role;

      // Admin-only routes
      if (adminRoutes.some(route => pathname.startsWith(route))) {
        if (userRole !== 'ADMIN') {
          console.log('🔒 Admin route accessed by non-admin, redirecting to home');
          return NextResponse.redirect(new URL('/', request.url));
        }
      }

      // Teacher/Admin routes
      if (teacherRoutes.some(route => pathname.startsWith(route))) {
        if (userRole !== 'TEACHER' && userRole !== 'ADMIN') {
          console.log('🔒 Teacher route accessed by student, redirecting to home');
          return NextResponse.redirect(new URL('/', request.url));
        }
      }

      // Add user info to headers for use in components
      const response = NextResponse.next();
      response.headers.set('x-user-id', payload.userId.toString());
      response.headers.set('x-user-role', payload.role);
      response.headers.set('x-user-email', payload.email);
      
      return response;

    } catch (error) {
      console.log('🔒 Token verification failed, redirecting to login');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sw.js (service worker)
     * - manifest.json (PWA manifest)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sw.js|manifest.json).*)',
  ],
};