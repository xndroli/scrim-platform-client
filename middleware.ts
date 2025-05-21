// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value;
  const isAuthenticated = !!token;
  
  // Protected routes (dashboard, admin)
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    // If no token, redirect to login
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      // Add the original URL as a parameter for redirection after login
      loginUrl.searchParams.set('callbackUrl', encodeURIComponent(request.url));
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Redirect authenticated users from login/register to dashboard
  if ((pathname.startsWith('/login') || pathname.startsWith('/register')) && isAuthenticated) {
    // Check if there's a callback URL to redirect to after login
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
    if (callbackUrl) {
      return NextResponse.redirect(new URL(decodeURIComponent(callbackUrl)));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths should trigger this middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
};