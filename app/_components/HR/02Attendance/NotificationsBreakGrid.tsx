"use client";
import React, { useEffect, useState } from "react";
import NotificationsCard from "@/app/_components/HR/02Attendance/NotificationsCard";
import styles from "./NotificationsBreakGrid.module.css";

interface INotification {
  employee: {
    firstName: string;
    lastName: string;
  };
  checkedIn: string;
}

/**
 * Renders a grid of notifications cards with different background colors and button text.
 *
 * @return {JSX.Element} The rendered break notifications grid.
 */
export default function NotificationsBreakGrid() {
  const [notifications, setNotifications] = useState<
    Record<string, INotification[]>
  >({}); // State variable to store the notifications data

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await fetch(
          "https://machine-genius.onrender.com/hr/attendance/warning-notification",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setNotifications(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    getNotifications();
  }, []);

  const degreeMap: { [key: string]: string[] } = {
    "1": ["First", "#FFFFFF"],
    "2": ["Second", "#EFE2A7"],
    "3": ["Third", "#F9B68F"],
    "4": ["Fourth", "#F28389"],
  };

  return (
    <>
      {/* Notifications Container */}
      <div className="grid grid-cols-5 gap-[2vw] h-[70vh]">
        {Object.entries(notifications)?.map(([degree, notification], idx) => (
          <div className={`flex flex-col`}>
            <h2 className={`text-center ${styles.colTitle}`}>
              {degreeMap[degree][0]} Degree
            </h2>
            <div className={`relative ${styles.colContent}`}>
              {/* Notifications Cards */}
              <div
                className={`space-y-[0.7vw] h-[60vh] overflow-y-auto ${styles.cardContainer} pb-[0.7vw]`}
              >
                {notification?.map((noti) => (
                  <NotificationsCard
                    bgColor={`bg-[${degreeMap[degree][1]}]`}
                    btnText="Break Time History"
                    username={
                      noti.employee.firstName + " " + noti.employee.lastName
                    }
                    timeStamp={noti.checkedIn}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
