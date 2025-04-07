import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
        return NextResponse.redirect(new URL(`/login?error=${error}`, request.url));
    }

    if (!code) {
        return NextResponse.redirect(new URL('/login?error=missing_code', request.url));
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback`,
            }),
        });

        if (!response.ok) {
            throw new Error('Token exchange failed');
        }

        const { access_token, refresh_token } = await response.json();

        return NextResponse.redirect(new URL('/packages', request.url));
    } catch (err) {
        console.error('Authentication failed:', err);
        return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
    }
}