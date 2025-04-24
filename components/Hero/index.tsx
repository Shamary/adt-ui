'use client';

import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";


const Hero = () => {
  const router = useRouter();

  return (
    <>
<section
  id="home"
  className="relative z-10 overflow-hidden pt-[60px] pb-8 md:pt-[75px] md:pb-[30px] xl:pt-[90px] xl:pb-[40px] 2xl:pt-[95px] 2xl:pb-[30px]"
>


        <div className="container mx-auto px-4 py-10">
          {/* Flex container for heading and image */}
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Left Column: Heading */}
            <div className="md:w-1/4 flex items-center mt-8">
            <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">

                <span className="text-white font-extrabold">A</span>LWAYS <br /><br />
                <span className="text-white font-extrabold">D</span>ELIVER <br /><br />
                on <span className="text-white font-extrabold">T</span>IME
              </h1>
            </div>

            {/* Right Column: Image */}
            <div className="md:w-1/2 flex mt-8">
              <Image
                src="/images/hero/hero1.png"
                alt="Shipping Illustration"
                width={650}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Text and Button below */}
          <div className="text-left mt-6 md:mt-10">
            <p className="mb-6 text-base font-medium text-white sm:text-lg md:text-xl">
              Experience the simplest and most reliable way to import your packages from the US to Jamaica.
              Sign up today to get your personalized US shipping address and start shipping hassle-free!
            </p>
            <button onClick={() => router.push('/signup')} className="inline-block rounded-md mt-5 bg-yellow py-3 px-6 text-white text-lg font-semibold transition hover:bg-yellow-600 shadow-lg">
              Sign Up For Free
            </button>
          </div>
        </div>
        <div className="container">
  <div className="border-b border-white/[.15] dark:border-white/[.15] my-10" />
</div>


<div className="w-full max-w-6xl mx-auto text-center">
<h1 className="text-5xl md:text-6xl font-bold text-white mt-6 px-4">
How It Works
</h1>

</div>
        <div className="w-full py-12">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 text-center">
    {/* Step 1 */}
    <div className="bg-white text-black p-6 rounded-lg shadow-md">
      <img src="/images/hero/signup.png" alt="Sign Up" className="mx-auto h-20 mb-4" />
            <h2 className="text-4xl font-bold mb-2">1</h2>
      <h3 className="text-2xl font-bold mb-2">Sign Up</h3>
      <p className="text-md">
        Get started with ADT today and enjoy your free personalized US shipping
        address along with a unique mailbox number tailored just for you!
      </p>
    </div>

    {/* Step 2 */}
    <div className="bg-white text-black p-6 rounded-lg shadow-md">
      <img src="/images/hero/shopping-cart.png" alt="Shop" className="mx-auto h-20 mb-4" />
      <h2 className="text-4xl font-bold mb-2">2</h2>
      <h3 className="text-2xl font-bold mb-2">Shop</h3>
      <p className="text-md">
        Shop from stores anywhere in the world and have your purchases delivered
        to your personal ADT address — or let your friends and family send
        packages straight to your secure ADT mailbox.
      </p>
    </div>

    {/* Step 3 */}
    <div className="bg-white text-black p-6 rounded-lg shadow-md">
      <img src="/images/hero/receiving.png" alt="Received" className="mx-auto h-20 mb-4" />
            <h2 className="text-4xl font-bold mb-2">3</h2>
      <h3 className="text-2xl font-bold mb-2">Received</h3>
      <p className="text-md">
        ADT receives your packages at our US warehouse and promptly notifies you,
        allowing you to upload your invoice with ease.
      </p>
    </div>

    {/* Step 4 */}
    <div className="bg-white text-black p-6 rounded-lg shadow-md">
      <img src="/images/hero/delivery-truck.png" alt="Delivery" className="mx-auto h-20 mb-4" />
      
      <h2 className="text-4xl font-bold mb-2">4</h2>
      <h3 className="text-2xl font-bold mb-2">Delivery</h3>
      <p className="text-md">
        You will be notified once your package is ready. Then, click the link
        provided to schedule your delivery at your convenience.
      </p>
    </div>
  </div>
</div>
<div className="text-center"><button onClick={() => router.push('/signup')} className="inline-block rounded-md mt-5 bg-yellow py-3 px-6 text-white text-lg font-semibold transition hover:bg-yellow-600 shadow-lg">
              Sign Up Now
            </button></div>


        <div className="container">
  <div className="border-b border-white/[.15] dark:border-white/[.15] my-10" />
</div>



        <div className="w-full max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mt-6 px-4">
  No Credit Card? No Problem!
</h1>

</div>
<div className="w-full max-w-[100rem] mx-auto mt-6">
  <Image
    src="/images/hero/hero2.jpg"
    alt="Full Width Image"
    width={4096}
    height={1048}
    className="w-full object-cover"
  />
</div>
<div className="w-full max-w-6xl mx-auto text-center">
  <p className="text-3xl md:text-3xl text-white mt-4">
    Contact us, and we&apos;ll facilitate your purchase with our credit card.
    Convenient and hassle-free shopping made easy!
  </p>
</div>
<div className="container">
  <div className="border-b border-white/[.15] dark:border-white/[.15] my-10" />
</div>


        <div className="absolute top-0 right-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            />
            <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;
