'use client';
import { useState, useEffect } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Cookies from "js-cookie";

const OTPVerification = () => {
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Countdown timer for resend OTP
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    // Formik for OTP validation and submission
    const formik = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                .required('OTP is required')
                .matches(/^\d{6}$/, 'OTP must be a 6-digit number'),
        }),
        onSubmit: async (values) => {
            setErrorMessage(''); // Clear previous error messages
            setSuccessMessage(''); // Clear previous success messages

            try {
                // Call the /api/confirm-otp endpoint
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/confirm-otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        otp: values.otp,
                        email: Cookies.get('email'),
                        password: Cookies.get('password')
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to verify OTP');
                }

                Cookies.remove("email");
                Cookies.remove("password");
                // Handle successful OTP verification
                setSuccessMessage('OTP verified successfully!');
            } catch (error) {
                // Handle errors
                setErrorMessage(error.message || 'Failed to verify OTP. Please try again.');
            }
        },
    });

    // Handle resend OTP
    const handleResend = () => {
        if (canResend) {
            console.log("Resending OTP...");
            setCountdown(60);
            setCanResend(false);
            setErrorMessage('');
            setSuccessMessage('');

            // Implement OTP resend logic (API call)
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/resend-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: Cookies.get('email')
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((data) => {
                            throw new Error(data.message || 'Failed to resend OTP');
                        });
                    }
                    return response.json();
                })
                .then((data) => {
                    setSuccessMessage('OTP resent successfully!');
                })
                .catch((error) => {
                    setErrorMessage(error.message || 'Failed to resend OTP. Please try again.');
                });
        }
    };

    return (
        <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[400px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                            <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                Enter OTP
                            </h3>
                            <p className="mb-6 text-center text-base font-medium text-body-color">
                                We've sent a 6-digit code to your email.
                            </p>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-6">
                                    <label
                                        htmlFor="otp"
                                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                    >
                                        OTP Code
                                    </label>
                                    <input
                                        type="text"
                                        name="otp"
                                        value={formik.values.otp}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter OTP"
                                        className={`w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary dark:bg-[#242B51] dark:shadow-signUp ${formik.touched.otp && formik.errors.otp ? 'border-red-500' : 'border-transparent'
                                            }`}
                                        maxLength={6}
                                    />
                                    {formik.touched.otp && formik.errors.otp ? (
                                        <div className="text-red-500 text-sm mt-1">{formik.errors.otp}</div>
                                    ) : null}
                                </div>
                                {errorMessage && (
                                    <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                                )}
                                {successMessage && (
                                    <div className="text-green-500 text-sm mb-4">{successMessage}</div>
                                )}
                                <div className="mb-6">
                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 hover:bg-opacity-80"
                                    >
                                        Verify OTP
                                    </button>
                                </div>
                            </form>
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={handleResend}
                                    disabled={!canResend}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition duration-300 ${canResend
                                        ? "bg-primary text-white hover:bg-opacity-80"
                                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                        }`}
                                >
                                    {canResend ? "Resend Code" : `Resend in ${countdown}s`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OTPVerification;