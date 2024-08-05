"use client"; // Indicates that this file is a client-side component

import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput"; // Importing a custom select input component
import styles from "./financial-statements.module.css"; // Importing CSS module for styling
import { useState } from "react"; // Importing useState hook from React
import Link from "next/link"; // Importing Link component from Next.js for navigation

function FinancialTable1() {
  // Data for assets
  const AssetsData = [
    {
      category: "Current Assets",
      items: [
        {
          name: "Cash And Cash Equivalents",
          March_2023: 48200,
          March_2024: 48200,
        },
        { name: "Marketable Securities", March_2023: 36522, March_2024: 36522 },
        { name: "Accounts Receivable", March_2023: 67535, March_2024: 67535 },
        { name: "Inventory", March_2023: 54356, March_2024: 54356 },
        { name: "Prepaid Expenses", March_2023: 132345, March_2024: 132345 },
        { name: "Marketable Securities", March_2023: 12435, March_2024: 12435 },
      ],
      total: { March_2023: 48200, March_2024: 48200 },
    },
    {
      category: "Non-Current Assets",
      items: [
        { name: "Long-Term Investment", March_2023: 48200, March_2024: 48200 },
        { name: "Fixed Assets", March_2023: 67535, March_2024: 67535 },
        { name: "Intangible Assets", March_2023: 54356, March_2024: 54356 },
      ],
      total: { March_2023: 48200, March_2024: 48200 },
    },
  ];

  // Data for liabilities and shareholder equity
  const LiabilitiesData = [
    {
      category: "Current Liabilities",
      items: [
        { name: "Term Debt", March_2023: 48200, March_2024: 48200 },
        { name: "Interest Payable", March_2023: 36522, March_2024: 36522 },
        { name: "Wages Payable", March_2023: 67535, March_2024: 67535 },
        { name: "Customer Prepayments", March_2023: 54356, March_2024: 54356 },
        { name: "Dividends Payable", March_2023: 132345, March_2024: 132345 },
        { name: "Accounts Payable", March_2023: 12435, March_2024: 12435 },
        { name: "Prepaid Expenses", March_2023: 54356, March_2024: 54356 },
        {
          name: "Marketable Securities",
          March_2023: 132345,
          March_2024: 132345,
        },
      ],
      total: { March_2023: 48200, March_2024: 48200 },
    },
    {
      category: "Non-Current Liabilities",
      items: [
        { name: "Term Debt", March_2023: 48200, March_2024: 48200 },
        {
          name: "Deferred Tax Liability",
          March_2023: 48200,
          March_2024: 48200,
        },
      ],
      total: { March_2023: 48200, March_2024: 48200 },
    },
    {
      category: "Shareholder Equity",
      items: [
        { name: "Term Debt", March_2023: 48200, March_2024: 48200 },
        {
          name: "Deferred Tax Liability",
          March_2023: 48200,
          March_2024: 48200,
        },
      ],
      total: { March_2023: null, March_2024: null },
    },
  ];

  return (
    <>
      <div
        className={`${styles.tableContainer} ${styles.tableContainer1} h-[68vh]`}
      >
        {/* Header for the table */}
        <div className="flex flex-col w-full gap-1 pt-8 pb-4 text-center text-xs justify-center items-center">
          <h3 className="">Juice Box Inc.</h3>
          <h4 className="text-[0.7rem] font-bold">
            CONSOLIDATED BALANCE SHEETS
            <br />
            (In millions)
          </h4>
        </div>

        {/* Table column headers */}
        <header className="flex flex-col">
          <ul className="flex w-full text-center items-center justify-center">
            <li className="w-[50%]"></li>
            <li className="w[25%]">
              <h4 className="font-bold">
                March 20 <br /> 2023
              </h4>
            </li>
            <li className="w-[25%]">
              <h4 className="font-bold">
                March 20 <br /> 2024
              </h4>
            </li>
          </ul>
        </header>

        {/* Content section with scrolling */}
        <div className="h-[80%] overflow-y-auto">
          {/* Header row for assets section */}
          <ul className="flex w-full text-left bg-[#006699] text-[#fffffb] items-center justify-start">
            <li className={`${styles.headerRow}`}>ASSETS:</li>
          </ul>
          {AssetsData.map((item, i) => (
            <>
              {/* Asset category row */}
              <ul className="flex w-full text-left bg-[#0066994F] text-[#2A2B2A] items-center justify-start">
                <li className={`${styles.headerRow}`}>{item.category}</li>
              </ul>
              {item.items.map((e, idx) => (
                <ul
                  key={idx}
                  className={`group flex w-full text-left ${
                    idx % 2 == 0 ? "bg-[#EAEAEA]" : ""
                  }`}
                >
                  <li className={`w-[50%] ${styles.alignLeft}`}>{e.name}</li>
                  <li className="w-[25%] relative">
                    {e.March_2023}
                    {idx === 0 && <span className="absolute left-0">$</span>}
                  </li>
                  <li className="w-[25%] relative">
                    {e.March_2024}
                    {idx === 0 && <span className="absolute left-0">$</span>}
                  </li>
                </ul>
              ))}
              {/* Total for each asset category */}
              <ul className="flex w-full text-left text-[#2A2B2A] items-center justify-start">
                <li className="w-[50%]">Total {item.category}</li>
                <li
                  className={`w-[25%] relative border-t border-solid border-[var(--dark)] ${styles.totalAmount}`}
                >
                  {item.total.March_2023}
                  <span className="absolute left-0">$</span>
                </li>
                <li
                  className={`w-[25%] relative border-t border-solid border-[var(--dark)] ${styles.totalAmount}`}
                >
                  {item.total.March_2024}
                  <span className="absolute left-0">$</span>
                </li>
              </ul>
            </>
          ))}

          {/* Header row for liabilities section */}
          <ul className="flex w-full text-left bg-[#006699] text-[#fffffb] items-center justify-start">
            <li className={`${styles.headerRow}`}>LIABILITIES:</li>
          </ul>
          {LiabilitiesData.map((item, i) => (
            <>
              {/* Liability category row */}
              <ul className="flex w-full text-left bg-[#0066994F] text-[#2A2B2A] items-center justify-start">
                <li className={`${styles.headerRow}`}>{item.category}</li>
              </ul>
              {item.items.map((e, idx) => (
                <ul
                  key={idx}
                  className={`group flex w-full text-left ${
                    idx % 2 == 0 ? "bg-[#EAEAEA]" : ""
                  }`}
                >
                  <li className={`w-[50%] pl-16 ${styles.alignLeft}`}>
                    {e.name}
                  </li>
                  <li className="w-[25%] relative">
                    {e.March_2023}
                    {idx === 0 && <span className="absolute left-0">$</span>}
                  </li>
                  <li className="w-[25%] relative">
                    {e.March_2024}
                    {idx === 0 && <span className="absolute left-0">$</span>}
                  </li>
                </ul>
              ))}
              {/* Total for each liability category */}
              {item.total.March_2023 || item.total.March_2024 ? (
                <ul
                  className={`flex w-full text-left text-[#2A2B2A] items-center justify-start ${styles.totalAmount}`}
                >
                  <li className="w-[50%]">Total {item.category}</li>
                  <li
                    className={`w-[25%] relative border-t border-solid border-[var(--dark)] ${styles.totalAmount}`}
                  >
                    {item.total.March_2023}
                    <span className="absolute left-0">$</span>
                  </li>
                  <li
                    className={`w-[25%] relative border-t border-solid border-[var(--dark)] ${styles.totalAmount}`}
                  >
                    {item.total.March_2024}
                    <span className="absolute left-0">$</span>
                  </li>
                </ul>
              ) : null}
            </>
          ))}
        </div>
      </div>
    </>
  );
}

