"use client";
import React, { useEffect, useState } from "react";
import styles from "./EmployeeDatabaseTable.module.css";
import { truncateText } from "../../../../_utils/text";
import Link from "next/link";

/**
 * Renders an employee database table.
 *
 * @return {JSX.Element} The rendered employee database table.
 */
export default function EmployeeDatabaseTable({employees}:any) {
  // An array of objects representing the rows of the table body.


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
          <li className="w-[12%]">
            <span>Mobile Number</span>
          </li>
          <li className="w-[12%]">
            <span>Email</span>
          </li>
          {/* <li className="w-[8%]">
            <span>LinkedIn</span>
          </li> */}
          <li className="w-[12%]">
            <span>Role</span>
          </li>
          {/* <li className="w-[7%]">
            <span>CV</span>
          </li> */}
          {/* <li className="w-[7%]">
            <span>Port</span>
          </li> */}
          <li className="w-[14%]">
            <span>Type</span>
          </li>
          <li className="w-[14%]">
            <span>Lorem</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {Array.isArray(employees) && employees.length && employees.map((e:any, idx:any) => (
            <ul key={idx} className={`space-x-2`}>
              <li className="w-[10%]">
                <span>{e.firstName}</span>
              </li>
              <li className="w-[10%]">
                <span>{e.lastName}</span>
              </li>
              <li className="w-[12%]">
                <span>{e.phoneNumber}</span>
              </li>
              <li className="w-[12%]">
                <span>{e.email}</span>
              </li>
              {/* <li className="w-[8%]">
                <Link href={e.linkedin} target="_blank">
                  <span>{truncateText(e.linkedin, 20)}</span>
                </Link>
              </li> */}
              <li className="w-[12%]">
                <span>{e.role}</span>
              </li>
              {/* <li className="w-[7%]">
                <Link href="#" target="_blank">
                  <span>{e.cv}</span>
                </Link>
              </li> */}
              {/* <li className="w-[7%]">
                <span>{e.port}</span>
              </li> */}
              <li className="w-[14%]">
                <span>{e.type}</span>
              </li>
              <li className="w-[14%]">
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
