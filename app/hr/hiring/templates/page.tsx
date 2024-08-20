"use client";
import React, { useEffect, useState } from "react";
import styles from "./templates.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { SimplePagination } from "@/app/_components/Pagination/pagination";
import { Box, Modal } from "@mui/material";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";

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

const tempOptions = {
  Job_Listings: "Job Listings",
  Schedule_Interview_Call: "Schedule Interview Call",
  Tasks: "Tasks",
  Schedule_Face_To_Face_Interview: "Schedule Face To Face Interview",
  Job_Offer: "Job Offer",
  Required_Documents: "Required Documents",
};

/**
 * Scrolls the table to the right by 150 pixels.
 *
 * @return {void} No return value.
 */
function slideRight(id: string) {
  const table = document.getElementById(id) as HTMLTableElement | null;
  console.log(table);
  if (table) {
    table.scrollLeft += 150;
  } else {
    console.error("Failed to find table with ID 'table'");
  }
}

/**
 * Scrolls the table to the left by 150 pixels.
 *
 * @return {void} No return value.
 */
function slideLeft(id: string) {
  const table = document.getElementById(id) as HTMLTableElement | null;
  console.log(table);
  if (table) {
    table.scrollLeft -= 150;
  } else {
    console.error("Failed to find table with ID 'table'");
  }
}

