"use client";
import styles from "./job-listing-published.module.css";
import React from "react";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import Link from "next/link";

export default function Page() {
  return (
    <section>
      {/* Back To Complaint Table Button */}
      <div className="flex items-center gap-4 mt-[15px]">
        <Link href="/hr/hiring/job-openings/start-hiring">
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
        <span className="text-[32px] font-bold">
          Your job listing has been published!
        </span>
      </div>

      <h3 className="font-bold text-[24px] my-[2vh]">Template Published:</h3>

      <div className="flex justify-between gap-[3vw] h-[65vh]">
        {/* Job Position - Description - Responsibilities */}
        <div className={styles.boxContainer + " w-[50%] space-y-10"}>
          {/* Job Position */}
          <div className="flex items-center gap-8 mb-[20px]">
            <span className="font-bold">Job Position:</span>
            <span>Video Editor - Beginner</span>
          </div>
          {/* Job Description */}
          <div>
            <span className="font-bold mb-[10px] block">Job Description:</span>
            <p>
              As a Video Editor at [Company Name], you will be responsible for
              transforming raw footage into polished and captivating video
              content.
              <br />
              <br />
              Working closely with our creative team, you will edit and enhance
              video footage to create compelling narratives that align with our
              brand identity and meet the highest standards of quality.
              <br />
              <br />
              You will collaborate with producers, directors, and other team
              members to understand project requirements and deliver on creative
              vision.
              <br />
              <br />
              Additionally, you will stay updated on industry trends and
              techniques to continuously improve your editing skills and
              contribute creative ideas to enhance the overall quality of our
              video content.
            </p>
          </div>
          {/* Responsibilities */}
          <div>
            <span className="font-bold mb-[10px] block">Responsibilities:</span>
            <ul className="list-disc list-inside">
              <li>
                Edit and enhance video footage to create engaging content.
              </li>
              <li>
                Collaborate with team members to meet project requirements and
                deadlines.
              </li>
              <li>
                Stay updated on industry trends and techniques to improve
                editing skills.
              </li>
              <li>
                Contribute creative ideas to enhance the overall quality of
                video content.
              </li>
            </ul>
          </div>
        </div>

        <div className="w-[50%]">
          {/* Publishing Details Container */}
          <div className={styles.boxContainer + " space-y-6 h-fit"}>
            <h3 className="font-bold text-[24px]">Publishing Details:</h3>
            {/* Date */}
            <div className="flex items-center gap-8 mb-[20px]">
              <span className="font-bold">Date:</span>
              <span className="font-medium">23rd of March 2024</span>
            </div>
            {/* Time */}
            <div className="flex items-center gap-8 mb-[20px]">
              <span className="font-bold">Time:</span>
              <span className="font-medium">2:00 PM</span>
            </div>
            {/* Platform */}
            <div className="w-[50%] space-y-4">
              <h3 className="font-bold text-[20px]">Platform</h3>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CustomCheckBox name="wuuzuf" accentColor="#2A2B2A" />
                  <label htmlFor="wuuzuf">Wuuzuf</label>
                </div>
                <div className="flex items-center">
                  <CustomCheckBox name="linked-in" accentColor="#2A2B2A" />
                  <label htmlFor="linked-in">Linked In</label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[3.5vh] flex justify-end">
            <CustomBtn
              btnColor="black"
              word="Dashboard"
              paddingVal="px-[1.5vw] py-[0.5vw]"
              href="/hr/dashboard"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
