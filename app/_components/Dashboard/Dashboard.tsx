"use client";
import React, { memo } from "react";
import styles from "./dashboard.module.css";
import { Positions, TasksInDashboard } from "@/app/_data/data";
import { SimplePagination } from "@/app/_components/Pagination/pagination";
import { EmblaOptionsType } from "embla-carousel";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("./Calendar"), {
  ssr: false,
  loading: () => <div className="w-full h-full"></div>,
});
const Leaderboard = dynamic(() => import("./Leaderboard"), {
  ssr: false,
  loading: () => <div className="w-full h-full"></div>,
});
const EmblaCarousel = dynamic(
  () => import("@/app/_components/new-carousel/NewCarousel"),
  { ssr: false }
);

// dashboard component for dashboard page which be shown to every content-creator after login
const Dashboard = () => {
  const OPTIONS: EmblaOptionsType = { axis: "y", loop: true };

  const renderTasksSec = TasksInDashboard.map((tasks, idx) => (
    <div
      className={`${styles.rightBorder} w-1/3 my-[0.7vw] text-center px-[0.75vw] flex flex-col gap-[0.8vw]`}
      key={idx}
    >
      <h5 className={`${styles.bottomBorder} pb-[0.7vw] `}>
        {tasks.taskType}{" "}
      </h5>
      <div className="flex flex-col gap-[0.25vw] items-center">
        {tasks.tasks.map((oneTask) => (
          <span
            className={`
        ${styles.coloredTxt} 
        ${
          tasks.taskType === "Tasks Done"
            ? "bg-[#DBDBD7]"
            : oneTask === "PST USA"
            ? "bg-[#31B2E9B2]"
            : oneTask === "Canada"
            ? "bg-[#E9313EB2]"
            : oneTask === "PST Asia"
            ? "bg-[#E1C655B2]"
            : oneTask === "Investocracy"
            ? "bg-[#5FA85BB5]"
            : "bg-[#F36F24B2]"
        }
      `}
          >
            {oneTask}
          </span>
        ))}
      </div>
    </div>
  ));
  // get current date and current time in our format
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const currentHours = date.getHours();
  const amOrPm = currentHours > 12 ? "PM" : "AM";
  const hours = currentHours % 12;
  const currentDate = date.getDate() + " " + month + " " + date.getFullYear();
  const currentTime = hours + ":" + date.getMinutes() + " " + amOrPm;

  return (
    <div
      className={`${styles.dashboard} flex h-full w-full pt-[0.75vw] gap-[2vw]`}
    >
      {/* chat section in the end of page */}
      <div className={`${styles.movedChat} flex justify-end `}>
        <div
          className={`${styles.cutBox} w-1/3 h-[5vh] flex items-center gap-[0.3vw] px-[0.5vw] cursor-pointer`}
        >
          <svg
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="5.5" cy="5.5" r="5.5" fill="#5FA85B" />
          </svg>
          <h5>Chat</h5>
        </div>
      </div>

      <div className="w-1/2 flex flex-col gap-[0.9vw]">
        <div className={styles.halfHeader}>
          <h3>Tasks Over View</h3>
        </div>
        {/* his/her tasks over view */}
        <div className={`${styles.box} flex h-[20vh]`}>{renderTasksSec}</div>
        {/* annoucements section to display any annoucement he/she needs to know */}
        <div className="flex justify-between items-center">
          <h3>Announcements</h3>
          <SimplePagination />
        </div>

        <div className={`${styles.box} flex p-[0.8vw] h-[13vh] bg-[#2A2B2A]`}>
          {/* annoucement owner and his status */}
          <div
            className={`w-1/6 flex items-center gap-[0.25vw] ${styles.profileAndStatus}`}
          >
            <div className={`relative`}>
              <svg
                viewBox="0 0 41 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.632812 4.03324C0.632812 2.08188 2.2147 0.5 4.16606 0.5C24.0048 0.5 40.0874 16.5825 40.0874 36.4213V45.6818C40.0874 47.7905 38.3779 49.5 36.2692 49.5H4.45099C2.34226 49.5 0.632812 47.7905 0.632812 45.6818V4.03324Z"
                  fill="#FFFFFB"
                />
              </svg>
              <div className={styles.movedStatus}>
                <svg
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="5.5" cy="5.5" r="5.5" fill="#5FA85B" />
                </svg>
              </div>
            </div>
            <div className=" w-full">
              <h5>Ash</h5>
              <p>CEO</p>
            </div>
          </div>
          <div className={`${styles.annoucementBody} flex items-center w-5/6 `}>
            <p>
              @everyone Moving forward all payments will done via bank ONLY,
              send your bank information to @Manal and if you have any issues
              redirect them to @kamel.{" "}
            </p>
          </div>
        </div>
        {/* calendar and upcoming events in every month */}
        <div className="flex">
          <div className="w-1/2 flex flex-col gap-[1.2vw]">
            <h3>Up Coming Events</h3>
            <div className={`${styles.events} ps-[1vw] h-[25vh]`}>
              <div className="flex flex-col gap-[0.4vw]">
                <h5>This Week</h5>
                <p>No Events</p>
              </div>

              <div className="flex flex-col gap-[0.4vw]">
                <h5>Next Month</h5>
                <p>May Day</p>
                <p>Thanks Giving</p>
                <p>Sham El Neseem</p>
              </div>
            </div>
          </div>
          {/* calendar */}
          <Calendar />
        </div>
      </div>

      <div className="w-1/2 flex flex-col gap-[0.9vw] relative ">
        <div className="flex justify-between m-0">
          <h3>Leaderboard</h3>
          {/* display current date and time */}
          <div className={`${styles.halfHeader} flex flex-col items-end m-0`}>
            <p>{currentDate}</p>
            <p>{currentTime}</p>
          </div>
        </div>

        {/* display the employee of the month */}
        <Leaderboard />

        {/* display ways to get points */}
        <h3>Bonus Points</h3>
        <div className={`${styles.bonusBox} bg-[#2A2B2A] flex h-[15vh]`}>
          <div
            className={`${styles.bonusBox} bg-[#FFFFFB] w-1/2 flex flex-col justify-center items-center`}
          >
            <h1>256</h1>
            <h4>Points</h4>
          </div>

          <div
            className={`${styles.bonusBox} text-[#FFFFFB] w-1/2 flex flex-col justify-center items-center`}
          >
            <h1>500</h1>
            <h4>EGP</h4>
          </div>
        </div>

        <div className="flex">
          <div className={`${styles.waysToTakeBonus} w-1/2`}>
            <p>Arrived on time for 3 Months</p>
            <span>No Exceeding Breaks</span>
          </div>
          <div className={`${styles.waysToTakeBonus} w-1/2`}>
            <span>6 Articles per day</span>
            <p>Written article reached 1000 Views</p>
          </div>
        </div>
        {/* display career progression from internship to senior */}
        <h3>Career Progression</h3>
        <div
          className={`${styles.box} h-[8.6vw] p-[2vw] flex items-center bg-[#2A2B2A]`}
        >
          <div
            className={`w-1/2 ${styles.waysToTakeBonus} flex flex-col gap-[1vw] justify-center ${styles.careerSec}`}
          >
            <span>Reached 1 year mark</span>
            <p>100 Articles in 1 Year</p>
            <span>Completed Manager Training</span>
            <span>3 times Employee Of The Month</span>
            <p>Articles reached 1000+ Views</p>
          </div>
          <div className="w-1/2 ">
            <EmblaCarousel slides={Positions} options={OPTIONS} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Dashboard);
