"use client";
import React from "react";
import styles from "./AttendanceTable.module.css";

export default function AttendanceTable() {
  const bodyRow = [
    {
      firstName: "John",
      lastName: "Doe",
      role: "Video Editor",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "1",
    },
    {
      firstName: "John",
      lastName: "Doe",
      role: "Graphic Designer",
      checkedIn: "9:15:23 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "4",
    },
    {
      firstName: "John",
      lastName: "Doe",
      role: "Video Editor",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "2",
    },
    {
      firstName: "John",
      lastName: "Doe",
      role: "Graphic Designer",
      checkedIn: "9:15:23 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "3",
    },
    {
      firstName: "John",
      lastName: "Doe",
      role: "Video Editor",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "0",
    },
    {
      firstName: "John",
      lastName: "Doe",
      role: "Graphic Designer",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "2",
    },

    {
      firstName: "John",
      lastName: "Doe",
      role: "Video Editor",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "2",
    },
    {
      firstName: "John",
      lastName: "Doe",
      role: "Graphic Designer",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "0",
    },

    {
      firstName: "John",
      lastName: "Doe",
      role: "Video Editor",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "0",
    },
    {
      firstName: "John",
      lastName: "Doe",
      role: "Graphic Designer",
      checkedIn: "9:15:23 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "2",
    },

    {
      firstName: "John",
      lastName: "Doe",
      role: "Video Editor",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "0",
    },
    {
      firstName: "John",
      lastName: "Doe",
      role: "Graphic Designer",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "0",
    },

    {
      firstName: "John",
      lastName: "Doe",
      role: "Video Editor",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "2",
    },
    {
      firstName: "John",
      lastName: "Doe",
      role: "Graphic Designer",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "4",
    },

    {
      firstName: "John",
      lastName: "Doe",
      role: "Video Editor",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "1",
    },
    {
      firstName: "John",
      lastName: "Doe",
      role: "Graphic Designer",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "4",
    },

    {
      firstName: "John",
      lastName: "Doe",
      role: "Video Editor",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "1",
    },
    {
      firstName: "John",
      lastName: "Doe",
      role: "Graphic Designer",
      checkedIn: "9:00:45 AM",
      checkedOut: "5:55:02 PM",
      warningCount: "4",
    },
  ];
  const yellowWarning = (<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
  <circle cx="3.5" cy="3.5" r="3.5" fill="#E1C655"/>
</svg>);
  const redWarning = (<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
  <circle cx="3.5" cy="3.5" r="3.5" fill="#E9313E"/>
</svg>);

  return (
    <div className={`${styles.tableContainer} h-[68vh]`}>
      {/* Start Table */}
      <div className={styles.table + " max-w-full"} id="table">
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li className="w-[10%]">
            <span>First Name</span>
          </li>
          <li className="w-[10%]">
            <span>Last Name</span>
          </li>
          <li className="w-[10%]">
            <span>Role</span>
          </li>
          <li className="w-[10%]">
            <span>Checked In</span>
          </li>
          <li className="w-[10%]">
            <span>Checked Out</span>
          </li>
          <li className="w-[10%]">
            <span>Warning Count</span>
          </li>
          <li className="w-[10%]">
            <span>Lorem</span>
          </li>
          <li className="w-[10%]">
            <span>Lorem</span>
          </li>
          <li className="w-[10%]">
            <span>Lorem</span>
          </li>
          <li className="w-[10%]">
            <span>Lorem</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {bodyRow.map((e, idx) => (
            <ul key={idx} className="relative">
              <div className="absolute" style={{paddingLeft:"clamp(10px, calc(1.2vw + 0.1rem), 1000px)"}}>
                {parseInt(e.warningCount) >= 3 ? redWarning : parseInt(e.warningCount) === 2 ? yellowWarning : null}
              </div>
              <li className="w-[10%]">
                <span>{e.firstName}</span>
              </li>
              <li className="w-[10%]">
                <span>{e.lastName}</span>
              </li>
              <li className="w-[10%]">
                <span>{e.role}</span>
              </li>
              <li className="w-[10%]">
                <span>{e.checkedIn}</span>
              </li>
              <li className="w-[10%]">
                <span>{e.checkedOut}</span>
              </li>
              <li className={`w-[10%]`}>
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
              <li className="w-[10%]">
                <span>Lorem</span>
              </li>
              <li className="w-[10%]">
                <span>Lorem</span>
              </li>
              <li className="w-[10%]">
                <span>Lorem</span>
              </li>
              <li className="w-[10%]">
                <span>Lorem</span>
              </li>
            </ul>
          ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
