"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import InterviewAcceptanceTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/InterviewAcceptanceTable";
import React from "react";
// import styles from "./Prospects.module.css";

export default function Page() {
  return (
    <section className="">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <span className="text-[32px] font-bold">Interview Acceptance Sheet</span>
      </div>

      <div className="h-[70vh] w-full ">
        <InterviewAcceptanceTable />
      </div>

      <div className="flex justify-between mt-4">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href="/hr/hiring/job-openings/interview-details"
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href="/hr/hiring/job-openings/offer-msg"
        />
      </div>
    </section>
  );
}
