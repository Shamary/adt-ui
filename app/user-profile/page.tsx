'use client';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from 'antd';
import 'antd/dist/reset.css';
import moment from 'moment';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import apiClient from '@/utils/apiClient';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    houseno: string;
    birthDate: string | null;
}

interface AddressData {
    line1: string;
    city: string;
    state: string;
    zipcode: string;
}

const UserProfilePage = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [address, setAddress] = useState<AddressData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState('');

    // Fetch user data and address on page load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('access_token');
                const email = Cookies.get('email');

                if (!token || !email) {
                    throw new Error('Missing authentication data');
                }

                setToken(token);

                // Fetch user data
                const userResponse = await apiClient(`/api/users/${email}`);

                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData: UserData = await userResponse.json();
                setUserData(userData);

                // Fetch active address
                const addressResponse = await apiClient(`/api/address/active`);

                if (addressResponse.ok) {
                    const addressData = await addressResponse.json();
                    setAddress(addressData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load user data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: userData?.firstName || '',
            lastName: userData?.lastName || '',
            email: userData?.email || '',
            phoneNumber: userData?.phoneNumber || '',
            birthdate: userData?.birthDate ? moment(userData.birthDate) : null,
            addressLine: address?.line1 || '',
            city: address?.city || 'Miami',
            state: address?.state || 'FL',
            zipCode: address?.zipcode || '33206-3206',
            houseNumber: userData?.houseno || '',
        },
        validationSchema: Yup.object({
            // ... keep your existing validation schema
        }),
        onSubmit: async (values) => {
            try {
                const response = await apiClient(`/api/users`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        phoneNumber: values.phoneNumber,
                        birthDate: values.birthdate ? values.birthdate.toISOString() : null,
                        houseno: values.houseNumber,
                    }),
                });

                if (response.ok) {
                    toast.success('Profile updated successfully!');
                    // Get the updated user data
                    const updatedUser = await response.json();
                    setUserData(updatedUser.data);
                } else {
                    const errorData = await response.json();
                    toast.error(`Error: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred while updating the profile.');
            }
        },
        enableReinitialize: true,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>Failed to load user data</div>;
    }

    return (
        <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                            <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                User Profile
                            </h3>
                            <form onSubmit={formik.handleSubmit}>
                                {/* Email Field */}
                                <div className="mb-8">
                                    <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formik.values.email}
                                        disabled
                                        className="w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                        style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                                    />
                                </div>

                                {/* First Name Field */}
                                <div className="mb-8">
                                    <label htmlFor="firstName" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.firstName}
                                        placeholder="Enter your first name"
                                        className={`w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : 'border-transparent'
                                            }`}
                                    />
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                                    ) : null}
                                </div>

                                {/* Last Name Field */}
                                <div className="mb-8">
                                    <label htmlFor="lastName" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.lastName}
                                        placeholder="Enter your last name"
                                        className={`w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : 'border-transparent'
                                            }`}
                                    />
                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                                    ) : null}
                                </div>

                                {/* Phone Number Field */}
                                <div className="mb-8">
                                    <label htmlFor="phoneNumber" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phoneNumber}
                                        placeholder="Enter your phone number"
                                        className={`w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : 'border-transparent'
                                            }`}
                                    />
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                        <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
                                    ) : null}
                                </div>

                                {/* Birthdate Field */}
                                <div className="mb-8">
                                    <label htmlFor="birthdate" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                        Birthdate
                                    </label>
                                    <DatePicker
                                        id="birthdate"
                                        name="birthdate"
                                        value={formik.values.birthdate}
                                        onChange={(date) => formik.setFieldValue('birthdate', date)}
                                        onBlur={formik.handleBlur}
                                        disabledDate={(current) => current && current > moment().endOf('day')}
                                        className={`w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp ${formik.touched.birthdate && formik.errors.birthdate ? 'border-red-500' : 'border-transparent'
                                            }`}
                                    />
                                    {formik.touched.birthdate && formik.errors.birthdate ? (
                                        <div className="text-red-500 text-sm">{String(formik.errors.birthdate)}</div>
                                    ) : null}
                                </div>

                                {/* Address Fields (disabled) */}
                                {address && (
                                    <>
                                        <div className="mb-8">
                                            <label htmlFor="addressLine" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                Address Line
                                            </label>
                                            <input
                                                id="addressLine"
                                                name="addressLine"
                                                type="text"
                                                value={formik.values.addressLine}
                                                className="w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                disabled
                                                style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                                            />
                                        </div>
                                        <div className="mb-8">
                                            <label htmlFor="city" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                City
                                            </label>
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                value={formik.values.city}
                                                className="w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                disabled
                                                style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                                            />
                                        </div>
                                        <div className="mb-8">
                                            <label htmlFor="state" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                State
                                            </label>
                                            <input
                                                id="state"
                                                name="state"
                                                type="text"
                                                value={formik.values.state}
                                                className="w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                disabled
                                                style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                                            />
                                        </div>
                                        <div className="mb-8">
                                            <label htmlFor="zipCode" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                Zip Code
                                            </label>
                                            <input
                                                id="zipCode"
                                                name="zipCode"
                                                type="text"
                                                value={formik.values.zipCode}
                                                className="w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                disabled
                                                style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                                            />
                                        </div>
                                    </>
                                )}

                                {/* House Number Field */}
                                <div className="mb-8">
                                    <label htmlFor="houseNumber" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                        House Number
                                    </label>
                                    <input
                                        id="houseNumber"
                                        name="houseNumber"
                                        type="text"
                                        value={formik.values.houseNumber}
                                        className="w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                        disabled
                                        style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                                    />
                                </div>

                                <div className="mb-6">
                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                                    >
                                        Update Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfilePage;