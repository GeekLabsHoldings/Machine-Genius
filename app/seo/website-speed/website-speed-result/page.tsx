"use client";
import React from "react";
import styles from "./website-speed-result.module.css";
import Image from "next/image";

export default function page() {
  return (
    <section className="flex justify-center items-center h-[70vh]">
      <div className="grid grid-cols-2 gap-[2vw]">
        {/* OverView Card */}
        <div>
          <h3 className="font-bold text-[24px]">OverView</h3>
          <div className={styles.card + " p-4"}>
            <div className="flex flex-col items-center justify-center gap-1">
              <Image src={"/assets/websiteSpeedIndicator.png"} width={"300"} height={"300"} alt="WebsiteSpeedIndicator">
              </Image>
              <span className="font-semibold">Website Speed</span>
              <span className="text-[#ACACAC] text-[14px] font-medium">Last Check on 21 Apr</span>
            </div>
            <div>

            </div>
          </div>
        </div>
        {/* Field Data Card */}
        <div>
          <h3 className="font-bold text-[24px]">Field Data</h3>
          <div className={styles.card + " p-4"}>
            <span>First Contentful Paint (FCP)</span>
            <hr />

            <span>First Inut Delay (FID)</span>
            <hr />
          </div>
        </div>
        {/* Opportunities Card */}

        <div>
          <h3 className="font-bold text-[24px]">Opportunities</h3>
          <p>These optimizations can speed up your page load</p>
          <div className={styles.card}>1111111</div>
        </div>
      </div>
    </section>
  );
}
