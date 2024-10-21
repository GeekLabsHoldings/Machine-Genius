import React from "react";
import styles from "../CardStyles.module.css";

export default function AnalyticsCardSkeleton() {
  return (
    <div
      className={`${styles.card} w-1/2 h-[200px] px-[1vw] rounded-xl overflow-hidden animate-pulse`}
    >
      <div className="flex justify-center items-center gap-[1.5vw] h-full">
        {/* Left Side (Title and Value) */}
        <div className="w-[40%]">
          {/* Title Placeholder */}
          <div className="w-24 h-4 bg-gray-300 rounded mb-4"></div>
          {/* Value and Icon Placeholder */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-8 bg-gray-300 rounded"></div>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        {/* Right Side (Chart Placeholder) */}
        <div className="h-full flex justify-center items-center w-[60%]">
          <div className="w-full h-full bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
