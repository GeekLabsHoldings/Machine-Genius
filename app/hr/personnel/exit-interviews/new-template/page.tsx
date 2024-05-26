"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import ComplaintDetailsCard from "@/app/_components/HR/03Personnel/03Complaints/ComplaintDetailsCard";
import { Link } from "@mui/material";
import React from "react";

export default function page() {
  return (
    <section>
      {/* Back To Complaint Table Button */}
      <div className="flex items-center gap-4 my-[20px]">
        <Link href="/hr/personnel/exit-interviews/">
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
        <span className="text-[36px] font-bold ">Exit Interviews Template</span>
      </div>

      {/* Template Container */}
      <div className="flex justify-between gap-[3vw] outline outline-2">
        <div className="bg-red-500 flex-grow space-y-8">
          <h3 className="font-bold text-[20px]">Employment Details</h3>
          <div>
            <label className="font-bold">Select Employee</label>
            <CustomSelectInput options={[""]} label={"John Doe Johnney Doe"} />
          </div>
          <div className="flex gap-[2vw]">
            <div className="flex-grow">
              <label className="font-bold">Contract Start Date</label>
              <CustomSelectInput options={[""]} label={"20 March 2020"} />
            </div>
            <div className="flex-grow">
              <label className="font-bold">Contract End Date</label>
              <CustomSelectInput options={[""]} label={"20 March 2023"} />
            </div>
          </div>
          <div>
            <label className="font-bold">Reason For Quitting</label>
            <CustomSelectInput options={[""]} label={"Select Reason"} />
          </div>
          <div className="w-1/2">
            <label className="font-bold">Two Week Notice</label>
            <CustomSelectInput options={[""]} label={"Given"} />
          </div>
          <div className="w-1/2">
            <label className="font-bold">Handover Date</label>
            <CustomSelectInput options={[""]} label={"Select Date"} />
          </div>
        </div>

        <div className="bg-yellow-500 flex-grow">
          <h3 className="font-bold text-[20px]">Video Editor Template</h3>
          <div>
            <h3>Questions:</h3>
            <div>
              <label htmlFor="tell-me-about-yourself">
                1. Tell me more about yourself:
              </label>
              <textarea
                name="tell-me-about-yourself"
                id="tell-me-about-yourself"
                cols={30}
                rows={10}
              ></textarea>
            </div>
            <div>
              <label htmlFor="where-do-you-see-yourself">
                2. Where do you see yourself in 5 years?
              </label>
              <textarea
                name="where-do-you-see-yourself"
                id="where-do-you-see-yourself"
                cols={30}
                rows={10}
              ></textarea>
            </div>
            <div>
              <label htmlFor="exp-in-pr">
                3. Do you have experience in Pr?
              </label>
              <input name="exp-in-pr" id="exp-in-pr" type="text"></input>
            </div>
            <div>
              <label htmlFor="exp-in-after-effects">
                4. Do you have experience inAdobe After Effects?
              </label>
              <input
                name="exp-in-after-effects"
                id="exp-in-after-effects"
                type="text"
              ></input>
            </div>
          </div>
        </div>
      </div>

      {/* save button */}
      <div className="flex justify-end mt-[4vh]">
        <CustomBtn word={"Save"} btnColor="black" />
      </div>
    </section>
  );
}
