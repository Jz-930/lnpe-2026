import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (/^\/(?:_next|api|images)(?:\/|$)/.test(pathname) || /\.[^/]+$/.test(pathname) || pathname === '/500') {
    return NextResponse.next();
  }
  if (/^\/(?:en|zh)(?:\/|$)/.test(pathname)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ['/((?!_next/|api/|images/|favicon.ico).*)'] };
