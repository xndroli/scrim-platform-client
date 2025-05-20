// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value;
  
  // Protected routes (dashboard, admin)
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Admin routes require additional checks (done on client side)
    // We just do basic auth check here
  }
  
  // Redirect authenticated users from login/register to dashboard
  if ((pathname === '/login' || pathname === '/register') && token) {
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