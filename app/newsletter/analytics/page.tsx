"use client"
import dynamic from "next/dynamic";
import styles from "./analytics.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
const TasksChart = dynamic(() => import("@/app/_components/graph/ComparisonChart"), {
  ssr:false
})




const page = () => {
  
  const options = ["Script", "Article", "Documentary", "Trends Article"];

  const data = [
    {
      date: "April 2024",
      info: [
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
      date: "March 2024",
      info: [
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
    <div className={`${styles.analytics} pt-[1vw] overflow-hidden`}>
      <div className={"tabs " + styles.tabs}>
        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Campaign Performance"
          defaultChecked
        />
        <div className={`tab-content py-[1.419vw]`}>
          <div className="w-[14.191vw] mb-[1.6vw]">
            <h3 className=" mb-[0.8vw]">Brand</h3>
            <CustomSelectInput label="Street Politics" options={options} />
          </div>
          <div>
            <h3 className=" mb-[1.1vw]">Campaigns</h3>
            <div className={`${styles.performanceTable} rounded-xl pt-[0.5vw]`}>
              <ul
                className={`${styles.tableHead} px-[5.4vw] border-b-[1px] border-b-[var(--dark)]`}
              >
                <li className="w-[40%]">Letter Name</li>
                <li className="w-[15%]">Letter Name</li>
                <li className="w-[15%]">Letter Name</li>
                <li className="w-[15%]">Letter Name</li>
                <li className="w-[15%]">Letter Name</li>
              </ul>
              <div
                className={`${styles.tableBody} max-h-[50vh] overflow-y-auto`}
              >
                {data.map((e, i) => (
                  <div>
                    <div className=" bg-[#E1C655] text-white text-end px-[1.5vw] py-[0.3vw] ">
                      {e.date}
                    </div>
                    {e.info.map((info, i) => (
                      <ul
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

        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Audience Growth"
        />
        <div className={`tab-content py-[1.419vw]`}>
          <div className="w-[14.191vw] mb-[1.6vw]">
            <h3 className=" mb-[0.8vw]">Brand</h3>
            <CustomSelectInput label="Street Politics" options={options} />
          </div>
          <div className=" w-[50%">
            <h3 className=" mb-[1.1vw]]">Audience Growth Graph</h3>
            <TasksChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
