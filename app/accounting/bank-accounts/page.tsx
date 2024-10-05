"use client";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import BankAccountCreator from "./BankAccountCreator";
import styles from "./bank-accounts.module.css";
import Link from "next/link";
import { truncateText } from "@/app/_utils/text";
import { globalContext } from "@/app/_context/store";
import { useContext, useEffect, useState } from "react";

const getRandomColor = () => {
  const colors = [
    "#31B2E9B2",
    "#E1C655B2",
    "#5FA85BB5",
    "#E9313EB2",
    "#F36F24B2",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

interface BankAccount {
  _id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  ApiConnect: string;
  brand: string;
  country: string;
  IBANumber: string;
  password: string;
  SWIFTCode: string;
  userName: string;
  createdAt: number; // Unix timestamp in milliseconds
}

const BankAccountsTable = ({
  bankAccounts,
  accountNameFilter,
  bankNameFilter,
  countryFilter,
}: {
  bankAccounts: BankAccount[];
  accountNameFilter: string;
  bankNameFilter: string;
  countryFilter: string;
}) => {
  return (
    <div className={`${styles.tableContainer} mt-7 h-[68vh]`}>
      {/* Start Table */}
      <div className={styles.table + " max-w-full"} id="table">
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li className="w-[10%]">
            <span>Account Name</span>
          </li>
          <li className="w-[20%]">
            <span>Account Number</span>
          </li>
          <li className="w-[10%]">
            <span>Bank Name</span>
          </li>
          <li className="w-[10%]">
            <span>Country</span>
          </li>
          <li className="w-[20%]">
            <span>Login Link</span>
          </li>
          <li className="w-[10%]">
            <span>Brand</span>
          </li>
          <li className="w-[10%]">
            <span>Username</span>
          </li>
          <li className="w-[10%]">
            <span>Password</span>
          </li>
          <li className="w-[10%]">
            <span>IBAN</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {bankAccounts
            .filter((e) => {
              if (
                (accountNameFilter === "All" ||
                  e.accountName === accountNameFilter) &&
                (bankNameFilter === "All" || e.bankName === bankNameFilter) &&
                (countryFilter === "All" || e.country === countryFilter)
              ) {
                return e;
              }
            })
            .map((e, idx) => (
              <ul key={idx}>
                <li className="w-[10%]">
                  <span>{e.accountName}</span>
                </li>
                <li className="w-[20%]">
                  <span>{e.accountNumber}</span>
                </li>
                <li className="w-[10%]">
                  <span>{e.bankName}</span>
                </li>
                <li className="w-[10%]">
                  <span>{e.country}</span>
                </li>
                <li className="w-[20%]">
                  <Link href={e.ApiConnect} target="_blank">
                    <span>{truncateText(e.ApiConnect, 25)}</span>
                  </Link>
                </li>
                <li className="w-[10%]">
                  <span
                    className="px-2 py-1 rounded-[3px]"
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    {e.brand}
                  </span>
                </li>
                <li className="w-[10%]">
                  <span>{e.userName}</span>
                </li>
                <li className="w-[10%]">
                  <span>{e.password}</span>
                </li>
                <li className="w-[10%]">
                  <span>{e.IBANumber}</span>
                </li>
              </ul>
            ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
};

function Page() {
  const { handleSignOut } = useContext(globalContext);

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [bankAccountNameOption, setBankAccountNameOption] = useState<string[]>(
    []
  );
  const [bankNameOption, setBankNameOption] = useState<string[]>([]);
  const [countryOption, setCountryOption] = useState<string[]>([]);

  const [accountNameFilter, setAccountNameFilter] = useState<string>("All");
  const [bankNameFilter, setBankNameFilter] = useState<string>("All");
  const [countryFilter, setCountryFilter] = useState<string>("All");

  useEffect(() => {
    // Fetch data from API
    const getBankAccounts = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounting/bank-accounts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // check if the fetch request is an array of objects
      if (response.status === 401) {
        handleSignOut();
      } else {
        const data = await response.json();
        if (Array.isArray(data)) {
          console.log(data);
          setBankAccounts(data);
        }
      }
    };

    try {
      getBankAccounts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setBankAccountNameOption([
      "All",
      ...new Set(bankAccounts.map((e) => e.accountName)),
    ]);
    setBankNameOption(["All", ...new Set(bankAccounts.map((e) => e.bankName))]);
    setCountryOption(["All", ...new Set(bankAccounts.map((e) => e.country))]);
  }, [bankAccounts]);

  return (
    <div className="pageHeader">
      {/* filters options to filter and edit data in table */}
      <div className={`flex flex-col gap-[0.7vw] w-full pageHeader my-[25px]`}>
        <div className="flex justify-between items-end">
          <div
            className={`${styles.ticketingPage} w-8/12 flex items-end gap-[1vw]`}
          >
            <div
              className={`flex flex-col gap-[0.3vw] ${styles.accountName__filter}`}
            >
              <h5>Account Name</h5>
              <CustomSelectInput
                label="All"
                options={bankAccountNameOption}
                getValue={(e: string) => setAccountNameFilter(e)}
              />
            </div>
            <div
              className={`flex flex-col gap-[0.3vw] ${styles.bankName__filter}`}
            >
              <h5>Bank Name</h5>
              <CustomSelectInput
                label="All"
                options={bankNameOption}
                getValue={(e: string) => setBankNameFilter(e)}
              />
            </div>
            <div
              className={`flex flex-col gap-[0.3vw] ${styles.country__filter}`}
            >
              <h5>Country</h5>
              <CustomSelectInput
                label="All"
                options={countryOption}
                getValue={(e: string) => setCountryFilter(e)}
              />
            </div>
          </div>

          {/* BUTTON MODALS HERE */}
          <div className="flex gap-2">
            {/* open modal to enable you to Create Ticket  */}

            <BankAccountCreator
              btnWord={"Add Bank Account"}
              btnIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z"
                    fill="#FFFFFB"
                  />
                </svg>
              }
              btnColor={"black"}
              modalTitle={"Add Bank Account"}
              setBankAccounts={setBankAccounts}
            />
          </div>
        </div>
      </div>

      <BankAccountsTable
        bankAccounts={bankAccounts}
        accountNameFilter={accountNameFilter}
        bankNameFilter={bankNameFilter}
        countryFilter={countryFilter}
      />
    </div>
  );
}

export default Page;
