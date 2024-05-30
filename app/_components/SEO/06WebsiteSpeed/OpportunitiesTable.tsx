"use client";
import React from "react";
import styles from "./OpportunitiesTable.module.css";

/**
 * Renders a table component for displaying ticketing database information.
 *
 * @returns {JSX.Element} The rendered table component.
 */
export default function OpportunitiesTable() {
  // An array of objects representing the rows of the table body.
  const bodyRow = [
    { duration: "0.52 s", indicationColor: "#5FA85B", width: "100px" },
    { duration: "0.34 s", indicationColor: "#E1C655", width: "34px" },
    { duration: "0.15 s", indicationColor: "#EC6060", width: "15px" },
    { duration: "0.52 s", indicationColor: "#5FA85B", width: "100px" },
    { duration: "0.52 s", indicationColor: "#5FA85B", width: "100px" },
  ];

  return (
    <div className={`${styles.tableContainer}`}>
      {/* Start Table */}
      <div className={styles.table}>
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li className="w-[50%]">
            <span>Opportunity</span>
          </li>
          <li className="w-[50%]">
            <span>Estimate Saving</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {bodyRow.map((e, idx) => (
            <ul className="w-[100%] relative" key={idx}>
              <li className="w-[50%]">
                <span>Opportunity</span>
              </li>
              <li className="w-[50%]">
                <div className="grid grid-cols-[100px_auto] items-center gap-2">
                  <span
                    className={`h-[10px] rounded-sm justify-self-end`}
                    style={{
                      backgroundColor: e.indicationColor,
                      width: `${e.width}`,
                    }}
                  ></span>
                  <span style={{ color: e.indicationColor }}>{e.duration}</span>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
