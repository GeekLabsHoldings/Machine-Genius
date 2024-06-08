"use client";
import React from "react";
import styles from "./FollowersOverview.module.css";

export default function FollowersOverview() {
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

  const bodyRow = [
    {
      brand: "PST Canada",
      followers: "200 K",
      percentage: "30%",
      arrowIndicator: upArrow,
    },
    {
      brand: "PST USA",
      followers: "200 K",
      percentage: "26%",
      arrowIndicator: downArrow,
    },
    {
      brand: "ST Suite",
      followers: "200 K",
      percentage: "14%",
      arrowIndicator: upArrow,
    },
    {
      brand: "Juice Box",
      followers: "200 K",
      percentage: "3.5%",
      arrowIndicator: upArrow,
    },
    {
      brand: "Inestocrasy",
      followers: "200 K",
      percentage: "0.2%",
      arrowIndicator: downArrow,
    },
  ];

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
                {bodyRow.map((e, idx) => (
                  <ul key={idx}>
                    <li className="w-[33.3%]">
                      <span>{e.brand}</span>
                    </li>
                    <li className={`w-[33.3%] ${styles.center}`}>
                      <span>{e.followers}</span>
                    </li>
                    <li
                      className={`w-[33.3%] ${styles.center} ${styles.percentage}`}
                    >
                      <span>{e.percentage}</span>
                      <span>{e.arrowIndicator}</span>
                    </li>
                  </ul>
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
