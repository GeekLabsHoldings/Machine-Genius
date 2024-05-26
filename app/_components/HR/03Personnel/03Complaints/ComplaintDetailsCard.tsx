"use client";
import React from "react";
import styles from "./ComplaintDetailsCard.module.css";

export default function ComplaintDetailsCard() {
  return (
    <div
      className={`border-2 border-[#DBDBD7] rounded-[20px] p-8 ${styles.card}`}
    >
      {/* Card Header */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-1 mb-4">
        <span className="font-semibold">Requested By</span>
        <span>Shahenda El Naggar</span>
        <span className="font-semibold">Request Date</span>
        <span>20th March 2024</span>
        <span className="font-semibold">Complaint Issue</span>
        <span>Bullying</span>
        <span className="font-semibold">Urgency Level</span>
        <span>High</span>
      </div>
      {/* Card Body */}
      <div className="mt-[7vh]">
        <div className="font-semibold mb-2">Complaint Description</div>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p className="text-gray-700 mt-2">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
    </div>
  );
}
