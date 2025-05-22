// app/api/integrations/discord/link/route.ts - Next.js App Router
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { discordId, discordUsername, discordAvatar } = body;

    // Get user session (implement your auth check here)
    const userId = await getUserIdFromSession(request);
    
    if (!userId) {
      return NextResponse.json(
        { status: 'error', message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Make request to your backend API
    const response = await fetch(`${process.env.API_ENDPOINT}/integrations/discord/link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getUserToken(request)}`,
      },
      body: JSON.stringify({
        discordId,
        discordUsername,
        discordAvatar,
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

// Helper functions (implement based on your auth system)
async function getUserIdFromSession(request: NextRequest): Promise<string | null> {
  // Implement your session checking logic here
  // This will depend on your authentication system
  return null;
}

async function getUserToken(request: NextRequest): Promise<string | null> {
  // Implement your token extraction logic here
  return null;
}
