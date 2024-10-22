"use client";
import React, { useEffect, useState } from "react";
import styles from "./KPIsTable.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";

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

export default function Page() {
  return (
    <section>
      {/* ===== Start Page Header ===== */}
      <div className="pageHeader">
        <h3 className="mt-[25px]">KPI Overview</h3>

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
      {/* ===== End Page Header ===== */}

      {/* ===== Start KPIs Table ===== */}
      <div className={styles.kpis_table + " overflow-hidden rounded-[20px]"}>
        <div className={styles.table_container}>
          <table>
            <thead>
              <tr>
                <th className="w-[15vw]">Platform</th>
                <th colSpan={2}>KPI</th>
                <th>KPI Required</th>
                <th>KPI Met</th>
                <th>KPI Required</th>
                <th>KPI Met</th>
                <th>KPI Required</th>
                <th>KPI Met</th>
                <th>KPI Required</th>
                <th>KPI Met</th>
                <th>KPI Required</th>
                <th>KPI Met</th>
                <th>KPI Required</th>
                <th>KPI Met</th>
                <th>KPI Required</th>
                <th>KPI Met</th>
                <th>KPI Required</th>
                <th>KPI Met</th>
                <th>KPI Required</th>
                <th>KPI Met</th>
                <th>KPI Required</th>
                <th>KPI Met</th>
                <th>KPI Required</th>
                <th>KPI Met</th>
                <th>KPI Required</th>
                <th>KPI Met</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={9} className="platform-header">
                  YouTube
                </td>
                <td colSpan={2} rowSpan={2}>
                  Video Watch %
                </td>
                <td colSpan={2}>January</td>
                <td colSpan={2}>February</td>
                <td colSpan={2}>March</td>
                <td colSpan={2}>April</td>
                <td colSpan={2}>May</td>
                <td colSpan={2}>June</td>
                <td colSpan={2}>July</td>
                <td colSpan={2}>August</td>
                <td colSpan={2}>September</td>
                <td colSpan={2}>October</td>
                <td colSpan={2}>November</td>
                <td colSpan={2}>December</td>
              </tr>
              <tr>
                <td>50%</td>
                <td>
                  50% <span className="arrow-up">&#9650;</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>No. Of Videos/Day</td>
                <td>3</td>
                <td>
                  3 <span className="arrow-up">&#9650;</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Minimum CTR/Per Video 24Hrs</td>
                <td>60%</td>
                <td>
                  60% <span className="arrow-up">&#9650;</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Minimum Views/Video</td>
                <td>3000</td>
                <td>
                  3000 <span className="arrow-down">&#9660;</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Posted on Time</td>
                <td>2</td>
                <td>
                  2 <span className="arrow-up">&#9650;</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>No. of Shorts/Day</td>
                <td>2</td>
                <td>
                  2 <span className="arrow-down">&#9660;</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Community Posts</td>
                <td>1</td>
                <td>
                  1 <span className="arrow-up">&#9650;</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Channel Subscribers</td>
                <td>26K</td>
                <td>
                  26K <span className="arrow-up">&#9650;</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {/* <tr>
                
            </tr> */}
              <tr>
                <td rowSpan={4} className="platform-header">
                  Twitter
                </td>
                <td colSpan={1} rowSpan={2}>
                  No. of Comments/Day
                </td>
                <td>No of Comments</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>No of Comments</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={1} rowSpan={2}>
                  Posts/Day
                </td>
                <td>No of Comments</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>No of Comments</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td rowSpan={2} className="platform-header">
                  Telegram
                </td>
                <td colSpan={2}>Channel</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>Group</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* ===== End KPIs Table ===== */}
    </section>
  );
}
