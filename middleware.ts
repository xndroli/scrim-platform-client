// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies';

// Match custom cookie name/prefix in your auth config
// const COOKIE_NAME = "session_token";
// const COOKIE_PREFIX = "better-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // // For Auth debug
  // // Skip middleware for auth routes and static files
  // if (
  //   pathname.startsWith('/api/auth') ||
  //   pathname.startsWith('/_next') ||
  //   pathname.startsWith('/static') ||
  //   pathname.includes('.')
  // ) {
  //   return NextResponse.next()
  // }
  
  // // For now, allow all routes during development
  // return NextResponse.next()

  // Get session by checking cookies
  const sessionToken = getSessionCookie(request);

  // For debugging
  console.log('Middleware check:', pathname, 'Token exists:', !!sessionToken);

  // Protected routes (dashboard, admin)
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    if (!sessionToken) {
      // Not authenticated, redirect to login page
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', encodeURIComponent(request.url))
      return NextResponse.redirect(loginUrl)
    }
  }
  
  // Optional: Redirect authenticated users from auth pages to dashboard
  if ((pathname === '/login' || pathname === '/register') && sessionToken) {
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
    if (callbackUrl) {
      return NextResponse.redirect(new URL(decodeURIComponent(callbackUrl)));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Specify which routes the middleware applies to
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
}