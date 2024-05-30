"use client";
import React from "react";
import styles from "./website-speed-result.module.css";
// import Image from "next/image";
import OpportunitiesTable from "@/app/_components/SEO/06WebsiteSpeed/OpportunitiesTable";

export default function page() {
  return (
    <section className="h-[70vh] mt-[6vh]">
      <div className="grid grid-cols-2 gap-[2vw]">
        {/* Overview Card */}
        <div className="flex-grow">
          <h3 className="font-bold text-[24px]">Overview</h3>
          <div className={styles.card + " p-4"}>
            <div className="flex flex-col items-center justify-center gap-1">
              {/* <img
                src={"/assets/websiteSpeedIndicator.png"}
                className="w-full"
                // width={"150"}
                // height={"150"}
                alt="WebsiteSpeedIndicator"
              ></img> */}
              <span className="font-semibold">Website Speed</span>
              <span className="text-[#ACACAC] text-[14px] font-medium">
                Last Check on 21 Apr
              </span>
            </div>
            <div></div>
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
            {/* First Inut Delay (FID) */}
            <div className="space-y-2">
              <span className="font-bold block">First Inut Delay (FID)</span>
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
          <p className="mb-2">These optimizations can speed up your page load</p>
          <OpportunitiesTable />
        </div>
      </div>
    </section>
  );
}
