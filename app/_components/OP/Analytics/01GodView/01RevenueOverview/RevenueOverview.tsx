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
    <section className={styles.RevenueOverView_Container}>
      <div className={styles.RevenueOverView_Header}>
        <p className={styles.RevenueOverView_Title}>Revenue Overview</p>
        <div className="flex justify-between">
          <div className="min-w-[270px]">
            <label>Select Brands</label>
            <CustomSelectInput label="Street Politics/PST USA" options={[]} />
          </div>

          <div className={styles.chartLegend + " flex flex-col"}>
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
      </div>
      <div className={styles.RevenueOverView_Body}>
        <Chart1 />
      </div>
    </section>
  );
}
