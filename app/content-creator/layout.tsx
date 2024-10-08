"use client";
// Import necessary dependencies
import React, { useState } from "react";
import dynamic from "next/dynamic";
const SideNav = dynamic(() => import("../_components/SideNav/SideNav"), {
  ssr: false,
}); // Importing the SideNav component

const TitleOfPage = dynamic(
  () => import("../_components/TitleOfPage/TitleOfPage"),
  {
    ssr: false,
  }
); // Importing the TitleOfPage component

import ContentCreatorContextProvider from "../_context/contentCreatorContext";
// import { usePathname } from 'next/navigation';

  // Array containing navigation links for the side navigation bar
  const sideNavLinks = [
    // Each object represents a link with its name, path, and icon
    {
      name: "Dashboard",
      path: "/content-creator/dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
          <path d="M12.9595 19.9992C14.2241 19.9992 15.3092 19.9328 16.2158 19.7313C17.134 19.5273 17.9299 19.1716 18.5507 18.5507C19.1716 17.9299 19.5273 17.134 19.7313 16.2158C19.9328 15.3092 19.9992 14.2241 19.9992 12.9595V9.90791C19.9992 8.79323 19.0957 7.88965 17.981 7.88965H9.90791C8.79323 7.88965 7.88965 8.79323 7.88965 9.90791V17.981C7.88965 19.0957 8.79323 19.9992 9.90791 19.9992H12.9595Z" />
          <path d="M0 12.9594C0 14.224 0.0664414 15.3091 0.267945 16.2157C0.471992 17.1339 0.827701 17.9298 1.44854 18.5506C2.06938 19.1714 2.86526 19.5271 3.78339 19.7312C3.87132 19.7507 3.95969 19.769 4.04842 19.7862C5.14283 19.9976 6.0548 19.0713 6.0548 17.9566V9.90779C6.0548 8.7931 5.15119 7.88953 4.03653 7.88953H2.01827C0.903608 7.88953 0 8.7931 0 9.90779V12.9594Z" />
          <path d="M7.03965 0C5.77507 0 4.69 0.0664414 3.78333 0.267945C2.8652 0.471992 2.06932 0.827701 1.44848 1.44854C0.827639 2.06938 0.47193 2.86526 0.267883 3.78339C0.251132 3.85878 0.235369 3.93442 0.220565 4.01027C0.00422724 5.119 0.947443 6.0548 2.07707 6.0548H18.1401C19.2548 6.0548 20.1811 5.14283 19.9697 4.04842C19.9525 3.95969 19.9342 3.87132 19.9147 3.78339C19.7106 2.86526 19.3549 2.06938 18.734 1.44854C18.1132 0.827701 17.3173 0.471992 16.3992 0.267945C15.4925 0.0664414 14.4075 0 13.1429 0H7.03965Z" />
        </svg>
      ),
    },
    {
      name: "Create",
      path: "/content-creator/create",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21" fill="none">
          <path
            d="M19.6338 5.36608L14.6338 0.366092C14.1457 -0.122031 13.3545 -0.122031 12.8663 0.366092C12.3782 0.854216 12.3782 1.64546 12.8663 2.13359L17.8663 7.13357C18.1104 7.37763 18.4304 7.49982 18.7501 7.49982C19.0698 7.49982 19.3898 7.37763 19.6338 7.13357C20.1222 6.64545 20.1222 5.8542 19.6338 5.36608Z"
            fill="#2A2B2A"
          />
          <path
            d="M10.8837 3.46964C10.6493 3.23527 10.3318 3.10339 9.99996 3.10339H3.74999C3.13843 3.10339 2.61718 3.54527 2.51718 4.14839L0 18.7283L6.34279 12.493C6.28904 12.2881 6.24998 12.0756 6.24998 11.8534C6.24998 10.4752 7.37185 9.35337 8.74997 9.35337C10.1281 9.35337 11.25 10.4752 11.25 11.8534C11.25 13.2315 10.1281 14.3534 8.74997 14.3534C8.52778 14.3534 8.31653 14.3143 8.11028 14.2605L1.87499 20.6033L16.4549 18.0862C17.0581 17.9862 17.4999 17.4649 17.4999 16.8533V10.6034C17.4999 10.2715 17.3681 9.954 17.1337 9.71962L10.8837 3.46964Z"
            fill="#2A2B2A"
          />
        </svg>
      ),
    },
    {
      name: "Calendar",
      path: "/content-creator/calender",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 23" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.33333 12.9165H10.6667V11.5832H9.33333V12.9165ZM9.33333 18.2498H10.6667V16.9165H9.33333V18.2498ZM14.6667 12.9165H16V11.5832H14.6667V12.9165ZM14.6667 18.2498H16V16.9165H14.6667V18.2498ZM4 18.2498H5.33333V16.9165H4V18.2498ZM18.6667 6.24984H1.33333V4.9165C1.33333 4.1805 1.93067 3.58317 2.66667 3.58317H5.33333V4.24984C5.33333 4.6185 5.63133 4.9165 6 4.9165C6.36867 4.9165 6.66667 4.6185 6.66667 4.24984V3.58317H13.3333V4.24984C13.3333 4.6185 13.6313 4.9165 14 4.9165C14.3687 4.9165 14.6667 4.6185 14.6667 4.24984V3.58317H17.3333C18.0693 3.58317 18.6667 4.1805 18.6667 4.9165V6.24984ZM17.3333 12.9165C17.3333 13.6525 16.736 14.2498 16 14.2498H14.6667C13.9307 14.2498 13.3333 13.6525 13.3333 12.9165V11.5832C13.3333 10.8472 13.9307 10.2498 14.6667 10.2498H16C16.736 10.2498 17.3333 10.8472 17.3333 11.5832V12.9165ZM17.3333 18.2498C17.3333 18.9858 16.736 19.5832 16 19.5832H14.6667C13.9307 19.5832 13.3333 18.9858 13.3333 18.2498V16.9165C13.3333 16.1805 13.9307 15.5832 14.6667 15.5832H16C16.736 15.5832 17.3333 16.1805 17.3333 16.9165V18.2498ZM12 12.9165C12 13.6525 11.4027 14.2498 10.6667 14.2498H9.33333C8.59733 14.2498 8 13.6525 8 12.9165V11.5832C8 10.8472 8.59733 10.2498 9.33333 10.2498H10.6667C11.4027 10.2498 12 10.8472 12 11.5832V12.9165ZM12 18.2498C12 18.9858 11.4027 19.5832 10.6667 19.5832H9.33333C8.59733 19.5832 8 18.9858 8 18.2498V16.9165C8 16.1805 8.59733 15.5832 9.33333 15.5832H10.6667C11.4027 15.5832 12 16.1805 12 16.9165V18.2498ZM6.66667 12.9165C6.66667 13.6525 6.06933 14.2498 5.33333 14.2498H4C3.264 14.2498 2.66667 13.6525 2.66667 12.9165V11.5832C2.66667 10.8472 3.264 10.2498 4 10.2498H5.33333C6.06933 10.2498 6.66667 10.8472 6.66667 11.5832V12.9165ZM6.66667 18.2498C6.66667 18.9858 6.06933 19.5832 5.33333 19.5832H4C3.264 19.5832 2.66667 18.9858 2.66667 18.2498V16.9165C2.66667 16.1805 3.264 15.5832 4 15.5832H5.33333C6.06933 15.5832 6.66667 16.1805 6.66667 16.9165V18.2498ZM17.3333 2.24984H14.6667V1.58317C14.6667 1.21517 14.3687 0.916504 14 0.916504C13.6313 0.916504 13.3333 1.21517 13.3333 1.58317V2.24984H6.66667V1.58317C6.66667 1.21517 6.36867 0.916504 6 0.916504C5.63133 0.916504 5.33333 1.21517 5.33333 1.58317V2.24984H2.66667C1.194 2.24984 0 3.44384 0 4.9165V19.5832C0 21.0558 1.194 22.2498 2.66667 22.2498H17.3333C18.806 22.2498 20 21.0558 20 19.5832V4.9165C20 3.44384 18.806 2.24984 17.3333 2.24984ZM4 12.9165H5.33333V11.5832H4V12.9165Z"
          />
        </svg>
      ),
    },
    {
      name: "Article Database",
      path: "/content-creator/article-database",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" fill="none">
          <path d="M0 0.583252H20V2.83325H0V0.583252ZM1.36364 3.73325V18.5833H18.6364V3.73325H1.36364ZM13.1818 7.78325H6.36364V6.43325H13.1818V7.78325Z" />
        </svg>
      ),
    },
    {
      name: "Request Hiring",
      path: "/content-creator/request-hiring",
      icon: (
        <svg viewBox="0 0 24 24" fill="white">
          <path
            className="w-[--30px] h-[--30px]"
            fillRule="evenodd"
            d="M7.5 1.75C7.5.784 8.284 0 9.25 0h5.5c.966 0 1.75.784 1.75 1.75V4h4.75c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0121.25 22H2.75A1.75 1.75 0 011 20.25V5.75C1 4.784 1.784 4 2.75 4H7.5V1.75zm-5 10.24v8.26c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25v-8.26A4.233 4.233 0 0118.75 13H5.25a4.233 4.233 0 01-2.75-1.01zm19-3.24a2.75 2.75 0 01-2.75 2.75H5.25A2.75 2.75 0 012.5 8.75v-3a.25.25 0 01.25-.25h18.5a.25.25 0 01.25.25v3zm-6.5-7V4H9V1.75a.25.25 0 01.25-.25h5.5a.25.25 0 01.25.25z"
          />
        </svg>
      ),
    },
  ];

// Define a layout component
const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  // get path from usePathname hook from next/navigation
  // const path = usePathname();

  // State variables to manage side nav and current page
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const [CurrentPage, setCurrentPage] = useState<string>("Content Creator");

  // path.split('/')[2].charAt(0).toUpperCase() + path.split('/')[2].slice(1)



  // Return the layout structure
  return (
    <div className="module-layout">
      {/* Side navigation wrapper */}
      <div className={`Side_Nav_Wrapper ${isSideNavOpen ? "" : "close"}`}>
        {/* Render the SideNav component */}
        <SideNav
          isSideNavOpen={isSideNavOpen}
          setIsSideNavOpen={setIsSideNavOpen}
          setCurrentPage={setCurrentPage}
          sideNavLinks={sideNavLinks}
        />
      </div>
      {/* Main page wrapper */}
      <div className="Page_Wrapper">
        {/* Render the title of the current page */}
        <TitleOfPage title={CurrentPage} />
        {/* Render the children components */}
        <div className="h-full">
          <ContentCreatorContextProvider>
            {children}
          </ContentCreatorContextProvider>
        </div>
      </div>
    </div>
  );
};

export default layout; // Export the layout component
