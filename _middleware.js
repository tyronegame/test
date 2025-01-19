import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  // Skip API routes and static files
  if (url.pathname.startsWith('/api/') || url.pathname.includes('.')) {
    return NextResponse.next();
  }

  // Rewrite all other requests to go through our proxy
  const response = NextResponse.rewrite(new URL(`/api/proxy${url.pathname}${url.search}`, url));
  return response;
} 