"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./payroll.module.css";
import { globalContext } from "@/app/_context/store";
// import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
}

interface SalaryRecord {
  _id: string;
  employee: Employee;
  socialInsurance: number;
  medicalInsurance: number;
  netSalary: number;
  grossSalary: number;
  createdAt: number; // Unix timestamp in milliseconds
  __v: number;
}

const Page = () => {
  const [sorting1, setSorting1] = useState("Ascend");
  const [sorting2, setSorting2] = useState("Ascend");
  const [sorting3, setSorting3] = useState("Ascend");
  const [payrollData, setPayrollData] = useState<SalaryRecord[]>([]);

  const { handleSignOut } = useContext(globalContext);

  useEffect(() => {
    function dynamicSort(
      property: string
    ): (a: SalaryRecord, b: SalaryRecord) => number {
      let sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a: SalaryRecord, b: SalaryRecord): number {
        const result =
          a[property as keyof SalaryRecord] < b[property as keyof SalaryRecord]
            ? -1
            : a[property as keyof SalaryRecord] >
              b[property as keyof SalaryRecord]
            ? 1
            : 0;
        return result * sortOrder;
      };
    }

    function dynamicSortMultiple(...props: string[]) {
      return function (obj1: SalaryRecord, obj2: SalaryRecord): number {
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
    setPayrollData((prevPayrollData) =>
      [...prevPayrollData].sort(
        dynamicSortMultiple(
          `${sorting1 === "Ascend" ? "" : "-"}netSalary`,
          `${sorting2 === "Ascend" ? "" : "-"}grossSalary`,
          `${sorting3 === "Ascend" ? "" : "-"}createdAt`
        )
      )
    );
  }, [sorting1, sorting2, sorting3]);

  useEffect(() => {
    // Fetch data from API
    const getPayrollData = async () => {
      const response = await fetch(
        "https://api.machinegenius.io/accounting/payroll",
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
          setPayrollData((prevPayrollData) => [...prevPayrollData, ...data]);
        }
      }
    };

    try {
      getPayrollData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={`${styles.payroll} pt-[1.9vw] `}>
      <div
        className={`${styles.dataSort} flex gap-[0.938vw] mb-[1.372vw] w-full overflow-hidden`}
      >
        <div className="mb-[3vh]">
          <h5 className=" mb-[1vh] font-semibold">Net Salary</h5>
          <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
            <span>{sorting1}</span>
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
        <div className="mb-[3vh]">
          <h5 className=" mb-[1vh] font-semibold">Gross Salary</h5>
          <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
            <span>{sorting2}</span>
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
        <div className="mb-[3vh]">
          <h5 className=" mb-[1vh] font-semibold">Date Joined</h5>
          <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
            <span>{sorting3}</span>
            <svg
              onClick={() => {
                sorting3 == "Ascend"
                  ? setSorting3("Descend")
                  : setSorting3("Ascend");
              }}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[--16px] h-[--16px] cursor-pointer"
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
      <div className={`${styles.tableContainer} h-[65vh]`}>
        {/* Start Table */}
        <div className={`${styles.table} overflow-auto w-full`}>
          {/* Table Header */}
          <ul className={`${styles.table_header} w-full`}>
            <li className="w-[16.6667%] min-w-[230px] ">
              <span>Employee Name</span>
            </li>
            <li className="w-[16.6667%] min-w-[230px] ">
              <span>Social Insurance</span>
            </li>
            <li className="w-[16.6667%] min-w-[230px] ">
              <span>Medical Insurance</span>
            </li>
            <li className="w-[16.6667%] min-w-[230px] ">
              <span>Net Salary</span>
            </li>
            <li className="w-[16.6667%] min-w-[230px] ">
              <span>Gross Salary</span>
            </li>

            <li className="w-[16.6667%] min-w-[230px] ">
              <span>Date Joined</span>
            </li>
          </ul>

          {/* Table Body */}
          <div className={`${styles.table_body} w-full overflow-hidden`}>
            {payrollData?.map((e, idx) => (
              <ul className="w-[100%]" key={idx}>
                <li className="w-[16.6667%] min-w-[230px] ">
                  {e.employee.firstName} {e.employee.lastName}
                </li>
                <li className="w-[16.6667%] min-w-[230px] ">
                  <span className={`p-[0.417vw] rounded-md`}>
                    {e.socialInsurance}
                  </span>
                </li>
                <li className="w-[16.6667%] min-w-[230px] ">
                  <span className="p-[0.417vw] rounded-md w-fit">
                    {e.medicalInsurance}
                  </span>
                </li>
                <li className="w-[16.6667%] min-w-[230px] ">{e.netSalary}</li>
                <li className="w-[16.6667%] min-w-[230px]">
                  <span className="p-[0.417vw] rounded-md flex items-center">
                    {e.grossSalary}
                  </span>
                </li>
                <li className="w-[16.6667%] min-w-[230px] ">
                  <span className="p-[0.417vw] rounded-md flex items-center">
                    {new Date(e.createdAt).toLocaleDateString()}
                  </span>
                </li>
              </ul>
            ))}
          </div>
        </div>
        {/* End Table */}
      </div>
    </div>
  );
};

export default Page;
