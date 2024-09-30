"use client";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import styles from "./share.module.css";
import { useState } from "react";
import PlatformBox from "@/app/_components/SocialMedia/PlatformBox/PlatformBox";
import { redditIcon } from "@/app/_utils/svgIcons";
// Tab (2): Sharing Campaign
import SharingCampaign from "./_sharingCampaign/SharingCampaign";
import AllCampaigns from "./_allCampaigns/AllCampaigns";

const platformOptions = ["Reddit", "Telegram", "Facebook"];

// display all platforms
const Share = () => {
  const [pageState, setPageState] = useState({
    activeTab: 2,
  });

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
              {Array.from({ length: 4 }).map((_, i) => (
                <PlatformBox
                  key={i}
                  platformIcon={redditIcon}
                  platformName={"Reddit"}
                  platformRoute={"/social-media/post-sharing/reddit"}
                  platformColor={"#fc471e"}
                  platformCards={Array.from({ length: 4 }).map((_, i) => ({
                    title: "Wall Street Bets",
                    subscribers: "300K",
                    engagement: "26%",
                  }))}
                />
              ))}
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
