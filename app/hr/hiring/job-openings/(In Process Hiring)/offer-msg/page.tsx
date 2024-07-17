"use client";
import React from "react";
import styles from "./offer-msg.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import ShortListTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/ShortListTable";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

export default function Page() {
  return (
    <section className="w-[90vw]">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <span className="text-[32px] font-bold">Final Offer Message</span>
      </div>

      <div className="h-[70vh] flex align-center justify-between w-full">
        <div className="w-[49%] h-full">
          <ShortListTable />
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
              label="More Info - Offer Template - Video Editor | Intern"
            />
          </div>
          <div>
            <span className="font-bold mb-[15px] block">Message Preview:</span>
            <div className="border border-[#2A2B2A] bg-[#DBDBD73D] p-4 rounded-[11px]">
              <div className="font-medium max-h-[35vh] overflow-y-auto">
                <p className="mb-3">Subject: Job Offer: Video Editor Position at [Company Name]</p>
                <p className="my-3">Dear [Candidate's Name],</p>
                <p className="my-3">
                  I am delighted to extend this offer to you for the position of
                  Video Editor at [Company Name]. After careful consideration of
                  your qualifications and experience, we are confident that you
                  will make a valuable addition to our team.
                </p>
                <p className="my-3">Position Details:</p>
                <p className="my-3">
                  <strong>Job Title:</strong> Video Editor
                  <br />
                  <strong>Company:</strong> [Company Name]
                  <br />
                  <strong>Location:</strong> [Location]
                  <br />
                  <strong>Start Date:</strong> [Start Date]
                  <br />
                  <strong>Salary:</strong> [Salary]
                  <br />
                  <strong>Benefits:</strong> [List of Benefits]
                </p>
                <p className="my-3">
                  <strong>Responsibilities:</strong>
                  <br />
                  As a Video Editor, you will be responsible for editing and
                  enhancing video content to create engaging narratives that
                  align with our brand identity. You will collaborate closely
                  with our creative team to produce high-quality video content
                  that captivates our audience and supports our organizational
                  objectives.
                </p>
              </div>
            </div>
          </div>
          {/* Action Button */}
          <div>
            <CustomBtn word={"Send Email"} btnColor="black" width="w-full" />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href="/hr/hiring/job-openings/interview-acceptance-sheet"
        />
        <CustomBtn word={"Dashboard"} btnColor="black" href="/hr/dashboard" />
      </div>
    </section>
  );
}
