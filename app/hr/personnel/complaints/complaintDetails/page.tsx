"use client";
import ComplaintDetailsCard from "@/app/_components/HR/03Personnel/03Complaints/ComplaintDetailsCard";
import { Link } from "@mui/material";
import React from "react";

/**
 * Renders the HR personnel complaint details page.
 *
 * @return {JSX.Element} The JSX element representing the HR personnel complaint details page.
 */
export default function Page() {
  return (
    <>
      {/* Back To Complaint Table Button */}
      <div className="flex items-center gap-4 my-[30px]">
        {/* Link to navigate back to the complaints table */}
        <Link href="/hr/personnel/complaints">
          {/* Arrow icon for back navigation */}
          <svg
            width="11"
            height="22"
            viewBox="0 0 11 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 20.8993L11 1.09878C10.9996 0.898304 10.9627 0.701801 10.8932 0.530416C10.8237 0.359031 10.7244 0.219253 10.6058 0.126133C10.4873 0.03301 10.354 -0.00993011 10.2203 0.0019317C10.0867 0.0137935 9.95773 0.080009 9.84734 0.19345L0.296979 10.0937C-0.0989937 10.504 -0.0989937 11.4919 0.296979 11.9033L9.84734 21.8036C9.9575 21.9182 10.0865 21.9854 10.2204 21.9979C10.3543 22.0104 10.4879 21.9677 10.6067 21.8745C10.7255 21.7813 10.825 21.6411 10.8943 21.4692C10.9637 21.2973 11.0002 21.1002 11 20.8993Z"
              fill="#2A2B2A"
            />
          </svg>
        </Link>
        {/* Title for Complaint Table */}
        <span className="text-[36px] font-bold ">Complaint Table</span>
      </div>

      {/* Title for Complaint Details */}
      <h2 className="text-[32px] font-bold mb-[30px]">Complaint Details</h2>
      {/* Component to display Complaint Details */}
      <ComplaintDetailsCard />
    </>
  );
}
