"use client";
import React from "react";
import styles from "./phone-interview-questionnaire.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import ShortListTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/ShortListTable";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

export default function page() {
  return (
    <section className="w-[90vw]">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <span className="text-[32px] font-bold">
          Phone Interview Questionnaire
        </span>
      </div>

      <div className="h-[70vh] flex align-center justify-between w-full">
        <div className="w-[49%] h-full">
          <ShortListTable />
        </div>

        {/* Question Container */}
        <div
          className={
            styles.questionContainer +
            " w-[49%] h-full border p-7 flex flex-col"
          }
        >
          {/* Questions Title */}
          <h3 className="font-bold text-[20px] mb-[1.5vh]">Questions:</h3>

          {/* Questions List */}
          <div className="space-y-6 max-h-[55vh] overflow-y-auto">
            {/* Question 1 */}
            <div className="flex flex-col">
              <label
                className="font-bold mb-[1.5vh] block"
                htmlFor="tell-me-about-yourself"
              >
                1. Tell me more about yourself:
              </label>
              {/* Textarea for answering question 1 */}
              <textarea
                name="tell-me-about-yourself"
                id="tell-me-about-yourself"
                cols={30}
                rows={5}
              ></textarea>
            </div>

            {/* Question 2 */}
            <div className="flex flex-col">
              <label
                className="font-bold mb-[1.5vh] block"
                htmlFor="where-do-you-see-yourself"
              >
                2. Where do you see yourself in 5 years?
              </label>
              {/* Textarea for answering question 2 */}
              <textarea
                name="where-do-you-see-yourself"
                id="where-do-you-see-yourself"
                cols={30}
                rows={5}
              ></textarea>
            </div>

            {/* Question 3 */}
            <div className="flex flex-col">
              <label className="font-bold mb-[1.5vh] block" htmlFor="exp-in-pr">
                3. Do you have experience in PR?
              </label>
              {/* Input field for answering question 3 */}
              <input name="exp-in-pr" id="exp-in-pr" type="text"></input>
            </div>

            {/* Question 4 */}
            <div className="flex flex-col">
              <label
                className="font-bold mb-[1.5vh] block"
                htmlFor="exp-in-after-effects"
              >
                4. Do you have experience in Adobe After Effects?
              </label>
              {/* Input field for answering question 4 */}
              <input
                name="exp-in-after-effects"
                id="exp-in-after-effects"
                type="text"
              ></input>
            </div>
          </div>
          <hr className={styles.divider + " my-[2.5vh]"} />
          {/* Action Buttons */}
          <div className="flex justify-between gap-4">
            <CustomBtn
              word={"Reject"}
              btnColor="white"
              width="w-full"
            />
            <CustomBtn
              word={"Task List"}
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
          href="/hr/hiring/job-openings/short-list"
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href="/hr/hiring/job-openings/send-task"
        />
      </div>
    </section>
  );
}
