// utils/session.ts
import Cookies from 'js-cookie';

export const extendSession = async () => {
    try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) throw new Error('No refresh token available');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/extend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Session extension failed');
        }

        const { access_token, refresh_token } = await response.json();

        // Update cookies with new tokens
        Cookies.set('access_token', access_token, { secure: true, sameSite: 'strict' });
        Cookies.set('refresh_token', refresh_token, { secure: true, sameSite: 'strict' });

        return access_token;
    } catch (error) {
        // Clear tokens and redirect to login on failure
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
        throw error;
    }
};