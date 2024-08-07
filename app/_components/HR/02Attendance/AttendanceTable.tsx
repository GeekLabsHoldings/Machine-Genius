"use client";
import React, { useEffect, useState } from "react";
import styles from "./AttendanceTable.module.css";

interface Attendance {
  firstName: string;
  lastName: string;
  role: string;
  department: string[];
  checkedIn: string;
  checkedOut: string;
  warningCount: string;
}

/**
 * Renders an attendance table component.
 *
 * @return {JSX.Element} The rendered attendance table component.
 */
export default function AttendanceTable() {
  // An array of objects representing the rows of the table body.

  const [attendance, setAttendance] = useState<Attendance[]>([
    {
      firstName: "",
      lastName: "",
      role: "",
      department: [],
      checkedIn: "",
      checkedOut: "",
      warningCount: "",
    },
  ]);

  useEffect(() => {
    // Fetch the attendance data from the server.
    try {
      fetch(
        "https://machine-genius.onrender.com/hr/attendance/today-attendance",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setAttendance(data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const yellowWarning = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="7"
      viewBox="0 0 7 7"
      fill="none"
    >
      <circle cx="3.5" cy="3.5" r="3.5" fill="#E1C655" />
    </svg>
  );
  const redWarning = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="7"
      viewBox="0 0 7 7"
      fill="none"
    >
      <circle cx="3.5" cy="3.5" r="3.5" fill="#E9313E" />
    </svg>
  );

  return (
    <div className={`${styles.tableContainer} h-[68vh]`}>
      {/* Start Table */}
      <div className={styles.table + " max-w-full"} id="table">
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li>
            <span>First Name</span>
          </li>
          <li>
            <span>Last Name</span>
          </li>
          <li>
            <span>Role</span>
          </li>
          <li>
            <span>Checked In</span>
          </li>
          <li>
            <span>Checked Out</span>
          </li>
          <li>
            <span>Warning Count</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {attendance?.map((e, idx) => (
            <ul key={idx} className="relative">
              <div
                className="absolute"
                style={{
                  paddingLeft: "clamp(10px, calc(1.2vw + 0.1rem), 1000px)",
                }}
              >
                {parseInt(e.warningCount) >= 3
                  ? redWarning
                  : parseInt(e.warningCount) === 2
                  ? yellowWarning
                  : null}
              </div>
              <li>
                <span>{e.firstName}</span>
              </li>
              <li className="w-[10%]">
                <span>{e.lastName}</span>
              </li>
              <li>
                <span>{e.department.join(", ")}</span>
              </li>
              <li>
                <span>{e.checkedIn}</span>
              </li>
              <li>
                <span>{e.checkedOut}</span>
              </li>
              <li>
                <span
                  style={{
                    color:
                      parseInt(e.warningCount) >= 3
                        ? "#e9313e"
                        : parseInt(e.warningCount) === 2
                        ? "#e1c655"
                        : "inherit",
                  }}
                >
                  {e.warningCount}
                </span>
              </li>
            </ul>
          ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
