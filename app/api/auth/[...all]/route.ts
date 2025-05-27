import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3001';

async function handleAuthRequest(
  request: NextRequest, 
  params: { all: string[] }, 
  method: string
) {
  const path = params.all.join('/');
  const url = `${BACKEND_URL}/api/auth/${path}${request.nextUrl.search}`;
  
  console.log(`Proxying ${method} request to:`, url);
  
  const headers: HeadersInit = {
    'cookie': request.headers.get('cookie') || '',
  };
  
  // Add content-type for requests with body
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    headers['content-type'] = request.headers.get('content-type') || 'application/json';
  }
  
  const body = ['GET', 'DELETE'].includes(method) ? undefined : await request.text();
  
  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
      credentials: 'include',
    });

    const data = await response.text();
    
    const res = new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'content-type': response.headers.get('content-type') || 'application/json',
      },
    });

    // Forward all set-cookie headers
    const setCookieHeaders = response.headers.getSetCookie?.() || [];
    setCookieHeaders.forEach((cookie) => {
      res.headers.append('set-cookie', cookie);
    });

    return res;
  } catch (error) {
    console.error('Auth proxy error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        status: 500,
        headers: { 'content-type': 'application/json' }
      }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { all: string[] } }
) {
  return handleAuthRequest(request, params, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: { all: string[] } }
) {
  return handleAuthRequest(request, params, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { all: string[] } }
) {
  return handleAuthRequest(request, params, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { all: string[] } }
) {
  return handleAuthRequest(request, params, 'DELETE');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { all: string[] } }
) {
  return handleAuthRequest(request, params, 'PATCH');
}

