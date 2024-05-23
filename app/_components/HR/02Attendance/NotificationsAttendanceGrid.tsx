"use client";
import React from "react";
import NotificationsCard from "@/app/_components/HR/02Attendance/NotificationsCard";
import styles from "./NotificationsAttendanceGrid.module.css";

export default function NotificationsGrid() {
  return (
    <>
      <h1>NotificationsGrid</h1>

      {/* Notifications Container */}
      <div className="grid grid-cols-5 gap-[2vw] h-[80vh]">
        {/* First Column */}

        <div className={`h-full flex flex-col`}>
          <h2 className={`text-center ${styles.colTitle}`}>First Degree</h2>
          <div className={`relative ${styles.colContent}`}>
            <div
              className={`space-y-[0.7vw] max-h-[70vh] overflow-y-auto ${styles.cardContainer}`}
            >
              <NotificationsCard
                bgColor="bg-[#FFFFFB]"
                btnText="Attendance History"
              />
              <NotificationsCard
                bgColor="bg-[#FFFFFB]"
                btnText="Attendance History"
              />
              <NotificationsCard
                bgColor="bg-[#FFFFFB]"
                btnText="Attendance History"
              />
              <NotificationsCard
                bgColor="bg-[#FFFFFB]"
                btnText="Attendance History"
              />
              <NotificationsCard
                bgColor="bg-[#FFFFFB]"
                btnText="Attendance History"
              />
              <NotificationsCard
                bgColor="bg-[#FFFFFB]"
                btnText="Attendance History"
              />
              <NotificationsCard
                bgColor="bg-[#FFFFFB]"
                btnText="Attendance History"
              />
              <NotificationsCard
                bgColor="bg-[#FFFFFB]"
                btnText="Attendance History"
              />
              <NotificationsCard
                bgColor="bg-[#FFFFFB]"
                btnText="Attendance History"
              />
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="relative">
          <h2 className={`text-center ${styles.colTitle}`}>Second Degree</h2>
          <div className={`flex flex-col gap-[10px] ${styles.colContent}`}>
            <NotificationsCard
              bgColor="bg-[#EFE2A7]"
              btnText="Attendance History"
            />
            <NotificationsCard
              bgColor="bg-[#EFE2A7]"
              btnText="Attendance History"
            />
            <NotificationsCard
              bgColor="bg-[#EFE2A7]"
              btnText="Attendance History"
            />
          </div>
        </div>
        {/* Third Column */}
        <div className="relative">
          <h2 className={`text-center ${styles.colTitle}`}>Third Degree</h2>
          <div className={`flex flex-col gap-[10px] ${styles.colContent}`}>
            <NotificationsCard
              bgColor="bg-[#F9B68F]"
              btnText="Attendance History"
            />
          </div>
        </div>
        {/* Fourth Column */}
        <div className="relative">
          <h2 className={`text-center ${styles.colTitle}`}>Fourth Degree</h2>
          <div className={`flex flex-col gap-[10px] ${styles.colContent}`}>
            <NotificationsCard
              bgColor="bg-[#F28389]"
              btnText="Attendance History"
            />
            <NotificationsCard
              bgColor="bg-[#F28389]"
              btnText="Attendance History"
            />
            <NotificationsCard
              bgColor="bg-[#F28389]"
              btnText="Attendance History"
            />
            <NotificationsCard
              bgColor="bg-[#F28389]"
              btnText="Attendance History"
            />
          </div>
        </div>
        {/* Fifth Column */}
        <div className="relative">
          <h2 className={`text-center ${styles.colTitle}`}>Termination</h2>
          <div className={`flex flex-col gap-[10px] text-white`}>
            <NotificationsCard
              bgColor="bg-[#E9313E]"
              btnText="Attendance History"
            />
          </div>
        </div>
      </div>
    </>
  );
}
