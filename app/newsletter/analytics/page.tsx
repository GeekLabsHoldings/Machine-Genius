"use client";
import dynamic from "next/dynamic";
import styles from "./analytics.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
const TasksChart = dynamic(
  () => import("@/app/_components/graph/ComparisonChart"),
  {
    ssr: false,
  }
);

const Page = () => {
  // Define an array of options for the custom select input
const options = ["Script", "Article", "Documentary", "Trends Article"];

// Define an array of data for newsletter analytics
const data = [
  {
    date: "April 2024", // Date of the newsletter batch
    info: [ // Array of information for each newsletter in the batch
      {
        letterName: "TRENDING OTC w/ PARTNERSHIP", // Name of the newsletter
        OpenRate: "12.3%", // Open rate of the newsletter
        LinkClicks: "8", // Number of link clicks in the newsletter
        Audience: "500", // Size of the audience for the newsletter
        Unsubscribes: "2", // Number of unsubscribes from the newsletter
      },
      {
        letterName: "TRENDING OTC w/ PARTNERSHIP",
        OpenRate: "12.3%",
        LinkClicks: "8",
        Audience: "500",
        Unsubscribes: "2",
      },
      {
        letterName: "TRENDING OTC w/ PARTNERSHIP",
        OpenRate: "12.3%",
        LinkClicks: "8",
        Audience: "500",
        Unsubscribes: "2",
      },
      {
        letterName: "TRENDING OTC w/ PARTNERSHIP",
        OpenRate: "12.3%",
        LinkClicks: "8",
        Audience: "500",
        Unsubscribes: "2",
      },
    ],
  },
  {
    date: "March 2024", // Date of the newsletter batch
    info: [ // Array of information for each newsletter in the batch
      {
        letterName: "TRENDING OTC w/ PARTNERSHIP", // Name of the newsletter
        OpenRate: "12.3%", // Open rate of the newsletter
        LinkClicks: "8", // Number of link clicks in the newsletter
        Audience: "500", // Size of the audience for the newsletter
        Unsubscribes: "2", // Number of unsubscribes from the newsletter
      },
      {
        letterName: "TRENDING OTC w/ PARTNERSHIP",
        OpenRate: "12.3%",
        LinkClicks: "8",
        Audience: "500",
        Unsubscribes: "2",
      },
      {
        letterName: "TRENDING OTC w/ PARTNERSHIP",
        OpenRate: "12.3%",
        LinkClicks: "8",
        Audience: "500",
        Unsubscribes: "2",
      },
      {
        letterName: "TRENDING OTC w/ PARTNERSHIP",
        OpenRate: "12.3%",
        LinkClicks: "8",
        Audience: "500",
        Unsubscribes: "2",
      },
    ],
  },
];


  return (
    // Container div with analytics class and padding-top and overflow-hidden styles
    <div className={`${styles.analytics} pt-[1vw] overflow-hidden`}>
      {/* Container div for tabs */}
      <div className={"tabs " + styles.tabs}>
        {/* Radio input for the first tab (Campaign Performance) */}
        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Campaign Performance"
          defaultChecked
        />

        {/* Content for the first tab */}
        <div className={`tab-content py-[1.419vw]`}>
          <div className="w-[14.191vw] mb-[1.6vw]">
            <h3 className=" mb-[0.8vw]">Brand</h3>
            {/* Custom select input component */}
            <CustomSelectInput label="Street Politics" options={options} />
          </div>

          <div>
            <h3 className=" mb-[1.1vw]">Campaigns</h3>
            {/* Performance table container with styles and padding */}
            <div className={`${styles.performanceTable} rounded-xl pt-[0.5vw]`}>
              {/* Table head with specific styles and border */}
              <ul
                className={`${styles.tableHead} px-[5.4vw] border-b-[1px] border-b-[var(--dark)]`}
              >
                <li className="w-[40%]">Letter Name</li>
                <li className="w-[15%]">Letter Name</li>
                <li className="w-[15%]">Letter Name</li>
                <li className="w-[15%]">Letter Name</li>
                <li className="w-[15%]">Letter Name</li>
              </ul>

              {/* Table body with max height and vertical scroll */}
              <div
                className={`${styles.tableBody} max-h-[50vh] overflow-y-auto`}
              >
                {/* Loop through data to display each entry */}
                {data.map((e, i) => (
                  <div key={i}>
                    {/* Date section with background and text styles */}
                    <div className=" bg-[#E1C655] text-white text-end px-[1.5vw] py-[0.3vw] ">
                      {e.date}
                    </div>
                    {/* Loop through each info item within data */}
                    {e.info.map((info, i) => (
                      <ul
                        key={i}
                        className={` px-[5.4vw] border-b-[1px] border-b-[#D9D9D9] `}
                      >
                        <li className="w-[40%] underline border-b-[#D9D9D9]">
                          {info.letterName}
                        </li>
                        <li className="w-[15%]">{info.OpenRate}</li>
                        <li className="w-[15%]">{info.LinkClicks}</li>
                        <li className="w-[15%]">{info.Audience}</li>
                        <li className="w-[15%]">{info.Unsubscribes}</li>
                      </ul>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Radio input for the second tab (Audience Growth) */}
        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Audience Growth"
        />

        {/* Content for the second tab */}
        <div className={`tab-content py-[1.419vw]`}>
          <div className="w-[14.191vw] mb-[1.6vw]">
            <h3 className=" mb-[0.8vw]">Brand</h3>
            {/* Custom select input component */}
            <CustomSelectInput label="Street Politics" options={options} />
          </div>

          <div className=" w-[50%}">
            <h3 className=" mb-[1.3vw]">Audience Growth Graph</h3>
            {/* Flex container for chart and analytics table */}
            <div className=" flex gap-[2.2vw] w-full mb-2">
              {/* Chart container with styles */}
              <div
                className={`${styles.chartBox} analyticsChart w-[50%] relative rounded-xl pt-[1vw] h-auto`}
              >
                <TasksChart />
              </div>

              {/* Analytics table with styles and padding */}
              <div
                className={`${styles.analyticsTable} w-[45%] rounded-xl bg-black py-[2vw] px-[1.7vw] text-white`}
              >
                <h3 className=" mb-[1.7vw]">News Letter Analytics</h3>
                <div className={`${styles.analyticsTable}`}>
                  <div>
                    {/* Table head with flex layout and spacing */}
                    <ul
                      className={`${styles.head} mb-[0.5vw] flex items-center justify-between`}
                    >
                      <li className="w-[40%]"></li>
                      <li className="w-[30%]">This Month</li>
                      <li className="w-[30%]">Last Month</li>
                    </ul>
                  </div>

                  <div>
                    {/* Loop through analytics data to display each row */}
                    <ul
                      className={`${styles.body} flex items-center justify-between mb-[1vw] `}
                    >
                      <li className="w-[40%]">Published NewsLetters</li>
                      <li className="w-[30%]">35</li>
                      <li className="w-[30%]">35</li>
                    </ul>
                    <ul
                      className={`${styles.body} flex items-center justify-between mb-[1vw] `}
                    >
                      <li className="w-[40%]">Published NewsLetters</li>
                      <li className="w-[30%]">35</li>
                      <li className="w-[30%]">35</li>
                    </ul>
                    <ul
                      className={`${styles.body} flex items-center justify-between mb-[1vw] `}
                    >
                      <li className="w-[40%]">Published NewsLetters</li>
                      <li className="w-[30%]">35</li>
                      <li className="w-[30%]">35</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
