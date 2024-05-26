"use client";
import MissingPapersTable from "@/app/_components/HR/03Personnel/02RequiredPapers/MissingPapersTable";
import RequiredPapersTable from "@/app/_components/HR/03Personnel/02RequiredPapers/RequiredPapersTable";
import styles from "./RequiredPapers.module.css";
import React, { useState } from "react";

export default function page() {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <section>
      {/* Tabs */}
      <div role="tablist" className={`${styles.tabs} flex my-[1.75vw]`}>
        <a
          role="tab"
          className={`${styles.tab} ${activeTab === 1 ? styles.activeTab : ""}`}
          onClick={() => setActiveTab(1)}
        >
          All Employees
        </a>
        <a
          role="tab"
          className={`${styles.tab} ${activeTab === 2 ? styles.activeTab : ""}`}
          onClick={() => setActiveTab(2)}
        >
          Missing Papers
        </a>
      </div>

      {/* 1. Tab 1 Content */}
      {activeTab === 1 && (
        <div className={`${styles.tab2}`}>
          {/* Tab Content */}
          <RequiredPapersTable />
        </div>
      )}

      {/* 2. Tab 2 Content */}
      {activeTab === 2 && (
        <div className={`${styles.tab3}`}>
          {/* Tab Content */}
          <MissingPapersTable />
        </div>
      )}
    </section>
  );
}
