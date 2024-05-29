"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import AssignToListSelectInput from "@/app/_components/SEO/01KeywordResearch/AssignToListSelectInput";
import React from "react";

export default function page() {

  const options = [
    "Send To Sales Team",
    "Escalate To Manager",
    "Send To Sales Team",
    "Escalate To Manager",
    "Create New List"
  ];

  return (
    <section>
      <div className=" flex justify-center items-center h-[75vh]">
        <div>
          <h3 className="text-[40px] font-bold mb-[1.5vh] text-center">
            Assign to List
          </h3>
          <div className="min-w-[40vh]">
            <AssignToListSelectInput options={options} label={"Lists"} />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href="/seo/keyword-research"
        />
        <CustomBtn word={"Start Research"} btnColor="black" />
      </div>
    </section>
  );
}
