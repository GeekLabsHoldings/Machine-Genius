"use client";
import React from "react";
import styles from "./AffiliatesDatabaseTable.module.css";
import CustomBtn from "../../Button/CustomBtn";

/**
 * Renders a table component for displaying ticketing database information.
 *
 * @returns {JSX.Element} The rendered table component.
 */
export default function AffiliatesDatabaseTable() {
  // An array of objects representing the rows of the table body.
  const bodyRow = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <div className={`${styles.tableContainer}`}>
      {/* Start Table */}
      <div className={styles.table}>
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li className="w-[20%]">
            <span>Program Name</span>
          </li>
          <li className="w-[30%]">
            <span>Website</span>
          </li>
          <li className="w-[10%]">
            <span>Niche</span>
          </li>
          <li className="w-[20%]">
            <span>Brand</span>
          </li>
          <li className="w-[30%]">
            <span>Payment Amount</span>
          </li>
          <li className="w-[20%]">
            <span>Payment Frequency</span>
          </li>
          <li className="w-[20%]">
            <span>Program Link</span>
          </li>
          <li className="w-[30%]">
            <span> Affiliate Link</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {bodyRow.map((e, idx) => (
            <ul className="w-[100%] relative" key={idx}>
              <li className="w-[20%]">
                <span>Program Name</span>
              </li>
              <li className="w-[30%]">
                <span>Website</span>
              </li>
              <li className="w-[10%]">
                <span>Niche</span>
              </li>
              <li className="w-[20%]">
                <span>Brand</span>
              </li>
              <li className="w-[30%]">
                <span>Payment Amount</span>
              </li>
              <li className="w-[20%]">
                <span>Payment Frequency</span>
              </li>
              <li className="w-[20%]">
                <span>Program Link</span>
              </li>
              <li className="w-[30%]">
                <span> Affiliate Link</span>
              </li>
            </ul>
          ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
