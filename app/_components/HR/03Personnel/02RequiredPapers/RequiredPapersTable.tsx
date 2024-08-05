"use client";
import React, { useEffect, useState } from "react";
import styles from "./RequiredPapersTable.module.css";
import Link from "next/link";

/**
 * Renders a table component displaying required papers for employees.
 *
 * @return {JSX.Element} The table component.
 */
export default function RequiredPapersTable() {
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

  const [papers,setPapers] = useState([])


  async function getrequiredPapers() {
    const token = localStorage.getItem("token");
    try {
      console.log("xzcasdqe");
      
      const data = await fetch(
        "https://machine-genius.onrender.com/hr/employee-paper/get-paper",
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await data.json();
      setPapers(res)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
getrequiredPapers()
  },[])

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
          {papers.map((e:any, idx:any) => (
            <ul key={idx}>
              <li className="w-[20%]">
                <span>{e.employee.firstName + "" +e.employee.lastName}</span>
              </li>
              <li className="w-[20%]">
                <Link href="#" target="_blank">
                  <span
                    style={{
                      color:
                        e.insuranceUrl === "Not Received" ? "#E9313E" : "#0066FF",
                      textDecoration:
                        e.insuranceUrl !== "Not Received" ? "underline" : "none",
                    }}
                  >
                    {e.insuranceUrl}
                  </span>
                </Link>
              </li>
              <li className="w-[20%]">
                <span
                  style={{
                    color:
                      e.criminalRecordUrl === "Not Received"
                        ? "#E9313E"
                        : "#0066FF",
                    textDecoration:
                      e.criminalRecordUrl !== "Not Received"
                        ? "underline"
                        : "none",
                  }}
                >
                  {e.criminalRecordUrl}
                </span>
              </li>
              <li className="w-[20%]">
                <span
                  style={{
                    color: e.IdScanUrl === "Not Received" ? "#E9313E" : "#0066FF",
                    textDecoration:
                      e.IdScanUrl !== "Not Received" ? "underline" : "none",
                  }}
                >
                  {e.IdScanUrl}
                </span>
              </li>
              <li className="w-[20%]">
                <Link href="#" target="_blank">
                  <span
                    style={{
                      color:
                        e.militaryUrl === "Not Received" ? "#E9313E" : "#0066FF",
                      textDecoration:
                        e.militaryUrl !== "Not Received" ? "underline" : "none",
                    }}
                  >
                    {e.militaryUrl}
                  </span>
                </Link>
              </li>
              <li className="w-[20%]">
                <span
                  style={{
                    color:
                      e.graduationCertificateUrl === "Not Received" ? "#E9313E" : "#0066FF",
                    textDecoration:
                      e.graduationCertificateUrl !== "Not Received" ? "underline" : "none",
                  }}
                >
                  {e.graduationCertificateUrl}
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
