"use client";
import React from "react";
import { truncateText } from "../../../../../_utils/text";
import Link from "next/link";
import styles from "./ProspectsPreviewTable.module.css";

export default function ProspectsPreviewTable({data, setSelectedCandidateCV, setSelectedCandidateId}:{data:any, setSelectedCandidateCV:any, setSelectedCandidateId:any}) {

  return (
    <div className={`${styles.tableContainer} h-full`}>
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
          {/* <li className="w-[20%]">
            <span>Portfolio</span>
          </li> */}
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {data?.candidates?.filter((e:any)=>e.stepsStatus[2].status !== "Rejected").map((e:any, idx:number) => (
            <ul key={idx} className={`space-x-2`} onClick={()=>{setSelectedCandidateCV(e.cvLink); setSelectedCandidateId(e._id)}}>
              <li className="w-[10%]">
                <span>{e.firstName}</span>
              </li>
              <li className="w-[10%]">
                <span>{e.lastName}</span>
              </li>
              <li className="w-[15%]">
                <span>{e.phoneNumber}</span>
              </li>
              <li className="w-[20%]">
                <span>{e.email}</span>
              </li>
              <li className="w-[20%]">
                <Link href={e.linkedIn} target="_blank">
                  <span>{truncateText(e.linkedIn, 20)}</span>
                </Link>
              </li>
              {/* <li className="w-[20%]">
                <Link href={e.portfolio} target="_blank">
                  <span>{truncateText(e.portfolio, 20)}</span>
                </Link>
              </li> */}
            </ul>
          ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
