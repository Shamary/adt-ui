import { redirect } from 'next/navigation';
import CallbackHandler from './CallBackHandler';

export default async function CallbackPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const code = searchParams.code as string;
    const error = searchParams.error as string;

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

        // Pass data to a Client Component to handle cookies + redirect
        return <CallbackHandler authData={data} />;

    } catch (err) {
        console.error('Authentication error:', err);
        redirect('/signin?error=auth_failed');
    }
}