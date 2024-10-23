"use client";
import React, { useContext } from "react";
import styles from "./FollowersOverview.module.css";
import { IFollowersOverview } from "../../00Types/OP_Analytics_Types";
import { globalContext } from "@/app/_context/store";

const upArrow = (
  <svg
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.54938 7.03098L13.1191 7.03097C13.2363 7.03073 13.3511 7.00915 13.4512 6.96857C13.5514 6.92798 13.6331 6.86993 13.6875 6.80065C13.7419 6.73137 13.767 6.6535 13.76 6.5754C13.7531 6.49731 13.7144 6.42196 13.6481 6.35746L7.86326 0.777044C7.6235 0.545671 7.0463 0.545671 6.80591 0.777044L1.02103 6.35746C0.954072 6.42183 0.914805 6.49722 0.907497 6.57544C0.90019 6.65366 0.925121 6.73173 0.979583 6.80115C1.03404 6.87058 1.11595 6.92871 1.21641 6.96922C1.31687 7.00974 1.43203 7.0311 1.54938 7.03098Z"
      fill="#5FA85B"
    />
  </svg>
);

const downArrow = (
  <svg
    width="14"
    height="7"
    viewBox="0 0 14 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.1225 0.101836L1.55274 0.101838C1.4356 0.102083 1.32078 0.12366 1.22064 0.164244C1.12049 0.204828 1.03882 0.262883 0.984408 0.33216C0.929995 0.401438 0.904905 0.479315 0.911837 0.557408C0.918767 0.635501 0.957457 0.710852 1.02374 0.775352L6.80862 6.35577C7.04837 6.58714 7.62557 6.58714 7.86597 6.35577L13.6508 0.77535C13.7178 0.710985 13.7571 0.635595 13.7644 0.557373C13.7717 0.479149 13.7468 0.401085 13.6923 0.331661C13.6378 0.262237 13.5559 0.204107 13.4555 0.163589C13.355 0.12307 13.2398 0.101713 13.1225 0.101836Z"
      fill="#E9313E"
    />
  </svg>
);

const sidewaysIcon = (
  <svg
    width="18"
    height="10"
    viewBox="0 0 18 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5L5 1M5 1L9 5M5 1L9 5M17 5L13 9M13 9L9 5"
      stroke="#808080"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Function to format subscriber numbers (e.g., 1000 -> 1K)
const formatSubscribers = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

export default function FollowersOverview({
  fetchedFollowersOverview,
}: {
  fetchedFollowersOverview: IFollowersOverview[];
}) {
  const { brandIdMap } = useContext(globalContext);

  return (
    <section className={styles.FollowersOverview}>
      <p className={styles.FollowersOverviewTitle}>Followers Overview</p>
      <div className={styles.FollowersOverviewContainer}>
        <div className={styles.FollowersOverviewBody}>
          {/* ===== Start Table ===== */}
          <div className={`${styles.tableContainer} flex`}>
            <div className={styles.table + " w-full"}>
              {/* Table Header */}
              <ul className={styles.table_header}>
                <li className="w-[33.3%]">
                  <span>Brand</span>
                </li>
                <li className={`w-[33.3%] ${styles.center}`}>
                  <span>Followers</span>
                </li>
                <li className={`w-[33.3%] ${styles.center}`}>
                  <span>Percentage</span>
                </li>
              </ul>

              {/* Table Body */}
              <div className={styles.table_body}>
                {Array.isArray(fetchedFollowersOverview) &&
                fetchedFollowersOverview.length > 0
                  ? fetchedFollowersOverview.map((item, index) => {
                      return (
                        <ul key={index}>
                          <li className="w-[33.3%]">
                            <span>{brandIdMap[item.brand]}</span>
                          </li>
                          <li className={`w-[33.3%] ${styles.center}`}>
                            <span>{formatSubscribers(item.followers)}</span>
                          </li>
                          <li
                            className={`w-[33.3%] ${styles.center} ${styles.percentage}`}
                          >
                            <span>
                              {item.percentages.monthly.toFixed(1) + "%"}
                            </span>
                            <span>
                              {item.percentages.monthly === 0
                                ? sidewaysIcon
                                : item.percentages.monthly > 0
                                ? upArrow
                                : downArrow}
                            </span>
                          </li>
                        </ul>
                      );
                    })
                  : [...Array(6)].map((_, i) => (
                      <li key={i} className="flex mb-[--sy-10px]">
                        <div className="w-[33.3%] h-4 bg-gray-300 rounded animate-pulse mr-2"></div>
                        <div className="w-[33.3%] h-4 bg-gray-300 rounded animate-pulse mr-2"></div>
                        <div className="w-[33.3%] h-4 bg-gray-300 rounded animate-pulse"></div>
                      </li>
                    ))}
              </div>
            </div>
          </div>
          {/* ===== End Table ===== */}
        </div>
      </div>
    </section>
  );
}
