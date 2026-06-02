import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("userAuth")?.value || null;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

   if (token && request.nextUrl.pathname === '/login' || token && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/job-list', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!login|api|_next/static|_next/image|favicon.ico).*)',
  ],
};