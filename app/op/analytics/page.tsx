"use client";
import Slider from "react-slick";
import React, { useState } from "react";
import styles from "./analytics.module.css";
import "./analytics.css";
import dynamic from "next/dynamic";
import RevenueOverview from "@/app/_components/OP/Analytics/01RevenueOverview/RevenueOverview";
import BrandKPIs from "@/app/_components/OP/Analytics/02BrandKPIs/BrandKPIs";
import BrandAccounts from "@/app/_components/OP/Analytics/03BrandAccounts/BrandAccounts";
import ActivityOverview from "@/app/_components/OP/Analytics/04ActivityOverview/ActivityOverview";
import FollowersOverview from "@/app/_components/OP/Analytics/05FollowersOverview/FollowersOverview";
import YoutubeWatchtime from "@/app/_components/OP/Analytics/06YoutubeWatchtime/YoutubeWatchtime";

const TasksChart = dynamic(() => import("@/app/_components/graph/AreaChart"), {
  ssr: false,
});

const LineCharts = dynamic(() => import("@/app/_components/graph/LineCharts"), {
  ssr: false,
});

function SampleNextArrow(props: any) {
  const { onClick, className } = props;
  return (
    <div onClick={onClick} className={`custom_arrows ${className}`}>
      <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.4941 23.9434C17.0787 23.529 17.0787 22.8565 17.4941 22.441L21.8726 18.0625L10.625 18.0625C10.0406 18.0625 9.5625 17.5865 9.5625 17C9.5625 16.4124 10.0406 15.9375 10.625 15.9375L21.8726 15.9375L17.4941 11.559C17.0787 11.1435 17.0787 10.4699 17.4941 10.0566C17.9074 9.64115 18.581 9.64115 18.9965 10.0566L25.0059 16.066C25.2609 16.321 25.3406 16.6696 25.2822 17C25.3406 17.3304 25.2609 17.679 25.0059 17.934L18.9965 23.9434C18.581 24.3588 17.9074 24.3588 17.4941 23.9434ZM34 29.75L34 4.25C34 1.90294 32.0971 -8.318e-08 29.75 -1.85773e-07L4.25 -1.30041e-06C1.90187 -1.40305e-06 -8.318e-08 1.90294 -1.85773e-07 4.25L-1.30041e-06 29.75C-1.40301e-06 32.0971 1.90187 34 4.25 34L29.75 34C32.0971 34 34 32.0971 34 29.75Z"
        />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick, className } = props;
  return (
    <div onClick={onClick} className={`custom_arrows ${className}`}>
      <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.5059 23.9434C16.9213 23.529 16.9213 22.8565 16.5059 22.441L12.1274 18.0625L23.375 18.0625C23.9594 18.0625 24.4375 17.5865 24.4375 17C24.4375 16.4124 23.9594 15.9375 23.375 15.9375L12.1274 15.9375L16.5059 11.559C16.9213 11.1435 16.9213 10.4699 16.5059 10.0566C16.0926 9.64115 15.419 9.64115 15.0035 10.0566L8.99409 16.066C8.73909 16.321 8.65939 16.6696 8.71783 17C8.65939 17.3304 8.73909 17.679 8.99409 17.934L15.0035 23.9434C15.419 24.3588 16.0926 24.3588 16.5059 23.9434ZM1.30041e-06 29.75L1.85773e-07 4.25C8.318e-08 1.90294 1.90294 -8.318e-08 4.25 -1.85773e-07L29.75 -1.30041e-06C32.0981 -1.40305e-06 34 1.90294 34 4.25L34 29.75C34 32.0971 32.0981 34 29.75 34L4.25 34C1.90294 34 1.40301e-06 32.0971 1.30041e-06 29.75Z"
        />
      </svg>
    </div>
  );
}

