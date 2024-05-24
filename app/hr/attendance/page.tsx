"use client";
import AttendanceTable from "@/app/_components/HR/02Attendance/AttendanceTable";
import NotificationsAttendanceGrid from "@/app/_components/HR/02Attendance/NotificationsAttendanceGrid";
import React, { useEffect, useState } from "react";
import styles from "./attendance.module.css";

export default function page() {
  const [activeTab, setActiveTab] = useState<number>(1);

  const [fillColorLeft, setFillColorLeft] = useState("#D9D9D9");
  const [fillColorRight, setFillColorRight] = useState("#2A2B2A");

  const leftArrow = (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.5059 23.9434C16.9213 23.529 16.9213 22.8565 16.5059 22.441L12.1274 18.0625L23.375 18.0625C23.9594 18.0625 24.4375 17.5865 24.4375 17C24.4375 16.4124 23.9594 15.9375 23.375 15.9375L12.1274 15.9375L16.5059 11.559C16.9213 11.1435 16.9213 10.4699 16.5059 10.0566C16.0926 9.64115 15.419 9.64115 15.0035 10.0566L8.99409 16.066C8.73909 16.321 8.65939 16.6696 8.71783 17C8.65939 17.3304 8.73909 17.679 8.99409 17.934L15.0035 23.9434C15.419 24.3588 16.0926 24.3588 16.5059 23.9434ZM1.30041e-06 29.75L1.85773e-07 4.25C8.318e-08 1.90294 1.90294 -8.318e-08 4.25 -1.85773e-07L29.75 -1.30041e-06C32.0981 -1.40305e-06 34 1.90294 34 4.25L34 29.75C34 32.0971 32.0981 34 29.75 34L4.25 34C1.90294 34 1.40301e-06 32.0971 1.30041e-06 29.75Z"
        fill={fillColorLeft}
      />
    </svg>
  );

  const rightArrow = (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.4941 23.9434C17.0787 23.529 17.0787 22.8565 17.4941 22.441L21.8726 18.0625L10.625 18.0625C10.0406 18.0625 9.5625 17.5865 9.5625 17C9.5625 16.4124 10.0406 15.9375 10.625 15.9375L21.8726 15.9375L17.4941 11.559C17.0787 11.1435 17.0787 10.4699 17.4941 10.0566C17.9074 9.64115 18.581 9.64115 18.9965 10.0566L25.0059 16.066C25.2609 16.321 25.3406 16.6696 25.2822 17C25.3406 17.3304 25.2609 17.679 25.0059 17.934L18.9965 23.9434C18.581 24.3588 17.9074 24.3588 17.4941 23.9434ZM34 29.75L34 4.25C34 1.90294 32.0971 -8.318e-08 29.75 -1.85773e-07L4.25 -1.30041e-06C1.90187 -1.40305e-06 -8.318e-08 1.90294 -1.85773e-07 4.25L-1.30041e-06 29.75C-1.40301e-06 32.0971 1.90187 34 4.25 34L29.75 34C32.0971 34 34 32.0971 34 29.75Z"
        fill={fillColorRight}
      />
    </svg>
  );

  function slideRight() {
    const table = document.getElementById("table") as HTMLTableElement | null;
    if (table) {
      table.scrollLeft += 150;
    } else {
      console.error("Failed to find table with ID 'table'");
    }
  }

  function slideLeft() {
    const table = document.getElementById("table") as HTMLTableElement | null;
    if (table) {
      table.scrollLeft -= 150;
    } else {
      console.error("Failed to find table with ID 'table'");
    }
  }

  function updateFillColor() {
    const table = document.getElementById("table") as HTMLTableElement | null;
    if (table) {
      // Check if the user can slide right (i.e., not at the far right)
      if (table.scrollLeft + table.clientWidth < table.scrollWidth) {
        setFillColorRight("#2A2B2A"); // Enable right arrow
      } else {
        setFillColorRight("#D9D9D9"); // Disable right arrow
      }

      // Check if the user can slide left (i.e., not at the far left)
      if (table.scrollLeft > 0) {
        setFillColorLeft("#2A2B2A"); // Enable left arrow
      } else {
        setFillColorLeft("#D9D9D9"); // Disable left arrow
      }
    }
  }

  useEffect(() => {
    const table = document.getElementById("table") as HTMLTableElement | null;
    table?.addEventListener("scroll", updateFillColor);
    return () => {
      table?.removeEventListener("scroll", updateFillColor);
    };
  }, []);

  return (
    <section className={`${styles.attendance}`}>

      {/* Container */}
      <div>
        {/* Tabs */}
        <div role="tablist" className={`${styles.tabs} flex`}>
          <a
            role="tab"
            className={`${styles.tab} ${
              activeTab === 1 ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            Today’s Attendance
          </a>
          <a
            role="tab"
            className={`${styles.tab} ${
              activeTab === 2 ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(2)}
          >
            Attendance Database
          </a>
          <a
            role="tab"
            className={`${styles.tab} ${
              activeTab === 3 ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(3)}
          >
            Notifications
          </a>
        </div>

        {/* 1. Tab 1 Content */}
        {activeTab === 1 && (
          <div className={`${styles.tab1}`}>
          <div className={`${styles.tabHeader} my-[25px] flex justify-between`}>
            <p>These are all the hiring requests and unfinished hiring processes, requested by team managers and approved by OP ( Operation Manager).<br/>Make sure to go through every request in detail to find and hire the best candidate for the requested role!</p>

            {/* BUTTON HERE */}
            <div className="flex gap-2">
              <div
                className="cursor-pointer"
                onClick={() => {
                  slideLeft();
                }}
              >
                {leftArrow}
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  slideRight();
                }}
              >
                {rightArrow}
              </div>
            </div>
          </div>

            {/* Today’s Attendance Table */}
            <AttendanceTable />
          </div>
        )}

        {/* Tab 2 Content */}
        {activeTab === 2 && (
          <div className={`${styles.tab2}`}>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-[0.3vw] my-[43px] w-[393px]">
                <h3 className={`${styles.cardsTitle}`}>Cleaning Supplies</h3>
                {/* <CustomSelectInput label="Weekly" options={annualOptions} /> */}
              </div>

              {/* <CustomBtn
                btnColor="white"
                word="Receipts Database"
                style={{ minWidth: "188px" }}
              /> */}
            </div>

            {/* Attendance Notifications */}
            <NotificationsAttendanceGrid />
          </div>
        )}

        {/* Tab 3 Content */}
        {activeTab === 3 && (
          <div className={`${styles.tab3}`}>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-[0.3vw] my-[43px] w-[393px]">
                <h3 className={`${styles.cardsTitle}`}>Food List</h3>
                {/* <CustomSelectInput label="Monthly" options={annualOptions} /> */}
              </div>

              {/* <CustomBtn
                btnColor="white"
                word="Receipts Database"
                style={{ minWidth: "188px" }}
              /> */}
            </div>

            {/* 1.1 Cards Container */}

          </div>
        )}
      </div>
    </section>
  );
}
