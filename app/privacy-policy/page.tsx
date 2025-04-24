import SectionTitle from "@/components/Common/SectionTitle";

const checkIcon = (
    <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
        <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
    </svg>
);

const PrivacyPolicyPage = () => {
    const List = ({ text, description }) => (
        <div className="mb-5">
            <p className="flex items-center text-lg font-medium text-body-color">
                <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                    {checkIcon}
                </span>
                {text}
            </p>
            <p className="ml-[46px] text-base text-body-color">{description}</p>
        </div>
    );

    return (
        <>
            <section className="pt-[150px] pb-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-8/12">
                            <div>
                                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                                    ADT Shipping Limited Privacy Policy
                                </h2>

                                <div className="mb-10">
                                    <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                                        This Privacy Policy outlines how ADT Shipping Limited collects, uses, and shares personal information when you visit https://adtshipping.com/ (the "Site").
                                    </p>

                                    <div className="wow fadeInUp mb-12 max-w-[100%] lg:mb-0" data-wow-delay=".15s">
                                        <div className="mx-[-12px] flex flex-wrap">
                                            <div className="w-full px-3 sm:w-1/2 lg:w-1/2 xl:w-1/2">
                                                <List
                                                    text="Personal Information We Collect"
                                                    description={
                                                        <>
                                                            When you visit our Site, we automatically collect information about your device, including details about your web browser, IP address, time zone, and cookies installed on your device. Additionally, as you browse the Site, we gather information about the web pages or products you view, how you navigate the Site, and what websites or search terms referred you to the Site. This data is referred to as Device Information.

                                                            We collect Device Information using the following technologies:
                                                            <ul className="list-disc pl-5 mt-2">
                                                                <li>
                                                                    <strong>Cookies:</strong> Data files placed on your device or computer, often including an anonymous unique identifier. Visit <a href="http://www.allaboutcookies.org" className="text-primary">All About Cookies</a> for more details and how to disable them.
                                                                </li>
                                                                <li><strong>Log Files:</strong> Track actions on the Site, capturing data such as IP addresses, browser types, referring/exit pages, and date/time stamps.</li>
                                                            </ul>

                                                            When you make or attempt to make a purchase on the Site, we also collect specific information, including your name, email address, phone number, delivery address, and payment information (e.g., the last four digits of your credit card number for PCI compliance). We refer to this as Order Information.

                                                            In this policy, <strong>"Personal Information"</strong> refers to both <strong>Device Information</strong> and <strong>Order Information</strong>.
                                                        </>
                                                    }
                                                />
                                                <List
                                                    text="How We Use Your Information"
                                                    description={
                                                        <>
                                                            <strong>Order Information</strong> is used to:
                                                            <ul className="list-disc pl-5 mt-2">
                                                                <li>Fulfill orders (process payments, arrange deliveries, and provide invoices or confirmations).</li>
                                                                <li>Communicate with you.</li>
                                                                <li>Screen for potential risk or fraud.</li>
                                                                <li>Provide relevant information or advertisements about our services, based on your preferences.</li>
                                                            </ul>
                                                            <strong>Device Information</strong> is used for:
                                                            <ul className="list-disc pl-5 mt-2">
                                                                <li>Monitor potential risks and fraudulent activity (e.g., using IP addresses).</li>
                                                                <li>Improve and optimize our Site through analytics, helping us understand user interactions and the success of marketing campaigns.</li>
                                                            </ul>
                                                        </>
                                                    }
                                                />
                                                <List
                                                    text="Sharing Your Personal Information"
                                                    description={
                                                        <>
                                                            We share your Personal Information only as follows:
                                                            <ul className="list-disc pl-5 mt-2">
                                                                <li>
                                                                    <strong>Analytics:</strong> We use Google Analytics to better understand customer interactions with our Site.
                                                                    Learn how Google handles your information <a href="https://www.google.com/intl/en/policies/privacy/" className="text-primary">here</a>.
                                                                    You can opt out of Google Analytics <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary">here</a>.
                                                                </li>
                                                                <li>
                                                                    <strong>With You:</strong> Personal information is shared with you as a client.
                                                                </li>
                                                                <li>
                                                                    <strong>No Third-Party Sharing:</strong> We do not share Personal Information with third-party entities outside of these specified purposes.
                                                                </li>
                                                            </ul>
                                                        </>
                                                    }
                                                />
                                            </div>

                                            <div className="w-full px-3 sm:w-1/2 lg:w-1/2 xl:w-1/2">
                                                <List
                                                    text="Behavioral Advertising"
                                                    description={
                                                        <>
                                                            We use your Personal Information to provide targeted advertisements or marketing communications that may interest you.
                                                            Learn more about targeted advertising at the
                                                            <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" className="text-primary"> Network Advertising Initiative's educational page</a>.

                                                            <ul className="list-disc pl-5 mt-2">
                                                                <li>
                                                                    <strong>Facebook:</strong> Manage your ad settings
                                                                    <a href="https://www.facebook.com/settings/?tab=ads" className="text-primary"> here</a>.
                                                                </li>
                                                                <li>
                                                                    <strong>Google:</strong> Manage your ad preferences
                                                                    <a href="https://www.google.com/settings/ads/anonymous" className="text-primary"> here</a>.
                                                                </li>
                                                                <li>
                                                                    <strong>Bing:</strong> Manage personalized ads
                                                                    <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" className="text-primary"> here</a>.
                                                                </li>
                                                                <li>
                                                                    <strong>Opt-Out Portal:</strong> You can visit the
                                                                    <a href="http://optout.aboutads.info/" className="text-primary"> Digital Advertising Alliance's opt-out portal</a> to opt out of certain services.
                                                                </li>
                                                            </ul>
                                                        </>
                                                    }
                                                />
                                                <List
                                                    text="Data Retention"
                                                    description="We will retain your Order Information for our records unless and until you request its deletion."
                                                />
                                                <List
                                                    text="Changes to This Policy"
                                                    description="This Privacy Policy may be updated periodically to reflect changes to our practices, legal requirements, or other operational needs. Updates will be posted on this page."
                                                />
                                                <div className="mt-8 rounded-md bg-primary bg-opacity-10 p-6">
                                                    <h3 className="mb-3 text-xl font-semibold text-primary">Contact Us</h3>
                                                    <p className="text-base text-body-color">
                                                        For inquiries, reach out via email at <a href="mailto:contact@adtshipping.com" className="text-primary">contact@adtshipping.com</a> or call us at (876) 250-5681.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PrivacyPolicyPage;