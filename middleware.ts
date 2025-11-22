import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Protect API routes that require authentication
  if (request.nextUrl.pathname.startsWith('/api/save-assignment') ||
      request.nextUrl.pathname.startsWith('/api/assignments')) {
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Add user info to request headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId);
    requestHeaders.set('x-user-email', decoded.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/save-assignment/:path*',
    '/api/assignments/:path*',
  ],
};

