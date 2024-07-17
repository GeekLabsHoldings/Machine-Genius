"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import WebsiteToCheckSelectInput from "@/app/_components/SEO/06WebsiteSpeed/WebsiteToCheckSelectInput";
import React from "react";

export default function Page() {
  return (
    <section>
      <div className=" flex justify-center items-center h-[75vh]">
        <div>
          <h3 className="text-[40px] font-bold mb-[1.5vh] text-center">
            Select a website to check speed
          </h3>
          <div className="min-w-[40vh]">
            <WebsiteToCheckSelectInput options={[""]} label={"Website"} />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href="/seo/website-speed/website-speed-result"
        />
      </div>
    </section>
  );
}
