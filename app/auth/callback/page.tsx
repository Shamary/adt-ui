export const dynamic = "force-dynamic";

import { redirect } from 'next/navigation';
import CallbackHandler from './CallBackHandler';

interface CallbackPageProps {
    searchParams?: {
        code?: string;
        error?: string;
        [key: string]: string | string[] | undefined;
    };
}

export default async function CallbackPage({
    searchParams = {}  // Provide default value
}: CallbackPageProps = {}) {
    const code = searchParams.code;
    const error = searchParams.error;

    if (error) {
        redirect(`/signin?error=${encodeURIComponent(error)}`);
    }

    if (!code) {
        redirect('/signin?error=missing_code');
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/login/google`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to exchange code for tokens');
        }

        const data = await response.json();
        return <CallbackHandler authData={data} />;

    } catch (err) {
        console.error('Authentication error:', err);
        redirect('/signin?error=auth_failed');
    }
}