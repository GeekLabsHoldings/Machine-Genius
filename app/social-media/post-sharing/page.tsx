"use client";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import styles from "./share.module.css";
import { useContext, useEffect, useState } from "react";
import PlatformBox from "@/app/_components/SocialMedia/PlatformBox/PlatformBox";
import { redditIcon, telegramIcon } from "@/app/_utils/svgIcons";
// Tab (2): Sharing Campaign
import SharingCampaign from "./_sharingCampaign/SharingCampaign";
import AllCampaigns from "./_allCampaigns/AllCampaigns";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";

const platformOptions = ["Reddit", "Telegram", "Facebook"];

interface ITelegramSubscribers {
  id: string;
  description: string;
  date: string; // ISO 8601 date string
  niche: string;
  subscribers: number;
  engagement: number;
}

// display all platforms
const Share = () => {
  const { authState, handleSignOut } = useContext(globalContext);
  const [pageState, setPageState] = useState<{
    activeTab: number;
    telegramSubscribers: ITelegramSubscribers[] | null;
  }>({
    activeTab: 1,
    telegramSubscribers: null,
  });

  async function getTelegramSubscribers() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/telegram/subscripers/`,
        {
          headers: {
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
      const json = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else if (json && Array.isArray(json) && json.length > 0) {
        setPageState((prev) => ({ ...prev, telegramSubscribers: json }));
        return json;
      } else {
        toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getTelegramSubscribers:", error);
    }
  }

  useEffect(() => {
    getTelegramSubscribers();
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div role="tablist" className={`${styles.tabs} flex`}>
        <a
          role="tab"
          className={`${styles.tab} ${
            pageState.activeTab === 1 ? styles.activeTab : ""
          }`}
          onClick={() => setPageState((prev) => ({ ...prev, activeTab: 1 }))}
        >
          Sharing Lists
        </a>
        <a
          role="tab"
          className={`${styles.tab} ${
            pageState.activeTab === 2 ? styles.activeTab : ""
          }`}
          onClick={() => setPageState((prev) => ({ ...prev, activeTab: 2 }))}
        >
          Sharing Campaign
        </a>
        <a
          role="tab"
          className={`${styles.tab} ${
            pageState.activeTab === 3 ? styles.activeTab : ""
          }`}
          onClick={() => setPageState((prev) => ({ ...prev, activeTab: 3 }))}
        >
          All Campaigns
        </a>
      </div>

      <div className={styles.wrapper}>
        {/* ===== Tab (1): Sharing Lists ===== */}
        {pageState.activeTab === 1 && (
          <div className="h-full flex flex-col gap-[1.5vw]">
            {/* Tab(1)-01- dropdown selection to select specific platform */}
            <div className={`w-1/3 flex flex-col gap-[0.5vw]`}>
              <h5 className="font-semibold text-[--19px]">Platforms</h5>
              <CustomSelectInput options={platformOptions} label={"All"} />
            </div>

            {/* Tab(1)-02 Platforms Cards */}
            <div className="h-full p-[--5px] pb-[--sy-12px] flex gap-[2.5vw] overflow-x-auto">
              <PlatformBox
                platformIcon={telegramIcon}
                platformName={"Telegram"}
                platformRoute={"/social-media/post-sharing/telegram"}
                platformColor={"#31B2E9"}
                platformCards={
                  Array.isArray(pageState.telegramSubscribers) &&
                  pageState.telegramSubscribers.length > 0
                    ? pageState.telegramSubscribers.map((ele, i) => ({
                        title: ele.description,
                        subscribers: ele.subscribers,
                        engagement: ele.engagement,
                      }))
                    : [{ title: "No Subscribers Found!" }] // Empty array as fallback
                }
              />
            </div>
          </div>
        )}

        {/* ===== Tab (2): Sharing Campaign ===== */}
        {pageState.activeTab === 2 && <SharingCampaign />}

        {/* ===== Tab (3): All Campaigns ===== */}
        {pageState.activeTab === 3 && <AllCampaigns />}
      </div>
    </div>
  );
};

export default Share;
