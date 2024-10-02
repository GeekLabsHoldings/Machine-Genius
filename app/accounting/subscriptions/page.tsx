"use client";
import React, { useContext, useEffect, useState } from "react";
import tableStyles from "./TicketingDatabaseTable.module.css";
import styles from "./subscriptions.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import SubscriptionsCreator from "./SubscriptionsCreator";
import { globalContext } from "@/app/_context/store";

interface Subscription {
  subscriptionName: string;
  subscriptionPrice: number;
  startDate: number; // Unix timestamp in milliseconds
  endDate: number; // Unix timestamp in milliseconds
}
type sort = "asc" | "desc";

function calculateDuration(startDate: number, endDate: number): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  // Adjust for negative values in months and days
  if (days < 0) {
    months--;
    // Get the number of days in the previous month
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }
  const Year = years ? `${years} Year${years !== 1 ? "s" : ""}` : null;
  const Month = months ? `${months} Month${months !== 1 ? "s" : ""}` : null;
  const Day = days ? `${days} Day${days !== 1 ? "s" : ""}` : null;
  return [Year, Month, Day].filter((e) => e).join(", ");
}

function SubscriptionsTable({
  subscriptions,
  subscriptionsNameFilter,
}: {
  subscriptions: Subscription[];
  subscriptionsNameFilter: string;
}) {
  const newRibbon = (
    <svg
      width="40"
      height="20"
      viewBox="0 0 40 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.8398 17.2949L35.2617 9.43367L39.7931 1.89305C39.9007 1.71336 39.9594 1.50783 39.9632 1.29749C39.967 1.08716 39.9158 0.879561 39.8149 0.695947C39.7139 0.512334 39.5667 0.359293 39.3885 0.252483C39.2102 0.145673 39.0073 0.0889263 38.8004 0.0880509L1.65717 0C1.03768 0 0.451497 0 0.000669185 0C-0.00173606 0.392269 0.00311587 1.83316 0.00311587 2.46305V16.713C0.00311587 17.3429 0 18.5879 0.00461689 19.0879C0.504854 19.0879 1.71941 19.088 2.33889 19.088H38.8354C39.0416 19.088 39.244 19.0325 39.4222 18.9272C39.6004 18.8218 39.748 18.6704 39.8501 18.4882C39.9521 18.3061 40.0049 18.0998 40.0031 17.8902C40.0013 17.6806 39.9449 17.4752 39.8398 17.2949ZM12.2776 13.3643H10.9696L7.16228 8.21054V13.3762H5.84256V6.02555H7.16228L10.9813 11.1912V6.02555H12.2893L12.2776 13.3643ZM19.6704 7.21305H15.5477V8.98242H19.285V10.1699H15.5477V12.0818H19.6704V13.2693H14.228V6.02555H19.6587L19.6704 7.21305ZM29.3522 13.3405H28.0325L26.2222 7.88992L24.412 13.3643H23.104L20.7682 6.02555H22.193L23.7346 11.2862L25.5098 6.02555H26.9346L28.6398 11.2862L30.193 6.02555H31.6295L29.3522 13.3405Z"
        fill="#E9313E"
      />
    </svg>
  );

  return (
    <div className={`${tableStyles.tableContainer} h-[70vh]`}>
      {/* Start Table */}
      <div className={tableStyles.table}>
        {/* Table Header */}
        <ul className={tableStyles.table_header}>
          <li className="w-[20%]">
            <span>Subscriptions</span>
          </li>
          <li className="w-[20%]">
            <span>Price</span>
          </li>
          <li className="w-[20%]">
            <span>Duration</span>
          </li>
          <li className="w-[20%]">
            <span>Start Date</span>
          </li>
          <li className="w-[20%]">
            <span>End Date</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={tableStyles.table_body}>
          {subscriptions
            .filter(
              (e) =>
                e.subscriptionName === subscriptionsNameFilter ||
                subscriptionsNameFilter === "All"
            )
            .map((e, idx) => (
              <ul className="w-[100%] relative" key={idx}>
                <li className="w-[20%]">{e.subscriptionName}</li>
                <li className="w-[20%]">{e.subscriptionPrice}</li>
                <li className="w-[20%]">
                  {calculateDuration(e.startDate, e.endDate)}
                </li>
                <li className="w-[20%]">
                  {new Date(e.startDate).toLocaleString()}
                </li>
                <li className="w-[20%]">
                  {new Date(e.endDate).toLocaleString()}
                </li>
              </ul>
            ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}

function SortContainer({
  title,
  sort,
  setSort,
}: {
  title: string;
  sort: sort;
  setSort: (sort: sort) => void;
}) {
  return (
    <div className="flex flex-col w-[25%] gap-[0.3vw]">
      <h5>{title}</h5>
      <div
        className={`${styles.changeOrder} `}
        onClick={() => {
          setSort(sort === "asc" ? "desc" : "asc");
        }}
      >
        <p>{sort === "asc" ? "Ascend" : "Decend"}</p>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721067 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139324 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139324 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
            fill="#2A2B2A"
          />
        </svg>
      </div>
    </div>
  );
}

function Page() {
  const [subscriptionsNameOption, setSubscriptionsNameOption] = useState<
    string[]
  >([]);

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [subscriptionNameFilter, setSubscriptionNameFilter] =
    useState<string>("All");

  const [sortPrice, setSortPrice] = useState<sort>("asc");
  const [sortDuration, setSortDuration] = useState<sort>("asc");
  const [sortStartDate, setSortStartDate] = useState<sort>("asc");
  const [sortEndDate, setSortEndDate] = useState<sort>("asc");

  const { handleSignOut } = useContext(globalContext);

  useEffect(() => {
    function dynamicSort(
      property: string
    ): (a: Subscription, b: Subscription) => number {
      let sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a: Subscription, b: Subscription): number {
        const result =
          a[property as keyof Subscription] < b[property as keyof Subscription]
            ? -1
            : a[property as keyof Subscription] >
              b[property as keyof Subscription]
            ? 1
            : 0;
        return result * sortOrder;
      };
    }

    function dynamicSortMultiple(...props: string[]) {
      return function (obj1: Subscription, obj2: Subscription): number {
        var i = 0,
          result = 0,
          numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while (result === 0 && i < numberOfProperties) {
          result = dynamicSort(props[i])(obj1, obj2);
          i++;
        }
        return result;
      };
    }

    setSubscriptions((prevSubscriptions) =>
      [...prevSubscriptions].sort(
        dynamicSortMultiple(
          `${sortPrice === "asc" ? "" : "-"}subscriptionPrice`,
          `${sortDuration === "asc" ? "" : "-"}endDate`,
          `${sortStartDate === "asc" ? "" : "-"}startDate`,
          `${sortEndDate === "asc" ? "" : "-"}endDate`
        )
      )
    );
  }, [sortPrice, sortDuration, sortStartDate, sortEndDate]);

  useEffect(() => {
    // Fetch data from API
    const getSUbscriptionsData = async () => {
      const response = await fetch(
        "process.env.NEXT_PUBLIC_API_BASE_URL/accounting/subscriptions",
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
          setSubscriptions(data);
        }
      }
    };

    try {
      getSUbscriptionsData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setSubscriptionsNameOption([
      "All",
      ...new Set(subscriptions?.map((e) => e.subscriptionName)),
    ]);
  }, [subscriptions]);

  return (
    <div className="pageHeader">
      {/* filters options to filter and edit data in table */}
      <div className={`flex flex-col gap-[0.7vw] w-full pageHeader my-[25px]`}>
        <div className="flex justify-between items-end">
          <div
            className={`${styles.ticketingPage} w-8/12 flex items-end gap-[1vw]`}
          >
            <div className="flex flex-col w-1/3 gap-[0.3vw]">
              <h5>Subscription</h5>
              <CustomSelectInput
                label="All"
                options={subscriptionsNameOption}
                getValue={(e: string) => setSubscriptionNameFilter(e)}
              />
            </div>
            <SortContainer
              title="Price"
              sort={sortPrice}
              setSort={setSortPrice}
            />
            <SortContainer
              title="Duration"
              sort={sortDuration}
              setSort={setSortDuration}
            />
            <SortContainer
              title="Start Date"
              sort={sortStartDate}
              setSort={setSortStartDate}
            />
            <SortContainer
              title="End Date"
              sort={sortEndDate}
              setSort={setSortEndDate}
            />
          </div>

          {/* BUTTON MODALS HERE */}
          <div className="flex gap-2">
            {/* open modal to enable you to Create Ticket  */}

            <SubscriptionsCreator
              btnWord={"Add Subscription"}
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
              modalTitle={"Add Subscription"}
              setSubscriptions={setSubscriptions}
            />
          </div>
        </div>
      </div>

      <SubscriptionsTable
        subscriptions={subscriptions}
        subscriptionsNameFilter={subscriptionNameFilter}
      />
    </div>
  );
}

export default Page;
