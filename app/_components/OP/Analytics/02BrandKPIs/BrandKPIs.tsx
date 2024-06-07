"use client";
import React from "react";
import styles from "./BrandKPIs.module.css";

export default function BrandKPIs() {
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

  const accordionItems = [
    { title: "Creative Juice Box" },
    { title: "Mega Dose" },
    { title: "PST Canada" },
    { title: "PST USA" },
    { title: "Creative Juice Box" },
    { title: "Mega Dose" },
    { title: "PST Canada" },
    { title: "PST USA" },
    { title: "Creative Juice Box" },
    { title: "Mega Dose" },
    { title: "PST Canada" },
    { title: "PST USA" },
  ];

  function AccordionItem2({ title }: { title: string }) {
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
              <tbody>
                <tr>
                  <td>Instagram</td>
                  <td>
                    2 Reels <span className="font-bold">/Day</span>
                  </td>
                  <td className={styles.kpiNotMet}>1/2</td>
                </tr>
                <tr>
                  <td>Twitter</td>
                  <td>
                    2 Tweets <span className="font-bold">/Day</span>
                  </td>
                  <td className={styles.kpiNotMet}>1/2</td>
                </tr>
                <tr>
                  <td>YouTube</td>
                  <td>
                    1 Video <span className="font-bold">/Day</span>
                  </td>
                  <td className={styles.kpiMet}>1/1</td>
                </tr>
                <tr>
                  <td>Website</td>
                  <td>
                    1 Article <span className="font-bold">/Day</span>
                  </td>
                  <td className={styles.kpiMet}>1/1</td>
                </tr>
                <tr>
                  <td>Reddit</td>
                  <td>
                    2 Posts <span className="font-bold">/Day</span>
                  </td>
                  <td className={styles.kpiNotMet}>1/2</td>
                </tr>
                <tr>
                  <td>Discord</td>
                  <td>
                    2 Announcements <span className="font-bold">/Day</span>
                  </td>
                  <td className={styles.kpiMet}>2/2</td>
                </tr>
                <tr>
                  <td>Telegram</td>
                  <td>
                    2 Posts <span className="font-bold">/Day</span>
                  </td>
                  <td className={styles.kpiNotMet}>1/2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.BrandKPIsContainer}>
      <p className={styles.BrandKPIsTitle}>Brand KPIs</p>
      <div className={styles.BrandKPIsBody + " -space-y-4"}>
        <AccordionItem2 title={"Street Politics"} />
        {accordionItems.map((item, index) => (
          <AccordionItem2 key={index} title={item.title} />
        ))}
      </div>
    </div>
  );
}
