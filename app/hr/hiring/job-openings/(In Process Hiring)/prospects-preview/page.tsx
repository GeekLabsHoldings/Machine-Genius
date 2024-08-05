"use client";
import React from "react";
import styles from "./ProspectsPreview.module.css";
import Link from "next/link";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import ProspectsPreviewTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/ProspectsPreviewTable";

export default function Page() {
  return (
    <section className="w-[90vw]">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <Link href="/hr/hiring/job-openings/prospects">
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
        <span className="text-[32px] font-bold">Prospects</span>
      </div>

      <div className="h-[70vh] flex align-center justify-between w-full">
        <div className="w-[49%] h-full">
          <ProspectsPreviewTable />
        </div>
        <div className={styles.prospectsPreview + " w-[49%] h-full border p-7 flex flex-col justify-between"}>
          {/* Personal Info */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="grid grid-cols-2">
                <div>
                  <span className="font-bold">First Name: </span>
                  <span>John</span>
                </div>
                <div>
                  <span className="font-bold">Age: </span>
                  <span>24</span>
                </div>
              </div>
              <div>
                <span className="font-bold">Last Name: </span>
                <span>Doe</span>
              </div>
            </div>
            <div className="space-y-1">
              <div>
                <span className="font-bold">Number: </span>
                <span>+0202123456789</span>
              </div>
              <div>
                <span className="font-bold">Email: </span>
                <span>johndoe@gmail.com</span>
              </div>
            </div>
            <div className="space-y-1">
              <div>
                <span className="font-bold">CV: </span>
                <Link href="#">
                  <span className="text-[#0066FF] underline">JohnDoeCV.pdf</span>
                </Link>
              </div>
              <div>
                <span className="font-bold">Portfolio Link: </span>
                <Link href="#">
                  <span className="text-[#0066FF] underline">https://www.linkedin.comjogndoe</span>
                </Link>
              </div>
              <div>
                <span className="font-bold">LinkedIn: </span>
                <Link href="#">
                  <span className="text-[#0066FF] underline">https://www.linkedin.comjogndoe</span>
                </Link>
              </div>
            </div>
          </div>
          <hr className={styles.divider} />
          {/* Answered Questions: */}
          <div className="space-y-4">
            <h3 className="font-bold">Answered Questions:</h3>
            <div>
              <p className="font-bold text-[15px]">
                1. What’s your salary expectations for the role?
              </p>
              <span className="text-[13px]">7000 EGP</span>
            </div>
            <div>
              <p className="font-bold text-[15px]">
                2. How many years of experience do you have in video editing?
              </p>
              <span className="text-[13px]">2 years</span>
            </div>
            <div>
              <p className="font-bold text-[15px]">
                3. Are you able to start immediately?
              </p>
              <span className="text-[13px]">Yes</span>
            </div>
            <div>
              <p className="font-bold text-[15px]">
                4. Are you able to start immediately?
              </p>
              <span className="text-[13px]">Yes</span>
            </div>
            <div>
              <p className="font-bold text-[15px]">
                5. Are you able to start immediately?
              </p>
              <span className="text-[13px]">Yes</span>
            </div>
          </div>
          <hr className={styles.divider} />
          {/* Action Buttons */}
          <div className="flex justify-between gap-3">
            <CustomBtn word={"Reject"} btnColor="white" width="w-full" />
            <CustomBtn word={"Short List"} btnColor="black" width="w-full" />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <CustomBtn word={"Next"} btnColor="black" href="/hr/hiring/job-openings/short-list" />
      </div>
    </section>
  );
}
