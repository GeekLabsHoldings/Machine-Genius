"use client";
import React, { useEffect, useState } from "react";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import KPIsTable from "@/app/_components/OP/KPIs/KPIsTable";

export default function Page() {
  // options
  const brandOptions: string[] = [
    "Street Politics",
    "Street Politics",
    "Street Politics",
    "Street Politics",
    "Street Politics",
    "Street Politics",
    "Street Politics",
  ];

  return (
    <section>
      {/* Page Header */}
      <div className="pageHeader">
        <h3 className="mt-[25px]">KPI Over View</h3>

        {/* Search & Filter Options & Buttons Container */}
        <div className="flex justify-between items-end w-full mt-[10px] mb-[25px]">
          {/* Search and Filter Options Section */}
          <div className={`w-8/12 flex items-center gap-[1.2vw]`}>
            {/* Filter Options */}
            <div className="flex flex-col w-1/4 gap-[0.3vw]">
              <label className="font-bold" htmlFor="">
                Select Brands
              </label>
              <CustomSelectInput
                label="Street Politics"
                options={brandOptions}
              />
            </div>
            <div className="flex flex-col w-1/4 gap-[0.3vw]">
              <label className="font-bold" htmlFor="">
                Select Sub-Brand
              </label>

              <CustomSelectInput label="Canada" options={["Canada"]} />
            </div>
          </div>
        </div>
      </div>

      {/* Employee On-Boarding Table */}
      <KPIsTable />
    </section>
  );
}
