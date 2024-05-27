"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import styles from "./new-template.module.css";
import { Link } from "@mui/material";
import React from "react";

export default function page() {
  return (
    <section>
      {/* Back To Complaint Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <Link href="/hr/hiring/job-openings">
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
        <span className="text-[32px] font-bold ">Job Hiring Request</span>
      </div>

      
      <div className="flex justify-between gap-[3vw]">
        {/* Job Hiring Request Info Container */}
        <div className=" flex-grow space-y-6">



          {/* Job Title & Level Card */}
          <div className="bg-[#C5E1C2] border border-[#2A2B2A] py-[2vh] px-[2vw] rounded-[6px] w-1/2 space-y-6">
            {/* Job Title */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                            <svg width="27" height="17" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24.5179 0.204834H2.4821C1.11143 0.204834 0 1.20331 0 2.43552V14.107C0 15.3388 1.11143 16.3376 2.4821 16.3376H24.5179C25.8885 16.3376 27 15.3388 27 14.107V2.43552C26.9999 1.20331 25.8885 0.204834 24.5179 0.204834ZM6.49971 4.07219C7.86901 4.07219 8.97959 5.07023 8.97959 6.30126C8.97959 7.53224 7.86901 8.52991 6.49971 8.52991C5.12999 8.52991 4.01988 7.53224 4.01988 6.30126C4.01988 5.07023 5.12999 4.07219 6.49971 4.07219ZM6.49971 12.6748C4.79613 12.6748 3.05147 12.1446 3.32358 10.677C3.43443 10.081 3.98318 9.24564 4.39973 8.87128C4.4533 8.82308 4.69778 8.81062 4.76438 8.84759C5.26984 9.12753 5.86331 9.29137 6.49971 9.29137C7.13611 9.29137 7.7291 9.12753 8.23456 8.84759C8.30117 8.81062 8.54559 8.82308 8.5997 8.87128C9.01577 9.24564 9.56452 10.081 9.67537 10.677C9.94758 12.1446 8.20287 12.6748 6.49971 12.6748ZM19.3231 11.9438H12.2446V10.6642H19.3231V11.9438H19.3231ZM23.5557 8.79578H12.2446V7.51618H23.5557V8.79578ZM23.5557 5.64776H12.2446V4.36815H23.5557V5.64776Z" fill="#2A2B2A"/>
              </svg>
              <span className={styles.cardTitle + " font-bold relative"}>Job Title</span>
              </div>

              <hr className={styles.divider + " rotate-90 relative top-[50%] -translate-y-[50%]"}/>
              <span>Video Editor</span>
            </div>
             {/* Level */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                            <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.462982 6.88282L11.4629 12.1684C11.6269 12.247 11.8139 12.2862 11.9999 12.2862C12.1869 12.2862 12.3729 12.247 12.5369 12.1684L23.5369 6.88282C23.8249 6.74389 23.9999 6.50378 23.9999 6.24554C23.9999 5.9873 23.8249 5.74718 23.5369 5.609L12.5369 0.322619C12.2089 0.165572 11.7909 0.165572 11.4629 0.322619L0.462982 5.609C0.174983 5.74718 9.42964e-09 5.9873 9.42964e-09 6.24554C-4.68653e-05 6.50378 0.174983 6.74389 0.462982 6.88282Z" fill="#2A2B2A"/>
              <path d="M23.5368 11.6477L20.4399 10.1595L13.6109 13.4411C13.1259 13.6729 12.5699 13.7952 11.9999 13.7952C11.4299 13.7952 10.874 13.6729 10.3919 13.4418L3.55995 10.1595L0.462982 11.6477C0.174983 11.7867 0 12.0268 0 12.285C0 12.5433 0.174983 12.7834 0.462982 12.9216L11.4629 18.2079C11.6269 18.2865 11.8129 18.3257 11.9999 18.3257C12.1859 18.3257 12.3729 18.2865 12.5369 18.2079L23.5368 12.9216C23.8248 12.7834 23.9998 12.5433 23.9998 12.285C23.9999 12.0268 23.8248 11.7867 23.5368 11.6477Z" fill="#2A2B2A"/>
              </svg>
              <span className={styles.cardTitle + " font-bold relative"}>Level</span>
              </div>
              <hr className={styles.divider + " rotate-90 relative top-[50%] -translate-y-[50%]"}/>
              <span>Beginner</span>
            </div>
          </div>




          {/* Job Template */}
          <div className="bg-yellow-500">
            <h3>1</h3>
            <div>
              
            </div>
          </div>




        </div>

        {/* Template Preview Container */}
        <div className=" flex-grow">
          {/* Question Container */}
          <div className={styles.templatePreviewContainer}>
            {/* Questions Title */}
            <h3 className="font-bold text-[20px] mb-[1.5vh]">Questions:</h3>
            {/* Questions List */}
            <div className="space-y-6">

            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
