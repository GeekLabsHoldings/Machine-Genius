"use client";
import React from "react";
import styles from "./ErrorsTable.module.css";

/**
 * Renders a table component for displaying ticketing database information.
 *
 * @returns {JSX.Element} The rendered table component.
 */
export default function ErrorsTable() {
  // An array of objects representing the rows of the table body.
  const bodyRow = [
    { "issue": "24 Issues with duplicate title tags" },
    { "issue": "Pages couldn't be crawled" },
    { "issue": "Pages couldn't be crawled (DNS resolution issues)" },
    { "issue": "Pages couldn't be crawled (incorrect URL formats)" },
    { "issue": "Issues with duplicate title tags" },
    { "issue": "Hreflang conflicts within page source code" },
    { "issue": "Pages with duplicate content issues" },
    { "issue": "Hreflang conflicts within page source code" },
    { "issue": "Pages with duplicate content issues" }
];


  return (
    <div className={`${styles.tableContainer} h-[65vh]`}>
      {/* Start Table */}
      <div className={styles.table}>
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li className="w-[50%]">
            <span>Error</span>
          </li>
          <li className="w-[50%]">
            <span>How to fix</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {bodyRow.map((e, idx) => (
            <ul className="w-[100%] relative" key={idx}>
              <li className="w-[50%]">
                <span>{e.issue}</span>
              </li>
              <li className="w-[50%]">
                <span></span>
              </li>
            </ul>
          ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
