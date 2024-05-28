"use client";

// Import React and useState from React library
import React, { useState } from "react";

// Import CSS styles
import styles from "./administrative.module.css";

// Import components
import dynamic from 'next/dynamic';
const SideNav = dynamic(() => import('../_components/SideNav/SideNav'), { ssr: false })
import TitleOfPage from "../_components/TitleOfPage/TitleOfPage";
// import { usePathname } from 'next/navigation';

// Define the layout component
const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  // State variables to manage side nav and current page
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const [CurrentPage, setCurrentPage] = useState<string>("Administrative");

  // Array of side nav links
  const sideNavLinks = [
    {
      name: "Dashboard",
      path: "/administrative/dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
          <path d="M12.9595 19.9992C14.2241 19.9992 15.3092 19.9328 16.2158 19.7313C17.134 19.5273 17.9299 19.1716 18.5507 18.5507C19.1716 17.9299 19.5273 17.134 19.7313 16.2158C19.9328 15.3092 19.9992 14.2241 19.9992 12.9595V9.90791C19.9992 8.79323 19.0957 7.88965 17.981 7.88965H9.90791C8.79323 7.88965 7.88965 8.79323 7.88965 9.90791V17.981C7.88965 19.0957 8.79323 19.9992 9.90791 19.9992H12.9595Z" />
          <path d="M0 12.9594C0 14.224 0.0664414 15.3091 0.267945 16.2157C0.471992 17.1339 0.827701 17.9298 1.44854 18.5506C2.06938 19.1714 2.86526 19.5271 3.78339 19.7312C3.87132 19.7507 3.95969 19.769 4.04842 19.7862C5.14283 19.9976 6.0548 19.0713 6.0548 17.9566V9.90779C6.0548 8.7931 5.15119 7.88953 4.03653 7.88953H2.01827C0.903608 7.88953 0 8.7931 0 9.90779V12.9594Z" />
          <path d="M7.03965 0C5.77507 0 4.69 0.0664414 3.78333 0.267945C2.8652 0.471992 2.06932 0.827701 1.44848 1.44854C0.827639 2.06938 0.47193 2.86526 0.267883 3.78339C0.251132 3.85878 0.235369 3.93442 0.220565 4.01027C0.00422724 5.119 0.947443 6.0548 2.07707 6.0548H18.1401C19.2548 6.0548 20.1811 5.14283 19.9697 4.04842C19.9525 3.95969 19.9342 3.87132 19.9147 3.78339C19.7106 2.86526 19.3549 2.06938 18.734 1.44854C18.1132 0.827701 17.3173 0.471992 16.3992 0.267945C15.4925 0.0664414 14.4075 0 13.1429 0H7.03965Z" />
        </svg>
      ),
    },
    {
      name: "Office Maintenance",
      path: "/administrative/office-maintenance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="27"
          viewBox="0 0 20 27"
          fill="none"
        >
          <path
            d="M16.4681 2.55047H14.3409H14.2787C13.6571 1.05454 12.189 0 10.4675 0C8.7467 0 7.27928 1.05649 6.65576 2.55047H6.59224H4.46566C3.6801 2.55047 3.04297 3.06835 3.04297 3.70613C3.04297 4.3452 3.04297 4.86178 3.04297 4.86178H17.8902V3.70613C17.8908 3.06835 17.2537 2.55047 16.4681 2.55047ZM10.4669 3.79557C9.82846 3.79557 9.31124 3.27835 9.31124 2.63992C9.31124 2.00214 9.82846 1.48362 10.4669 1.48362C11.1053 1.48362 11.6225 2.00214 11.6225 2.63992C11.6232 3.27835 11.1053 3.79557 10.4669 3.79557Z"
            fill="#2A2B2A"
          />
          <path
            d="M0 6.96831V26.969H17.4191C18.8443 26.969 20 25.8133 20 24.388V4.38672H19.0667V6.03173H1.90816V4.48718C0.810837 4.78468 0 5.77636 0 6.96831ZM2.32492 11.471C2.32492 10.8643 2.96205 10.375 3.74761 10.375H17.8903C17.8903 10.375 17.8903 10.865 17.8903 11.471C17.8903 12.0777 17.2538 12.5683 16.4682 12.5683H2.32557C2.32557 12.5683 2.32492 12.0777 2.32492 11.471ZM2.21732 14.9075C2.21732 14.1207 2.85381 13.4848 3.63937 13.4848H17.7827V16.4482C17.7827 17.2344 17.1455 17.8702 16.36 17.8702H2.21732V14.9075Z"
            fill="#2A2B2A"
          />
        </svg>
      ),
    },
    {
      name: "Ticketing",
      path: "/administrative/ticketing",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="15"
          viewBox="0 0 25 15"
          fill="none"
        >
          <path
            d="M25 5.0645V2.11167C25 0.945411 24.0546 1.8913e-09 22.8885 1.8913e-09H2.11143C0.945361 -4.88262e-05 0 0.945361 0 2.11162V5.08418C1.07212 5.23818 1.89717 6.15781 1.89717 7.27261C1.89717 8.3874 1.07212 9.30713 0 9.46074V12.4337C0 13.5996 0.945361 14.545 2.11143 14.545H22.8885C24.0545 14.545 25 13.5996 25 12.4337V9.48042C23.8268 9.42554 22.8919 8.45957 22.8919 7.27266C22.8919 6.08579 23.8269 5.11982 25 5.0645ZM5.93335 13.2127H5.20693V11.3181H5.93335V13.2127ZM5.93335 9.88403H5.20693V7.98945H5.93335V9.88403ZM5.93335 6.55547H5.20693V4.66045H5.93335V6.55547ZM5.93335 3.2269H5.20693V1.33228H5.93335V3.2269Z"
            fill="#FFFFFB"
          />
        </svg>
      ),
    },
    {
      name: "Database",
      path: "/administrative/database",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="28"
          viewBox="0 0 20 28"
          fill="none"
        >
          <path
            d="M0 0H20V3.5H0V0ZM1.36364 4.9V28H18.6364V4.9H1.36364ZM13.1818 11.2H6.36364V9.1H13.1818V11.2Z"
            fill="#FFFFFB"
          />
        </svg>
      ),
    },
  ];

  // Return the layout component
  return (
    <>
      {/* Side nav wrapper */}
      <div
        className={`${styles.Side_Nav_Wrapper} ${
          isSideNavOpen ? "" : styles.close
        }`}
      >
        <SideNav
          isSideNavOpen={isSideNavOpen}
          setIsSideNavOpen={setIsSideNavOpen}
          setCurrentPage={setCurrentPage}
          sideNavLinks={sideNavLinks}
        />
      </div>
      {/* Main page wrapper */}
      <div className={styles.Page_Wrapper}>
        {/* Title of the current page */}
        <TitleOfPage title={CurrentPage} />
        {/* Children components */}
        <div className="h-full">{children}</div>
      </div>
    </>
  );
};

// Export the layout component
export default layout;
