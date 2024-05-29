"use client";
import React from "react";
import { truncateText } from "../../../../../_utils/text";
import Link from "next/link";
import styles from "./TaskFormTable.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";

export default function TaskFormTable() {
  // An array of objects representing the rows of the table body.
  const bodyRow = [
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      taskReceived: "Received",
      taskApproved: "Approved",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      taskReceived: "Not Received",
      taskApproved: "-",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      taskReceived: "Received",
      taskApproved: "Approved",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      taskReceived: "Not Received",
      taskApproved: "-",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      taskReceived: "Received",
      taskApproved: "Rejected",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      taskReceived: "Received",
      taskApproved: "Rejected",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      taskReceived: "Received",
      taskApproved: "Approved",
    },
    {
      firstName: "John",
      lastName: "Doe",
      mobile: "+0202123456789",
      email: "johndoe@gmail.com",
      taskReceived: "Received",
      taskApproved: "Approved",
    },
  ];

  function handleCheck() {
    document.getElementsByName("candidateSelection").forEach((e: any) => {
      if (e.checked == false) {
        (document.querySelector("#checkBoxList input") as any).checked = false;
      }
    });
  }

  return (
    <div className={`${styles.tableContainer} h-[68vh]`}>
      {/* Start Table */}
      <div className={styles.table + " max-w-full"} id="table">
        {/* Table Header */}
        <ul className={styles.table_header + " space-x-2"}>
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
          <li className="w-[15%]">
            <span>Task Received</span>
          </li>
          <li className="w-[15%]">
            <span>Task Approved</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {bodyRow.map((e, idx) => (
            <ul key={idx} className={`space-x-2`}>
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
                <span>{e.mobile}</span>
              </li>
              <li className="w-[20%]">
                <span>{e.email}</span>
              </li>
              <li className="w-[15%]">
                <span>{e.taskReceived}</span>
              </li>
              <li className="w-[15%]">
                <span
                  style={{
                    ...(e.taskApproved === "Approved" && { color: "#5FA85B" }),
                    ...(e.taskApproved === "Rejected" && { color: "#E9313E" }),
                  }}
                >
                  {e.taskApproved}
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
