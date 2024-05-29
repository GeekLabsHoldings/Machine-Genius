"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import React from "react";

export default function page() {

  const addIcons = (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.59196 10.1285C4.58691 10.6348 4.99319 11.0492 5.49944 11.0543C6.00569 11.0593 6.42016 10.653 6.4252 10.1468L6.46176 6.48032L10.1282 6.51687C10.6345 6.52192 11.049 6.11564 11.054 5.60939C11.059 5.10314 10.6528 4.68867 10.1465 4.68363L6.48003 4.64707L6.51658 0.980589C6.52163 0.474348 6.11535 0.0598763 5.6091 0.0548292C5.10285 0.0497822 4.68839 0.456071 4.68334 0.962312L4.64679 4.6288L0.980305 4.59224C0.474074 4.5872 0.0595928 4.99348 0.0545458 5.49973C0.0494987 6.00598 0.455797 6.42044 0.962029 6.42549L4.62851 6.46204L4.59196 10.1285Z" fill="#2A2B2A"/>
  </svg>
  );

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
            <CustomSelectInput options={options} label={"Lists"} />
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
