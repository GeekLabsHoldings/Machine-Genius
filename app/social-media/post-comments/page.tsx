"use client";
import { useState, useEffect, useContext } from "react";
import TwitterCommentsList from "./_TwitterCommentsList/TwitterCommentsList";
import TwitterCommentCampaign from "./_TwitterCommentCampaign/TwitterCommentCampaign";
import AutoPostNotifications from "./_AutoPostNotifications/AutoPostNotifications";
import styles from "./PostComments.module.css";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";

export interface TwitterSharingAccount {
  _id: string;
  sharingList: "TWITTER";
  brand: string;
  userName: string;
  accountName: string;
  accountLink: string;
  account_id: string;
  employeeId: string;
  delayBetweenPosts: number;
  delayBetweenGroups: number;
  longPauseAfterCount: number;
  niche: string;
  campaignType: "Must Approve" | "Auto Comment";
  createdAt: string;
  updatedAt: string;
  __v: number;
  followers: string;
  status: string;
  comments: number;
}

interface TwitterSharingAccountResponse {
  result: TwitterSharingAccount[];
}

const Comments = () => {
  const { authState, handleSignOut, getBrandsPlatform } = useContext(globalContext);
  const [pageState, setPageState] = useState<{
    twitterAccountsData: TwitterSharingAccount[] | null;
    activeTab: number;
    brandsOptions: string[];
  }>({
    activeTab: 1,
    twitterAccountsData: null,
    brandsOptions: [],
  });

  async function getTwitterAccountsData() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/twitter/get-all-accounts`,
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
      const json: TwitterSharingAccountResponse = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else if (
        json &&
        json.result &&
        Array.isArray(json.result) &&
        json.result.length > 0
      ) {
        setPageState((prev) => ({ ...prev, twitterAccountsData: json.result }));
      } else {
        // toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getTwitterAccountsData:", error);
    }
  }

  async function handleGetBrandsPlatform(platform: string) {
    const result = await getBrandsPlatform(platform);
    const brands: string[] = Array.isArray(result) ? result : [];
    setPageState((prev) => ({
      ...prev,
      brandsOptions: brands,
    }));
  }

  useEffect(() => {
    if (pageState.activeTab === 1 || pageState.activeTab === 2) {
      getTwitterAccountsData();
    }
    handleGetBrandsPlatform("TWITTER");
  }, [pageState.activeTab]);

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div role="tablist" className={`${styles.tabs} flex mb-[--sy-25px]`}>
        <a
          role="tab"
          className={`${styles.tab} ${
            pageState.activeTab === 1 ? styles.activeTab : ""
          }`}
          onClick={() => setPageState((prev) => ({ ...prev, activeTab: 1 }))}
        >
          Twitter Comments List
        </a>
        <a
          role="tab"
          className={`${styles.tab} ${
            pageState.activeTab === 2 ? styles.activeTab : ""
          }`}
          onClick={() => setPageState((prev) => ({ ...prev, activeTab: 2 }))}
        >
          Twitter Comment Campaign
        </a>
        <a
          role="tab"
          className={`${styles.tab} ${
            pageState.activeTab === 3 ? styles.activeTab : ""
          }`}
          onClick={() => setPageState((prev) => ({ ...prev, activeTab: 3 }))}
        >
          Auto Post Notifications
        </a>
      </div>

      <div className={"flex flex-col w-full h-[80vh]"}>
        {/* Tab (1): Twitter Comments List */}
        {pageState.activeTab === 1 && (
          <div className="h-[75vh]">
            <TwitterCommentsList
              twitterAccountsData={pageState.twitterAccountsData}
              getTwitterAccountsData={getTwitterAccountsData}
              brandsOptions={pageState.brandsOptions}
            />
          </div>
        )}

        {/* Tab (2): Twitter Comment Campaign */}
        {pageState.activeTab === 2 && (
          <div className="h-[75vh]">
            <TwitterCommentCampaign
              twitterAccountsData={pageState.twitterAccountsData}
            />
          </div>
        )}

        {/* Tab (3): Auto Post Notifications */}
        {pageState.activeTab === 3 && (
          <div className="h-[75vh]">
            <AutoPostNotifications brandsOptions={pageState.brandsOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
