"use client";
import React from "react";
import styles from "./RequiredPapersTable.module.css";
import Link from "next/link";

export default function RequiredPapersTable() {
  const bodyRow = [
    {
      name: "John Doe",
      insurance: "Not Received",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "Not Received",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
  ];

  return (
    <div className={`${styles.tableContainer} h-[68vh]`}>
      {/* Start Table */}
      <div className={styles.table + " max-w-full"} id="table">
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li className="w-[20%]">
            <span>Employee Name</span>
          </li>
          <li className="w-[20%]">
            <span>Insurance</span>
          </li>
          <li className="w-[20%]">
            <span>Criminal Record</span>
          </li>
          <li className="w-[20%]">
            <span>ID Scan</span>
          </li>
          <li className="w-[20%]">
            <span>Military</span>
          </li>
          <li className="w-[20%]">
            <span>Graduation Certificate</span>
          </li>
          <li className="w-[20%]">
            <span>Lorem</span>
          </li>
          <li className="w-[20%]">
            <span>Lorem</span>
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
                <span>{e.name}</span>
              </li>
              <li className="w-[20%]">
                <Link href="#" target="_blank">
                  <span
                    style={{
                      color:
                        e.insurance === "Not Received" ? "#E9313E" : "#0066FF",
                    }}
                  >
                    {e.insurance}
                  </span>
                </Link>
              </li>
              <li className="w-[20%]">
                <span
                  style={{
                    color:
                      e.criminalRecord === "Not Received" ? "#E9313E" : "#0066FF",
                  }}
                >
                  {e.criminalRecord}
                </span>
              </li>
              <li className="w-[20%]">
                <span
                  style={{
                    color:
                      e.idScan === "Not Received" ? "#E9313E" : "#0066FF",
                  }}
                >
                  {e.idScan}
                </span>
              </li>
              <li className="w-[20%]">
                <Link href="#" target="_blank">
                  <span
                    style={{
                      color:
                        e.military === "Not Received" ? "#E9313E" : "#0066FF",
                    }}
                  >
                    {e.military}
                  </span>
                </Link>
              </li>
              <li className="w-[20%]">
                <span
                  style={{
                    color:
                      e.gradCert === "Not Received" ? "#E9313E" : "#0066FF",
                  }}
                >
                  {e.gradCert}
                </span>
              </li>
              <li className="w-[20%]">
                <Link href="#" target="_blank">
                  <span>Lorem</span>
                </Link>
              </li>
              <li className="w-[20%]">
                <span>Lorem</span>
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
