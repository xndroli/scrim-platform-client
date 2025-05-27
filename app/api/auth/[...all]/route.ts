import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3001';

export async function GET(
  request: NextRequest,
  { params }: { params: { all: string[] } }
) {
  const path = params.all.join('/');
  const url = `${BACKEND_URL}/api/auth/${path}${request.nextUrl.search}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'cookie': request.headers.get('cookie') || '',
    },
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

  // Forward set-cookie headers
  const setCookieHeaders = response.headers.getSetCookie();
  setCookieHeaders.forEach((cookie) => {
    res.headers.append('set-cookie', cookie);
  });

  return res;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { all: string[] } }
) {
  const path = params.all.join('/');
  const url = `${BACKEND_URL}/api/auth/${path}`;
  
  const body = await request.text();
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': request.headers.get('content-type') || 'application/json',
      'cookie': request.headers.get('cookie') || '',
    },
    body: body,
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

  // Forward set-cookie headers
  const setCookieHeaders = response.headers.getSetCookie();
  setCookieHeaders.forEach((cookie) => {
    res.headers.append('set-cookie', cookie);
  });

  return res;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { all: string[] } }
) {
  return POST(request, { params });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { all: string[] } }
) {
  const path = params.all.join('/');
  const url = `${BACKEND_URL}/api/auth/${path}`;
  
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'cookie': request.headers.get('cookie') || '',
    },
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

  // Forward set-cookie headers
  const setCookieHeaders = response.headers.getSetCookie();
  setCookieHeaders.forEach((cookie) => {
    res.headers.append('set-cookie', cookie);
  });

  return res;
}
