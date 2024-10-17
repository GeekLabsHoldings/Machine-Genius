"use client";
import React from "react";
import { truncateText } from "../../../../../_utils/text";
import Link from "next/link";
import styles from "./ShortListTable.module.css";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";

export default function ShortListTable({data, setRecievedId, recievedId, stepIdx}: {data: any, setRecievedId: any, recievedId: any, stepIdx: number}) {
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

  /**
   * Handles the check event for the candidate selection.
   *
   * @return {void} No return value.
   */
  function handleCheck() {
    document.getElementsByName("candidateSelection").forEach((e: any) => {
      if (e.checked == false) {
        (document.querySelector("#checkBoxList input") as any).checked = false;
      }
    });
  }

  return (
    <div className={`${styles.tableContainer} h-full`}>
      {/* Start Table */}
      <div className={styles.table + " max-w-full"} id="table">
        {/* Table Header */}
        <ul className={styles.table_header + " "}>
          <li
            className="w-[4%]"
            id="checkBoxList"
            onClick={() => {
              document
                .querySelectorAll(".candidateSelection input")
                .forEach((e: any) => {
                  console.log(e);
                  if (
                    !(document.querySelector("#checkBoxList input") as any)
                      ?.checked
                  )
                    e.checked = false;
                  else e.checked = true;
                });
            }}
          >
            <CustomCheckBox accentColor="#2A2B2A" />
          </li>

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
          {data?.candidates?.map((e:any, idx:number) => (
            <ul key={idx} className={`${e.stepsStatus[stepIdx].status == "Rejected" ? "opacity-50" : ""}`} onClick={() => setRecievedId(e._id)}>
              <li className="candidateSelection w-[4%]">
                <CustomCheckBox
                  accentColor="#2A2B2A"
                  name="candidateSelection"
                  onChange={handleCheck}
                />
              </li>
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
