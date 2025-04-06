// TODO move this logic of redirect to the page.tsx
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')?.value;

    // Redirect logged-in users from "/" to "/package"
    if (accessToken && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/package', request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/'], // Only run on root path
};