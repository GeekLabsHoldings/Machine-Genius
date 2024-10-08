"use client";
import React from "react";
import styles from "./ActivityOverview.module.css";

export default function ActivityOverview() {
  const chart1 = (
    <svg
      width="120"
      height="30"
      viewBox="0 0 120 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.1"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.40625 20.4737C1.40625 20.4737 6.03228 19.7959 11.2918 21.4242C21.2951 24.5212 21.8658 18.8499 25.5751 16.1152C28.9687 13.6134 31.7793 15.1399 35.5579 18.1994C38.3447 20.456 42.4062 24.2439 46.6123 23.6341C50.4571 23.0767 53.1828 18.634 58.5121 17.5042C62.7359 16.6087 66.1685 19.0688 71.0322 18.1994C77.6303 17.0201 80.5776 10.0772 85.2932 10.0772C91.1134 10.0772 95.2111 4.20508 100.506 4.20508C105.769 4.20508 106.484 7.65801 112.241 10.0772C116.643 11.9266 118.761 10.0772 118.761 10.0772V29.8955H1.40625V20.4737Z"
        fill="url(#paint0_linear_1402_9405)"
      />
      <path
        d="M1.40625 17.3967C1.40625 17.3967 6.03228 16.7287 11.2918 18.3335C21.2951 21.3857 21.8658 15.7964 25.5751 13.1014C28.9687 10.6357 31.7793 12.1401 35.5579 15.1554C38.3447 17.3793 42.4062 21.1124 46.6123 20.5114C50.4571 19.9621 53.1828 15.5837 58.5121 14.4702C62.7359 13.5877 66.1685 16.0122 71.0322 15.1554C77.6303 13.9931 80.5776 7.15069 85.2932 7.15069C91.1134 7.15069 95.2111 1.34961 100.506 1.34961C105.769 1.34961 106.049 4.76654 111.807 7.15069C116.208 8.97338 118.761 7.15069 118.761 7.15069"
        stroke="#31B2E9"
        stroke-width="1.70946"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1402_9405"
          x1="22.6153"
          y1="17.2405"
          x2="22.6153"
          y2="29.8955"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0062FF" />
          <stop offset="1" stopColor="white" stop-opacity="0.01" />
        </linearGradient>
      </defs>
    </svg>
  );

  const chart2 = (
    <svg
      width="120"
      height="30"
      viewBox="0 0 120 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.1"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.40625 20.0889C1.40625 20.0889 6.03228 19.4111 11.2918 21.0394C21.2951 24.1365 21.8658 18.4651 25.5751 15.7305C28.9687 13.2286 31.7793 14.7551 35.5579 17.8147C38.3447 20.0713 42.4062 23.8592 46.6123 23.2494C50.4571 22.6919 53.1828 18.2492 58.5121 17.1194C62.7359 16.2239 66.1685 18.684 71.0322 17.8147C77.6303 16.6353 80.5776 9.69241 85.2932 9.69241C91.1134 9.69241 95.2111 3.82031 100.506 3.82031C105.769 3.82031 106.484 7.27325 112.241 9.69241C116.643 11.5419 118.761 9.69241 118.761 9.69241V29.5107H1.40625V20.0889Z"
        fill="url(#paint0_linear_1402_9431)"
      />
      <path
        d="M1.40625 17.0119C1.40625 17.0119 6.03228 16.3439 11.2918 17.9487C21.2951 21.0009 21.8658 15.4116 25.5751 12.7166C28.9687 10.2509 31.7793 11.7553 35.5579 14.7706C38.3447 16.9945 42.4062 20.7276 46.6123 20.1266C50.4571 19.5773 53.1828 15.1989 58.5121 14.0854C62.7359 13.2029 66.1685 15.6274 71.0322 14.7706C77.6303 13.6084 80.5776 6.76592 85.2932 6.76592C91.1134 6.76592 95.2111 0.964844 100.506 0.964844C105.769 0.964844 106.049 4.38178 111.807 6.76592C116.208 8.58862 118.761 6.76592 118.761 6.76592"
        stroke="#E1C655"
        stroke-width="1.70946"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1402_9431"
          x1="22.6153"
          y1="16.8558"
          x2="22.6153"
          y2="29.5107"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E1C655" />
          <stop offset="1" stopColor="white" stop-opacity="0.01" />
        </linearGradient>
      </defs>
    </svg>
  );

  const chart3 = (
    <svg
      width="120"
      height="31"
      viewBox="0 0 120 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.1"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.40625 20.8838C1.40625 20.8838 6.03228 20.206 11.2918 21.8344C21.2951 24.9314 21.8658 19.26 25.5751 16.5254C28.9687 14.0235 31.7793 15.55 35.5579 18.6096C38.3447 20.8662 42.4062 24.6541 46.6123 24.0443C50.4571 23.4869 53.1828 19.0442 58.5121 17.9143C62.7359 17.0188 66.1685 19.4789 71.0322 18.6096C77.6303 17.4303 80.5776 10.4873 85.2932 10.4873C91.1134 10.4873 95.2111 4.61523 100.506 4.61523C105.769 4.61523 106.484 8.06817 112.241 10.4873C116.643 12.3368 118.761 10.4873 118.761 10.4873V30.3057H1.40625V20.8838Z"
        fill="url(#paint0_linear_1402_9447)"
      />
      <path
        d="M1.40625 17.8069C1.40625 17.8069 6.03228 17.1389 11.2918 18.7436C21.2951 21.7958 21.8658 16.2065 25.5751 13.5115C28.9687 11.0459 31.7793 12.5502 35.5579 15.5655C38.3447 17.7895 42.4062 21.5225 46.6123 20.9216C50.4571 20.3722 53.1828 15.9938 58.5121 14.8803C62.7359 13.9978 66.1685 16.4223 71.0322 15.5655C77.6303 14.4033 80.5776 7.56084 85.2932 7.56084C91.1134 7.56084 95.2111 1.75977 100.506 1.75977C105.769 1.75977 106.049 5.1767 111.807 7.56084C116.208 9.38354 118.761 7.56084 118.761 7.56084"
        stroke="#E9313E"
        stroke-width="1.70946"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1402_9447"
          x1="22.6153"
          y1="17.6507"
          x2="22.6153"
          y2="30.3057"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E9313E" />
          <stop offset="1" stopColor="white" stop-opacity="0.01" />
        </linearGradient>
      </defs>
    </svg>
  );

  const bodyRow = [
    {
      brand: "PST Canada",
      impressions: "200 K",
      reach: "360 K",
      view: chart1,
    },
    {
      brand: "PST USA",
      impressions: "200 K",
      reach: "360 K",
      view: chart1,
    },
    {
      brand: "ST Suite",
      impressions: "200 K",
      reach: "360 K",
      view: chart2,
    },
    {
      brand: "Juice Box",
      impressions: "200 K",
      reach: "360 K",
      view: chart2,
    },
    {
      brand: "Inestocrasy",
      impressions: "200 K",
      reach: "360 K",
      view: chart3,
    },
  ];

  return (
    <section className={styles.ActivityOverview}>
      <p className={styles.ActivityOverviewTitle}>Activity Overview</p>
      <div className={styles.ActivityOverviewContainer}>
        <div className={styles.ActivityBody}>
          {/* ===== Start Table ===== */}
          <div className={`${styles.tableContainer} flex`}>
            <div className={styles.table + " w-full"}>
              {/* Table Header */}
              <ul className={styles.table_header}>
                <li className="w-[25%]">
                  <span>Brand</span>
                </li>
                <li className={`w-[25%] ${styles.center}`}>
                  <span>Impressions</span>
                </li>
                <li className={`w-[25%] ${styles.center}`}>
                  <span>Reach</span>
                </li>
                <li className={styles.center + " w-[25%]"}>
                  <span>View</span>
                </li>
              </ul>
              {/* Table Body */}
              <div className={styles.table_body}>
                {bodyRow.map((e, idx) => (
                  <ul key={idx}>
                    <li className="w-[25%]">
                      <span>{e.brand}</span>
                    </li>
                    <li className={`w-[25%] ${styles.center}`}>
                      <span>{e.impressions}</span>
                    </li>
                    <li className={`w-[25%] ${styles.center}`}>
                      <span>{e.reach}</span>
                    </li>
                    <li className={`w-[25%] ${styles.center}`}>
                      <span className={styles.view}>{e.view}</span>
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
