"use client";
import React from "react";
import { truncateText } from "../../../../../_utils/text";
import Link from "next/link";
import styles from "./ProspectsTable.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";

export default function ProspectsTable() {
  // An array of objects representing the rows of the table body.
  const bodyRow = [
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      portfolio: "https://www.linkedin.com/jogndoe",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      portfolio: "https://www.linkedin.com/jogndoe",
    },

    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      portfolio: "https://www.linkedin.com/jogndoe",
    },

    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      portfolio: "https://www.linkedin.com/jogndoe",
    },

    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      portfolio: "https://www.linkedin.com/jogndoe",
    },

    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      portfolio: "https://www.linkedin.com/jogndoe",
    },

    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      portfolio: "https://www.linkedin.com/jogndoe",
    },

    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      portfolio: "https://www.linkedin.com/jogndoe",
    },

    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      portfolio: "https://www.linkedin.com/jogndoe",
    },

    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      portfolio: "https://www.linkedin.com/jogndoe",
    },
  ];

  return (
    <div className={`${styles.tableContainer} h-[68vh]`}>
      {/* Start Table */}
      <div className={styles.table + " max-w-full"} id="table">
        {/* Table Header */}
        <ul className={styles.table_header + " space-x-2"}>
          <li className="w-[10%]">
            <span>First Name</span>
          </li>
          <li className="w-[10%]">
            <span>Last Name</span>
          </li>
          <li className="w-[15%]">
            <span>Mobile Number</span>
          </li>
          <li className="w-[20%]">
            <span>Email</span>
          </li>
          <li className="w-[20%]">
            <span>LinkedIn</span>
          </li>
          <li className="w-[20%]">
            <span>Portfolio</span>
          </li>
          <li className="w-[10%]">
            <span>Preview</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {bodyRow.map((e, idx) => (
            <ul key={idx} className={`space-x-2`}>
              <li className="w-[10%]">
                <span>{e.firstName}</span>
              </li>
              <li className="w-[10%]">
                <span>{e.lastName}</span>
              </li>
              <li className="w-[15%]">
                <span>{e.mobile}</span>
              </li>
              <li className="w-[20%]">
                <span>{e.email}</span>
              </li>
              <li className="w-[20%]">
                <Link href={e.linkedin} target="_blank">
                  <span>{truncateText(e.linkedin, 20)}</span>
                </Link>
              </li>
              <li className="w-[20%]">
                <Link href={e.portfolio} target="_blank">
                  <span>{truncateText(e.portfolio, 20)}</span>
                </Link>
              </li>
              <li className="w-[10%]">
                <CustomBtn
                  word="Preview"
                  btnColor="black"
                  href="/hr/hiring/job-openings/prospects-preview"
                />
              </li>
            </ul>
          ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
