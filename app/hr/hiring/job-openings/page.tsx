import React from "react";
import styles from "./job-openings.module.css";
import AllHiringTable from "@/app/_components/HR/00Hiring/01JobOpenings/01AllHiring/AllHiringTable";
import HiringRequestsTable from "@/app/_components/HR/00Hiring/01JobOpenings/02HiringRequests/HiringRequestsTable";
import InProcessHiringTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/InProcessHiringTable";

const Page = () => {
  return (
    <div className="flex flex-col h-full py-[1.5vw]">
      <div className={"tabs " + styles.tabs}>
        {/* Tab 1 */}
        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="All Hiring"
          defaultChecked
        />
        <div className="tab-content h-[70vh] py-[1.5vw] flex flex-col">
          <p>
            These are all the hiring requests and unfinished hiring processes,
            requested by team managers and approved by OP (Operation Manager).
            <br />
            Make sure to go through every request in detail to find and hire the
            best candidate for the requested role!{" "}
          </p>
          <AllHiringTable />
        </div>
        {/* ====================================================================================================== */}
        {/* Tab 2 */}
        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Hiring Requests"
        />
        <div className="tab-content h-[70vh] py-[1.5vw] flex flex-col ">
          <p>
            These are all the hiring requests and unfinished hiring processes,
            requested by team managers and approved by OP (Operation Manager).
            <br />
            Make sure to go through every request in detail to find and hire the
            best candidate for the requested role!
          </p>
          <HiringRequestsTable />
        </div>
        {/* ====================================================================================================== */}
        {/* Tab 3 */}
        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="In Process Hiring"
        />
        <div className="tab-content h-[70vh] py-[1.5vw] flex flex-col ">
          <p>
            These are all the hiring requests and unfinished hiring processes,
            requested by team managers and approved by OP (Operation Manager).
            <br />
            Make sure to go through every request in detail to find and hire the
            best candidate for the requested role!
          </p>
          <InProcessHiringTable />
        </div>
      </div>
    </div>
  );
};

export default Page;
