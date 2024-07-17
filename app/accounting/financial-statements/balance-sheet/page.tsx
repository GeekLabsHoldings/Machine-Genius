"use client";

import styles from "./balance-sheet.module.css";
import { useRouter } from "next/navigation";

function FinancialTable() {
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
      <div
        className={`${styles.tableContainer} ${styles.tableContainer1} h-[68vh] w-full`}
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

function Page() {
  const router = useRouter();

  return (
    <div>
      <div className="pageHeader">
        <div className="flex justify-between mt-[25px]">
          <div
            className="flex items-center h-fit space-x-4 cursor-pointer"
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
              Balance Sheet, Q4, 2024{" "}
            </h2>

            <span className="bg-[#5FA85B] rounded p-1 px-4 text-white text-[.7rem] font-semibold">
              Balanced
            </span>
          </div>
          <div className={`flex flex-col gap-1 ${styles.ratios}`}>
            <span className="font-bold">Cash Ratio: 3</span>
            <span className="font-bold">Current Ratio: 3</span>
            <span className="font-bold">Debt to Equity Ratio: 3</span>
          </div>
        </div>
        {/* filters options to filter and edit data in table */}
        <div
          className={`flex flex-col gap-[0.7vw] w-full pageHeader my-[20px]`}
        >
          <div className="flex justify-between items-end">
            <div
              className={`${styles.ticketingPage} w-8/12 flex items-end gap-[1vw]`}
            ></div>
            {/* BUTTON MODALS HERE */}
            <div className="flex gap-2">
              {/* open modal to enable you to Create Ticket  */}
              {/* <CreateTicketModal btnWord={'Create Ticket'} btnIcon={<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z" fill="#FFFFFB" />
                  </svg>} btnColor={'black'} modalTitle={'Create Ticket'} /> */}
            </div>
          </div>
        </div>
        <div className="flex gap-5 w-full">
          <FinancialTable />
        </div>
      </div>
    </div>
  );
}

export default Page;
