"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./KPIsTable.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { globalContext } from "@/app/_context/store";
import { IKPIData } from "@/app/_components/OP/Analytics/00Types/OP_Analytics_Types";
import toast from "react-hot-toast";
import { addIcon } from "@/app/_utils/svgIcons";

interface PlatformData {
  platformName: string;
  kpiMetrics: string[]; // list of KPI metric names
  data: {
    [kpiMetric: string]: {
      [month: number]: {
        required: number | undefined;
        met: number | undefined;
      };
    };
  };
}

const alertIcon = (
  <svg
    className="w-[29px] h-[29px] iconify iconify--emojione"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M5.9 62c-3.3 0-4.8-2.4-3.3-5.3L29.3 4.2c1.5-2.9 3.9-2.9 5.4 0l26.7 52.5c1.5 2.9 0 5.3-3.3 5.3H5.9z"
      fill="#ffce31"
    ></path>

    <g fill="#231f20">
      <path d="M27.8 23.6l2.8 18.5c.3 1.8 2.6 1.8 2.9 0l2.7-18.5c.5-7.2-8.9-7.2-8.4 0"></path>

      <circle cx="32" cy="49.6" r="4.2"></circle>
    </g>
  </svg>
);

export default function Page() {
  const { authState, handleSignOut, brandOptions, brandMap } =
    useContext(globalContext);

  const [pageState, setPageState] = useState<{
    fetchedKPIData: IKPIData | null;
    selectedBrand: string;
    isLoading: boolean;
  }>({
    fetchedKPIData: null,
    selectedBrand: "",
    isLoading: false,
  });

  const [platformDataMap, setPlatformDataMap] = useState<{
    [platformName: string]: PlatformData;
  }>({});

  const kpiMetricNames: { [key: string]: string } = {
    postsPerDay: "Posts Per Day",
    postsPerWeek: "Posts Per Week",
    postsPerMonth: "Posts Per Month",
  };

  const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  const getKPIData = async (brandId: string) => {
    try {
      setPageState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/analytics/kpi/${brandId}`,
        {
          headers: {
            Authorization: `bearer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
        }
      );
      if (res.status === 401) {
        handleSignOut();
        return;
      }
      if (!res.ok) {
        toast.error("Failed to fetch KPI data!");
        return;
      }
      const data: IKPIData = await res.json();
      if (data) {
        setPageState((prevState: any) => ({
          ...prevState,
          fetchedKPIData: data,
        }));
      }
      // else {
      //   toast.error("Failed to fetch KPI data!");
      // }
    } catch (error) {
      console.error("Error fetching KPI data:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch KPI data!"
      );
    } finally {
      setPageState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    if (pageState.selectedBrand !== "") {
      getKPIData(pageState.selectedBrand);
    }
  }, [pageState.selectedBrand]);

  useEffect(() => {
    if (pageState.fetchedKPIData) {
      const platformDataMap: { [platformName: string]: PlatformData } = {};

      // Process kpis
      for (const kpi of pageState.fetchedKPIData.kpis) {
        const { year, month } = kpi._id;
        for (const platformKPI of kpi.platforms) {
          const platformName = platformKPI.platform;
          if (!platformDataMap[platformName]) {
            platformDataMap[platformName] = {
              platformName,
              kpiMetrics: [],
              data: {},
            };
          }
          const platformData = platformDataMap[platformName];

          const metrics: Array<
            "postsPerDay" | "postsPerWeek" | "postsPerMonth"
          > = ["postsPerDay", "postsPerWeek", "postsPerMonth"];

          for (const metric of metrics) {
            const requiredValue = platformKPI[metric];
            if (!platformData.kpiMetrics.includes(metric)) {
              platformData.kpiMetrics.push(metric);
            }
            if (!platformData.data[metric]) {
              platformData.data[metric] = {};
            }
            if (!platformData.data[metric][month]) {
              platformData.data[metric][month] = {
                required: requiredValue,
                met: undefined,
              };
            } else {
              platformData.data[metric][month].required = requiredValue;
            }
          }
        }
      }

      // Process achievedKPIs
      for (const achievedKPI of pageState.fetchedKPIData.achievedKPIs) {
        const { year, month } = achievedKPI.date;
        for (const achievedPlatformKPI of achievedKPI.platforms) {
          const platformName = achievedPlatformKPI.platform;
          if (!platformDataMap[platformName]) {
            platformDataMap[platformName] = {
              platformName,
              kpiMetrics: [],
              data: {},
            };
          }
          const platformData = platformDataMap[platformName];

          const metricsMap: Record<
            "Day" | "Week" | "Month",
            "postsPerDay" | "postsPerWeek" | "postsPerMonth"
          > = {
            Day: "postsPerDay",
            Week: "postsPerWeek",
            Month: "postsPerMonth",
          };

          for (const achievedMetric of Object.keys(metricsMap) as Array<
            "Day" | "Week" | "Month"
          >) {
            const requiredMetric = metricsMap[achievedMetric];
            const metValue = achievedPlatformKPI[achievedMetric];
            if (!platformData.kpiMetrics.includes(requiredMetric)) {
              platformData.kpiMetrics.push(requiredMetric);
            }
            if (!platformData.data[requiredMetric]) {
              platformData.data[requiredMetric] = {};
            }
            if (!platformData.data[requiredMetric][month]) {
              platformData.data[requiredMetric][month] = {
                required: undefined,
                met: metValue,
              };
            } else {
              platformData.data[requiredMetric][month].met = metValue;
            }
          }
        }
      }

      setPlatformDataMap(platformDataMap);
    }
  }, [pageState.fetchedKPIData]);

  return (
    <section>
      {/* ===== Start Page Header ===== */}
      <div className="pageHeader">
        <h3 className="mt-[25px]">KPI Overview</h3>

        {/* Search & Filter Options & Buttons Container */}
        <div className="flex justify-between items-end w-full mt-[10px] mb-[25px]">
          {/* Search and Filter Options Section */}
          <div className={`w-8/12 flex items-center gap-[1.2vw]`}>
            {/* Filter Options */}
            <div className="flex flex-col w-1/4 gap-[0.3vw]">
              <label className="font-bold" htmlFor="">
                Select Brands
              </label>
              <CustomSelectInput
                label="Select Brand"
                options={brandOptions}
                getValue={(value: string) => {
                  setPageState((prevState) => ({
                    ...prevState,
                    selectedBrand: brandMap[value],
                  }));
                }}
              />
            </div>
          </div>

          <CustomBtn
            btnColor="black"
            word={"Add KPI"}
            icon={addIcon}
            paddingVal="py-[0.4vw] px-[0.9vw]"
            href="/op/kpis/add-kpi"
          />
        </div>
      </div>
      {/* ===== End Page Header ===== */}

      {/* ===== Start KPIs Table ===== */}
      <div className={styles.kpis_table + " overflow-hidden rounded-[20px]"}>
        <div className={styles.table_container}>
          <table>
            <thead>
              <tr>
                <th className="w-[15vw]">Platform</th>
                <th>KPI Metric</th>
                {/* For each month */}
                {Array.from({ length: 12 }).map((_, idx) => (
                  <th colSpan={2} key={`month-${idx + 1}`}>
                    {getMonthName(idx + 1)}
                  </th>
                ))}
              </tr>
              <tr>
                <th></th>
                <th></th>
                {/* For each month */}
                {Array.from({ length: 12 }).flatMap((_, idx) => [
                  <th key={`kr-${idx + 1}`}>KPI Required</th>,
                  <th key={`km-${idx + 1}`}>KPI Met</th>,
                ])}
              </tr>
            </thead>
            <tbody>
              {pageState.selectedBrand === "" ? (
                <tr>
                  <td colSpan={26} className="!text-left py-4 font-semibold">
                    <div className="flex items-center gap-[10px]">
                      {alertIcon}
                      <span>Please select a brand to view KPI data!</span>
                    </div>
                  </td>
                </tr>
              ) : pageState.isLoading === true ? (
                <tr>
                  <td colSpan={26} className="animate-pulse py-4">
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </td>
                </tr>
              ) : pageState.selectedBrand !== "" &&
                pageState.fetchedKPIData?.kpis.length === 0 ? (
                <tr>
                  <td colSpan={26} className="!text-left py-4 font-semibold">
                    <div className="flex items-center gap-[10px]">
                      {alertIcon}
                      <span>No KPI data found for this brand!</span>
                    </div>
                  </td>
                </tr>
              ) : (
                Object.values(platformDataMap).map((platformData) =>
                  platformData.kpiMetrics.map((kpiMetric, metricIdx) => (
                    <tr key={`${platformData.platformName}-${kpiMetric}`}>
                      {metricIdx === 0 && (
                        <td
                          rowSpan={platformData.kpiMetrics.length}
                          className={styles.platform_header}
                        >
                          {platformData.platformName[0] +
                            platformData.platformName.slice(1).toLowerCase()}
                        </td>
                      )}
                      <td>{kpiMetricNames[kpiMetric] || kpiMetric}</td>
                      {/* Now for each month */}
                      {Array.from({ length: 12 }).flatMap((_, idx) => {
                        const month = idx + 1;
                        const dataForMetric =
                          platformData.data[kpiMetric] || {};
                        const monthData = dataForMetric[month] || {};
                        const required =
                          monthData.required !== undefined
                            ? monthData.required
                            : "-";
                        const met =
                          monthData.met !== undefined ? monthData.met : "-";

                        // Compute arrow
                        let arrow = null;
                        if (
                          typeof required === "number" &&
                          typeof met === "number"
                        ) {
                          if (met >= required) {
                            arrow = (
                              <span className={styles.arrow_up}>&#9650;</span> // Up arrow
                            );
                          } else {
                            arrow = (
                              <span className={styles.arrow_down}>&#9660;</span> // Down arrow
                            );
                          }
                        }

                        return [
                          <td
                            key={`req-${platformData.platformName}-${kpiMetric}-${month}`}
                          >
                            {required}
                          </td>,
                          <td
                            key={`met-${platformData.platformName}-${kpiMetric}-${month}`}
                          >
                            {met} {arrow}
                          </td>,
                        ];
                      })}
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* ===== End KPIs Table ===== */}
    </section>
  );
}
