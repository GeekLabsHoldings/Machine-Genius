"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import ResearchTable from "@/app/_components/HR/07Research/ResearchTable";
import React from "react";

export default function page() {
  const addIcon = (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z"
        fill="#FFFFFB"
      />
    </svg>
  );

  return (
    <section>
      <div className="flex justify-between items-center">
        <p className="font-light my-6">
          These are all the hiring requests and unfinished hiring processes,
          requested by team managers and approved by OP ( Operation Manager).
          <br />
          Make sure to go through every request in detail to find and hire the
          best candidate for the requested role!
        </p>
        <div>
          <CustomBtn
            btnColor="black"
            word="New Entry"
            icon={addIcon}
            paddingVal="py-[0.5vw] px-[1vw]"
          />
        </div>
      </div>
      <ResearchTable />
    </section>
  );
}
