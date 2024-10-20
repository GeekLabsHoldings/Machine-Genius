import React from "react";
import styles from "./SocialMediaAccountCard.module.css";

export default function SocialMediaAccountCardSkeleton() {
  return (
    <div
      className={`${styles.card} px-[1vw] pt-[0.6vw] pb-[1vw] rounded-xl overflow-hidden`}
    >
      <div
        className={`flex justify-between items-center pb-[0.5vw] border-b-[1px] border-b-[#2A2B2A] mb-[0.5vw]`}
      >
        <div className="grow h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="grid mx-auto w-full grid-cols-2 gap-2">
        <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-300 rounded animate-pulse w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded animate-pulse w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded animate-pulse w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
      </div>
    </div>
  );
}
