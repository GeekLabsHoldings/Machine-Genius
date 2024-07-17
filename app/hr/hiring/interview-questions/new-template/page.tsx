"use client";
import React, { useState } from "react";
import styles from "./new-template.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";

const addIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z"
      fill="#FFFFFB"
    />
  </svg>
);

const page = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Chose Brand Select */}
      {/* Container for adding a new interview template */}
      <div
        className={
          "flex flex-col h-[75vh] py-[1.5vw] " + styles.add_new_template
        }
      >
        {/* Header Section */}
        {/* Header containing the template name input */}
        <div className={styles.header}>
          <div className={styles.template_name}>
            <input type="text" placeholder="Template Title*" />
          </div>
        </div>

        {/* Template Cards */}
        {/* Grid of editable question and answer cards */}
        <div className={styles.template_cards + " grid grid-cols-4 gap-[1vw]"}>
          {/* Editable Card */}
          {/* Individual card for a question and answer */}
          <div className={styles.card + " " + styles.editable}>
            {/* Card Header */}
            {/* Header of the card containing the question input */}
            <div className={styles.card_header}>
              <input type="text" placeholder="Question*" />
              {/* Edit Button */}
              {/* Button to edit the question */}
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.0983 15.6111C13.7921 16.3049 14.9168 16.3049 15.6106 15.6111C16.3044 14.9173 16.3044 13.7926 15.6106 13.0988L10.586 8.07422L15.6106 3.04964C16.3044 2.35587 16.3044 1.23112 15.6106 0.537354C14.9168 -0.156415 13.7921 -0.156415 13.0983 0.537353L8.07373 5.56193L3.04915 0.537353C2.3554 -0.156403 1.23063 -0.156415 0.536865 0.537354C-0.156903 1.23112 -0.15689 2.35589 0.536865 3.04964L5.56144 8.07422L0.536865 13.0988C-0.156878 13.7925 -0.156903 14.9173 0.536865 15.6111C1.23063 16.3049 2.35541 16.3048 3.04915 15.6111L8.07373 10.5865L13.0983 15.6111Z"
                    fill="#ACACAC"
                  />
                </svg>
              </button>
            </div>

            {/* Card Body */}
            {/* Body of the card containing the answer textarea and save button */}
            <div className={styles.card_body}>
              <textarea placeholder="Answer" rows={3} />
              <CustomBtn word="Save" btnColor="black" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {/* Buttons to navigate or save the interview template */}
      <div className="flex justify-end items-center gap-[1vw]">
        {/* Add Question Button */}
        {/* Button to add a new question to the template */}
        <CustomBtn
          word="Add Question"
          btnColor="white"
          icon={addIcon}
          href=""
          paddingVal="px-[1.5vw] py-[0.5vw]"
        />

        {/* Save Template Button */}
        {/* Button to save the interview template */}
        <CustomBtn
          word="Save Template"
          btnColor="black"
          href=""
          paddingVal="px-[1.5vw] py-[0.5vw]"
        />
      </div>
    </div>
  );
};

export default Page;
