import React from "react";
import dynamic from "next/dynamic";
import styles from "../CardStyles.module.css";

const AreaChart = dynamic(
  () => import("@/app/_components/OP/Analytics/02Brands/Charts/AreaChart"),
  {
    ssr: false,
  }
);

const upArrowIcon = (
  <svg
    width="18"
    height="10"
    viewBox="0 0 18 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.900543 9.19922L17.101 9.19922C17.265 9.19887 17.4258 9.16866 17.566 9.11183C17.7062 9.05501 17.8206 8.97372 17.8968 8.87671C17.973 8.7797 18.0081 8.67066 17.9984 8.56131C17.9887 8.45196 17.9345 8.34645 17.8417 8.25613L9.74149 0.4422C9.40578 0.118223 8.59756 0.118223 8.26095 0.442201L0.160722 8.25614C0.066962 8.34626 0.0119789 8.45183 0.00174654 8.56136C-0.00848579 8.67089 0.0264241 8.7802 0.102683 8.87741C0.178943 8.97462 0.293634 9.05602 0.434298 9.11275C0.574961 9.16949 0.736217 9.19939 0.900543 9.19922Z"
      fill="#5FA85B"
    />
  </svg>
);

const downArrowIcon = (
  <svg
    width="18"
    height="10"
    className="rotate-180"
    viewBox="0 0 18 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.900543 9.19922L17.101 9.19922C17.265 9.19887 17.4258 9.16866 17.566 9.11183C17.7062 9.05501 17.8206 8.97372 17.8968 8.87671C17.973 8.7797 18.0081 8.67066 17.9984 8.56131C17.9887 8.45196 17.9345 8.34645 17.8417 8.25613L9.74149 0.4422C9.40578 0.118223 8.59756 0.118223 8.26095 0.442201L0.160722 8.25614C0.066962 8.34626 0.0119789 8.45183 0.00174654 8.56136C-0.00848579 8.67089 0.0264241 8.7802 0.102683 8.87741C0.178943 8.97462 0.293634 9.05602 0.434298 9.11275C0.574961 9.16949 0.736217 9.19939 0.900543 9.19922Z"
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

interface IProps {
  title: string;
  value: number;
  change?: number;
  chartData: number[];
}

export default function AnalyticsCard({
  title,
  value,
  change,
  chartData,
}: IProps) {
  return (
    <div
      className={`${styles.card} w-1/2 card h-[200px] px-[1vw] rounded-xl group hover:bg-[var(--dark)] overflow-hidden`}
    >
      <div className="flex justify-center items-center gap-[1.5vw] h-full">
        <div className="group-hover:text-[var(--white)] w-[40%]">
          <div className="flex justify-between items-center w-fit h-[5vh] border-b-[1px] border-b-[#2A2B2A] group-hover:border-b-[var(--white)] mb-[1vw]">
            <h3 className="font-bold text-center pr-2">{title}</h3>
          </div>

          <div className="w-fit flex justify-center items-center gap-3">
            <div className="text-[--36px] font-bold">
              {Math.abs(value) > 999 ? `${(value / 1000).toFixed(1)}K` : value}
            </div>

            <div>
              {!change
                ? sidewaysIcon
                : change > 0
                ? upArrowIcon
                : downArrowIcon}
            </div>
          </div>
        </div>

        <div className="h-full flex justify-center items-center w-[60%]">
          <AreaChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
