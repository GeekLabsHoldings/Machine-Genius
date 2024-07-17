"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import React from "react";

export default function Page() {
  return (
    <section>
      <div className=" flex justify-center items-center h-[75vh]">
        <div>
          <h3 className="text-[40px] font-bold mb-[1.5vh]">
            Pick your Research Method
          </h3>
          <CustomSelectInput options={[]} label={"Research Method"} />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href="/seo/keyword-research/assign-to-list"
        />
      </div>
    </section>
  );
}
