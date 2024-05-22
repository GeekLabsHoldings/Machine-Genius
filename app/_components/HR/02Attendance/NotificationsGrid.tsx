"use client";
import React from "react";
import NotificationsCard from "@/app/_components/HR/02Attendance/NotificationsCard";
import styles from "./NotificationsGrid.module.css";
import CustomBtn from "../../Button/CustomBtn";

export default function NotificationsGrid() {
  return (
    <>
      <div>NotificationsGrid</div>
      {/* Notifications Container */}
      <div className="h-full grid grid-cols-5 gap-[2vw]">
        {/* First Column */}
        <div className="relative">
          <h2 className={`text-center ${styles.colTitle}`}>First Degree</h2>
          <div className={`flex flex-col gap-[10px] ${styles.colContent}`}>
            <NotificationsCard bgColor="bg-[#FFFFFB]" />
            <NotificationsCard bgColor="bg-[#FFFFFB]" />
            <NotificationsCard bgColor="bg-[#FFFFFB]" />
            <NotificationsCard bgColor="bg-[#FFFFFB]" />
            <NotificationsCard bgColor="bg-[#FFFFFB]" />
            <NotificationsCard bgColor="bg-[#FFFFFB]" />
          </div>
        </div>
        {/* Second Column */}
        <div className="relative">
          <h2 className={`text-center ${styles.colTitle}`}>Second Degree</h2>
          <div className={`flex flex-col gap-[10px] ${styles.colContent}`}>
            <NotificationsCard bgColor="bg-[#EFE2A7]" />
            <NotificationsCard bgColor="bg-[#EFE2A7]" />
            <NotificationsCard bgColor="bg-[#EFE2A7]" />
          </div>
        </div>
        {/* Third Column */}
        <div className="relative">
          <h2 className={`text-center ${styles.colTitle}`}>Third Degree</h2>
          <div className={`flex flex-col gap-[10px] ${styles.colContent}`}>
            <NotificationsCard bgColor="bg-[#F9B68F]">
                  <div className="mt-2">
                  <CustomBtn word="Attendance History" btnColor="black" width="w-full" paddingVal={"py-[0.5vw] px-[1.5vw]"} />
                  </div>
              </NotificationsCard>
          </div>
        </div>
        {/* Fourth Column */}
        <div className="relative">
          <h2 className={`text-center ${styles.colTitle}`}>Fourth Degree</h2>
          <div className={`flex flex-col gap-[10px] ${styles.colContent}`}>
            <NotificationsCard bgColor="bg-[#F28389]" />
            <NotificationsCard bgColor="bg-[#F28389]" />
            <NotificationsCard bgColor="bg-[#F28389]" />
            <NotificationsCard bgColor="bg-[#F28389]" />
          </div>
        </div>
        {/* Fifth Column */}
        <div className="relative">
          <h2 className={`text-center ${styles.colTitle}`}>Termination</h2>
          <div className={`flex flex-col gap-[10px] text-white`}>
            <NotificationsCard bgColor="bg-[#E9313E]" />
          </div>
        </div>
      </div>
    </>
  );
}
