"use client";
import styles from "./new-template.module.css";
import { Link } from "@mui/material";
import React from "react";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";
import CustomBtn from "@/app/_components/Button/CustomBtn";

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
        <div className=" w-[40%] space-y-6 ">



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
          <div className="space-y-4">
            <h3 className="font-bold text-[24px]">Job Template</h3>
            <div className="border border-[#2A2B2A] px-[1.5vw] py-[1.5vh] rounded-[11px] w-1/2 flex justify-between items-center">
              <div className="flex flex-col gap-2">
                  <span className="font-bold">Video Editor</span>
                  <span className="text-sm font-medium">Beginner</span>
              </div>
              <div className="flex items-center">
                <CustomCheckBox accentColor="#5FA85B" />
              </div>
            </div>
          </div>



          {/* Template Performance */}
          <div className="space-y-4">
            <h3 className="font-bold text-[24px]">Template Performance</h3>
            <div className="px-[2vw] py-[1.5vw] rounded-[10px] text-white bg-[var(--dark)] space-y-10">
                <div className="space-y-3">
                  <span className="font-bold">Number of Applicants:</span>
                  <div className="flex justify-between items-center">
                    <span>Wuuzuf</span>
                    <span>16</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Linked In</span>
                    <span>38</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="font-bold">Template Success Hiring Rate:</span>
                  <div className="flex justify-between items-center">
                    <span>Wuuzuf</span>
                    <span>30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Linked In</span>
                    <span>60%</span>
                  </div>
                </div>
            </div>
            <span className="flex justify-end">March’s Statistics</span>
          </div>



        </div>



        {/* Template Preview Container */}
        <div className={styles.templatePreviewContainer + " w-[60%] "}>
     
            {/* Template Preview Title */}
            <div className="flex justify-between items-center mb-[15px]">
                          <h3 className="font-bold text-[20px] mb-[1.5vh]">Template Preview</h3>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.58576 16.7395L0.0553957 20.8204C-0.00336969 20.9775 -0.0156878 21.1481 0.0199129 21.312C0.0555136 21.4758 0.137528 21.626 0.256162 21.7445C0.374795 21.863 0.525034 21.9449 0.688934 21.9803C0.852835 22.0157 1.02347 22.0032 1.18046 21.9443L5.26028 20.4139C5.72724 20.2391 6.15136 19.9662 6.50414 19.6138L18.322 7.79615C18.322 7.79615 17.9097 6.56046 16.6751 5.32477C15.4406 4.09025 14.2037 3.67796 14.2037 3.67796L2.38589 15.4956C2.03348 15.8484 1.76066 16.2725 1.58576 16.7395ZM15.8517 2.02999L17.4625 0.419279C17.7513 0.130446 18.1368 -0.053568 18.5398 0.0139815C19.107 0.107153 19.9746 0.388998 20.7922 1.20774C21.611 2.02649 21.8928 2.89299 21.986 3.46017C22.0536 3.86314 21.8696 4.24864 21.5807 4.53747L19.9688 6.14818C19.9688 6.14818 19.5577 4.91365 18.322 3.67913C17.0874 2.44227 15.8517 2.02999 15.8517 2.02999Z" fill="#2A2B2A"/>
            </svg>
            </div>
            {/* Template Preview Body */}
            <div className="space-y-6">
            {/* Job Position & Description */}
              <div className="border border-[#2A2B2A] rounded-[11px] px-[1.25vw] py-[1.5vw] bg-[#DBDBD73D]">
              {/* Job Position */}
                <div className="flex items-center gap-8 mb-[20px]">
                  <span className="font-bold">Job Position:</span>
                  <span>Video Editor - Beginner</span>
                </div>
                {/* Job Description */}
                <div>
                <span className="font-bold mb-[10px] block">Job Description:</span>
                <p>
                As a Video Editor at [Company Name], you will be responsible for transforming raw footage into polished and captivating video content.
                <br /><br />
Working closely with our creative team, you will edit and enhance video footage to create compelling narratives that align with our brand identity and meet the highest standards of quality. 
<br /><br />
You will collaborate with producers, directors, and other team members to understand project requirements and deliver on creative vision.
<br /><br />
Additionally, you will stay updated on industry trends and techniques to continuously improve your editing skills and contribute creative ideas to enhance the overall quality of our video content.
                </p>
                </div>
              </div>
              {/* Platform */}
              <div className="w-[75%] space-y-4">
                <h3 className="font-bold text-[20px]">Platform</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <CustomCheckBox name="wuuzuf" accentColor="#2A2B2A" />
                    <label htmlFor="wuuzuf">Wuuzuf</label>
                  </div>
                  <div className="flex items-center">
                    <CustomCheckBox name="linked-in" accentColor="#2A2B2A" />
                    <label htmlFor="linked-in">Linked In</label>
                  </div>
                  <div className="flex items-center">
                    <CustomCheckBox name="jobs-co" accentColor="#2A2B2A" />
                    <label htmlFor="jobs-co">Jobs.co</label>
                  </div>
                </div>
              </div>
              {/* Publish Template Button */}
              <div className="mt-[15px]">
                <CustomBtn btnColor="black" word="Publish Template" width="w-full" />
              </div>
            </div>
        </div>
      </div>


    </section>
  );
}
