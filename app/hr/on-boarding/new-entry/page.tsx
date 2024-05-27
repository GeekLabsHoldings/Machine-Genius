"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import styles from "./new-entry.module.css";
import { Link } from "@mui/material";
import React from "react";

export default function page() {
  return (
    <section>
      {/* Back To Complaint Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <Link href="/hr/on-boarding">
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
        <span className="text-[36px] font-bold ">New Employee Entry</span>
      </div>

      {/* Template Container */}
      <div className="flex justify-between gap-[3vw]">
        {/* Employment Details & Required Paper Work Container */}
        <div className="flex-grow space-y-20">
          {/* Employment Details */}
          <div className="space-y-5">
            <h3 className="font-bold text-[20px]">Employment Details</h3>
            <div>
              <label className="font-bold block mb-[1.5vh]">
                Select Candidate
              </label>
              <CustomSelectInput
                options={[""]}
                label={"John Doe Johnney Doe"}
              />
            </div>
            <div className="w-1/2">
              <label className="font-bold block mb-[1.5vh]">Select Role</label>
              <CustomSelectInput options={[""]} label={"Video Editor"} />
            </div>
            <div className="flex gap-[2vw]">
              <div className="flex-grow">
                <label className="font-bold block mb-[1.5vh]">
                  Contract Start Date
                </label>
                <CustomSelectInput options={[""]} label={"20 March 2020"} />
              </div>
              <div className="flex-grow">
                <label className="font-bold block mb-[1.5vh]">
                  Contract End Date
                </label>
                <CustomSelectInput options={[""]} label={"20 March 2023"} />
              </div>
            </div>
          </div>
          {/* Required Paper Work */}
          <div className="w-1/2 space-y-6">
            <h3 className="font-bold text-[20px]">Required Paper Work</h3>
            <div className="flex justify-between">
              <span className="font-bold">ID Scan</span>
              <span className="underline text-[#0066FF]">JohnDoeID.pdf</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Military Paper</span>
              <span className="underline">Upload</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Criminal Record</span>
              <span className="underline">Upload</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Graduation Certificate</span>
              <span className="underline">Upload</span>
            </div>
          </div>
        </div>
        {/* Question Container */}
        <div className="flex-grow space-y-10">
        {/* Select Contract */}
          <div>
            <label className="font-bold text-[20px] block mb-[1.5vh]">
              Select Contract
            </label>
            <CustomSelectInput options={[""]} label={"Video Editor Inter"} />
          </div>
          {/* Contract Preview */}
          <div>
          <h3 className="font-bold text-[20px] mb-[1.5vh]">Contract Preview</h3>
          <div className={styles.questionContainer + " min-h-[50vh]"}></div>
          </div>
        </div>
      </div>

      {/* save button */}
      <div className="flex justify-end mt-[20px]">
        <CustomBtn
          word={"Print Contract"}
          btnColor="black"
          paddingVal="py-[0.5vw] px-[1vw]"
        />
      </div>
    </section>
  );
}
