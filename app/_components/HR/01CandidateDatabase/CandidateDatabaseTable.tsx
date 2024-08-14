"use client";
import React, { useEffect, useState } from "react";
import styles from "./CandidateDatabaseTable.module.css";
import { truncateText } from "../../../_utils/text";
import Link from "next/link";

interface Candidate {
  recommendation: null;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  linkedIn: string;
  role: string;
  department: string;
  cvLink: string;
  portfolio: string;
  taskLink: string;
  appliedFrom: string;
  hiring: string;
  __v: number;
}

/**
 * Renders a table component displaying a list of candidate data.
 *
 * @return {JSX.Element} The rendered table component.
 */
export default function CandidateDatabaseTable({
  filter,
}: {
  filter: { role: string };
}) {
  // An array of objects representing the rows of the table body.
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      recommendation: null,
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      linkedIn: "",
      role: "",
      department: "",
      cvLink: "",
      portfolio: "",
      taskLink: "",
      appliedFrom: "",
      hiring: "",
      __v: 0,
    },
  ]);

  useEffect(() => {
    // Fetch the candidate data from the server.
    fetch(
      `https://machine-genius.onrender.com/hr/candidate/all-candidate?role=${filter.role}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCandidates(data);
      });
  }, [filter]);

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
          <li className="w-[17%]">
            <span>Email</span>
          </li>
          <li className="w-[17%]">
            <span>LinkedIn</span>
          </li>
          <li className="w-[12%]">
            <span>Role</span>
          </li>
          <li className="w-[17%]">
            <span>CV</span>
          </li>
          <li className="w-[7%]">
            <span>Portfolio</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {candidates.map((e, idx) => (
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
              <li className="w-[17%]">
                <span>{e.email}</span>
              </li>
              <li className="w-[17%]">
                <Link
                  href={e.linkedIn}
                  target="_blank"
                  className="whitespace-nowrap overflow-hidden overflow-ellipsis"
                >
                  {truncateText(e.linkedIn, 100)}
                </Link>
              </li>
              <li className="w-[12%]">
                <span>{e.role}</span>
              </li>
              <li className="w-[17%]">
                <Link
                  href={e.cvLink}
                  target="_blank"
                  className="whitespace-nowrap overflow-hidden overflow-ellipsis"
                >
                  {truncateText(e.cvLink, 100)}
                </Link>
              </li>
              <li className="w-[7%]">
                <span>{e.portfolio || "-"}</span>
              </li>
            </ul>
          ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
