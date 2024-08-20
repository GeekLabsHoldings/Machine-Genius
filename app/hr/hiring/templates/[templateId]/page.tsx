"use client";
import React, { use, useContext, useEffect, useRef, useState } from "react";
import styles from "./view-template.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import $, { post } from "jquery";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { templatesContext } from "../_context/templatesContext";
import { Box, Modal } from "@mui/material";

const editIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.15328 12.1742L0.0402878 15.1421C-0.00245068 15.2563 -0.0114093 15.3804 0.0144821 15.4996C0.0403735 15.6188 0.100021 15.728 0.186299 15.8142C0.272578 15.9004 0.381843 15.9599 0.501043 15.9857C0.620243 16.0114 0.744342 16.0023 0.858517 15.9595L3.82566 14.8465C4.16527 14.7193 4.47372 14.5209 4.73028 14.2646L13.3251 5.66993C13.3251 5.66993 13.0252 4.77125 12.1274 3.87256C11.2295 2.97472 10.33 2.67488 10.33 2.67488L1.73519 11.2696C1.47889 11.5261 1.28048 11.8346 1.15328 12.1742ZM11.5285 1.47635L12.7 0.30493C12.91 0.09487 13.1904 -0.0389586 13.4835 0.0101684C13.896 0.0779297 14.527 0.282907 15.1216 0.87836C15.7171 1.47381 15.9221 2.10399 15.9898 2.51649C16.039 2.80956 15.9051 3.08992 15.6951 3.29998L14.5228 4.4714C14.5228 4.4714 14.2238 3.57356 13.3251 2.67573C12.4272 1.7762 11.5285 1.47635 11.5285 1.47635Z"
      fill="#2A2B2A"
    />
  </svg>
);

const addIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z"
      fill="#FFFFFB"
    />
  </svg>
);

interface Detail {
  title: string;
  description: string;
  _id: string;
}

interface templateDet {
  _id: string;
  title: string;
  department: string;
  level: string;
  details: Detail[];
  role: string;
  group_id: { _id: string; step: string };
  __v: number;
}

const templatesWithPositionAndLevel = [
  "Job_Listings",
  "Interview_Call_Question",
];

const defaultTemplateDet: templateDet = {
  _id: "",
  title: "",
  department: "",
  level: "",
  details: [],
  role: "",
  group_id: { _id: "", step: "" },
  __v: 0,
};

const positions = {
  Backend: "Backend",
  Frontend: "Frontend",
  Full_Stack: "Full_Stack",
  ContentWriter: "ContentWriter",
  Payroll: "Payroll",
  CEO: "CEO",
};

const levels = {
  FRESH: "FreshGraduation",
  JUNIOR: "Junior",
  MID: "Mid-level",
  SENIOR: "Senior",
  EXPERT: "Expert",
};

const options: { [key: string]: string } = {
  Job_Listings: "Job Listings",
  Schedule_Interview_Call: "Schedule Interview Call",
  Interview_Call_Question: "Interview Call Question",
  Tasks: "Tasks",
  Schedule_Face_To_Face_Interview: "Schedule Face To Face Interview",
  Job_Offer: "Job Offer",
  Required_Documents: "Required Documents",
};

type TemplateKey = keyof typeof options;

interface TemplateContent {
  [key: string]: {
    title: string;
    description: string;
  }[];
}

const templateContent: TemplateContent = {
  Job_Listings: [
    {
      title: "Responsibilities",
      description: "kjhklhgkjhgkjhgkjhgkjhkjhg khg kjhg kjhg kjhkjhg kj",
    },
    {
      title: "Qualifications",
      description:
        "Collaborate with team members to meet project requirements.",
    },
    {
      title: "Job Description",
      description: "Stay updated on industry trends and techniques.",
    },
    {
      title: "Benefits",
      description: "Contribute creative ideas to enhance the overall quality.",
    },
  ],
  Schedule_Interview_Call: [
    {
      title: "Interview Call",
      description: "Schedule an interview call with the candidate.",
    },
  ],
  Interview_Call_Question: [
    {
      title: "Questions",
      description: `
        <li>What is your greatest strength?</li>
        <li>What is your greatest weakness?</li>
        <li>Why should we hire you?</li>
        <li>What motivates you?</li>
        <li>What are you passionate about?</li>`,
    },
  ],
  Tasks: [
    {
      title: "Tasks",
      description: `
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>
        <li>Task 4</li>
        <li>Task 5</li>`,
    },
  ],
  Schedule_Face_To_Face_Interview: [
    {
      title: "Face To Face Interview",
      description: "Schedule a face-to-face interview with the candidate.",
    },
  ],
  Job_Offer: [
    {
      title: "Job Offer",
      description: "Send a job offer to the candidate.",
    },
  ],
  Required_Documents: [
    {
      title: "Documents",
      description: `
        <li>Document 1</li>
        <li>Document 2</li>
        <li>Document 3</li>
        <li>Document 4</li>
        <li>Document 5</li>`,
    },
  ],
};

