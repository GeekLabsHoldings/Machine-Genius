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
      <div className={styles.table + " max-w-full overflow-auto"}>
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li className="w-[20%]">
            <span>First Name</span>
          </li>
          <li className="w-[20%]">
            <span>Last Name</span>
          </li>
          <li className="w-[20%]">
            <span>Mobile Number</span>
          </li>
          <li className="w-[30%]">
            <span>Email</span>
          </li>
          <li className="w-[30%]">
            <span>LinkedIn</span>
          </li>
          <li className="w-[20%]">
            <span>Role</span>
          </li>
          <li className="w-[20%]">
            <span>CV</span>
          </li>
          <li className="w-[20%]">
            <span>Port</span>
          </li>

          {/* test */}
          <li className="w-[20%]">
            <span>LinkedIn</span>
          </li>
          <li className="w-[20%]">
            <span>Role</span>
          </li>
          <li className="w-[20%]">
            <span>CV</span>
          </li>
          <li className="w-[20%]">
            <span>Port</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {bodyRow.map((e, idx) => (
            <ul key={idx}>
              <li className="w-[20%]">{e.firstName}</li>
              <li className="w-[20%]">{e.lastName}</li>
              <li className="w-[20%]">{e.mobile}</li>
              <li className="w-[30%]">{e.email}</li>
              <li className="w-[30%]">{e.linkedin}</li>
              <li className="w-[20%]">{e.role}</li>
              <li className="w-[20%]">{e.cv}</li>
              <li className="w-[20%]">{e.port}</li>
              {/* test */}
              <li className="w-[20%]">{e.linkedin}</li>
              <li className="w-[20%]">{e.role}</li>
              <li className="w-[20%]">{e.cv}</li>
              <li className="w-[20%]">{e.port}</li>
            </ul>
          ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
