// middleware.ts - Updated for Better-auth
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authClient } from './lib/auth-client'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get session from Better-auth
  const session = await authClient.getSession({
    headers: request.headers as HeadersInit,
  })
  
  const isAuthenticated = !!session.data?.user
  
  // Protected routes (dashboard, admin)
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', encodeURIComponent(request.url))
      return NextResponse.redirect(loginUrl)
    }
    
    // Admin routes require admin role
    if (pathname.startsWith('/admin') && session.data?.user?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    // Check email verification for protected routes
    if (!session.data?.user?.emailVerified) {
      return NextResponse.redirect(new URL('/verify-email-required', request.url))
    }
  }
  
  // Redirect authenticated users from auth pages to dashboard
  if ((pathname.startsWith('/login') || pathname.startsWith('/register')) && isAuthenticated) {
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl')
    if (callbackUrl) {
      return NextResponse.redirect(new URL(decodeURIComponent(callbackUrl)))
    }
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
}