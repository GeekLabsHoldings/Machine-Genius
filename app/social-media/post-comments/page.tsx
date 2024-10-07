"use client";
import { useState } from "react";
import TwitterCommentsList from "./_TwitterCommentsList/TwitterCommentsList";
import TwitterCommentCampaign from "./_TwitterCommentCampaign/TwitterCommentCampaign";
import AutoPostNotifications from "./_AutoPostNotifications/AutoPostNotifications";
import styles from "./PostComments.module.css";
const Comments = () => {
  const [pageState, setPageState] = useState({
    activeTab: 1,
  });

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
            <TwitterCommentsList />
          </div>
        )}

        {/* Tab (2): Twitter Comment Campaign */}
        {pageState.activeTab === 2 && (
          <div className="h-[75vh]">
            <TwitterCommentCampaign />
          </div>
        )}

        {/* Tab (3): Auto Post Notifications */}
        {pageState.activeTab === 3 && (
          <div className="h-[75vh]">
            <AutoPostNotifications />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