function Page() {
  const settings: any = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1425,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    centerPadding: 30,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <div className={`overflow-hidden op__analytics__container`}>
      {/* Tabs */}
      <div role="tablist" className={`${styles.tabs} flex`}>
        <a
          role="tab"
          className={`${styles.tab} ${activeTab === 1 ? styles.activeTab : ""}`}
          onClick={() => setActiveTab(1)}
        >
          God View
        </a>
        <a
          role="tab"
          className={`${styles.tab} ${activeTab === 2 ? styles.activeTab : ""}`}
          onClick={() => setActiveTab(2)}
        >
          Brands
        </a>
      </div>

      {activeTab === 1 && (
        <div className={styles.dashboard}>
          <div className={styles.mainContent}>
            {/* ===== Start First Row ===== */}
            <div className={styles.firstRow + " flex justify-between gap-[1vw]"}>
              {/* Revenue Over View */}
              <div className="flex-grow">
                <RevenueOverview />
              </div>

              {/* Brand KPIs */}
              <BrandKPIs />
            </div>
            {/* ===== End First Row ===== */}


            {/* ==== Start Second Row ==== */}
            <div className={styles.secondRow + " flex gap-[0.75vw]"}>
              {/* Activity Over View */}
              <div className="ActivityOverView w-[40%]">
                <ActivityOverview />
              </div>

              {/* Followers Over View */}
              <div className="FollowersOverView w-[32.5%]">
                <FollowersOverview />
              </div>

              {/* Youtube Watch time */}
              <div className="YoutubeWatchTime w-[27.5%]">
                <YoutubeWatchtime />
              </div>
            </div>
            {/* ==== End Second Row ==== */}
          </div>

          <div className={styles.sidebar}>
            <BrandAccounts />
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className={`relative`}>
          <div>
            <h2 className="text-2xl mb-4 font-bold">Social Media Accounts</h2>
            <div className="">
              <div className="sliderAudience w-[86vw]">
                <div className={`slider-container card ${styles.card} py-6`}>
                  <Slider {...settings}>
                    {Array(12)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          className={`${styles.card} px-[1vw] pt-[0.6vw] pb-[1vw] rounded-xl group hover:bg-[var(--dark)] hover:text-[var(--white)]`}
                        >
                          <div className="flex justify-between items-center pb-[0.5vw] border-b-[1px] border-b-[#2A2B2A] group-hover:border-b-[var(--white)] mb-[0.5vw]">
                            <h3 className="grow font-bold text-center">
                              Twitter
                            </h3>
                          </div>
                          <div className="grid mx-auto w-fit grid-cols-2 ">
                            <span className="font-bold">Name:</span>
                            <span>Mega Dose</span>
                            <span className="font-bold">Username:</span>
                            <span>@MEGADOSE</span>
                            <span className="font-bold">Followers:</span>
                            <span>20.1 K</span>
                          </div>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 grid-rows-4 gap-4 mt-9">
            <div className="col-span-2 row-span-2">
              <h3 className="text-2xl font-bold">Analytics</h3>
              <div className={"tabs " + styles.tab}>
                <input
                  type="radio"
                  name="tab"
                  className="tab"
                  aria-label="Daily"
                  defaultChecked
                />
                <div className={`tab-content `}>
                  <div className="flex gap-3 mt-5">
                    <div
                      className={`${styles.card} w-1/2 card h-fit grow px-[1vw] py-[0.6vw] rounded-xl group hover:bg-[var(--dark)] `}
                    >
                      <div className="flex justify-center items-center gap-[1.5vw]">
                        <div className="group-hover:text-[var(--white)]">
                          <div className="flex justify-between items-center w-fit h-[5vh] border-b-[1px] border-b-[#2A2B2A] group-hover:border-b-[var(--white)] mb-[1vw]">
                            <h3 className="font-bold text-center pr-2">
                              Followers
                            </h3>
                          </div>
                          <div className="w-fit flex justify-center items-center gap-3 ">
                            <div className="text-4xl font-bold">22k</div>
                            <div>
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
                            </div>
                          </div>
                        </div>
                        <div className="h-full place-self-end">
                          <TasksChart />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${styles.card} w-1/2 card h-fit grow px-[1vw] py-[0.6vw] rounded-xl group hover:bg-[var(--dark)] `}
                    >
                      <div className="flex justify-center items-center gap-[1.5vw]">
                        <div className="group-hover:text-[var(--white)]">
                          <div className="flex justify-between items-center w-fit h-[5vh] border-b-[1px] border-b-[#2A2B2A] group-hover:border-b-[var(--white)] mb-[1vw]">
                            <h3 className="font-bold text-center pr-2">
                              Activities
                            </h3>
                          </div>
                          <div className="w-fit flex justify-center items-center gap-3 ">
                            <div className="text-4xl font-bold">22k</div>
                            <div>
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
                            </div>
                          </div>
                        </div>
                        <div className="h-full place-self-end">
                          <TasksChart />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <input
                  type="radio"
                  name="tab"
                  className="tab"
                  aria-label="Weekly"
                />
                <div className={`tab-content relative`}></div>
                <input
                  type="radio"
                  name="tab"
                  className="tab"
                  aria-label="Monthly"
                />
                <div className={`tab-content relative`}></div>
                <input
                  type="radio"
                  name="tab"
                  className="tab"
                  aria-label="Quarterly"
                />
                <div className={`tab-content relative`}></div>
                <input
                  type="radio"
                  name="tab"
                  className="tab"
                  aria-label="Yearly"
                />
                <div className={`tab-content relative`}></div>
                <input
                  type="radio"
                  name="tab"
                  className="tab"
                  aria-label="Life-time"
                />
                <div className={`tab-content relative`}></div>
              </div>
            </div>
            <div className="col-span-2 row-span-2 col-start-3">
              <div
                className={`${styles.card} card grow px-[1vw] py-[0.6vw] rounded-xl h-[24vh] bg-[var(--dark)] `}
              >
                <div className="relative flex justify-center h-full items-center gap-[1.5vw]">
                  <div className="w-full place-self-end">
                    <LineCharts />
                  </div>
                  <div className="flex justify-center items-center gap-3 absolute right-3 top-2 text-sm border border-[var(--dark)] shadow-[2px_2.18px_5.5px_0px_#00000075] py-2 px-3 text-[var(--white)] rounded-[5px]">
                    <span>Average Reach</span>
                    <span>|</span>
                    <span className="font-bold">200k</span>
                    <span>
                      <svg
                        width="18"
                        height="9"
                        viewBox="0 0 18 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.900543 9L17.101 9C17.265 8.99965 17.4258 8.96944 17.566 8.91261C17.7062 8.85579 17.8206 8.7745 17.8968 8.67749C17.973 8.58049 18.0081 8.47144 17.9984 8.36209C17.9887 8.25274 17.9345 8.14723 17.8417 8.05692L9.74149 0.242982C9.40578 -0.0809961 8.59756 -0.080996 8.26095 0.242982L0.160722 8.05692C0.066962 8.14705 0.0119789 8.25261 0.00174654 8.36214C-0.00848579 8.47167 0.0264241 8.58098 0.102683 8.67819C0.178943 8.7754 0.293634 8.8568 0.434298 8.91353C0.574961 8.97027 0.736217 9.00017 0.900543 9Z"
                          fill="#5FA85B"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`col-span-4 row-span-2 row-start-3 ${styles.engagement}`}
            >
              <div
                className={`${styles.card} flex gap-[3vw]  grow px-[1vw] py-[0.6vw] rounded-xl h-[20vh] bg-[var(--dark)] `}
              >
                <div className="flex items-center w-1/2 h-full gap-[1.5vw] text-[var(--white)]">
                  <div className="w-1/2 h-full flex flex-col">
                    <h3 className="text-xl font-bold">Tweets</h3>
                    <ul className="text-sm list-none">
                      <li className="flex justify-between items-center">
                        <span>Tweets Created</span>
                        <span>1</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Impressions</span>
                        <span>24</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Likes</span>
                        <span>34</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Retweets</span>
                        <span>12</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-1/2 py-2 h-full flex justify-center items-center">
                    <div className="bg-[#0F0F0F] h-full w-full rounded-2xl overflow-hidden">
                      <h3 className="text-sm pt-3 pl-5  font-bold">
                        Tweets Created
                      </h3>
                      <div className="text-[var(--dark)]">
                        <LineCharts />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center w-1/2 h-full gap-[1.5vw] text-[var(--white)]">
                  <div className="w-1/2 h-full flex flex-col">
                    <h3 className="text-xl font-bold">Tweets</h3>
                    <ul className="text-sm list-none">
                      <li className="flex justify-between items-center">
                        <span>Tweets Created</span>
                        <span>1</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Impressions</span>
                        <span>24</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Likes</span>
                        <span>34</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Retweets</span>
                        <span>12</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-1/2 py-2 h-full flex justify-center items-center">
                    <div className="bg-[#0F0F0F] h-full w-full rounded-2xl overflow-hidden">
                      <h3 className="text-sm pt-3 pl-5  font-bold">
                        Tweets Created
                      </h3>
                      <div className="text-[var(--dark)]">
                        <LineCharts />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
