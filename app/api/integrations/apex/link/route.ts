// app/api/integrations/apex/link/route.ts - Next.js App Router
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apexPlayerName, apexPlatform } = body;

    const userId = await getUserIdFromSession(request);
    
    if (!userId) {
      return NextResponse.json(
        { status: 'error', message: 'Authentication required' },
        { status: 401 }
      );
    }

    const response = await fetch(`${process.env.API_ENDPOINT}/integrations/apex/link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getUserToken(request)}`,
      },
      body: JSON.stringify({
        apexPlayerName,
        apexPlatform,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}