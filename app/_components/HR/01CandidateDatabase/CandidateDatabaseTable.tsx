"use client";
import React from "react";
import styles from "./CandidateDatabaseTable.module.css";

export default function CandidateDatabaseTable() {
  const bodyRow = [
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      role: "Video Editor",
      cv: "JohnDoeID.pdf",
      port: "loream ipsum",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      role: "Graphic Designer",
      cv: "JohnDoeID.pdf",
      port: "loream ipsum",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      role: "UX/UI",
      cv: "JohnDoeID.pdf",
      port: "loream ipsum",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      role: "Manager",
      cv: "JohnDoeID.pdf",
      port: "loream ipsum",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      role: "Front End Dev",
      cv: "JohnDoeID.pdf",
      port: "loream ipsum",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      role: "Video Editor",
      cv: "JohnDoeID.pdf",
      port: "loream ipsum",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      role: "Content Writer",
      cv: "JohnDoeID.pdf",
      port: "loream ipsum",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      role: "Manager",
      cv: "JohnDoeID.pdf",
      port: "loream ipsum",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      role: "Manager",
      cv: "JohnDoeID.pdf",
      port: "loream ipsum",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      role: "Content Writer",
      cv: "JohnDoeID.pdf",
      port: "loream ipsum",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      role: "Content Writer",
      cv: "JohnDoeID.pdf",
      port: "loream ipsum",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      role: "Graphic Designer",
      cv: "JohnDoeID.pdf",
      port: "loream ipsum",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      linkedin: "https://www.linkedin.com/jogndoe",
      role: "Graphic Designer",
      cv: "JohnDoeID.pdf",
      port: "loream ipsum",
    },
  ];

  return (
    <div className={`${styles.tableContainer} h-[65vh]`}>
      {/* Start Table */}
      <div className={styles.table + " max-w-full"}>
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li className="w-[20%]">
            <span>Content Name</span>
          </li>
          <li className="w-[20%]">
            <span>Date Published</span>
          </li>
          <li className="w-[20%]">
            <span>Posts</span>
          </li>
          <li className="w-[20%]">
            <span>Status</span>
          </li>
          <li className="w-[20%]">
            <span>Date Published</span>
          </li>
          <li className="w-[20%]">
            <span>Posts</span>
          </li>
          <li className="w-[20%]">
            <span>Status</span>
          </li>
          <li className="w-[20%]">
            <span>Date Published</span>
          </li>
          <li className="w-[20%]">
            <span>Posts</span>
          </li>
          <li className="w-[20%]">
            <span>Status</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {bodyRow.map((e, idx) => (
            <ul key={idx}>
              <li className="w-[20%]">
                <span>Content Name</span>
              </li>
              <li className="w-[20%]">
                <span>Date Published</span>
              </li>
              <li className="w-[20%]">
                <span>Posts</span>
              </li>
              <li className="w-[20%]">
                <span>Status</span>
              </li>
              <li className="w-[20%]">
                <span>Date Published</span>
              </li>
              <li className="w-[20%]">
                <span>Posts</span>
              </li>
              <li className="w-[20%]">
                <span>Status</span>
              </li>
              <li className="w-[20%]">
                <span>Date Published</span>
              </li>
              <li className="w-[20%]">
                <span>Posts</span>
              </li>
              <li className="w-[20%]">
                <span>Status</span>
              </li>
            </ul>
          ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
