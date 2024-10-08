"use client";
import React, { useContext, useEffect, useState } from "react";
import NotificationsCard from "@/app/_components/HR/02Attendance/NotificationsCard";
import styles from "./NotificationsBreakGrid.module.css";
import { globalContext } from "@/app/_context/store";

interface INotification {
  employee: {
    firstName: string;
    lastName: string;
  };
  checkedIn: string;
}

const degreeMap: { [key: number]: string[] } = {
  1: ["First", "#FFFFFF"],
  2: ["Second", "#EFE2A7"],
  3: ["Third", "#F9B68F"],
  4: ["Fourth", "#F28389"],
  5: ["Termination", "#E9313E"],
};

/**
 * Renders a grid of notifications cards with different background colors and button text.
 *
 * @return {JSX.Element} The rendered break notifications grid.
 */
export default function NotificationsBreakGrid() {
  const { handleSignOut } = useContext(globalContext);

  const [notifications, setNotifications] = useState<
    Record<string, INotification[]>
  >({}); // State variable to store the notifications data

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/attendance/warning-notification`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 401) {
          handleSignOut();
        }
        const data = await response.json();
        setNotifications(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    getNotifications();
  }, []);

  useEffect(() => {
    console.log(
      Object.entries(notifications).map(([degree, notification]) => {
        console.log(degree);
        console.log(notification);
      })
    );
  }, [notifications]);

  return (
    <>
      {/* Notifications Container */}
      <div className="flex gap-[2vw] h-[70vh]">
        {Object.entries(notifications)?.map(
          ([degree, notification]: any, idx) => (
            <div className={`flex flex-col`}>
              <h2 className={`text-center ${styles.colTitle}`}>
                {
                  // Check if degreeMap is defined and has the required key
                  degreeMap && degreeMap[degree > 5 ? 5 : degree]
                    ? degreeMap[degree > 5 ? 5 : degree][0]
                    : null // or provide a default value
                }

                {degree < 5 ? " Degree" : ""}
              </h2>
              <div className={`relative ${styles.colContent}`}>
                {/* Notifications Cards */}
                <div
                  className={`space-y-[0.7vw] h-[60vh] overflow-y-auto ${styles.cardContainer} pb-[0.7vw]`}
                >
                  {Array.isArray(notification) && notification.length ? (
                    notification?.map((noti: INotification) => (
                      <NotificationsCard
                        bgColor={degreeMap[degree > 5 ? 5 : degree][1]}
                        btnText="Break Time History"
                        textColour={degree >= 5 ? "#fff" : "#000"}
                        username={
                          noti.employee.firstName + " " + noti.employee.lastName
                        }
                        timeStamp={noti.checkedIn}
                      />
                    ))
                  ) : (
                    <div>No notifications</div>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
