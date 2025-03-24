'use client';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design CSS
import moment from 'moment';
import Cookies from 'js-cookie';

const UserProfilePage = () => {
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState<{ line1: string; city: string; state: string; zipCode: string; houseNumber: string } | null>(null);
    const [houseNo, SetHouseNo] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Fetch email from cookie and active address from the backend on page load
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get email from cookie
                const userEmail = Cookies.get('email');
                if (userEmail) {
                    setEmail(userEmail);
                }

                const houseNo = Cookies.get('houseno');
                if (houseNo) {
                    SetHouseNo(houseNo);
                }

                const token = Cookies.get('access_token');

                // Fetch active address
                const addressResponse = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/address/active`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (addressResponse.ok) {
                    const addressData = await addressResponse.json();
                    setAddress(addressData);
                } else {
                    console.error('Failed to fetch active address');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: email,
            phoneNumber: '',
            birthdate: null as moment.Moment | null,
            addressLine: address?.line1 || '',
            city: address?.city || 'Miami',
            state: address?.state || 'FL',
            zipCode: address?.zipCode || '33206-3206',
            houseNumber: houseNo || '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phoneNumber: Yup.string()
                .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
                .required('Phone number is required'),
            birthdate: Yup.date()
                .required('Birthdate is required')
                .max(new Date(), 'Birthdate cannot be in the future'),
            addressLine: Yup.string().required('Address line is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            zipCode: Yup.string()
                .matches(/^\d{5}(-\d{4})?$/, 'Invalid zip code')
                .required('Zip code is required'),
            houseNumber: Yup.string().required('House number is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/update-profile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...values,
                        birthdate: values.birthdate ? values.birthdate.toDate() : null, // Convert moment to Date
                    }),
                });

                if (response.ok) {
                    alert('Profile updated successfully!');
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while updating the profile.');
            }
        },
        enableReinitialize: true, // Allow formik to reinitialize when initialValues change
    });

    if (isLoading) {
        return <div>Loading...</div>;
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
                                        style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }} // Greyed out style
                                    />
                                </div>
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
                                        disabledDate={(current) => current && current > moment().endOf('day')} // Disable future dates
                                        className={`w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp ${formik.touched.birthdate && formik.errors.birthdate ? 'border-red-500' : 'border-transparent'
                                            }`}
                                    />
                                    {formik.touched.birthdate && formik.errors.birthdate ? (
                                        <div className="text-red-500 text-sm">{String(formik.errors.birthdate)}</div>
                                    ) : null}
                                </div>
                                <div className="mb-8">
                                    <label htmlFor="addressLine" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                        Address Line
                                    </label>
                                    <input
                                        id="addressLine"
                                        name="addressLine"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.addressLine}
                                        placeholder="Enter your address"
                                        className={`w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp ${formik.touched.addressLine && formik.errors.addressLine ? 'border-red-500' : 'border-transparent'
                                            }`}
                                        disabled // Disable the field
                                        style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }} // Greyed out style
                                    />
                                    {formik.touched.addressLine && formik.errors.addressLine ? (
                                        <div className="text-red-500 text-sm">{formik.errors.addressLine}</div>
                                    ) : null}
                                </div>
                                <div className="mb-8">
                                    <label htmlFor="city" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.city}
                                        placeholder="Enter your city"
                                        className={`w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp ${formik.touched.city && formik.errors.city ? 'border-red-500' : 'border-transparent'
                                            }`}
                                        disabled // Disable the field
                                        style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }} // Greyed out style
                                    />
                                    {formik.touched.city && formik.errors.city ? (
                                        <div className="text-red-500 text-sm">{formik.errors.city}</div>
                                    ) : null}
                                </div>
                                <div className="mb-8">
                                    <label htmlFor="state" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                        State
                                    </label>
                                    <input
                                        id="state"
                                        name="state"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.state}
                                        placeholder="Enter your state"
                                        className={`w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp ${formik.touched.state && formik.errors.state ? 'border-red-500' : 'border-transparent'
                                            }`}
                                        disabled // Disable the field
                                        style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }} // Greyed out style
                                    />
                                    {formik.touched.state && formik.errors.state ? (
                                        <div className="text-red-500 text-sm">{formik.errors.state}</div>
                                    ) : null}
                                </div>
                                <div className="mb-8">
                                    <label htmlFor="zipCode" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                        Zip Code
                                    </label>
                                    <input
                                        id="zipCode"
                                        name="zipCode"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.zipCode}
                                        placeholder="Enter your zip code"
                                        className={`w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp ${formik.touched.zipCode && formik.errors.zipCode ? 'border-red-500' : 'border-transparent'
                                            }`}
                                        disabled // Disable the field
                                        style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }} // Greyed out style
                                    />
                                    {formik.touched.zipCode && formik.errors.zipCode ? (
                                        <div className="text-red-500 text-sm">{formik.errors.zipCode}</div>
                                    ) : null}
                                </div>
                                <div className="mb-8">
                                    <label htmlFor="houseNumber" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                        House Number
                                    </label>
                                    <input
                                        id="houseNumber"
                                        name="houseNumber"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.houseNumber}
                                        placeholder="Enter your house number"
                                        className={`w-full rounded-md border py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp ${formik.touched.houseNumber && formik.errors.houseNumber ? 'border-red-500' : 'border-transparent'
                                            }`}
                                        disabled // Disable the field
                                        style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }} // Greyed out style
                                    />
                                    {formik.touched.houseNumber && formik.errors.houseNumber ? (
                                        <div className="text-red-500 text-sm">{formik.errors.houseNumber}</div>
                                    ) : null}
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