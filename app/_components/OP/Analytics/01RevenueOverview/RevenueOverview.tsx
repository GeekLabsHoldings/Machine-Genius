"use client";
import dynamic from "next/dynamic";
import React from "react";
import styles from "./RevenueOverview.module.css";

export default function RevenueOverview() {
  const Chart1 = dynamic(() => import("./Chart1"), {
    ssr: false,
  });

  return (
    <>
      <p>Revenue Over View</p>

      <div className={styles.RevenueOverView_Container + " overflow-y-auto"}>
        <Chart1 />
      </div>
    </>
  );
}
