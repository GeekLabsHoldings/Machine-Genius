"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./expenses.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { globalContext } from "@/app/_context/store";
import { preventContextMenu } from "@fullcalendar/core/internal";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
}

interface ReceiptRecord {
  _id: string;
  employee: Employee;
  receiptUrl: string;
  totalPrice: number;
  createdAt: number; // Unix timestamp in milliseconds
  __v: number;
}

const Page = () => {
  const [sorting1, setSorting1] = useState("Ascend");
  const [sorting2, setSorting2] = useState("Ascend");
  const [expensesData, setExpensesData] = useState<ReceiptRecord[]>([]);
  const [filteredName, setFilteredName] = useState("All");

  const { handleSignOut } = useContext(globalContext);
  function getRandomBackgroundColor() {
    const colors = [
      "#F36F24B2",
      "#9B5FBFB2",
      "#E1C655B2",
      "#31B2E9B2",
      "#E9313EB2",
    ];

    // Select a random index from the array of colors
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the color at the random index
    return colors[randomIndex];
  }

  const dataHeader = ["Employee", "Receipt", "Total Price", "Date Purchased"];

  useEffect(() => {
    function dynamicSort(
      property: string
    ): (a: ReceiptRecord, b: ReceiptRecord) => number {
      let sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a: ReceiptRecord, b: ReceiptRecord): number {
        const result =
          a[property as keyof ReceiptRecord] <
          b[property as keyof ReceiptRecord]
            ? -1
            : a[property as keyof ReceiptRecord] >
              b[property as keyof ReceiptRecord]
            ? 1
            : 0;
        return result * sortOrder;
      };
    }

    function dynamicSortMultiple(...props: string[]) {
      return function (obj1: ReceiptRecord, obj2: ReceiptRecord): number {
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
    setExpensesData((prevExpensesData) =>
      [...prevExpensesData].sort(
        dynamicSortMultiple(
          `${sorting1 === "Ascend" ? "" : "-"}totalPrice`,
          `${sorting2 === "Ascend" ? "" : "-"}createdAt`
        )
      )
    );
  }, [sorting1, sorting2]);

  useEffect(() => {
    // Fetch data from API
    const getExpensesData = async () => {
      const response = await fetch(
        "https://api.machinegenius.io/accounting/expenses",
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
          setExpensesData(data);
        }
      }
    };

    try {
      getExpensesData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className={`${styles.expenses} pt-[1.4vw] mb-4`}>
        <div>
          {" "}
          <div className={` flex gap-[0.938vw]`}>
            <div className="mb-[3vh]">
              {/* Staff Member */}
              <h5 className=" mb-[1vh] font-semibold">Employee</h5>
              <div className="w-[11.927vw]">
                {/* CustomSelectInput for staff members */}
                <CustomSelectInput
                  options={[
                    "All",
                    ...new Set(
                      expensesData.map(
                        (e) =>
                          e.employee?.firstName + " " + e.employee?.lastName
                      )
                    ),
                  ]}
                  getValue={(value: string) => setFilteredName(value)}
                />
              </div>
            </div>
            {/* <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Product Name</h5>
              <div className="w-[11.927vw]">
                {/* CustomSelectInput for projects 
                <CustomSelectInput
                  options={["All", ...dataBody.map((e, i) => e.product)]}
                />
              </div>
            </div> */}
            {/* <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Product Type</h5>
              <div className="w-[11.927vw]">
                {/* CustomSelectInput for projects 
                <CustomSelectInput
                  options={["All", ...dataBody.map((e, i) => e.productType)]}
                />
              </div>
            </div> */}
            <div className={`${styles.dataSort} mb-[3vh]`}>
              <h5 className=" mb-[1vh] font-semibold">Total Price</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.37vw]">
                <span className={`${styles.dataSort}`}>{sorting1}</span>
                <svg
                  onClick={() => {
                    sorting1 == "Ascend"
                      ? setSorting1("Descend")
                      : setSorting1("Ascend");
                  }}
                  className="cursor-pointer"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
            <div className={`${styles.dataSort} mb-[3vh]`}>
              <h5 className=" mb-[1vh] font-semibold">Purchase Date</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.37vw]">
                <span className={`${styles.dataSort}`}>{sorting2}</span>
                <svg
                  onClick={() => {
                    sorting2 == "Ascend"
                      ? setSorting2("Descend")
                      : setSorting2("Ascend");
                  }}
                  className="cursor-pointer"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Start Table */}
      <div
        className={`${styles.table} py-[0.798vw] px-[0.412vw] rounded-xl overflow-auto h-[65vh] overflow-y-hidden w-full`}
      >
        <div className={`${styles.tableHeader} w-full`}>
          <ul className=" flex items-center justify-between py-[1.2vw] border-b-[1px] border-b-[#2A2B2A] px-[1.5vw] w-full">
            {dataHeader.map((e, i) => (
              <li className={`w-[14.2857%] min-w-[230px]`}>{e}</li>
            ))}
          </ul>
        </div>
        <div className={`${styles.tableBody} overflow-y-scroll w-full`}>
          {expensesData
            .filter((e) =>
              filteredName === "All"
                ? e
                : e.employee?.firstName + " " + e.employee?.lastName ===
                  filteredName
            )
            .map((e, i) => (
              <ul className="flex items-center justify-between py-[1vw] border-b-[1px] border-b-[#2A2B2A] px-[1.5vw] w-full">
                <li className={`w-[14.2857%] min-w-[230px]`}>
                  {e?.employee?.firstName + " " + e?.employee?.lastName}
                </li>

                {/* <li className={`w-[14.2857%] min-w-[230px]`}>{e.product}</li> */}
                {/* <li className={`w-[14.2857%] min-w-[230px]`}>
                <span
                  className=" p-2 rounded-md"
                  style={{ backgroundColor: `${getRandomBackgroundColor()}` }}
                >
                  {e.productType}
                </span>
              </li> */}
                {/* <li className={`w-[14.2857%] min-w-[230px]`}>{e.quantity}</li> */}
                <li className={`w-[14.2857%] min-w-[230px]`}>
                  <a
                    href={e.receiptUrl}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    View Receipt
                  </a>
                </li>
                <li className={`w-[14.2857%] min-w-[230px]`}>{e.totalPrice}</li>
                <li className={`w-[14.2857%] min-w-[230px]`}>
                  {new Date(e.createdAt).toLocaleDateString()}
                </li>
              </ul>
            ))}
        </div>
      </div>
      {/* End Table */}
    </>
  );
};

export default Page;
