"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores/authStore";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const router = useRouter();

  // Filter menuData to hide "Packages" if not authenticated
  const filteredMenuData = menuData.filter((item) => {
    if (item.title === "Packages" && !isAuthenticated) {
      return false; // Hide Packages if not logged in
    }
    return true; // Keep all other items
  });

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    // Check authentication status when component mounts
    const token = Cookies.get('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleSubmenu = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleLogout = async () => {
    try {
      const refreshToken = Cookies.get('refresh_token');

      // Call the logout API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Logout failed: ${errorData.message || 'Unknown error'}`);
      } else {
        toast.success('Logged out successfully');
      }

      // Remove all auth-related cookies
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      Cookies.remove('email');
      Cookies.remove('houseno');

      // Update authentication state
      setIsAuthenticated(false);

      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Still proceed with client-side cleanup even if there's an error
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      Cookies.remove('email');
      Cookies.remove('houseno');
      setIsAuthenticated(false);
      router.push('/');
    }
  };

  return (
    <header className={`header top-0 left-0 z-40 flex w-full items-center bg-transparent ${sticky ? "!fixed !z-[9999] !bg-white !bg-opacity-60 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20" : "absolute"}`}>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-40 max-w-full px-4 xl:mr-12">
            <Link href={isAuthenticated ? "/package" : "/"} className={`header-logo block w-full ${sticky ? "py-5 lg:py-2" : "py-8"}`}>
              <Image src="/images/logo/logo.jpg" alt="logo" width={140} height={30} className="w-full dark:hidden" />
              <Image src="/images/logo/logo.png" alt="logo" width={140} height={30} className="hidden w-full dark:block" />
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button onClick={navbarToggleHandler} id="navbarToggler" aria-label="Mobile Menu" className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden">
                <span className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[7px] rotate-45" : ""}`} />
                <span className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? "opacity-0" : ""}`} />
                <span className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[-8px] -rotate-45" : ""}`} />
              </button>
              <nav id="navbarCollapse" className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${navbarOpen ? "visibility top-full opacity-100" : "invisible top-[120%] opacity-0"}`}>
                <ul className="block lg:flex lg:space-x-12">
                  {filteredMenuData.map((menuItem, index) => (
                    <li key={menuItem.id} className="group relative">
                      {menuItem.path ? (
                        <Link href={menuItem.path} className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}>
                          {menuItem.title}
                        </Link>
                      ) : (
                        <>
                          <a onClick={() => handleSubmenu(index)} className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0">
                            {menuItem.title}
                            <span className="pl-3">
                              <svg width="15" height="14" viewBox="0 0 15 14">
                                <path d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z" fill="currentColor" />
                              </svg>
                            </span>
                          </a>
                          <div className={`submenu relative top-full left-0 rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${openIndex === index ? "block" : "hidden"}`}>
                            {menuItem.submenu.map((submenuItem) => (
                              <Link href={submenuItem.path} key={submenuItem.id} className="block rounded py-2.5 text-sm text-dark hover:opacity-70 dark:text-white lg:px-3">
                                {submenuItem.title}
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                  {!isAuthenticated && (
                    <>
                      <li className="lg:hidden">
                        <Link href="/signin" className="flex py-2 text-base text-dark hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0">
                          Sign In
                        </Link>
                      </li>
                      <li className="lg:hidden">
                        <Link href="/signup" className="flex py-2 text-base text-dark hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0">
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                  {isAuthenticated && (
                    <li className="lg:hidden">
                      <button
                        onClick={handleLogout}
                        className="flex py-2 text-base text-dark hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                      >
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
            <div className="flex items-center justify-end pr-16 lg:pr-0">
              {!isAuthenticated ? (
                <>
                  <Link href="/signin" className="hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block">
                    Sign In
                  </Link>
                  <Link href="/signup" className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9">
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                >
                  Logout
                </button>
              )}
              {/* <div>
                <ThemeToggler />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;