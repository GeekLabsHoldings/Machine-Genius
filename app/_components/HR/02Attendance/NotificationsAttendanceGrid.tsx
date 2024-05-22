"use client";
import React from "react";
import NotificationsCard from "@/app/_components/HR/02Attendance/NotificationsCard";
import styles from "./NotificationsAttendanceGrid.module.css";

export default function NotificationsGrid() {
  return (
    <>
      <h1>NotificationsGrid</h1>
      {/* Notifications Container */}
      <div className="h-[80vh] grid grid-cols-5 gap-[2vw] bg-red-400">
        {/* First Column */}
        <div className="relative flex flex-col bg-green-400 h-full">
          <div><h2 className={`text-center ${styles.colTitle}`}>First Degree</h2></div>
          <div className={`bg-orange-300 flex flex-col gap-[10px] h-[60vh] overflow-hidden overflow-y-auto py-2 ${styles.colContent}`}>
            <NotificationsCard bgColor="bg-[#FFFFFB]" btnText="Attendance History" />
            <NotificationsCard bgColor="bg-[#FFFFFB]" btnText="Attendance History" />
            <NotificationsCard bgColor="bg-[#FFFFFB]" btnText="Attendance History" />
            <NotificationsCard bgColor="bg-[#FFFFFB]" btnText="Attendance History" />
            <NotificationsCard bgColor="bg-[#FFFFFB]" btnText="Attendance History" />
            <NotificationsCard bgColor="bg-[#FFFFFB]" btnText="Attendance History" />
          </div>
        </div>
        {/* Second Column */}
        <div className="relative">
          <h2 className={`text-center ${styles.colTitle}`}>Second Degree</h2>
          <div className={`flex flex-col gap-[10px] ${styles.colContent}`}>
            <NotificationsCard bgColor="bg-[#EFE2A7]" btnText="Attendance History" />
            <NotificationsCard bgColor="bg-[#EFE2A7]" btnText="Attendance History" />
            <NotificationsCard bgColor="bg-[#EFE2A7]" btnText="Attendance History" />
          </div>
        </div>
        {/* Third Column */}
        <div className="relative">
          <h2 className={`text-center ${styles.colTitle}`}>Third Degree</h2>
          <div className={`flex flex-col gap-[10px] ${styles.colContent}`}>
            <NotificationsCard bgColor="bg-[#F9B68F]" btnText="Attendance History" />
          </div>
        </div>
        {/* Fourth Column */}
        <div className="relative">
          <h2 className={`text-center ${styles.colTitle}`}>Fourth Degree</h2>
          <div className={`flex flex-col gap-[10px] ${styles.colContent}`}>
            <NotificationsCard bgColor="bg-[#F28389]" btnText="Attendance History" />
            <NotificationsCard bgColor="bg-[#F28389]" btnText="Attendance History" />
            <NotificationsCard bgColor="bg-[#F28389]" btnText="Attendance History" />
            <NotificationsCard bgColor="bg-[#F28389]" btnText="Attendance History" />
          </div>
        </div>
        {/* Fifth Column */}
        <div className="relative">
          <h2 className={`text-center ${styles.colTitle}`}>Termination</h2>
          <div className={`flex flex-col gap-[10px] text-white`}>
            <NotificationsCard bgColor="bg-[#E9313E]" btnText="Attendance History" />
          </div>
        </div>
      </div>
    </>
  );
}
