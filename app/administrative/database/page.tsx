"use client";
import ReceiptsDatabaseTable from "@/app/_components/Administrative/03Database/ReceiptsDatabaseTable";
import React, { useContext, useState } from "react";
import styles from "./database.module.css";

// import CustomBtn from "@/app/_components/Button/CustomBtn";

import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";
import SupplyDatabaseTable from "@/app/_components/Administrative/03Database/SupplyDatabaseTable";

export default function Page() {
  const { authState, handleSignOut } = useContext(globalContext);
  const [activeTab, setActiveTab] = React.useState<number>(1);

  const [pageState, setPageState] = useState<any>({
    supplies: null,
    receipts: null,
  });

  async function getSupplies() {
    try {
      const res = await fetch(
        `process.env.NEXT_PUBLIC_API_BASE_URL/administrative/supplies/all?limit=1000`,
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
      if (json && json.result && json.result.length > 0) {
        setPageState((prevState: any) => ({
          ...prevState,
          supplies: json.result,
        }));
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getSupplies:", error);
    }
  }

  async function getReceipts() {
    try {
      const res = await fetch(
        `process.env.NEXT_PUBLIC_API_BASE_URL/administrative/receipts?limit=1000`,
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
      if (json && json.result && json.result.length > 0) {
        setPageState((prevState: any) => ({
          ...prevState,
          receipts: json.result,
        }));
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getReceipts:", error);
    }
  }

  return (
    <section className={`${styles.administrativeDatabase}`}>
      {/* Container */}
      <div>
        {/* Tabs */}
        <div role="tablist" className={`${styles.tabs} flex`}>
          <a
            role="tab"
            className={`${styles.tab} ${
              activeTab === 1 ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            Supply Database
          </a>
          <a
            role="tab"
            className={`${styles.tab} ${
              activeTab === 2 ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(2)}
          >
            Receipts Database
          </a>
        </div>

        {/* Tab 1 Content */}
        {activeTab === 1 && (
          <SupplyDatabaseTable
            getSupplies={getSupplies}
            supplies={pageState.supplies}
          />
        )}

        {/* Tab 2 Content */}
        {activeTab === 2 && (
          <ReceiptsDatabaseTable
            getReceipts={getReceipts}
            receipts={pageState.receipts}
          />
        )}
      </div>
    </section>
  );
}
