"use client";
import React from "react";
import styles from "./LinkBuildingTable.module.css";
import WriteArticleModal from "./WriteArticleModal";

/**
 * Renders a table component for displaying ticketing database information.
 *
 * @returns {JSX.Element} The rendered table component.
 */
export default function LinkBuildingTable() {
  // An array of objects representing the rows of the table body.
  const bodyRow = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <div className={`${styles.tableContainer} h-[65vh]`}>
      {/* Start Table */}
      <div className={styles.table}>
        {/* Table Header */}
        <ul className={styles.table_header}>
          <li className="w-[20%]">
            <span>Main Keywords</span>
          </li>
          <li className="w-[30%]">
            <span>Long Tail Keywords</span>
          </li>
          <li className="w-[10%]">
            <span>Volume</span>
          </li>
          <li className="w-[20%]">
            <span>Global Volume</span>
          </li>
          <li className="w-[30%]">
            <span>Top Ranking Result</span>
          </li>
          <li className="w-[20%]">
            <span>Affiliate Link</span>
          </li>
          <li className="w-[20%]">
            <span>Keyword Type</span>
          </li>
          <li className="w-[30%]">
            <span>Article</span>
          </li>
        </ul>

        {/* Table Body */}
        <div className={styles.table_body}>
          {bodyRow.map((e, idx) => (
            <ul className="w-[100%] relative" key={idx}>
              <li className="w-[20%]">
                <span>Main Keywords</span>
              </li>
              <li className="w-[30%]">
                <span>Long Tail Keywords</span>
              </li>
              <li className="w-[10%]">
                <span>Volume</span>
              </li>
              <li className="w-[20%]">
                <span>Global Volume</span>
              </li>
              <li className="w-[30%]">
                <span>Top Ranking Result</span>
              </li>
              <li className="w-[20%]">
                <span>Affiliate Link</span>
              </li>
              <li className="w-[20%]">
                <span>Keyword Type</span>
              </li>
              <li className="w-[30%]">
                <span>
                  <WriteArticleModal
                    btnWord="Write Article"
                    btnColor="black"
                    modalTitle="Add Details"
                  />
                </span>
              </li>
            </ul>
          ))}
        </div>
      </div>
      {/* End Table */}
    </div>
  );
}
