"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./newKpi.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { backIcon } from "@/app/_utils/svgIcons";
import { useRouter } from "next/navigation";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";

const platformsOptions = [
  "Facebook",
  "Reddit",
  "Telegram",
  "Twitter",
  "LinkedIn",
  "Youtube",
  // "Instagram",
];

const Page = () => {
  const { authState, handleSignOut, globalBrands, brandMap } =
    useContext(globalContext);
  const router = useRouter();
  const [pageState, setPageState] = useState<{
    isLoading: boolean;
    platform: string;
    brand: string;
    postsPerDay: number | "";
  }>({
    isLoading: false,
    platform: "",
    brand: "",
    postsPerDay: "",
  });

  async function handleAddKpi() {
    if (!pageState.platform || !pageState.brand || !pageState.postsPerDay) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
      setPageState((prev) => ({ ...prev, isLoading: true }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/analytics/kpi-add`,
        {
          method: "POST",
          body: JSON.stringify({
            kpis: [
              {
                platform: pageState.platform,
                brand: pageState.brand,
                postsPerDay: pageState.postsPerDay,
                postsPerWeek: 0,
                postsPerMonth: 0,
                timeStamp: Date.now(),
              },
            ],
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      if (!res.ok) {
        toast.error("Something went wrong!");
        setPageState((prev) => ({ ...prev, isLoading: false }));

        return;
      } else {
        toast.success("KPI added successfully!");
        setPageState((prev) => ({ ...prev, isLoading: false }));

        router.replace("/op/kpis");
      }
    } catch (error) {
      setPageState((prev) => ({ ...prev, isLoading: false }));
      toast.error("Something went wrong!");
      console.error("Error handleAddKpi:", error);
    }
  }

  return (
    <section className={`${styles.container}`}>
      <div className="flex items-center gap-[--10px] my-[1vw]">
        <span onClick={() => router.replace("/op/kpis/")}>{backIcon}</span>
        <h3>Add KPI</h3>
      </div>

      <div className={`!w-[25vw] h-[65vh]`}>
        <div className="flex flex-col gap-[1vw]">
          {/* Platform */}
          <div>
            <label htmlFor="platform" className="!mb-[0.30vw] block">
              Platform*
            </label>
            <div className={`${styles.inputWrapper}`}>
              <CustomSelectInput
                label="Select Platform"
                options={platformsOptions}
                hoverColor="hover:bg-[#E1C655]"
                getValue={(value: string) => {
                  setPageState((prev) => ({
                    ...prev,
                    platform: value.toUpperCase(),
                  }));
                }}
              />
            </div>
          </div>

          {/* Brand */}
          <div>
            <label htmlFor="brand" className="!mb-[0.30vw] block">
              Brand*
            </label>
            <div className={`${styles.inputWrapper}`}>
              {Array.isArray(globalBrands) && globalBrands.length > 0 ? (
                <CustomSelectInput
                  label={"Select Brand"}
                  options={globalBrands.map((brand) => brand.brandName) || []}
                  getValue={(value: string) => {
                    setPageState((prev) => ({
                      ...prev,
                      brand: brandMap[value],
                    }));
                  }}
                />
              ) : (
                <span className="custom-loader"></span>
              )}
            </div>
          </div>

          {/* Posts Per Day* */}
          <div>
            <label htmlFor="postsPerDay">Posts Per Day*</label>
            <div className={`${styles.inputWrapper}`}>
              <input
                type="number"
                id="postsPerDay"
                required
                className={`${styles.customInput}`}
                value={pageState.postsPerDay}
                onChange={(e) => {
                  setPageState((prev) => ({
                    ...prev,
                    postsPerDay: Number(e.target.value),
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-fit ms-auto">
        <CustomBtn
          btnColor="black"
          word="Add"
          onClick={handleAddKpi}
          disabled={pageState.isLoading}
          paddingVal="py-[--10px] px-[--32px]"
        />
      </div>
    </section>
  );
};

export default Page;
