"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./RequiredPapersTable.module.css";
import Link from "next/link";
import { globalContext } from "@/app/_context/store";

/**
 * Renders a table component displaying required papers for employees.
 *
 * @return {JSX.Element} The table component.
 */
export default function RequiredPapersTable() {
  const { handleSignOut } = useContext(globalContext);
  // An array of objects representing the rows of the table body.
  const bodyRow = [
    {
      name: "John Doe",
      insurance: "Not Received",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "Not Received",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "JohnDoeID.pdf",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "JohnDoeID.pdf",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "Not Received",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "Not Received",
      idScan: "JohnDoeID.pdf",
      military: "JohnDoeID.pdf",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "Not Received",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "JohnDoeID.pdf",
      military: "JohnDoeID.pdf",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "JohnDoeID.pdf",
      military: "JohnDoeID.pdf",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "Not Received",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "JohnDoeID.pdf",
      military: "JohnDoeID.pdf",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "Not Received",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "JohnDoeID.pdf",
      military: "JohnDoeID.pdf",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "JohnDoeID.pdf",
      military: "JohnDoeID.pdf",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "JohnDoeID.pdf",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "JohnDoeID.pdf",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "Not Received",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "Not Received",
      idScan: "JohnDoeID.pdf",
      military: "JohnDoeID.pdf",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "Not Received",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "JohnDoeID.pdf",
      military: "JohnDoeID.pdf",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "Not Received",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "JohnDoeID.pdf",
      military: "JohnDoeID.pdf",
      gradCert: "JohnDoeID.pdf",
    },
    {
      name: "John Doe",
      insurance: "JohnDoeID.pdf",
      criminalRecord: "JohnDoeID.pdf",
      idScan: "Not Received",
      military: "Not Received",
      gradCert: "JohnDoeID.pdf",
    },
  ];

  const [papers, setPapers] = useState([]);

  async function getrequiredPapers() {
    const token = localStorage.getItem("token");
    try {
      console.log("xzcasdqe");

      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/employee-paper/get-paper`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === 401) {
        handleSignOut();
      }
      const res = await data.json();
      setPapers(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getrequiredPapers();
  }, []);

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
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {Array.isArray(papers) &&
            papers.length &&
            papers.map((e: any, idx: any) => (
              <ul key={idx}>
                <li className="w-[20%]">
                  <span>
                    {e.employee.firstName + " " + e.employee.lastName}
                  </span>
                </li>
                <li className="w-[20%]">
                  <Link href={e.insuranceUrl} target="_blank">
                    <span
                      style={{
                        color: e.insuranceUrl === "" ? "#E9313E" : "#0066FF",
                        textDecoration:
                          e.insuranceUrl !== "" ? "underline" : "none",
                      }}
                    >
                      {e.insuranceUrl
                        ? e.employee.firstName +
                          "" +
                          e.employee.lastName +
                          "ID.pdf"
                        : "Not Received"}
                    </span>
                  </Link>
                </li>
                <Link
                  href={e.criminalRecordUrl}
                  className="w-[20%] flex justify-center"
                >
                  <span
                    style={{
                      color: e.criminalRecordUrl === "" ? "#E9313E" : "#0066FF",
                      textDecoration:
                        e.criminalRecordUrl !== "" ? "underline" : "none",
                    }}
                  >
                    {e.criminalRecordUrl
                      ? e.employee.firstName +
                        "" +
                        e.employee.lastName +
                        "ID.pdf"
                      : "Not Received"}
                  </span>
                </Link>
                <Link
                  href={e.IdScanUrl}
                  className="w-[20%] flex justify-center"
                >
                  <span
                    style={{
                      color: e.IdScanUrl === "" ? "#E9313E" : "#0066FF",
                      textDecoration: e.IdScanUrl !== "" ? "underline" : "none",
                    }}
                  >
                    {e.IdScanUrl
                      ? e.employee.firstName +
                        "" +
                        e.employee.lastName +
                        "ID.pdf"
                      : "Not Received"}
                  </span>
                </Link>
                <li className="w-[20%]">
                  <Link href={e.militaryUrl} target="_blank">
                    <span
                      style={{
                        color: e.militaryUrl === "" ? "#E9313E" : "#0066FF",
                        textDecoration:
                          e.militaryUrl !== "" ? "underline" : "none",
                      }}
                    >
                      {e.militaryUrl
                        ? e.employee.firstName +
                          "" +
                          e.employee.lastName +
                          "ID.pdf"
                        : "Not Received"}
                    </span>
                  </Link>
                </li>
                <Link
                  href={e.graduationCertificateUrl}
                  className="w-[20%] flex justify-center"
                >
                  <span
                    style={{
                      color:
                        e.graduationCertificateUrl === ""
                          ? "#E9313E"
                          : "#0066FF",
                      textDecoration:
                        e.graduationCertificateUrl !== ""
                          ? "underline"
                          : "none",
                    }}
                  >
                    {e.graduationCertificateUrl
                      ? e.employee.firstName +
                        "" +
                        e.employee.lastName +
                        "ID.pdf"
                      : "Not Received"}
                  </span>
                </Link>
              </ul>
            ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
