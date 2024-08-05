"use client";
import ComplaintsTable from "@/app/_components/HR/03Personnel/03Complaints/ComplaintsTable";
import React from "react";

/**
 * Renders the HR personnel complaints page.
 *
 * @return {JSX.Element} The JSX element representing the HR personnel complaints page.
 */
export default function Page() {
  return (
    <>
      {/* Introduction Paragraph */}
      <p className="font-light my-6">
        {/* Explanation of the hiring requests */}
        These are all the hiring requests and unfinished hiring processes,
        requested by team managers and approved by OP (Operation Manager).
        {/* Instruction to review requests in detail */}
        <br />
        Make sure to go through every request in detail to find and hire the
        best candidate for the requested role!
      </p>
      {/* Complaints Table Component */}
      <ComplaintsTable />
    </>
  );
}
