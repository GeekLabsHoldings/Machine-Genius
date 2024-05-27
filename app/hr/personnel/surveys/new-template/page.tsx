"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import styles from "./new-template.module.css";
import { Link } from "@mui/material";
import React from "react";

export default function page() {
  const modifyIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.15328 12.1742L0.0402878 15.1421C-0.00245068 15.2563 -0.0114093 15.3804 0.0144821 15.4996C0.0403735 15.6188 0.100021 15.728 0.186299 15.8142C0.272578 15.9004 0.381843 15.9599 0.501043 15.9857C0.620243 16.0114 0.744342 16.0023 0.858517 15.9595L3.82566 14.8465C4.16527 14.7193 4.47372 14.5209 4.73028 14.2646L13.3251 5.66993C13.3251 5.66993 13.0252 4.77125 12.1274 3.87256C11.2295 2.97472 10.33 2.67488 10.33 2.67488L1.73519 11.2696C1.47889 11.5261 1.28048 11.8346 1.15328 12.1742ZM11.5285 1.47635L12.7 0.30493C12.91 0.09487 13.1904 -0.0389586 13.4835 0.0101684C13.896 0.0779297 14.527 0.282907 15.1216 0.87836C15.7171 1.47381 15.9221 2.10399 15.9898 2.51649C16.039 2.80956 15.9051 3.08992 15.6951 3.29998L14.5228 4.4714C14.5228 4.4714 14.2238 3.57356 13.3251 2.67573C12.4272 1.7762 11.5285 1.47635 11.5285 1.47635Z"
        fill="#2A2B2A"
      />
    </svg>
  );

  return (
    <section>
      {/* Back To Complaint Table Button */}
      <div className="flex items-center justify-between gap-4 mt-[1.5vh]">
        <div className="flex items-center gap-4">
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
          <span className="text-[36px] font-bold">
            Monthly Feedback Template
          </span>
        </div>
        <div>
          <CustomBtn
            word={"Modify Template"}
            btnColor="white"
            icon={modifyIcon}
            paddingVal="py-[0.5vw] px-[1vw]"
          />
        </div>
      </div>

      {/* Template Container */}
      <div className="flex justify-between gap-[3vw]">
        {/* Question Container */}
        <div className=" flex-grow">
          <h3 className="font-bold text-[20px] my-[2.5vh]">Template Preview</h3>
          <div className={styles.questionContainer}>
            <h3 className="font-bold text-[20px] mb-[1.5vh]">Questions:</h3>
            <div className="space-y-6">
              <div className="flex flex-col">
                <label
                  className="font-bold mb-[1.5vh] block"
                  htmlFor="tell-me-about-yourself"
                >
                  1. Tell me more about yourself:
                </label>
                <textarea
                  name="tell-me-about-yourself"
                  id="tell-me-about-yourself"
                  cols={30}
                  rows={5}
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label
                  className="font-bold mb-[1.5vh] block"
                  htmlFor="where-do-you-see-yourself"
                >
                  2. Where do you see yourself in 5 years?
                </label>
                <textarea
                  name="where-do-you-see-yourself"
                  id="where-do-you-see-yourself"
                  cols={30}
                  rows={5}
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label
                  className="font-bold mb-[1.5vh] block"
                  htmlFor="exp-in-pr"
                >
                  3. Do you have experience in Pr?
                </label>
                <input name="exp-in-pr" id="exp-in-pr" type="text"></input>
              </div>
              <div className="flex flex-col">
                <label
                  className="font-bold mb-[1.5vh] block"
                  htmlFor="exp-in-after-effects"
                >
                  4. Do you have experience in Adobe After Effects?
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

        {/* Schedule Survey */}
        <div className=" flex-grow space-y-6">
          <h3 className="font-bold text-[20px]">Schedule Survey</h3>
          <div className="w-1/2">
            <label className="font-bold block mb-[1.5vh]">Date</label>
            <CustomSelectInput options={[""]} label={"20 March 2020"} />
          </div>
          <div className="w-1/2">
            <label className="font-bold block mb-[1.5vh]">Time</label>
            <CustomSelectInput options={[""]} label={"3:00 PM GMT"} />
          </div>
        </div>
      </div>

      {/* save button */}
      <div className="flex justify-end">
        <CustomBtn word={"Schedule"} btnColor="black" />
      </div>
    </section>
  );
}
