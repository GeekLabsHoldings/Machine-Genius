"use client";
import MissingPapersTable from "@/app/_components/HR/03Personnel/02RequiredPapers/MissingPapersTable";
import RequiredPapersTable from "@/app/_components/HR/03Personnel/02RequiredPapers/RequiredPapersTable";
import styles from "./RequiredPapers.module.css";
import React, { useEffect, useState } from "react";

/**
 * Renders a page with tabs for displaying required and missing papers for all employees.
 *
 * @return {JSX.Element} The rendered page with tabs and corresponding tab content.
 */
export default function Page() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [found,setFound] = useState(false)

  async function getrequiredPapers() {
    const token = localStorage.getItem("token");
    try {      
      const data = await fetch(
        "https://api.machinegenius.io/hr/employee-paper/get-paper",
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await data.json();
      console.log(res);
      console.log(res.filter((e:any)=>Object.values(e).includes("")));
      res.filter((e:any)=>Object.values(e).includes("")) > 0 ? setFound(true) : setFound(false)
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
getrequiredPapers()
  },[])

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
          className={`relative ${styles.tab} ${activeTab === 2 ? styles.activeTab : ""}`}
          onClick={() => setActiveTab(2)}
        >
          Missing Papers
          <span className="w-[12px] h-[12px] rounded-full bg-[#E9313E] absolute top-1/2 -translate-y-1/2 left-[110%]"></span>
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
