"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import TemplateBox from "@/app/_components/HR/03Personnel/00General/TemplateBox";
import React from "react";

export default function Page() {
  const addIcon = (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z"
        fill="#FFFFFB"
      />
    </svg>
  );

  return (
    <section>
      {/* Section Header */}
      <div className="flex justify-between items-center my-[1.5vw]">
        {/* Section Title */}
        <h2 className="text-[32px] font-bold">Templates</h2>

        {/* New Template Button */}
        <div>
          <CustomBtn
            icon={addIcon}
            word="New Template"
            btnColor="black"
            href="/hr/personnel/exit-interviews/new-template"
          />
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid lg:grid-cols-3 gap-[2vw] items-start">
        {/* Fired Employee Template */}
        <TemplateBox title="Fired Employee Template">
          {/* Commented-out content that may be template questions */}
          {/* <div>
        <p>1. What is your thinking process?</p>
        <p>2. What are your strengths?</p>
        <p>3. Describe your response to a certain situation.</p>
        <p>4. Are you a team player or a one-man show?</p>
        <p>5. What kind of work experiences do you have?</p>
        <p>6. Which editing software do you prefer?</p>
      </div> */}
        </TemplateBox>

        {/* Resigned Employee Template */}
        <TemplateBox title="Resigned Employee Template" />
      </div>
    </section>
  );
}
