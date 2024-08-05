"use client";
import styles from "./income-statement.module.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const revenue = [
    { category: "total sales", 2022: 48200, 2023: 48200, 2024: 48200 },
  ];

  const nonOperating = [
    { category: "Rental Income", 2022: 48200, 2023: 48200, 2024: 48200 },
  ];

  const OperatingExpenses = [
    { category: "Cost of Goods Sold", 2022: 48200, 2023: 48200, 2024: 48200 },
    { category: "Employee Wages", 2022: 48200, 2023: 48200, 2024: 48200 },
    { category: "Marketing", 2022: 48200, 2023: 48200, 2024: 48200 },
    {
      category: "Selling, General, and Administrative (SG&A)",
      2022: 48200,
      2023: 48200,
      2024: 48200,
    },
    {
      category: "Software & Subscriptions",
      2022: 48200,
      2023: 48200,
      2024: 48200,
    },
    { category: "Human Resources", 2022: 48200, 2023: 48200, 2024: 48200 },
    { category: "Supporting Staff", 2022: 48200, 2023: 48200, 2024: 48200 },
    {
      category: "Research & Development (R&D)",
      2022: 48200,
      2023: 48200,
      2024: 48200,
    },
    { category: "Gross Profits", 2022: 48200, 2023: 48200, 2024: 48200 },
    { category: "Gains", 2022: 48200, 2023: 48200, 2024: 48200 },
    { category: "Losses", 2022: 48200, 2023: 48200, 2024: 48200 },
    { category: "Lawsuits", 2022: 48200, 2023: 48200, 2024: 48200 },
    { category: "Operating Income", 2022: 48200, 2023: 48200, 2024: 48200 },
    { category: "Interest Expense", 2022: 48200, 2023: 48200, 2024: 48200 },
    {
      category: "Income Before Income Taxes",
      2022: 48200,
      2023: 48200,
      2024: 48200,
    },
    {
      category: "Provision for income taxes",
      2022: 48200,
      2023: 48200,
      2024: 48200,
    },
    {
      category: "Net Income",
      2022: 48200,
      2023: 48200,
      2024: 48200,
    },
    {
      category: "Basic Earnings Per Share",
      2022: 48200,
      2023: 48200,
      2024: 48200,
    },
    {
      category: "Diluted Earnings Per Share",
      2022: 48200,
      2023: 48200,
      2024: 48200,
    },
    {
      category: "Weighted average shares used in calculations",
      2022: 48200,
      2023: 48200,
      2024: 48200,
    },
  ];

  return (
    <div className={`${styles.income} pt-[0.6vw]`}>
      <div
        className="flex gap-2 mb-[0.8vw] items-center cursor-pointer w-fit space-x-4 mt-[25px]"
        onClick={() => {
          router.back();
        }}
      >
        <svg
          width="11"
          height="22"
          viewBox="0 0 11 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 20.8993L11 1.09878C10.9996 0.898304 10.9627 0.701801 10.8932 0.530416C10.8237 0.359031 10.7244 0.219253 10.6058 0.126133C10.4873 0.03301 10.354 -0.00993011 10.2203 0.0019317C10.0867 0.0137935 9.95773 0.080009 9.84734 0.19345L0.296979 10.0937C-0.0989937 10.504 -0.0989937 11.4919 0.296979 11.9033L9.84734 21.8036C9.9575 21.9182 10.0865 21.9854 10.2204 21.9979C10.3543 22.0104 10.4879 21.9677 10.6067 21.8745C10.7255 21.7813 10.825 21.6411 10.8943 21.4692C10.9637 21.2973 11.0002 21.1002 11 20.8993Z"
            fill="#2A2B2A"
          />
        </svg>
        <h2 className="text-[2rem] w-max font-bold">
          {" "}
          Income Statement, Q4, 2024
        </h2>

      </div>
      <div className={`${styles.statement} pt-[0.8vw] rounded-xl`}>
        <div className="text-center">
          <h4>Juice Box Inc.</h4>
          <h4>CONSOLIDATED STATMENT OF OPERATIONS</h4>
          <h4>(In millions)</h4>
        </div>
        <div>
          <div className=" text-end ms-auto ">
            <div className="flex justify-end">
              <h5 className=" px-[1.5vw] py-[0.5vw] border-b-2 border-b-[var(--dark)] w-fit text-end font-medium">
                Years ended December 30
              </h5>
            </div>
            <div className=" flex gap-14 items-center justify-end py-[0.1vw] px-5">
              <span>2022</span>
              <span>2023</span>
              <span>2024</span>
            </div>
          </div>
        </div>
        <div className=" bg-[#006699] flex justify-between items-center px-[0.5vw] ">
          <h4 className="text-white">Operating Revenue</h4>
        </div>
        {revenue.map((e, i) => (
          <div className=" flex justify-between items-center px-[0.5vw] py-[0.1vw] ">
            <h4 className="font-medium">{e.category}</h4>
            <div className="  gap-11 flex justify-end items-center font-normal px-2">
              <span className="before:content-['$'] before:absolute before:-left-[16px] relative">
                {e[2022]}
              </span>
              <span className="before:content-['$'] before:absolute before:-left-[16px] relative">
                {e[2023]}
              </span>
              <span className="before:content-['$'] before:absolute before:-left-[16px] relative">
                {e[2024]}
              </span>
            </div>
          </div>
        ))}
        <div className=" bg-[#006699] flex justify-between items-center px-[0.5vw] ">
          <h4 className="text-white">Non-Operating Revenue</h4>
        </div>
        {nonOperating.map((e, i) => (
          <div className=" flex justify-between items-center px-[0.5vw] py-[0.1vw] ">
            <h4 className="font-medium">{e.category}</h4>
            <div className="  gap-11 flex justify-end items-center font-normal px-2">
              <span>{e[2022]}</span>
              <span>{e[2023]}</span>
              <span>{e[2024]}</span>
            </div>
          </div>
        ))}
        <div className=" bg-[#006699] flex justify-between items-center px-[0.5vw] ">
          <h4 className="text-white">Operating Expenses</h4>
        </div>
        {OperatingExpenses.map((e, i) => (
          <div
            className={`${
              i % 2 !== 0 ? "bg-[#EAEAEA]" : ""
            } flex justify-between items-center px-[0.5vw] py-[0.1vw] `}
          >
            <h4 className="font-medium">{e.category}</h4>
            <div
              className={`${
                e.category == "Net Income" ||
                e.category == "Basic Earnings Per Share" ||
                e.category == "Diluted Earnings Per Share" ||
                e.category == "Weighted average shares used in calculations"
                  ? "border-t-[1px] border-[var(--dark)]"
                  : ""
              }  gap-11 flex justify-end items-center font-normal px-2`}
            >
              <span
                className={`${
                  e.category == "Net Income" ||
                  e.category == "Basic Earnings Per Share" ||
                  e.category == "Diluted Earnings Per Share" ||
                  e.category == "Weighted average shares used in calculations"
                    ? "before:content-['$'] before:absolute before:-left-[16px]"
                    : ""
                } relative`}
              >
                {e[2022]}
              </span>
              <span
                className={`${
                  e.category == "Net Income" ||
                  e.category == "Basic Earnings Per Share" ||
                  e.category == "Diluted Earnings Per Share" ||
                  e.category == "Weighted average shares used in calculations"
                    ? "before:content-['$'] before:absolute before:-left-[16px]"
                    : ""
                } relative`}
              >
                {e[2023]}
              </span>
              <span
                className={`${
                  e.category == "Net Income" ||
                  e.category == "Basic Earnings Per Share" ||
                  e.category == "Diluted Earnings Per Share" ||
                  e.category == "Weighted average shares used in calculations"
                    ? "before:content-['$'] before:absolute before:-left-[16px]"
                    : ""
                } relative`}
              >
                {e[2024]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
