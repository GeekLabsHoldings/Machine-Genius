"use client";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import styles from "./share.module.css";
import { useContext, useEffect, useState } from "react";
import PlatformBox from "@/app/_components/SocialMedia/PlatformBox/PlatformBox";
import { facebookIcon, redditIcon, telegramIcon } from "@/app/_utils/svgIcons";
// Tab (2): Sharing Campaign
import SharingCampaign from "./_sharingCampaign/SharingCampaign";
import AllCampaigns from "./_allCampaigns/AllCampaigns";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";

const platformOptions = ["Reddit", "Telegram", "Facebook"];

interface ISubscribers {
  id: string;
  description: string;
  date: string; // ISO 8601 date string
  niche: string;
  subscribers: number;
  engagement: number;
}

// display all platforms
const postSharingPage = () => {
  const { authState, handleSignOut } = useContext(globalContext);
  const [pageState, setPageState] = useState<{
    activeTab: number;
    telegramSubscribers: ISubscribers[] | null;
    redditSubscribers: ISubscribers[] | null;
    facebookSubscribers: ISubscribers[] | null;
  }>({
    activeTab: 1,
    telegramSubscribers: null,
    redditSubscribers: null,
    facebookSubscribers: null,
  });

  const platforms = [
    {
      icon: telegramIcon,
      name: "Telegram",
      color: "#31B2E9",
      subscribers: pageState.telegramSubscribers,
    },
    {
      icon: facebookIcon,
      name: "Facebook",
      color: "#1877F2",
      subscribers: pageState.facebookSubscribers,
    },
    {
      icon: redditIcon,
      name: "Reddit",
      color: "#FC471E",
      subscribers: pageState.redditSubscribers,
    },
  ];

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
      const json: ISubscribers = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else if (json && Array.isArray(json) && json.length > 0) {
        setPageState((prev) => ({ ...prev, telegramSubscribers: json }));
      } else {
        toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getTelegramSubscribers:", error);
    }
  }

  async function getRedditSubscribers() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/reddit/brand-subs/`,
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
      const json: ISubscribers = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else if (json && Array.isArray(json) && json.length > 0) {
        setPageState((prev) => ({ ...prev, redditSubscribers: json }));
      } else {
        toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getTelegramSubscribers:", error);
    }
  }

  async function getFacebookSubscribers() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/facebook/get-subs`,
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
      const json: ISubscribers = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else if (json && Array.isArray(json) && json.length > 0) {
        setPageState((prev) => ({ ...prev, facebookSubscribers: json }));
      } else {
        toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getFacebookSubscribers:", error);
    }
  }

  useEffect(() => {
    getTelegramSubscribers();
    getRedditSubscribers();
    getFacebookSubscribers();
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
              {platforms.map((platform, i) => {
                return (
                  <PlatformBox
                    key={i}
                    platformIcon={platform.icon}
                    platformName={platform.name}
                    platformColor={platform.color}
                    platformCards={
                      platform.subscribers &&
                      Array.isArray(platform.subscribers) &&
                      platform.subscribers.length > 0
                        ? platform.subscribers.map((ele, i) => ({
                            title: ele.description,
                            subscribers: ele.subscribers,
                            engagement: ele.engagement,
                          }))
                        : undefined
                    }
                  />
                );
              })}
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

export default postSharingPage;
