"use client";
import React from "react";
import styles from "./EmployeeDatabaseTable.module.css";
import { truncateText } from "../../../../_utils/text";
import Link from "next/link";

export default function EmployeeDatabaseTable() {
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
    <div className={`${styles.tableContainer} h-[68vh]`}>
      {/* Start Table */}
      <div className={styles.table + " max-w-full"} id="table">
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
          <li className="w-[20%]">
            <span>Email</span>
          </li>
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
          <li className="w-[20%]">
            <span>Lorem</span>
          </li>
          <li className="w-[20%]">
            <span>Lorem</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {bodyRow.map((e, idx) => (
            <ul key={idx}>
              <li className="w-[20%]">
                <span>{e.firstName}</span>
              </li>
              <li className="w-[20%]">
                <span>{e.lastName}</span>
              </li>
              <li className="w-[20%]">
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
                <span>{e.role}</span>
              </li>
              <li className="w-[20%]">
                <Link href="#" target="_blank">
                  <span>{e.cv}</span>
                </Link>
              </li>
              <li className="w-[20%]">
                <span>{e.port}</span>
              </li>
              <li className="w-[20%]">
                <span>Lorem</span>
              </li>
              <li className="w-[20%]">
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
