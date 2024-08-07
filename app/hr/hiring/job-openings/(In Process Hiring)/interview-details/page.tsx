"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import InterviewDetailsTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/InterviewDetailsTable";
import React from "react";

export default function Page() {
  return (
    <section className="">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <span className="text-[32px] font-bold">Interview Details</span>
      </div>

      <div className="h-[70vh] w-full ">
        <InterviewDetailsTable />
      </div>

      <div className="flex justify-between mt-4">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href="/hr/hiring/job-openings/face-to-face-interview-msg"
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href="/hr/hiring/job-openings/interview-acceptance-sheet"
        />
      </div>
    </section>
  );
}
