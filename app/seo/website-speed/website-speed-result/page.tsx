"use client";
import React from "react";
import styles from "./website-speed-result.module.css";
import OpportunitiesTable from "@/app/_components/SEO/06WebsiteSpeed/OpportunitiesTable";

export default function page() {
  return (
    <section className="h-[70vh] mt-[4vh]">
      <div className="grid grid-cols-2 gap-[2vw]">
        {/* Overview Card */}
        <div className="flex-grow">
          <h3 className="font-bold text-[24px] mb-2">Overview</h3>
          <div className={styles.card + " p-4 grid grid-cols-2 gap-[2vw]"}>
            <div
              className={
                styles.columnContent +
                " flex flex-col items-center justify-center gap-1 relative"
              }
            >
              <div className={styles.speedIndicatorWrapper + " relative w-fit"}>
                <img
                  src={"/assets/websiteSpeedIndicator.png"}
                  className="w-full"
                  alt="WebsiteSpeedIndicator"
                ></img>
                <div
                  className={
                    styles.overlayIndicator + " absolute bottom-0 w-full "
                  }
                ></div>
              </div>

              <div className="flex flex-col items-center -mt-[70px]">
                <span className="font-bold text-[48px]">80</span>
                <span className="font-semibold">Website Speed</span>
                <span className="text-[#ACACAC] text-[14px] font-medium">
                  Last Check on 21 Apr
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-col gap-2">
                <span className="font-bold">Website</span>
                <span>https://machinegenius.io/signin</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Speed Scale</span>
                <span className="flex items-center gap-2 text-[#ACACAC]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="6" fill="#5FA85B" />
                  </svg>
                  90 - 100 (fast)
                </span>
                <span className="flex items-center gap-2 text-[#ACACAC]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="6" fill="#E1C655" />
                  </svg>
                  50 - 89 (average)
                </span>
                <span className="flex items-center gap-2 text-[#ACACAC]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="6" fill="#EC6060" />
                  </svg>
                  0 - 49 (slow)
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Analysis Time</span>
                <span className="text-[#ACACAC]">21/4/20204, 1:25 PM</span>
              </div>
            </div>
          </div>
        </div>
        {/* Field Data Card */}
        <div className="flex-grow">
          <h3 className="font-bold text-[24px] mb-2">Field Data</h3>
          <div className={styles.card + " p-6 space-y-4"}>
            {/* First Contentful Paint (FCP) */}
            <div className="space-y-2">
              <span className="font-bold block">
                First Contentful Paint (FCP)
              </span>
              <hr className={styles.divider} />
              <div className="w-full flex justify-between gap-1">
                <div className="flex justify-center items-center rounded-[5px] py-3 w-[30%] bg-[#EC6060]">
                  <span className="font-bold text-[14px]">30%</span>
                </div>
                <div className="flex justify-center items-center rounded-[5px] py-3 w-[50%] bg-[#E1C655]">
                  <span className="font-bold text-[14px]">50%</span>
                </div>
                <div className="flex justify-center items-center rounded-[5px] py-3 w-[20%] bg-[#5FA85B]">
                  <span className="font-bold text-[14px]">20%</span>
                </div>
              </div>
            </div>
            {/* First Input Delay (FID) */}
            <div className="space-y-2">
              <span className="font-bold block">First Input Delay (FID)</span>
              <hr className={styles.divider} />
              <div className="w-full flex justify-between gap-1">
                <div className="flex justify-center items-center rounded-[5px] py-3 w-[30%] bg-[#EC6060]">
                  <span className="font-bold text-[14px]">30%</span>
                </div>
                <div className="flex justify-center items-center rounded-[5px] py-3 w-[50%] bg-[#E1C655]">
                  <span className="font-bold text-[14px]">50%</span>
                </div>
                <div className="flex justify-center items-center rounded-[5px] py-3 w-[20%] bg-[#5FA85B]">
                  <span className="font-bold text-[14px]">20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Opportunities Card */}
        <div>
          <h3 className="font-bold text-[24px] mb-2">Opportunities</h3>
          <p className="mb-2">
            These optimizations can speed up your page load
          </p>
          <OpportunitiesTable />
        </div>
      </div>
    </section>
  );
}
