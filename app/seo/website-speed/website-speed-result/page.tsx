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
          <div className={styles.card}>
            <div>
              <Image src={"/assets/websiteSpeedIndicator.png"} alt="WebsiteSpeedIndicator">

              </Image>
            </div>
            <div>

            </div>
          </div>
        </div>
        {/* Field Data Card */}
        <div>
          <h3 className="font-bold text-[24px]">Field Data</h3>
          <div className={styles.card}>1111111</div>
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
