// middleware.ts - Updated for Better-auth
import { NextResponse, NextRequest } from 'next/server'
// import { authClient } from './lib/auth-client'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for auth routes and static files
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // For now, allow all routes during development
  return NextResponse.next()

  // // Get session by checking cookies
  // const sessionToken = request.cookies.get('better-auth.session_token')?.value;

  // // For debugging
  // console.log('Middleware check:', pathname, 'Token exists:', !!sessionToken);
  
  // // Check if user is authenticated by making a request to your auth endpoint
  // let isAuthenticated = false;
  // let userRole = null;

  // if (sessionToken) {
  //   try {
  //     const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/get-session`, {
  //       headers: {
  //         cookie: `better-auth.session_token=${sessionToken}`,
  //       },
  //     });
      
  //     if (authResponse.ok) {
  //       const authData = await authResponse.json();
  //       isAuthenticated = !!authData.user;
  //       userRole = authData.user?.role;
  //     }
  //   } catch (error) {
  //     console.error('Auth check failed:', error);
  //   }
  // }
  
  // // Protected routes (dashboard, admin)
  // if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
  //   if (!isAuthenticated) {
  //     const loginUrl = new URL('/login', request.url)
  //     loginUrl.searchParams.set('callbackUrl', encodeURIComponent(request.url))
  //     return NextResponse.redirect(loginUrl)
  //   }
    
  //   // Admin routes require admin role
  //   if (pathname.startsWith('/admin') && userRole !== 'admin') {
  //     return NextResponse.redirect(new URL('/dashboard', request.url));
  //   }
  // }
  
  // // Redirect authenticated users from auth pages to dashboard
  // if ((pathname.startsWith('/login') || pathname.startsWith('/register')) && isAuthenticated) {
  //   const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
  //   if (callbackUrl) {
  //     return NextResponse.redirect(new URL(decodeURIComponent(callbackUrl)));
  //   }
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }
  
  // return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
}