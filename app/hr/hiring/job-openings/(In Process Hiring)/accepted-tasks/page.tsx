"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import AcceptedTasksTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/AcceptedTasksTable";
import React from "react";
// import styles from "./Prospects.module.css";

export default function page() {
  return (
    <section className="">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <span className="text-[32px] font-bold">Accepted Tasks</span>
      </div>

      <div className="h-[70vh] w-full ">
        <AcceptedTasksTable />
      </div>

      <div className="flex justify-between mt-4">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href="/hr/hiring/job-openings/send-task"
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href="/hr/hiring/job-openings/face-to-face-interview-msg"
        />
      </div>
    </section>
  );
}
