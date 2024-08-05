"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import WebsiteToAuditSelectInput from "@/app/_components/SEO/05WebsiteAudit/WebsiteToAuditSelectInput";
import React from "react";

export default function Page() {
  return (
    <section>
      <div className=" flex justify-center items-center h-[75vh]">
        <div>
          <h3 className="text-[40px] font-bold mb-[1.5vh]">
            Select a website to audit
          </h3>
          <WebsiteToAuditSelectInput options={[]} label={"Website"} />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <CustomBtn word={"Next"} btnColor="black" />
      </div>
    </section>
  );
}
