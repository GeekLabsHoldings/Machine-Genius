"use client";
import dynamic from "next/dynamic";
import React from "react";
import styles from "./RevenueOverview.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

export default function RevenueOverview() {
  const Chart1 = dynamic(() => import("./Chart1"), {
    ssr: false,
  });

  return (
    <>
      <p>Revenue Over View</p>
      <div className="flex justify-between">
        <div className="min-w-[270px]">
        <label>Select Brands</label>
          <CustomSelectInput label="Street Politics/PST USA" options={[]} />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="w-[10px] h-[10px] rounded-sm bg-[#E1C655]"></span>
            <span>Street Politics</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-[10px] h-[10px] rounded-sm bg-[#31B2E9]"></span>
            <span>PST USA</span>
          </div>
        </div>
      </div>
      <div className={styles.RevenueOverView_Container + " overflow-y-auto"}>
        <Chart1 />
      </div>
    </>
  );
}
