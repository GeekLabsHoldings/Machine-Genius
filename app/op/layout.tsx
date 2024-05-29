'use client'

// Import React and useState from React library
import React, { useState } from 'react';

// Import CSS styles
import styles from './seo.module.css';

// Import components
import dynamic from 'next/dynamic';
const SideNav = dynamic(() => import('../_components/SideNav/SideNav'), { ssr: false })
import TitleOfPage from '../_components/TitleOfPage/TitleOfPage';
// import { usePathname } from 'next/navigation';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define the layout component
const layout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {

  // State variables to manage side nav and current page
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const [CurrentPage, setCurrentPage] = useState<string>('Customer Service'); 

  // Array of side nav links
  const sideNavLinks = [
    {
      name: "Dashboard", path: "/op/dashboard", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
        <path d="M12.9595 19.9992C14.2241 19.9992 15.3092 19.9328 16.2158 19.7313C17.134 19.5273 17.9299 19.1716 18.5507 18.5507C19.1716 17.9299 19.5273 17.134 19.7313 16.2158C19.9328 15.3092 19.9992 14.2241 19.9992 12.9595V9.90791C19.9992 8.79323 19.0957 7.88965 17.981 7.88965H9.90791C8.79323 7.88965 7.88965 8.79323 7.88965 9.90791V17.981C7.88965 19.0957 8.79323 19.9992 9.90791 19.9992H12.9595Z" />
        <path d="M0 12.9594C0 14.224 0.0664414 15.3091 0.267945 16.2157C0.471992 17.1339 0.827701 17.9298 1.44854 18.5506C2.06938 19.1714 2.86526 19.5271 3.78339 19.7312C3.87132 19.7507 3.95969 19.769 4.04842 19.7862C5.14283 19.9976 6.0548 19.0713 6.0548 17.9566V9.90779C6.0548 8.7931 5.15119 7.88953 4.03653 7.88953H2.01827C0.903608 7.88953 0 8.7931 0 9.90779V12.9594Z" />
        <path d="M7.03965 0C5.77507 0 4.69 0.0664414 3.78333 0.267945C2.8652 0.471992 2.06932 0.827701 1.44848 1.44854C0.827639 2.06938 0.47193 2.86526 0.267883 3.78339C0.251132 3.85878 0.235369 3.93442 0.220565 4.01027C0.00422724 5.119 0.947443 6.0548 2.07707 6.0548H18.1401C19.2548 6.0548 20.1811 5.14283 19.9697 4.04842C19.9525 3.95969 19.9342 3.87132 19.9147 3.78339C19.7106 2.86526 19.3549 2.06938 18.734 1.44854C18.1132 0.827701 17.3173 0.471992 16.3992 0.267945C15.4925 0.0664414 14.4075 0 13.1429 0H7.03965Z" />
      </svg>
    },
    {
      name: "Brands", path: "/op/brands", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.88372 0C4.23119 0 2.73685 0.458174 1.65221 1.57545C0.557286 2.70335 0 4.37827 0 6.52703V14.473C0 16.6218 0.557286 18.2967 1.65221 19.4245C2.73685 20.5419 4.23119 21 5.88372 21H16.1163C17.7688 21 19.2632 20.5419 20.3477 19.4245C21.4427 18.2967 22 16.6218 22 14.473V6.52703C22 4.37827 21.4427 2.70335 20.3477 1.57545C19.2632 0.458174 17.7688 0 16.1163 0H5.88372ZM18.3966 6.37072C18.7319 6.08323 18.7937 5.54856 18.5345 5.17651C18.2755 4.80445 17.7935 4.7359 17.4581 5.02339L11.782 9.88884C11.3214 10.2838 10.6785 10.2838 10.2178 9.88884L4.54182 5.02339C4.20643 4.7359 3.72447 4.80445 3.46531 5.17651C3.20615 5.54856 3.26794 6.08323 3.60333 6.37072L9.2794 11.2362C10.2928 12.1049 11.7071 12.1049 12.7205 11.2362L18.3966 6.37072Z" fill="#FFFFFB"/>
    </svg>
    },
    {
      name: "Analytics", path: "/op/analytics", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
      <path d="M1.0999 0.986735C-1.1 5.48622 0.15048 12.8635 5.6504 16.0779C4.43197 17.0574 2.2 18.3428 0 18.9855C4.95 21.557 9.89999 22.1998 14.85 17.7C18.6068 14.2849 19.4334 8.27195 19.25 5.48634L22 1.62979H18.15C16.5 -0.299098 14.8741 -0.206993 13.2 0.344063C11.2463 0.987146 10.2226 3.35624 10.45 6.12916C7.15001 6.77169 3.85 4.20057 1.0999 0.986735Z" fill="#FFFFFB"/>
      <path d="M10.0997 6.26842C9.24173 8.79858 3.73622 4.19852 1.09072 1.58222C-1.79678 6.65412 2.31172 12.7481 2.79022 13.5388C3.17302 14.1713 4.56672 15.9365 5.21572 16.7401L1.09072 19.2857C2.18522 19.8321 5.73382 20.7474 11.1722 20.0378C16.6106 19.3281 18.9052 9.93253 19.3727 5.32347L21.5177 1.94863C20.4507 1.92934 18.2903 1.82906 18.1847 1.58222C18.0527 1.27366 16.2872 0.65655 13.9772 0.502271C11.6672 0.347993 11.1722 3.10572 10.0997 6.26842Z" fill="#FFFFFB"/>
    </svg>
    },
    {
      name: "KPIs", path: "/op/kpis", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
      <rect width="9.44373" height="9.01447" rx="1" fill="#FFFFFB"/>
      <rect y="11.9863" width="9.44373" height="9.01447" rx="1" fill="#FFFFFB"/>
      <rect x="12.5547" width="9.44373" height="9.01447" rx="1" fill="#FFFFFB"/>
      <rect x="12.5547" y="11.9863" width="9.44373" height="9.01447" rx="1" fill="#FFFFFB"/>
    </svg>
    },
    {
      name: "Email Creation", path: "/op/email-creation", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.375 14H14.4375V4.2H12.375V14ZM20.625 0L15.8125 3.26689V14.9331L20.625 18.2C21.384 18.2 22 17.5728 22 16.8V1.4C22 0.6272 21.384 0 20.625 0ZM0 9.1C0 11.7131 1.76069 13.4036 4.13806 13.867L4.125 14V19.6C4.125 20.3728 4.741 21 5.5 21H7.5625C8.3215 21 8.9375 20.3728 8.9375 19.6V14H11V4.2H5.5C2.46262 4.2 0 6.0074 0 9.1Z" fill="#FFFFFB"/>
    </svg>
    },
    {
      name: "System Notifications", path: "/op/system-notifications", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
      <path d="M9.12195 2.56098C9.56647 2.56098 9.92683 2.90495 9.92683 3.32927V11.5244H18.5122C18.9197 11.5244 19.2564 11.8134 19.3097 12.1884L19.3171 12.2927C19.3171 17.3845 14.9928 21 9.65854 21C4.32427 21 0 16.8723 0 11.7805C0 6.68869 3.78769 2.56098 9.12195 2.56098ZM12.3415 0C17.6757 0 22 4.12772 22 9.21951C22 9.64383 21.6396 9.9878 21.1951 9.9878H12.3415C11.8969 9.9878 11.5366 9.64383 11.5366 9.21951V0.768293C11.5366 0.343976 11.8969 0 12.3415 0Z" fill="#FFFFFB"/>
    </svg>
    }
  ]

  // Return the layout component
  return (
    <>
      {/* Side nav wrapper */}
      <div className={`${styles.Side_Nav_Wrapper} ${isSideNavOpen ? '' : styles.close}`}>
        <SideNav isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} setCurrentPage={setCurrentPage} sideNavLinks={sideNavLinks} />
      </div>
      {/* Main page wrapper */}
      <div className={styles.Page_Wrapper}>
        {/* Title of the current page */}
        <TitleOfPage title={CurrentPage} />
        {/* Children components */}
        <div className='h-full'>
          {children}
        </div>
      </div>
    </>
  )
}

// Export the layout component
export default layout;