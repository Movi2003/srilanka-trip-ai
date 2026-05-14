// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // You can add custom logic here later
  return NextResponse.next();
}

export const config = {
  matcher: ['/trip-planner/:path*'],
};