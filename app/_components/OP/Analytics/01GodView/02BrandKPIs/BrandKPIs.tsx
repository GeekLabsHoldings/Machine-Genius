"use client";
import React, { useContext } from "react";
import styles from "./BrandKPIs.module.css";
import { IKPIData } from "@/app/_components/OP/Analytics/00Types/OP_Analytics_Types";
import { globalContext } from "@/app/_context/store";

const accordionBlackArrow = (
  <svg
    width="16"
    height="8"
    viewBox="0 0 16 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.0213 -0.000605037L0.788595 -0.000603793C0.644496 -0.000301942 0.503248 0.0262407 0.380057 0.0761661C0.256864 0.126091 0.156391 0.197508 0.0894549 0.282731C0.0225185 0.367955 -0.00834625 0.463757 0.000179602 0.559823C0.00870546 0.655891 0.0563014 0.748586 0.137843 0.827932L7.25421 7.69278C7.54915 7.97741 8.2592 7.97741 8.55493 7.69278L15.6713 0.82793C15.7537 0.74875 15.802 0.656008 15.811 0.559781C15.82 0.463554 15.7893 0.367522 15.7223 0.282118C15.6553 0.196715 15.5545 0.125206 15.431 0.0753613C15.3074 0.025517 15.1657 -0.000756684 15.0213 -0.000605037Z"
      fill="#2A2B2A"
    />
  </svg>
);

export default function BrandKPIs({
  fetchedKPIData,
}: {
  fetchedKPIData: IKPIData[];
}) {
  const { brandIdMap } = useContext(globalContext);

  function AccordionItem2({ data }: { data: IKPIData }) {
    const { kpis, achievedKPIs } = data;

    // Take the last objects from kpis and achievedKPIs arrays
    const kpi = kpis[kpis.length - 1];
    const achievedKpi = achievedKPIs[achievedKPIs.length - 1];

    // Get the brand name from the kpi, or default to 'No Brand'
    const title = brandIdMap[kpi._id.brand];

    // Generate table rows based on platforms
    const tableRows =
      kpi && kpi.platforms && kpi.platforms.length > 0 ? (
        kpi.platforms.map((platform: string, idx: number) => (
          <tr key={idx}>
            <td>{platform[0] + platform.slice(1).toLowerCase()}</td>
            <td>
              {kpi.totalPostsPerDay} Posts
              <span className="font-bold">/Day</span>
            </td>
            <td
              className={
                achievedKpi?.postsPerDay === kpi.totalPostsPerDay
                  ? styles.kpiMet
                  : styles.kpiNotMet
              }
            >
              {achievedKpi?.postsPerDay ?? 0}/{kpi.totalPostsPerDay}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No data available</td>
        </tr>
      );

    return (
      <div className={`collapse accordion2`}>
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title flex justify-between items-center">
          <p>{title}</p>
          {accordionBlackArrow}
        </div>
        <div className="collapse-content bg-[#E6E6E259]">
          <div>
            <table className={styles.BrandKPIsTable}>
              <thead>
                <tr>
                  <th>Brand/Accounts</th>
                  <th>KPI/s Required</th>
                  <th>KPI/s Met</th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Check if data is loading
  if (!fetchedKPIData || fetchedKPIData.length === 0) {
    // Render loading skeleton
    return (
      <div className={styles.BrandKPIsContainer}>
        <p className={styles.BrandKPIsTitle}>Brand KPIs</p>
        <div className={`${styles.BrandKPIsBody} space-y-3`}>
          {/* Skeleton Loader */}
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse border border-gray-200 rounded-lg p-4"
            >
              {/* Skeleton for accordion header */}
              <div className="flex justify-between items-center mb-4">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-4"></div>
              </div>
              {/* Skeleton for table */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.BrandKPIsContainer}>
      <p className={styles.BrandKPIsTitle}>Brand KPIs</p>
      <div className={styles.BrandKPIsBody + " -space-y-4"}>
        {fetchedKPIData
          .filter((item) => item.kpis.length > 0)
          .map((item, index) => (
            <AccordionItem2 key={index} data={item} />
          ))}
      </div>
    </div>
  );
}
