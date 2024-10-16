"use client";
import React from "react";
import styles from "./face-to-face-interview-msg.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import ShortListTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/ShortListTable";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

export default function Page() {
  return (
    <section className="w-[90vw]">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <span className="text-[32px] font-bold">Face To Face Interview Message</span>
      </div>

      <div className="h-[70vh] flex align-center justify-between w-full">
        <div className="w-[49%] h-full">
          <ShortListTable data={[]} setRecievedId={() => {}} recievedId={0} stepIdx={0} />
        </div>

        <div
          className={
            styles.messageBox +
            " w-[49%] h-full border p-7 flex flex-col justify-between"
          }
        >
          <div className="flex justify-between">
            <span className="font-bold">Number of selected candidates:</span>
            <span className="font-bold">(8)</span>
          </div>
          <div>
            <span className="font-bold mb-[15px] block">
              Select Message Template:
            </span>
            <CustomSelectInput
              options={[]}
              label="More Info - Final Interview"
            />
          </div>
          <div>
            <span className="font-bold mb-[15px] block">Message Preview:</span>
            <div className="border border-[#2A2B2A] bg-[#DBDBD73D] p-4 rounded-[11px] min-h-[40vh]"></div>
          </div>
          {/* Action Button */}
          <div>
            <CustomBtn
              word={"Send Whatsapp Message"}
              btnColor="black"
              width="w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href="/hr/hiring/job-openings/accepted-tasks"
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href="/hr/hiring/job-openings/interview-details"
        />
      </div>
    </section>
  );
}
