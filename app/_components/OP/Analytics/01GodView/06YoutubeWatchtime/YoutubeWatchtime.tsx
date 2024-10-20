"use client";
import React from "react";
import styles from "./YoutubeWatchtime.module.css";

export default function YoutubeWatchtime() {
  const chart1 = (
    <svg
      width="58"
      height="20"
      viewBox="0 0 58 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.41095 2.07344C8.76231 6.28958 3.19484 10.5868 0.492188 12.2084V17.0732L56.8426 19.1002V12.2084L49.5454 2.07344L43.4644 7.34362L40.2212 12.2084L19.9513 7.34362L16.3027 12.2084C14.2757 7.07335 10.0596 -2.1427 9.41095 2.07344Z"
        fill="url(#paint0_linear_1402_9646)"
      />
      <path
        d="M0.492188 12.2084C3.19484 10.5868 8.76231 6.28958 9.41095 2.07344C10.0596 -2.1427 14.2757 7.07335 16.3027 12.2084L19.9513 7.34362L40.2212 12.2084L43.4644 7.34362L49.5454 2.07344L56.8426 12.2084"
        stroke="#5DB48A"
        stroke-linecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1402_9646"
          x1="26.4377"
          y1="-1.16975"
          x2="26.0323"
          y2="19.1002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#49A677" />
          <stop offset="1" stopColor="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );

  const chart2 = (
    <svg
      width="58"
      height="22"
      viewBox="0 0 58 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.41095 4.66356C8.76231 8.8797 3.19484 13.1769 0.492188 14.7985V19.6633L56.8426 21.6903V14.7985L49.5561 9.22046H42.6598L33.0512 1.31678L19.9513 9.93373L16.6071 4.66356C14.5801 -0.471484 10.0596 0.447415 9.41095 4.66356Z"
        fill="url(#paint0_linear_1402_9657)"
      />
      <path
        d="M0.492188 14.7982C3.19484 13.1766 8.76231 8.87937 9.41095 4.66323C10.0596 0.447083 14.0328 -0.561613 16.0598 4.57343L19.9513 9.9334L33.1363 1.28186L42.8787 8.93271H49.5561L56.8426 14.7982"
        stroke="#EB7487"
        stroke-linecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1402_9657"
          x1="26.4377"
          y1="1.42037"
          x2="26.0323"
          y2="21.6903"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EB94A2" />
          <stop offset="1" stopColor="#EB94A2" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );

  const upArrow = (
    <svg
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.92387 0.67965C4.7286 0.484388 4.41202 0.484388 4.21676 0.67965L1.03478 3.86163C0.839516 4.05689 0.839516 4.37347 1.03478 4.56874C1.23004 4.764 1.54662 4.764 1.74189 4.56874L4.57031 1.74031L7.39874 4.56874C7.594 4.764 7.91058 4.764 8.10585 4.56874C8.30111 4.37347 8.30111 4.05689 8.10585 3.86163L4.92387 0.67965ZM4.07031 1.0332L4.07031 9.96643L5.07031 9.96643L5.07031 1.0332L4.07031 1.0332Z"
        fill="#5DB48A"
      />
    </svg>
  );

  const downArrow = (
    <svg
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.21676 9.41959C4.41202 9.61486 4.7286 9.61486 4.92387 9.41959L8.10585 6.23761C8.30111 6.04235 8.30111 5.72577 8.10585 5.53051C7.91058 5.33524 7.594 5.33524 7.39874 5.53051L4.57031 8.35893L1.74189 5.53051C1.54662 5.33524 1.23004 5.33524 1.03478 5.53051C0.839516 5.72577 0.839516 6.04235 1.03478 6.23761L4.21676 9.41959ZM4.07031 0.132812L4.07031 9.06604L5.07031 9.06604L5.07031 0.132813L4.07031 0.132812Z"
        fill="#EB7487"
      />
    </svg>
  );

  const bodyRow = [
    {
      channel: "Amazon",
      chart: chart1,
      dailyAverage: "1658.00",
      arrowIndicator: upArrow,
    },
    {
      channel: "Netflix",
      chart: chart2,
      dailyAverage: "1658.00",
      arrowIndicator: downArrow,
    },
    {
      channel: "Amazon",
      chart: chart1,
      dailyAverage: "1658.00",
      arrowIndicator: upArrow,
    },
    {
      channel: "Amazon",
      chart: chart1,
      dailyAverage: "1658.00",
      arrowIndicator: upArrow,
    },
    {
      channel: "Netflix",
      chart: chart2,
      dailyAverage: "1658.00",
      arrowIndicator: downArrow,
    },
  ];

  return (
    <section className={styles.YoutubeWatchTime}>
      <p className={styles.title}>Youtube Watch time</p>
      <div className={styles.YoutubeWatchTimeContainer}>
        <div className={styles.YoutubeWatchTimeBody}>
          {/* ===== Start Table ===== */}
          <div className={`${styles.tableContainer} flex`}>
            <div className={styles.table + " w-full"}>
              {/* Table Header */}
              <ul className={styles.table_header}>
                <li className="w-[30%]">
                  <span>Channel</span>
                </li>
                <li className={`w-[70%] ${styles.center}`}>
                  <span>Daily Average</span>
                </li>
              </ul>

              {/* Table Body */}
              <div className={styles.table_body}>
                {bodyRow.map((e, idx) => (
                  <ul key={idx}>
                    <li className="w-[30%]">
                      <span>{e.channel}</span>
                    </li>
                    <li className={`w-[70%] ${styles.center}`}>
                      <span className={styles.chart}>{e.chart}</span>
                      <span className={styles.dailyAverage}>
                        <span>{e.dailyAverage}</span>
                        <span>{e.arrowIndicator}</span>
                      </span>
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
