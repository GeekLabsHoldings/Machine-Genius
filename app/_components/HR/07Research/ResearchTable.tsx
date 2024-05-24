"use client";
import React from "react";
import styles from "./ResearchTable.module.css";

/**
 * Renders a table component for displaying research data.
 *
 * @return {JSX.Element} The rendered ResearchTable component.
 */
export default function ResearchTable() {
  // An array of objects representing the rows of the table body.
  const bodyRow = [
    {
      newStatus: true,
      role: "Finance",
      exp: "2",
      level: "Junior",
      salary: "7000 EGP",
      noOfEmployees: "2",
    },
    {
      newStatus: false,
      role: "Bullying",
      exp: "1",
      level: "Junior",
      salary: "7000 EGP",
      noOfEmployees: "5",
    },
    {
      newStatus: false,
      role: "Bullying",
      exp: "1",
      level: "Junior",
      salary: "7000 EGP",
      noOfEmployees: "5",
    },
    {
      newStatus: false,
      role: "Finance",
      exp: "0",
      level: "Intern",
      salary: "7000 EGP",
      noOfEmployees: "0",
    },
    {
      newStatus: false,
      role: "Finance",
      exp: "2",
      level: "Junior",
      salary: "7000 EGP",
      noOfEmployees: "2",
    },
    {
      newStatus: false,
      role: "Harassment",
      exp: "9",
      level: "Senior",
      salary: "7000 EGP",
      noOfEmployees: "9",
    },
  ];

  const newRibbon = (
    <svg
      width="40"
      height="20"
      viewBox="0 0 40 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.8398 17.2949L35.2617 9.43367L39.7931 1.89305C39.9007 1.71336 39.9594 1.50783 39.9632 1.29749C39.967 1.08716 39.9158 0.879561 39.8149 0.695947C39.7139 0.512334 39.5667 0.359293 39.3885 0.252483C39.2102 0.145673 39.0073 0.0889263 38.8004 0.0880509L1.65717 0C1.03768 0 0.451497 0 0.000669185 0C-0.00173606 0.392269 0.00311587 1.83316 0.00311587 2.46305V16.713C0.00311587 17.3429 0 18.5879 0.00461689 19.0879C0.504854 19.0879 1.71941 19.088 2.33889 19.088H38.8354C39.0416 19.088 39.244 19.0325 39.4222 18.9272C39.6004 18.8218 39.748 18.6704 39.8501 18.4882C39.9521 18.3061 40.0049 18.0998 40.0031 17.8902C40.0013 17.6806 39.9449 17.4752 39.8398 17.2949ZM12.2776 13.3643H10.9696L7.16228 8.21054V13.3762H5.84256V6.02555H7.16228L10.9813 11.1912V6.02555H12.2893L12.2776 13.3643ZM19.6704 7.21305H15.5477V8.98242H19.285V10.1699H15.5477V12.0818H19.6704V13.2693H14.228V6.02555H19.6587L19.6704 7.21305ZM29.3522 13.3405H28.0325L26.2222 7.88992L24.412 13.3643H23.104L20.7682 6.02555H22.193L23.7346 11.2862L25.5098 6.02555H26.9346L28.6398 11.2862L30.193 6.02555H31.6295L29.3522 13.3405Z"
        fill="#E9313E"
      />
    </svg>
  );

  return (
    <div className={`${styles.tableContainer} h-[65vh]`}>
      {/* Start Table */}
      <div className={styles.table}>
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li className="w-[20%]">
            <span>Role</span>
          </li>
          <li className="w-[20%]">
            <span>Experience</span>
          </li>
          <li className="w-[20%]">
            <span>Level</span>
          </li>
          <li className="w-[20%]">
            <span>Salary</span>
          </li>
          <li className="w-[20%]">
            <span>Number of Employees</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {bodyRow.map((e, idx) => (
            <ul className="w-[100%] relative" key={idx}>
              <div className="absolute">{e.newStatus && newRibbon}</div>
              <li className="w-[20%]">{e.role}</li>
              <li className="w-[20%]">{e.exp}</li>
              <li className="w-[20%]">{e.level}</li>
              <li className="w-[20%]">{e.salary}</li>
              <li className="w-[20%]">{e.noOfEmployees}</li>
            </ul>
          ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
