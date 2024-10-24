"use client";
import React from "react";
import styles from "./ActivityOverview.module.css";
import { IBrandWithGroups } from "../../00Types/OP_Analytics_Types";

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

export default function ActivityOverview({
  fetchedSocialMediaAccountsWithoutFlatMap,
}: {
  fetchedSocialMediaAccountsWithoutFlatMap: IBrandWithGroups[];
}) {
  return (
    <section className={styles.ActivityOverview}>
      <p className={styles.ActivityOverviewTitle}>Engagement Overview</p>
      <div className={styles.ActivityOverviewContainer}>
        <div className={styles.ActivityBody}>
          {/* ===== Start Table ===== */}
          <div className={`${styles.tableContainer} flex`}>
            <div className={styles.table + " w-full"}>
              {/* Table Header */}
              <ul className={styles.table_header}>
                <li className="w-[75%]">
                  <span>Brand</span>
                </li>
                <li className={`w-[25%] ${styles.center}`}>
                  <span>Engagement</span>
                </li>
              </ul>
              {/* Table Body */}
              <div className={styles.table_body}>
                {Array.isArray(fetchedSocialMediaAccountsWithoutFlatMap) &&
                fetchedSocialMediaAccountsWithoutFlatMap.length > 0
                  ? fetchedSocialMediaAccountsWithoutFlatMap.map((brand) => (
                      <ul key={brand.brand._id}>
                        <li className="w-[75%]">
                          <span>{brand.brand.brand_name}</span>
                        </li>
                        <li className={`w-[25%] ${styles.center}`}>
                          <span>
                            {formatSubscribers(
                              brand.groups.reduce(
                                (acc, curr) => acc + curr.engagement,
                                0
                              )
                            )}
                          </span>
                        </li>
                      </ul>
                    ))
                  : [...Array(6)].map((_, i) => (
                      <li key={i} className="flex mb-[--sy-10px]">
                        <div className="w-[75%] h-4 bg-gray-300 rounded animate-pulse mr-2"></div>
                        <div className="w-[25%] h-4 bg-gray-300 rounded animate-pulse mr-2"></div>
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
