'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AuthData {
    access_token: string;
    refresh_token: string;
    email: string;
    house_no?: string;
    profile_complete: boolean;
}

export default function CallbackHandler({ authData }: { authData: AuthData }) {
    const router = useRouter();

    useEffect(() => {
        // Set cookies client-side
        Cookies.set('access_token', authData.access_token, { secure: true, sameSite: 'strict' });
        Cookies.set('refresh_token', authData.refresh_token, { secure: true, sameSite: 'strict' });
        Cookies.set('email', authData.email, { secure: true, sameSite: 'strict' });

        if (authData.house_no) {
            Cookies.set('houseno', authData.house_no, { secure: true, sameSite: 'strict' });
        }

        // Redirect based on profile completion
        router.push(authData.profile_complete ? '/package' : '/user-profile');
    }, [authData, router]);

    return <div>Loading...</div>; // Optional loading state
}