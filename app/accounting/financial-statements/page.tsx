"use client";

import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import styles from "./financial-statements.module.css";
import { useState } from "react";
import Link from "next/link";

function FinancialTable1() {
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
      <div className={`${styles.tableContainer} h-[68vh] `}>
        <div className="flex flex-col w-full gap-1 py-8 text-center text-xs justify-center items-center">
          <h3 className="text-xs">Juice Box Inc.</h3>
          <h4>
            CONSOLIDATED BALANCE SHEETS
            <br />
            (In millions)
          </h4>
        </div>
        <header className="flex flex-col">
          <ul className="flex w-full text-center items-center justify-center">
            <li className="w-[50%]"></li>
            <li className="w[25%]">
              <h4>
                March 20 <br /> 2023
              </h4>
            </li>
            <li className="w-[25%]">
              <h4>
                March 20 <br /> 2024
              </h4>
            </li>
          </ul>
        </header>
        <div className="h-[80%] overflow-y-auto">
          <ul className="flex w-full text-left bg-[#006699] text-[#fffffb] items-center justify-start">
            <li className={`${styles.headerRow}`}>ASSETS:</li>
          </ul>
          {AssetsData.map((item, i) => (
            <>
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
              <ul className="flex w-full text-left text-[#2A2B2A] items-center justify-start">
                <li className="w-[50%]">Total {item.category}</li>
                <li
                  className={`w-[25%] relative border-t border-solid border-[var(--dark)] ${styles.totalAmount}`}
                >
                  {item.total.March_2023}
                  <span className="absolute left-0">$</span>
                </li>
                <li
                  className={`w-[25%]  relative  border-t border-solid border-[var(--dark)] ${styles.totalAmount}`}
                >
                  {item.total.March_2024}
                  <span className="absolute left-0">$</span>
                </li>
              </ul>
            </>
          ))}
          {/* LIABILITIES */}
          <ul className="flex w-full text-left bg-[#006699] text-[#fffffb] items-center justify-start">
            <li className={`${styles.headerRow}`}>LIABILITIES:</li>
          </ul>
          {LiabilitiesData.map((item, i) => (
            <>
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
              <ul
                className={`flex  w-full text-left text-[#2A2B2A] items-center justify-start ${styles.totalAmount}`}
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
            </>
          ))}
        </div>
      </div>
    </>
  );
}

function FinancialTable() {
  const data = [
    {
      year: 2024,
      quarters: [
        {
          quarter: "Quarter 1",
        },
        {
          quarter: "Quarter 2",
        },
        {
          quarter: "Quarter 3",
        },
        {
          quarter: "Quarter 4",
        },
      ],
    },
    {
      year: 2023,
      quarters: [
        {
          quarter: "Quarter 1",
        },
        {
          quarter: "Quarter 2",
        },
        {
          quarter: "Quarter 3",
        },
        {
          quarter: "Quarter 4",
        },
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
              {item.quarters.map((e, idx) => (
                <ul
                  key={idx}
                  className={`group ${i % 2 == 0 ? "bg-[#EAEAEA]" : ""}`}
                >
                  <li className="w-[25%]">
                    <span>{e.quarter}</span>
                  </li>
                  <li className="w-[25%]">
                    <span className="flex flex-col gap-1 w-full">
                      <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                        <Link
                          href={"/accounting/financial-statements/balance-sheet"}
                        >
                          Preview
                        </Link>
                      </button>
                      <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                        <Link href={""}>Download as PDF</Link>
                      </button>
                    </span>
                  </li>
                  <li className="w-[25%]">
                    <span className="flex flex-col gap-1 w-full">
                      <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                        <Link
                          href={
                            "/accounting/financial-statements/cash-flow-statement"
                          }
                        >
                          Preview
                        </Link>
                      </button>
                      <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                        <Link href={""}>Download as PDF</Link>
                      </button>
                    </span>
                  </li>
                  <li className="w-[25%]">
                    <span className="flex flex-col gap-1 w-full">
                      <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                        <Link
                          href={
                            "/accounting/financial-statements/income-statement"
                          }
                        >
                          Preview
                        </Link>
                      </button>
                      <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                        <Link href={""}>Download as PDF</Link>
                      </button>
                    </span>
                  </li>
                </ul>
              ))}
              <ul
                key={i}
                className={`group ${i % 2 == 0 ? "bg-[#EAEAEA]" : ""}`}
              >
                <li className="w-[25%]">
                  <span className="flex">{item.year}</span>
                </li>
                <li className="w-[25%]">
                  <span className="flex flex-col gap-1 w-full">
                    <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                      <Link
                        href={"/accounting/financial-statements/balance-sheet"}
                      >
                        Preview
                      </Link>
                    </button>
                    <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                      <Link href={""}>Download as PDF</Link>
                    </button>
                  </span>
                </li>
                <li className="w-[25%]">
                  <span className="flex flex-col gap-1 w-full">
                    <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                      <Link
                        href={
                          "/accounting/financial-statements/cash-flow-statement"
                        }
                      >
                        Preview
                      </Link>
                    </button>
                    <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                      <Link href={""}>Download as PDF</Link>
                    </button>
                  </span>
                </li>
                <li className="w-[25%]">
                  <span className="flex flex-col gap-1 w-full">
                    <button className="h-full bg-[var(--dark)] text-[#fffffb] rounded w-full py-2 px-1 group-hover:text[var(--dark)] group-hover:bg-[#fffffb]">
                      <Link
                        href={
                          "/accounting/financial-statements/income-statement"
                        }
                      >
                        Preview
                      </Link>
                    </button>
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

const page = () => {
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
            {/* BUTTON MODALS HERE */}
            <div className="flex gap-2">
              {/* open modal to enable you to Create Ticket  */}
              {/* <CreateTicketModal btnWord={'Create Ticket'} btnIcon={<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z" fill="#FFFFFB" />
                  </svg>} btnColor={'black'} modalTitle={'Create Ticket'} /> */}
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

export default page;
