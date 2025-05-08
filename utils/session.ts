// utils/session.ts
import Cookies from 'js-cookie';

export const extendSession = async () => {
    try {
        const refresh_Token = Cookies.get('refresh_token');
        if (!refresh_Token) throw new Error('No refresh token available');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/extend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: refresh_Token }),
        });

        if (!response.ok) {
            throw new Error('Session extension failed');
        }

        const { accessToken, refreshToken } = await response.json();

        // Update cookies with new tokens
        Cookies.set('access_token', accessToken, { secure: true, sameSite: 'strict' });
        Cookies.set('refresh_token', refreshToken, { secure: true, sameSite: 'strict' });

        return accessToken;
    } catch (error) {
        // Clear tokens and redirect to login on failure
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/signin';
        throw error;
    }
};