const Page = () => {
  const [groupTemplates, setGroupTemplates] = useState<GroupTemplate[]>([]);
  const [unattchedTemplates, setUnattachedTemplates] = useState<
    unattchedTemplates[]
  >([]);
  // State for controlling the modal open/close state
  const [open, setOpen] = useState(false);
  // Function to handle modal open.
  const handleOpen = () => setOpen(true);
  // Function to handle modal close.
  const handleClose = () => setOpen(false);
  const [newGroup, setNewGroup] = useState<any>({
    title: "",
    description: "",
  });
  const [setp, setStep] = useState("");

  async function getData() {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://api.machinegenius.io/hr/group/groups-template",
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
      "https://api.machinegenius.io/hr/template/un-attached",
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

  async function createGroup() {
    try {
      const res = await fetch(
        "https://api.machinegenius.io/hr/group/create",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: newGroup.title,

            icon: "https://www.logodesignlove.com/wp-content/uploads/2012/08/microsoft-logo-02.jpeg",
            description: newGroup.description,
            step: setp,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      setGroupTemplates([...groupTemplates, { ...data, templates: [] }]);
      handleClose();
    } catch (error) {
      console.log(error);
    }
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
          <SimplePagination
            onclickLeft={() => slideLeft("template-group")}
            onclickRight={() => slideRight("template-group")}
          />
        </div>

        <div
          className={
            styles.templates_group_slider +
            " flex flex-nowrap gap-[1vw] mb-3 w-full overflow-x-scroll py-8"
          }
          id="template-group"
        >
          {groupTemplates?.map((e, i) => {
            return (
              <div className={` ${styles.box} !w-[400px] shrink-0`} key={i}>
                <div className={`${styles.header}`}>
                  <div className="flex items-center gap-[1vw]">
                    <img
                      src={e.icon}
                      alt=""
                      className="w-[2.5vw] h-[2.5vw] object-cover"
                    />
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
                      <div className={styles.item} key={i}>
                        <div className={styles.item_header}>
                          <p>{t.role}</p>
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
          <CustomBtn
            btnColor="black"
            word="New Group"
            icon={addIcon}
            onClick={handleOpen}
          />
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
          <SimplePagination
            onclickLeft={() => slideLeft("unattached-template")}
            onclickRight={() => slideRight("unattached-template")}
          />
        </div>

        <div
          className={
            styles.templates_slider +
            " grid lg:grid-cols-3 xl:grid-cols-4 gap-[1vw] mb-3"
          }
          id="unattached-template"
        >
          {unattchedTemplates.map((e, i) => {
            return (
              <div className={styles.item} key={i}>
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
                    href={`/hr/hiring/templates/${e._id}`}
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
            href="/hr/hiring/templates/select-template"
          />
        </div>
      </div>
      <Modal
        className={`${styles.modal}`}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <form className={`${styles.modalBox}`}>
            <div className={styles.group_title}>
              {/* Modal title */}
              <input
                type="text"
                placeholder="Group Title*"
                className="groupTitle"
                value={newGroup.title}
                onChange={(e) => {
                  setNewGroup({ ...newGroup, title: e.target.value });
                }}
              />
              {/* Close button */}
              <div
                onClick={() => {
                  handleClose();
                }}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.0125 13.9613L18.4214 21.3616C18.8145 21.7543 19.3477 21.9749 19.9037 21.9749C20.4597 21.9749 20.9929 21.7543 21.386 21.3616C21.7791 20.969 22 20.4364 22 19.881C22 19.3257 21.7791 18.7931 21.386 18.4004L13.9744 11L21.3846 3.59962C21.5792 3.40518 21.7335 3.17437 21.8388 2.92035C21.944 2.66634 21.9982 2.39411 21.9981 2.11919C21.998 1.84428 21.9438 1.57207 21.8384 1.3181C21.733 1.06414 21.5786 0.833399 21.3839 0.639051C21.1892 0.444703 20.9582 0.290556 20.7039 0.185411C20.4496 0.0802654 20.177 0.026181 19.9018 0.0262458C19.6266 0.0263106 19.354 0.080523 19.0998 0.185788C18.8455 0.291053 18.6145 0.445309 18.42 0.639749L11.0125 8.04013L3.6037 0.639749C3.41048 0.439732 3.17931 0.280156 2.92369 0.170331C2.66806 0.0605069 2.3931 0.00263317 2.11484 8.77827e-05C1.83659 -0.0024576 1.56061 0.0503759 1.30301 0.155506C1.04541 0.260635 0.811359 0.415956 0.614501 0.612405C0.417642 0.808853 0.261924 1.0425 0.156431 1.2997C0.0509388 1.5569 -0.00221519 1.83252 7.07167e-05 2.11046C0.00235662 2.3884 0.0600364 2.6631 0.169745 2.91854C0.279454 3.17398 0.438994 3.40503 0.639057 3.59823L8.05068 11L0.640455 18.4018C0.440392 18.595 0.280852 18.826 0.171143 19.0815C0.0614341 19.3369 0.00375362 19.6116 0.00146772 19.8895C-0.000818188 20.1675 0.0523358 20.4431 0.157828 20.7003C0.263321 20.9575 0.419039 21.1911 0.615898 21.3876C0.812756 21.584 1.04681 21.7394 1.30441 21.8445C1.562 21.9496 1.83798 22.0025 2.11624 21.9999C2.3945 21.9974 2.66946 21.9395 2.92508 21.8297C3.18071 21.7198 3.41188 21.5603 3.6051 21.3603L11.0125 13.9613Z"
                    fill="#BDBDBD"
                  />
                </svg>
              </div>
            </div>
            <div className={styles.group_description}>
              <textarea
                placeholder="Group description..."
                rows={4}
                className="groupDesc"
                value={newGroup.description}
                onChange={(e) => {
                  setNewGroup({ ...newGroup, description: e.target.value });
                }}
              />
            </div>

            <h6>Select Group Type:</h6>
            <div className={styles.add_templates}>
              {Object.entries(tempOptions).map(([key, value], i) => {
                return (
                  <div key={i} className={styles.template_item}>
                    <CustomCheckBox
                      name="add-template"
                      id={key}
                      accentColor="black"
                      type="Radio"
                      onClick={(e) => {
                        setStep(key);
                      }}
                    />
                    <label htmlFor={key}>{value}</label>
                  </div>
                );
              })}
            </div>

            <CustomBtn
              btnColor="black"
              word="Create Group"
              icon={addIcon}
              width="w-full"
              onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                e?.preventDefault();
                createGroup();
              }}
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Page;