function FinancialTable() {
  // Data structure for storing financial data for the years 2024 and 2023
  const data = [
    {
      year: 2024,
      quarters: [
        { quarter: "Quarter 1" },
        { quarter: "Quarter 2" },
        { quarter: "Quarter 3" },
        { quarter: "Quarter 4" },
      ],
    },
    {
      year: 2023,
      quarters: [
        { quarter: "Quarter 1" },
        { quarter: "Quarter 2" },
        { quarter: "Quarter 3" },
        { quarter: "Quarter 4" },
      ],
    },
  ];

  return (
    <div className={`${styles.tableContainer} h-[68vh]`}>
      {/* Start Table */}
      <div className={styles.table + " max-w-full"} id="table">
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li className="w-[25%]">
            <span>Quarter/Year</span>
          </li>
          <li className="w-[25%]">
            <span>Balance Sheet</span>
          </li>
          <li className="w-[25%]">
            <span>Cash Flow Statement</span>
          </li>
          <li className="w-[25%]">
            <span>Income Statement</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {data.map((item, i) => (
            <>
              {/* Mapping through each quarter within the year */}
              {item.quarters.map((e, idx) => (
                <ul
                  key={idx}
                  className={`group ${i % 2 == 0 ? "bg-[#EAEAEA]" : ""}`}
                >
                  {/* Display quarter name */}
                  <li className="w-[25%]">
                    <span>{e.quarter}</span>
                  </li>
                  {/* Balance Sheet actions */}
                  <li className="w-[25%]">
                    <span className="flex flex-col gap-1 w-full">
                      {/* Preview button for Balance Sheet */}
                      <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                        <Link
                          href={
                            "/accounting/financial-statements/balance-sheet"
                          }
                        >
                          Preview
                        </Link>
                      </button>
                      {/* Download as PDF button for Balance Sheet */}
                      <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                        <Link href={""}>Download as PDF</Link>
                      </button>
                    </span>
                  </li>
                  {/* Cash Flow Statement actions */}
                  <li className="w-[25%]">
                    <span className="flex flex-col gap-1 w-full">
                      {/* Preview button for Cash Flow Statement */}
                      <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                        <Link
                          href={
                            "/accounting/financial-statements/cash-flow-statement"
                          }
                        >
                          Preview
                        </Link>
                      </button>
                      {/* Download as PDF button for Cash Flow Statement */}
                      <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                        <Link href={""}>Download as PDF</Link>
                      </button>
                    </span>
                  </li>
                  {/* Income Statement actions */}
                  <li className="w-[25%]">
                    <span className="flex flex-col gap-1 w-full">
                      {/* Preview button for Income Statement */}
                      <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                        <Link
                          href={
                            "/accounting/financial-statements/income-statement"
                          }
                        >
                          Preview
                        </Link>
                      </button>
                      {/* Download as PDF button for Income Statement */}
                      <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                        <Link href={""}>Download as PDF</Link>
                      </button>
                    </span>
                  </li>
                </ul>
              ))}
              {/* Year row */}
              <ul
                key={i}
                className={`group ${i % 2 == 0 ? "bg-[#EAEAEA]" : ""}`}
              >
                {/* Display year */}
                <li className="w-[25%]">
                  <span className="flex">{item.year}</span>
                </li>
                {/* Balance Sheet actions */}
                <li className="w-[25%]">
                  <span className="flex flex-col gap-1 w-full">
                    {/* Preview button for Balance Sheet */}
                    <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                      <Link
                        href={"/accounting/financial-statements/balance-sheet"}
                      >
                        Preview
                      </Link>
                    </button>
                    {/* Download as PDF button for Balance Sheet */}
                    <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                      <Link href={""}>Download as PDF</Link>
                    </button>
                  </span>
                </li>
                {/* Cash Flow Statement actions */}
                <li className="w-[25%]">
                  <span className="flex flex-col gap-1 w-full">
                    {/* Preview button for Cash Flow Statement */}
                    <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                      <Link
                        href={
                          "/accounting/financial-statements/cash-flow-statement"
                        }
                      >
                        Preview
                      </Link>
                    </button>
                    {/* Download as PDF button for Cash Flow Statement */}
                    <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                      <Link href={""}>Download as PDF</Link>
                    </button>
                  </span>
                </li>
                {/* Income Statement actions */}
                <li className="w-[25%]">
                  <span className="flex flex-col gap-1 w-full">
                    {/* Preview button for Income Statement */}
                    <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                      <Link
                        href={
                          "/accounting/financial-statements/income-statement"
                        }
                      >
                        Preview
                      </Link>
                    </button>
                    {/* Download as PDF button for Income Statement */}
                    <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                      <Link href={""}>Download as PDF</Link>
                    </button>
                  </span>
                </li>
              </ul>
            </>
          ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}

const Page = () => {
  const monthOptions: string[] = [
    "All",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div>
      <div className="pageHeader">
        <h3 className="mt-[25px]">Historical Statements</h3>
        {/* filters options to filter and edit data in table */}
        <div
          className={`flex flex-col gap-[0.7vw] w-full pageHeader my-[20px]`}
        >
          <div className="flex justify-between items-end">
            <div
              className={`${styles.ticketingPage} w-8/12 flex items-end gap-[1vw]`}
            >
              <div className="flex flex-col w-1/4 gap-[0.3vw]">
                <h5 className="text-base">Month</h5>
                <CustomSelectInput label="All" options={monthOptions} />
              </div>
              <div className="flex flex-col w-1/4 gap-[0.3vw]">
                <h5 className="text-base">Year</h5>
                <CustomSelectInput label="All" options={monthOptions} />
              </div>
              <div className="flex flex-col w-1/4 gap-[0.3vw]">
                <h5 className="text-base">Quarter</h5>
                <CustomSelectInput label="All" options={monthOptions} />
              </div>
              <div className="flex flex-col w-1/4 gap-[0.3vw]">
                <h5 className="text-base">balance Sheet Type</h5>
                <CustomSelectInput label="All" options={monthOptions} />
              </div>
              <div className="flex flex-col w-1/4 gap-[0.3vw]">
                <h5 className="text-base">Brand</h5>
                <CustomSelectInput label="All" options={monthOptions} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="basis-[60%] w-[60%]">
            <FinancialTable />
          </div>
          <div className="basis-[40%] w-[40%]">
            <FinancialTable1 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