export default function TemplateDetails({
  params,
}: {
  params: { templateId: string };
}) {
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");
  const templateContentRef = useRef<(HTMLDivElement | null)[]>([]);
  const [tempDetails, setTempDetails] = useState<any>([]);
  const [groups, setGroups] = useState<any>([]);
  const [groupID, setGroupID] = useState("");
  const [newGroup, setNewGroup] = useState<any>({
    title: "",
    description: "",
  });
  const [tempKey, setTempKey] = useState("");

  // State for controlling the modal open/close state
  const [open, setOpen] = useState(false);
  // Function to handle modal open.
  const handleOpen = () => setOpen(true);
  // Function to handle modal close.
  const handleClose = () => setOpen(false);

  const [templateDet, setTemplateDet] =
    useState<templateDet>(defaultTemplateDet);

  async function getTemplate() {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://api.machinegenius.io/hr/template/one-template/${params.templateId}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setTemplateDet(data);
  }
  useEffect(() => {
    getTemplate();
  }, []);

  useEffect(() => {
    console.log(templateDet);
    const newArr =
      templateDet.details?.map((item: any) => item?.description) || [];
    setTempDetails(newArr);
    setLevel(templateDet.level);
    setPosition(templateDet.role);
    getGroups();
    if (templateDet?.group_id) {
      setGroupID(templateDet.group_id._id);
      setTempKey(templateDet?.group_id?.step);
    } else {
      setTempKey(templateDet.title.replace(" ", "_"));
    }
  }, [templateDet]);

  const handleOnChange = (e: any, index: number) => {
    templateContentRef.current[index] = e.target.innerHTML;
  };

  const handleBlur = () => {
    const newArr = [...tempDetails];
    templateContentRef.current.forEach((item, index) => {
      newArr[index] = item;
    });
    setTempDetails(newArr);
  };

  async function getGroups() {
    const token = localStorage.getItem("token");
    console.log(templateDet);
    const step =
      templateDet?.group_id?.step || templateDet?.title.replace(" ", "_");
    try {
      const res = await fetch(
        `https://api.machinegenius.io/hr/group/groups/${step}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
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
            step: templateDet.group_id?.step,
          }),
        }
      );

      const data = await res.json();
      getGroups();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTemplate() {
    console.log(templateDet);
    try {
      const res = await fetch(
        `https://api.machinegenius.io/hr/template/${params.templateId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: templateDet.title,
            department: templateDet.department,
            level: level,
            role: position,
            details: tempDetails.map((e: any, i: any) => ({
              title: templateContent[tempKey][i].title,
              description: e,
            })),
            group_id: groupID || null,
          }),
        }
      );
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(tempKey);
  }, [tempKey]);

  return (
    <div className="flex flex-col h-full">
      {/* chhose brand select */}
      <div
        className={
          "flex flex-col h-[75vh] py-[1.5vw] " + styles.add_new_template
        }
      >
        <div className={styles.header}>
          <div className={styles.template_name}>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="43"
              viewBox="0 0 44 43"
              fill="none"
            >
              <path
                d="M22.6929 9.80264C16.2742 9.73865 11.0184 14.8902 10.9544 21.3094C10.8904 27.7286 16.0425 32.9839 22.4612 33.0479C28.8799 33.1119 34.1357 27.9603 34.1997 21.5411C34.2637 15.1219 29.1116 9.86663 22.6929 9.80264ZM25.8385 18.7176C26.4808 18.724 27.0206 19.4778 27.2279 20.5346C27.2644 20.7245 27.2139 20.9206 27.0906 21.0695C26.9673 21.2178 26.783 21.3039 26.5905 21.302L25.0361 21.2865C24.8426 21.2846 24.6605 21.1959 24.5402 21.0446C24.4194 20.8938 24.3734 20.6957 24.4142 20.5071C24.642 19.4541 25.1967 18.7112 25.8385 18.7176ZM19.3703 18.6531C20.0125 18.6595 20.5523 19.4139 20.7591 20.4702C20.7961 20.66 20.7457 20.8561 20.6219 21.005C20.4986 21.1534 20.3143 21.2395 20.1218 21.2375L18.5674 21.222C18.3743 21.2201 18.1923 21.1314 18.0715 20.9801C17.9512 20.8288 17.9046 20.6312 17.9454 20.4421C18.1727 19.3901 18.7275 18.6467 19.3703 18.6531ZM22.5029 28.8683C19.4774 28.8381 16.8519 27.1694 15.4583 24.7146C15.3446 24.5143 15.347 24.2692 15.4637 24.0708C15.5804 23.8723 15.7939 23.7526 16.0243 23.7549L29.0821 23.8851C29.3115 23.8874 29.523 24.0123 29.6357 24.2126C29.7495 24.4128 29.747 24.6584 29.6293 24.8553C28.1865 27.2824 25.5278 28.8984 22.5029 28.8683Z"
                fill="#2A2B2A"
              />
              <rect
                x="0.909053"
                y="0.50496"
                width="42.587"
                height="40.6498"
                rx="7.5"
                transform="rotate(0.571188 0.909053 0.50496)"
                    onBlur={handleBlur}
                stroke="#2A2B2A"
              />
            </svg> */}
            <div className="text-[--32px] font-bold underline">
              {`${templateDet.title} Template`}
            </div>
          </div>

          <div className={styles.choose_group}>
            Add to{" "}
            <CustomSelectInput
              getValue={(val: string) =>
                setGroupID(groups.find((e: any) => e.title === val)?._id)
              }
              options={groups.map((e: any, i: any) => e.title)}
              label={groups.find((e: any) => e._id === groupID)?.title}
            >
              <CustomBtn
                btnColor="black"
                word="Add New Group"
                icon={addIcon}
                width="w-full"
                onClick={handleOpen}
              />
            </CustomSelectInput>{" "}
            group
          </div>
        </div>

        <div className="flex flex-col flex-wrap gap-[1.5vw] w-full h-full overflow-auto">
          {/* Job position & Level */}
          {templatesWithPositionAndLevel.includes(tempKey) && (
            <div className="grid grid-cols-2 gap-[1.5vw] grow-0">
              <div className={`${styles.card} h-fit`}>
                <div className={styles.card_header}>
                  <h6 className="text-[--20px] font-bold">Job Position</h6>
                  <span className="text-[--16px] text-[#878787] font-medium">
                    (Title)
                  </span>
                </div>
                <div className={styles.card_body}>
                  {/* <p>{templateDet.role}</p> */}
                  <CustomSelectInput
                    getValue={(val: string) => setPosition(val)}
                    options={Object.values(positions)}
                    label={position}
                  />
                </div>
              </div>
              <div className={`${styles.card} h-fit`}>
                <div className={styles.card_header}>
                  <h6 className="text-[--20px] font-bold">
                    Level of Expertise
                  </h6>
                </div>
                <div className={styles.card_body}>
                  {/* <p>{templateDet.level}</p> */}
                  <CustomSelectInput
                    getValue={(val: string) => setLevel(val)}
                    options={Object.values(levels)}
                    label={level}
                  />
                </div>
              </div>
            </div>
          )}
          {"Job_Listings" === tempKey
            ? templateContent[tempKey]?.map((e, i) => {
                return (
                  <div
                    className={`${styles.card} min-h-[--167px] w-[49%]`}
                    key={i}
                  >
                    <div className={styles.card_header}>
                      <h6 className="text-[--20px] font-bold">{e.title}</h6>
                    </div>
                    <div
                      className={`${styles.card_body} text-[--16px] outline-none`}
                      dangerouslySetInnerHTML={{
                        __html: tempDetails[i],
                      }}
                      contentEditable
                      // onClick={(e) => {
                      //   // check if the description is empty
                      //   const description = e.currentTarget.textContent;
                      //   if (description === "") {
                      //     document.execCommand("insertHTML", false, "<li>");
                      //     return;
                      //   }
                      // }}
                      onKeyDownCapture={(
                        e: React.KeyboardEvent<HTMLDivElement>
                      ) => {
                        // check if the cursor is at the start or in the middle of the line

                        const target = e.target as HTMLDivElement; // Type assertion

                        if (
                          target.textContent === "" &&
                          target.nodeName === "DIV" &&
                          target.childNodes.length === 0
                        ) {
                          if (e.key === "Enter") {
                            e.preventDefault();
                          }
                          document.execCommand("insertHTML", false, "<li>");
                        }

                        if (e.key === "Enter") {
                          e.preventDefault();
                          // chwck if previous line is empty
                          const selection = window.getSelection();
                          console.log(selection);
                          const range = selection?.getRangeAt(0);
                          console.log(range);
                          const start = range?.startContainer;
                          if (
                            start?.nodeName === "LI" &&
                            start?.textContent === ""
                          ) {
                          } else {
                            document.execCommand("insertHTML", false, "<li>");
                          }
                        }
                      }}
                      onInput={(e) => handleOnChange(e, i)}
                      onBlur={handleBlur}
                    ></div>
                  </div>
                );
              })
            : templateContent[tempKey]?.map((e, i) => {
                return (
                  <div
                    className={`${styles.card} min-h-[--167px] w-[49%]`}
                    key={i}
                  >
                    <div className={styles.card_header}>
                      <h6 className="text-[--20px] font-bold">{e.title}</h6>
                    </div>
                    <div
                      className={`${styles.card_body} text-[--16px] outline-none`}
                      dangerouslySetInnerHTML={{
                        __html: tempDetails[i],
                      }}
                      contentEditable
                      // onClick={(e) => {
                      //   // check if the description is empty
                      //   const description = e.currentTarget.textContent;
                      //   if (description === "") {
                      //     document.execCommand("insertHTML", false, "<li>");
                      //     return;
                      //   }
                      // }}
                      onKeyDownCapture={(
                        e: React.KeyboardEvent<HTMLDivElement>
                      ) => {
                        // check if the cursor is at the start or in the middle of the line
                        // const target = e.target as HTMLDivElement; // Type assertion
                        // if (
                        //   target.textContent === "" &&
                        //   target.nodeName === "DIV" &&
                        //   target.childNodes.length === 0
                        // ) {
                        //   if (e.key === "Enter") {
                        //     e.preventDefault();
                        //   }
                        //   document.execCommand("insertHTML", false, "<li>");
                        // }
                        // if (e.key === "Enter") {
                        //   e.preventDefault();
                        //   // chwck if previous line is empty
                        //   const selection = window.getSelection();
                        //   console.log(selection);
                        //   const range = selection?.getRangeAt(0);
                        //   console.log(range);
                        //   const start = range?.startContainer;
                        //   if (
                        //     start?.nodeName === "LI" &&
                        //     start?.textContent === ""
                        //   ) {
                        //   } else {
                        //     document.execCommand("insertHTML", false, "<li>");
                        //   }
                        // }
                      }}
                      onInput={(e) => handleOnChange(e, i)}
                      onBlur={handleBlur}
                    ></div>
                  </div>
                );
              })}
        </div>
      </div>

      <div className="flex justify-end items-center w-full gap-[1vw]">
        <CustomBtn
          word="Save Template"
          btnColor="black"
          paddingVal="p-[0.5vw]"
          width="w-[9vw]"
          onClick={updateTemplate}
        />
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

            {/* <h6>Add Templates:</h6>
            <div className={styles.add_templates}>
              {tempOptions?.map((e: any, i: number) => {
                return (
                  <div key={i} className={styles.template_item}>
                    <CustomCheckBox
                      name="add-template"
                      id={e._id}
                      accentColor="black"
                    />
                    <label htmlFor={e._id}>{e.title}</label>
                  </div>
                );
              })} 
            </div> */}

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
}
