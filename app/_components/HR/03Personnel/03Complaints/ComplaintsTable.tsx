"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./ComplaintsTable.module.css";
import { truncateText } from "@/app/_utils/text";
import RequestedByCard from "./RequestedByCard";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { globalContext } from "@/app/_context/store";

/**
 * Renders a table component displaying a list of complaints. Each complaint is represented by an object in the `bodyRow` array.
 * Each object contains properties such as `complaintId`, `newStatus`, `complaintIssue`, `complaintDescription`, `requestedBy`, `requestedByColor`, and `urgencyLevel`.
 * The table has a header with columns for `Complaint Issue`, `Complaint Description`, `Requested By`, `Urgency Level`, and `Preview`.
 * The table body is populated with data from the `bodyRow` array, where each row represents a complaint.
 * The `newStatus` property determines whether a new ribbon is displayed for that complaint.
 * The `requestedBy` property is used to display the name of the person who requested the complaint.
 * The `urgencyLevel` property determines the color of the urgency level column.
 * The `Preview` column contains a button that links to the complaint details page.
 *
 * @return {JSX.Element} The rendered table component.
 */
export default function ComplaintsTable() {
  const { handleSignOut } = useContext(globalContext);
  // An array of objects representing the rows of the table body.
  const bodyRow = [
    {
      complaintId: "1",
      newStatus: true,
      complaintIssue: "Finance",
      complaintDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      requestedBy: "Sherry",
      requestedByColor: "#FAC5A5",
      urgencyLevel: "High",
    },
    {
      complaintId: "2",
      newStatus: false,
      complaintIssue: "Bullying",
      complaintDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      requestedBy: "Shahenda",
      requestedByColor: "#DFCCE8",
      urgencyLevel: "Mid",
    },
    {
      complaintId: "3",
      newStatus: false,
      complaintIssue: "Finance",
      complaintDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      requestedBy: "Farah",
      requestedByColor: "#A6DEF3",
      urgencyLevel: "Low",
    },
    {
      complaintId: "4",
      newStatus: false,
      complaintIssue: "Finance",
      complaintDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      requestedBy: "Sherry",
      requestedByColor: "#FAC5A5",
      urgencyLevel: "Low",
    },
    {
      complaintId: "5",
      newStatus: false,
      complaintIssue: "Finance",
      complaintDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      requestedBy: "Manar",
      requestedByColor: "#C5E1C2",
      urgencyLevel: "Mid",
    },
    {
      complaintId: "6",
      newStatus: false,
      complaintIssue: "Harassment",
      complaintDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      requestedBy: "Kamel",
      requestedByColor: "#F2E3A1",
      urgencyLevel: "Low",
    },
  ];

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
  const [complaints, setComplaints] = useState([]);

  async function getComplaints() {
    const token = localStorage.getItem("token");
    try {
      console.log("xzcasdqe");

      const data = await fetch(
        "https://api.machinegenius.io/hr/complaint/get-all?name=&department=&solve=&urgencyLevel=&limit&skip",
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === 401) {
        handleSignOut();
      }
      const res = await data.json();
      setComplaints(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getComplaints();
  }, []);

  return (
    <div className={`${styles.tableContainer} h-[65vh]`}>
      {/* Start Table */}
      <div className={styles.table}>
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li className="w-[20%]">
            <span>Complaint Issue</span>
          </li>
          <li className="w-[30%]">
            <span>Complaint Description</span>
          </li>
          <li className="w-[20%]">
            <span>Requested By</span>
          </li>
          <li className="w-[15%]">
            <span>Urgency Level</span>
          </li>
          <li className="w-[15%]">
            <span>Preview</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {Array.isArray(complaints) &&
            complaints.length &&
            complaints.map((e: any, i) => (
              <ul className="w-[100%] relative" key={e._id}>
                <div className="absolute">{e.newStatus && newRibbon}</div>
                <li className="w-[20%]">{e.complaintIssue}</li>
                <li className="w-[30%]">{truncateText(e.description, 35)}</li>
                <li className="w-[20%]">
                  <RequestedByCard
                    name={e.employee.firstName + " " + e.employee.lastName}
                    color={e.employee.theme}
                  />
                </li>
                <li
                  className={`w-[15%] `}
                  style={{
                    color: `${e.employee.theme}`,
                  }}
                >
                  {e.urgencyLevel}
                </li>
                <li className="w-[15%]">
                  <CustomBtn
                    btnColor="black"
                    word="Preview"
                    href={`/hr/personnel/complaints/${e._id}/`}
                  />
                </li>
              </ul>
            ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
