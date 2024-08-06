"use client";
import React, { useEffect, useState } from "react";
import styles from "./templates.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { SimplePagination } from "@/app/_components/Pagination/pagination";
import { data } from "jquery";

const addIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z"
      fill="#FFFFFB"
    />
  </svg>
);
interface GroupTemplate {
  description: string;
  icon: string;
  step: number;
  title: string;
  templates: {
    department: string;
    group_id: string;
    level: string;
    role: string;
    title: string;
    _id: string;
  }[];
}
interface unattchedTemplates {
  _id: string;
  title: string;
  department: string;
  level: string;
  details: {}[];
  role: string;
  group_id: string | null;
  __v: number;
}

const Page = () => {
  const [groupTemplates, setGroupTemplates] = useState<GroupTemplate[]>([]);
  const [unattchedTemplates, setUnattachedTemplates] = useState<
    unattchedTemplates[]
  >([]);

  async function getData() {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://machine-genius.onrender.com/hr/group/groups-template",
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    const data = await res.json();
    setGroupTemplates(data);
    console.log(data);
  }
  async function getUnattachedData() {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://machine-genius.onrender.com/hr/template/un-attached",
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    const data = await res.json();
    setUnattachedTemplates(data);
    console.log(data);
  }

  useEffect(() => {
    getData();
    getUnattachedData();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div
        className={
          "flex flex-col w-full py-[1vw] " + styles.templates_group_wrapper
        }
      >
        <div
          className={
            styles.templates_group_header +
            " flex items-center justify-between mb-[0.8vw]"
          }
        >
          <h6>Template Groups</h6>
          <SimplePagination />
        </div>

        <div
          className={
            styles.templates_group_slider +
            " grid lg:grid-cols-3 xl:grid-cols-4 gap-[1vw] mb-3"
          }
        >
          {groupTemplates?.map((e, i) => {
            return (
              <div className={` ${styles.box}`}>
                <div className={`${styles.header}`}>
                  <div className="flex items-center gap-[1vw]">
                    {e.icon}
                    <p>{e?.title}</p>
                  </div>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="7"
                      height="25"
                      viewBox="0 0 7 25"
                      fill="none"
                    >
                      <path
                        d="M0 22.1641L0 21.4801C0.0168611 21.4245 0.0443718 21.3747 0.0559083 21.3191C0.29995 19.8803 1.61955 18.744 3.16722 18.6482C4.89769 18.538 6.36194 19.4328 6.83849 20.891C6.89972 21.0825 6.94409 21.2837 6.99911 21.4793V22.1633C6.98225 22.2084 6.95474 22.2486 6.94942 22.2993C6.7107 23.6271 5.65733 24.6379 4.21526 24.9244C4.10433 24.9445 3.99341 24.9751 3.88248 25H3.12817C3.07847 24.9847 3.02789 24.9598 2.97819 24.9549C1.53613 24.7441 0.438388 23.813 0.105604 22.5206C0.0727691 22.3951 0.0337221 22.28 0 22.1641ZM7 2.83107V3.5151C6.98314 3.57062 6.95563 3.62052 6.9503 3.67604C6.70094 5.12457 5.37513 6.25604 3.8106 6.34697C2.08545 6.44756 0.626521 5.54223 0.155299 4.07841C0.0940671 3.89252 0.0496957 3.70099 0 3.5151L0 2.83107C0.0168611 2.786 0.0443718 2.74577 0.0559083 2.7007C0.322135 1.393 1.15986 0.537565 2.55756 0.130368C2.74036 0.0748407 2.93471 0.0450653 3.12284 0L3.87715 0C3.92685 0.01529 3.97743 0.0402369 4.02713 0.0450654C5.47452 0.26154 6.56782 1.18699 6.90061 2.4794C6.93433 2.60011 6.96628 2.71599 7 2.83107ZM6.99911 12.1556V12.8396C6.98225 12.8951 6.95474 12.945 6.9432 13.0005C6.69384 14.4442 5.31833 15.6063 3.76534 15.6666C2.018 15.7367 0.537779 14.7814 0.121577 13.308C0.0772059 13.1518 0.0381592 12.9965 0 12.8404L0 12.1564C0.0168611 12.1008 0.0443718 12.051 0.0559083 11.9954C0.29995 10.5517 1.68078 9.38969 3.23377 9.3245C4.98111 9.24886 6.46133 10.2097 6.87753 11.6832C6.92191 11.8441 6.96095 12.0003 6.99911 12.1564V12.1556Z"
                        fill="#2A2B2A"
                      />
                    </svg>
                  </button>
                </div>
                <div className={styles.body + " space-y-[0.6vw]"}>
                  {e.templates.map((t, i) => {
                    return (
                      <div className={styles.item}>
                        <div className={styles.item_header}>
                          <p>{t.title}</p>
                          <span>{t.level}</span>
                        </div>
                        <div className={styles.item_body}>
                          <div className={styles.line}></div>
                          <CustomBtn
                            btnColor="black"
                            word="View Template"
                            width="w-full"
                            href={`/hr/hiring/templates/${t._id}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className=" w-fit ml-auto">
          <CustomBtn btnColor="black" word="New Group" icon={addIcon} />
        </div>
      </div>

      <div
        className={"flex flex-col w-full pb-[1vw] " + styles.templates_wrapper}
      >
        <div
          className={
            styles.templates_header +
            " flex items-center justify-between mb-[0.8vw]"
          }
        >
          <h6>Template Groups</h6>
          <SimplePagination />
        </div>

        <div
          className={
            styles.templates_slider +
            " grid lg:grid-cols-3 xl:grid-cols-4 gap-[1vw] mb-3"
          }
        >
          {unattchedTemplates.map((e, i) => {
            return (
              <div className={styles.item}>
                <div className={styles.item_header}>
                  <p>{e.title}</p>
                  <span>{e.level}</span>
                </div>
                <div className={styles.item_body}>
                  <div className={styles.line}></div>
                  <CustomBtn
                    btnColor="black"
                    word="View Template"
                    width="w-full"
                    href="/hr/hiring/templates/view-template"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className=" w-fit ml-auto">
          <CustomBtn
            btnColor="black"
            word="New Template"
            icon={addIcon}
            href="/hr/hiring/templates/new-template"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;


