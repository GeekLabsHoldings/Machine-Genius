"use client";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import BankAccountCreator from "./BankAccountCreator";
import styles from "./bank-accounts.module.css";
import Link from "next/link";
import { truncateText } from "@/app/_utils/text";

const bodyRow = [
  {
    "Account Name": "John Doe",
    "Account Number": "465601654865215",
    "Bank Name": "HSBC",
    Country: "Egypt",
    "Login Link": "https://www.link1.com",
    Brand: "PST USA",
    Username: "John Doe",
    Password: "dg5432lfdg57a",
    IBAN: "465601654865215",
  },
  {
    "Account Name": "John Doe",
    "Account Number": "21548658745054",
    "Bank Name": "NBE",
    Country: "Egypt",
    "Login Link": "https://www.link2.com",
    Brand: "PST Asia",
    Username: "John Doe",
    Password: "sg5E7FSW6A8A",
    IBAN: "21548658745054",
  },
  {
    "Account Name": "John Doe",
    "Account Number": "436354378643456",
    "Bank Name": "CIB",
    Country: "USA",
    "Login Link": "https://www.link3.com",
    Brand: "Investocracy",
    Username: "John Doe",
    Password: "sfsdfwsf877afzfa",
    IBAN: "465601654865215",
  },
  {
    "Account Name": "John Doe",
    "Account Number": "345678645621568",
    "Bank Name": "QNB",
    Country: "USA",
    "Login Link": "https://www.link4.com",
    Brand: "PST USA",
    Username: "John Doe",
    Password: "sdSVS68D6F48f",
    IBAN: "465601654865215",
  },
  {
    "Account Name": "John Doe",
    "Account Number": "76534521598565111",
    "Bank Name": "HSBC",
    Country: "UK",
    "Login Link": "https://www.link5.com",
    Brand: "Canada",
    Username: "John Doe",
    Password: "dg5432lfdg57a",
    IBAN: "465601654865215",
  },
  {
    "Account Name": "John Doe",
    "Account Number": "45248625985452",
    "Bank Name": "HSBC",
    Country: "UK",
    "Login Link": "https://www.link6.com",
    Brand: "Canada",
    Username: "John Doe",
    Password: "sfsdfwsf877afzfa",
    IBAN: "465601654865215",
  },
  {
    "Account Name": "John Doe",
    "Account Number": "465601654865215",
    "Bank Name": "QNB",
    Country: "UK",
    "Login Link": "https://www.link7.com",
    Brand: "PST USA",
    Username: "John Doe",
    Password: "sdSVS68D6F48f",
    IBAN: "465601654865215",
  },
  {
    "Account Name": "John Doe",
    "Account Number": "76534521598565111",
    "Bank Name": "QNB",
    Country: "USA",
    "Login Link": "https://www.link8.com",
    Brand: "Investocracy",
    Username: "John Doe",
    Password: "dg5432lfdg57a",
    IBAN: "465601654865215",
  },
  {
    "Account Name": "John Doe",
    "Account Number": "465601654865215",
    "Bank Name": "QNB",
    Country: "Egypt",
    "Login Link": "https://www.link9.com",
    Brand: "Canada",
    Username: "John Doe",
    Password: "sdSVS68D6F48f",
    IBAN: "465601654865215",
  },
  {
    "Account Name": "John Doe",
    "Account Number": "45248625985452",
    "Bank Name": "NBE",
    Country: "Egypt",
    "Login Link": "https://www.link10.com",
    Brand: "Investocracy",
    Username: "John Doe",
    Password: "sfsdfwsf877afzfa",
    IBAN: "465601654865215",
  },
  {
    "Account Name": "John Doe",
    "Account Number": "76534521598565111",
    "Bank Name": "NBE",
    Country: "Egypt",
    "Login Link": "https://www.link11.com",
    Brand: "Street Politics",
    Username: "John Doe",
    Password: "sdSVS68D6F48f",
    IBAN: "465601654865215",
  },
  {
    "Account Name": "John Doe",
    "Account Number": "45248625985452",
    "Bank Name": "HSBC",
    Country: "USA",
    "Login Link": "https://www.link12.com",
    Brand: "Canada",
    Username: "John Doe",
    Password: "dg5432lfdg57a",
    IBAN: "465601654865215",
  },
  {
    "Account Name": "John Doe",
    "Account Number": "465601654865215",
    "Bank Name": "CIB",
    Country: "USA",
    "Login Link": "https://www.link13.com",
    Brand: "Street Politics",
    Username: "John Doe",
    Password: "sdSVS68D6F48f",
    IBAN: "465601654865215",
  },
];



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

const BankAccountsTable = () => {
  return (
    <div className={`${styles.tableContainer} mt-7 h-[68vh]`}>
      {/* Start Table */}
      <div className={styles.table + " max-w-full"} id="table">
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li className="w-[10%]">
            <span>Account Name</span>
          </li>
          <li className="w-[10%]">
            <span>Account Number</span>
          </li>
          <li className="w-[10%]">
            <span>Bank Name</span>
          </li>
          <li className="w-[10%]">
            <span>Country</span>
          </li>
          <li className="w-[10%]">
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
          <li className="w-[10%]">
            <span>Lorem</span>
          </li>
          <li className="w-[10%]">
            <span>Lorem</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {bodyRow.map((e, idx) => (
            <ul key={idx}>
              <li className="w-[10%]">
                <span>{e["Account Name"]}</span>
              </li>
              <li className="w-[10%]">
                <span>{e["Account Number"]}</span>
              </li>
              <li className="w-[10%]">
                <span>{e["Bank Name"]}</span>
              </li>
              <li className="w-[10%]">
                <span>{e.Country}</span>
              </li>
              <li className="w-[10%]">
                <Link href={e["Login Link"]} target="_blank">
                  <span>{truncateText(e["Login Link"], 20)}</span>
                </Link>
              </li>
              <li className="w-[10%]">
                <span
                    className="px-2 py-1 rounded-[3px]"
                    style={{ backgroundColor: getRandomColor() }}
                  >
                  {e.Brand}</span>
              </li>
              <li className="w-[10%]">
                  <span>{e.Username}</span>
              </li>
              <li className="w-[10%]">
                <span>{e.Password}</span>
              </li>
              <li className="w-[10%]">
                <span>{e.IBAN}</span>
              </li>
              <li className="w-[10%]">
                <span>Lorem</span>
              </li>
              <li className="w-[10%]">
                <span>Lorem</span>
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
              <CustomSelectInput label="All" options={[1, 2, 3]} />
            </div>
            <div
              className={`flex flex-col gap-[0.3vw] ${styles.bankName__filter}`}
            >
              <h5>Bank Name</h5>
              <CustomSelectInput label="All" options={[1, 2, 3]} />
            </div>
            <div
              className={`flex flex-col gap-[0.3vw] ${styles.country__filter}`}
            >
              <h5>Country</h5>
              <CustomSelectInput label="All" options={[1, 2, 3]} />
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
            />
          </div>
        </div>
      </div>

      <BankAccountsTable />
    </div>
  );
}

export default Page;
