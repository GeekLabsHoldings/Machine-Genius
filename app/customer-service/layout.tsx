"use client";

// Import React and useState from React library
import React, { useState } from "react";

// Import components
import dynamic from "next/dynamic";
const SideNav = dynamic(() => import("../_components/SideNav/SideNav"), {
  ssr: false,
});
import TitleOfPage from "../_components/TitleOfPage/TitleOfPage";
// import { usePathname } from 'next/navigation';

// Array of side nav links
const sideNavLinks = [
  {
    name: "Dashboard",
    path: "/customer-service/dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
        <path d="M12.9595 19.9992C14.2241 19.9992 15.3092 19.9328 16.2158 19.7313C17.134 19.5273 17.9299 19.1716 18.5507 18.5507C19.1716 17.9299 19.5273 17.134 19.7313 16.2158C19.9328 15.3092 19.9992 14.2241 19.9992 12.9595V9.90791C19.9992 8.79323 19.0957 7.88965 17.981 7.88965H9.90791C8.79323 7.88965 7.88965 8.79323 7.88965 9.90791V17.981C7.88965 19.0957 8.79323 19.9992 9.90791 19.9992H12.9595Z" />
        <path d="M0 12.9594C0 14.224 0.0664414 15.3091 0.267945 16.2157C0.471992 17.1339 0.827701 17.9298 1.44854 18.5506C2.06938 19.1714 2.86526 19.5271 3.78339 19.7312C3.87132 19.7507 3.95969 19.769 4.04842 19.7862C5.14283 19.9976 6.0548 19.0713 6.0548 17.9566V9.90779C6.0548 8.7931 5.15119 7.88953 4.03653 7.88953H2.01827C0.903608 7.88953 0 8.7931 0 9.90779V12.9594Z" />
        <path d="M7.03965 0C5.77507 0 4.69 0.0664414 3.78333 0.267945C2.8652 0.471992 2.06932 0.827701 1.44848 1.44854C0.827639 2.06938 0.47193 2.86526 0.267883 3.78339C0.251132 3.85878 0.235369 3.93442 0.220565 4.01027C0.00422724 5.119 0.947443 6.0548 2.07707 6.0548H18.1401C19.2548 6.0548 20.1811 5.14283 19.9697 4.04842C19.9525 3.95969 19.9342 3.87132 19.9147 3.78339C19.7106 2.86526 19.3549 2.06938 18.734 1.44854C18.1132 0.827701 17.3173 0.471992 16.3992 0.267945C15.4925 0.0664414 14.4075 0 13.1429 0H7.03965Z" />
      </svg>
    ),
  },
  {
    name: "Email Inbox",
    path: "/customer-service/email-inbox",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="21"
        viewBox="0 0 23 21"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.38372 0C4.73119 0 3.23685 0.458174 2.15221 1.57545C1.05729 2.70335 0.5 4.37827 0.5 6.52703V14.473C0.5 16.6218 1.05729 18.2967 2.15221 19.4245C3.23685 20.5419 4.73119 21 6.38372 21H16.6163C18.2688 21 19.7632 20.5419 20.8477 19.4245C21.9427 18.2967 22.5 16.6218 22.5 14.473V6.52703C22.5 4.37827 21.9427 2.70335 20.8477 1.57545C19.7632 0.458174 18.2688 0 16.6163 0H6.38372ZM18.8966 6.37072C19.2319 6.08323 19.2937 5.54856 19.0345 5.17651C18.7755 4.80445 18.2935 4.7359 17.9581 5.02339L12.282 9.88884C11.8214 10.2838 11.1785 10.2838 10.7178 9.88884L5.04182 5.02339C4.70643 4.7359 4.22447 4.80445 3.96531 5.17651C3.70615 5.54856 3.76794 6.08323 4.10333 6.37072L9.7794 11.2362C10.7928 12.1049 12.2071 12.1049 13.2205 11.2362L18.8966 6.37072Z"
          fill="#FFFFFB"
        />
      </svg>
    ),
  },
  // {
  //   name: "Chat", path: "/customer-service/chat", icon: <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 25 15" fill="none">
  //   <path d="M25 5.0645V2.11167C25 0.945411 24.0546 1.8913e-09 22.8885 1.8913e-09H2.11143C0.945361 -4.88262e-05 0 0.945361 0 2.11162V5.08418C1.07212 5.23818 1.89717 6.15781 1.89717 7.27261C1.89717 8.3874 1.07212 9.30713 0 9.46074V12.4337C0 13.5996 0.945361 14.545 2.11143 14.545H22.8885C24.0545 14.545 25 13.5996 25 12.4337V9.48042C23.8268 9.42554 22.8919 8.45957 22.8919 7.27266C22.8919 6.08579 23.8269 5.11982 25 5.0645ZM5.93335 13.2127H5.20693V11.3181H5.93335V13.2127ZM5.93335 9.88403H5.20693V7.98945H5.93335V9.88403ZM5.93335 6.55547H5.20693V4.66045H5.93335V6.55547ZM5.93335 3.2269H5.20693V1.33228H5.93335V3.2269Z" fill="#FFFFFB"/>
  // </svg>
  // }
];

// Define the layout component
const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  // State variables to manage side nav and current page
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const [CurrentPage, setCurrentPage] = useState<string>("Customer Service");

  // Return the layout component
  return (
    <div className="module-layout">
      {/* Side nav wrapper */}
      <div className={`Side_Nav_Wrapper ${isSideNavOpen ? "" : "close"}`}>
        <SideNav
          isSideNavOpen={isSideNavOpen}
          setIsSideNavOpen={setIsSideNavOpen}
          setCurrentPage={setCurrentPage}
          sideNavLinks={sideNavLinks}
        />
      </div>
      {/* Main page wrapper */}
      <div className="Page_Wrapper">
        {/* Title of the current page */}
        <TitleOfPage title={CurrentPage} />
        {/* Children components */}
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};

// Export the layout component
export default layout;
