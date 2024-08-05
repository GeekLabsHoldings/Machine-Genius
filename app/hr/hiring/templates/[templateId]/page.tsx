"use client";
import React, { use, useEffect, useState } from "react";
import styles from "./view-template.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import $ from "jquery";

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
  
    "_id": string,
    "title": string,
    "department": string,
    "level": string,
    "details": Detail[];
    "role": string,
    "__v": number
  
}
const defaultTemplateDet: templateDet = {
  _id: '',
  title: '',
  department: '',
  level: '',
  details: [],  // Ensure details is initialized as an empty array
  role: '',
  __v: 0
};


export default function TemplateDetails ({ params }: { params: { templateId: string } }) {
  const [Iseditable, setIseditable] = useState(false);
  console.log(params);
  

  const handleEditCard = (e: any) => {
    console.log($(e.target).parents(`.${styles.card}`));
    $(`.${styles.card}`)
      .not($(e.target).parents(`.${styles.card}`))
      .addClass(styles.disabled);
    $(e.target).parents(`.${styles.card}`).addClass(styles.editable);
  };

  const handleSaveCard = (e: any) => {
    console.log($(e.target).parents(`.${styles.card}`));
    $(e.target).parents(`.${styles.card}`).removeClass(styles.editable);
    $(`.${styles.card}`).removeClass(styles.disabled);
  };
const [templateDet,setTemplateDet] = useState<templateDet>(defaultTemplateDet)

  async function getTemplate() {
    const token = localStorage.getItem("token")

    const res = await fetch(
      `https://machine-genius.onrender.com/hr/template/one-template/${params.templateId}`,
      {
        method: "get",
        headers: {
          Authorization:
          `Bearer ${token}`,
        },
      }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    const data = await res.json();
    setTemplateDet(data)
    console.log(data);
    
  }
  useEffect(()=>{
getTemplate()
  },[])

  return (
    <div className="flex flex-col h-full">
      <div
        className={
          "flex flex-col h-[75vh] py-[1.5vw] " + styles.view_template_wrapper
        }
      >
        <div className="flex items-center justify-between gap-[2vw] mb-[1.5vw]">
          <h5>{templateDet.title} Template</h5>
          {Iseditable ? (
            <CustomBtn
              btnColor="black"
              word="Save & Exit"
              paddingVal="px-[1.5vw] py-[0.5vw]"
              onClick={() => setIseditable(false)}
            />
          ) : (
            <CustomBtn
              btnColor="white"
              icon={editIcon}
              word="Modify Template"
              paddingVal="px-[1.5vw] py-[0.5vw]"
              onClick={() => setIseditable(true)}
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-[1.5vw] h-full overflow-auto">
          <div className=" space-y-[1.5vw]">
            <div className="grid grid-cols-2 gap-[1.5vw]">
              <div className={styles.card}>
                <div className={styles.card_header}>
                  <h6>Job Position</h6>
                  {Iseditable && (
                    <button onClick={(e) => handleEditCard(e)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.58576 16.7395L0.0553957 20.8204C-0.00336969 20.9775 -0.0156878 21.1481 0.0199129 21.312C0.0555136 21.4758 0.137528 21.626 0.256162 21.7445C0.374795 21.863 0.525034 21.9449 0.688934 21.9803C0.852835 22.0157 1.02347 22.0032 1.18046 21.9443L5.26028 20.4139C5.72724 20.2391 6.15136 19.9662 6.50414 19.6138L18.322 7.79615C18.322 7.79615 17.9097 6.56046 16.6751 5.32477C15.4406 4.09025 14.2037 3.67796 14.2037 3.67796L2.38589 15.4956C2.03348 15.8484 1.76066 16.2725 1.58576 16.7395ZM15.8517 2.02999L17.4625 0.419279C17.7513 0.130446 18.1368 -0.053568 18.5398 0.0139815C19.107 0.107153 19.9746 0.388998 20.7922 1.20774C21.611 2.02649 21.8928 2.89299 21.986 3.46017C22.0536 3.86314 21.8696 4.24864 21.5807 4.53747L19.9688 6.14818C19.9688 6.14818 19.5577 4.91365 18.322 3.67913C17.0874 2.44227 15.8517 2.02999 15.8517 2.02999Z"
                          fill="#2A2B2A"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <div className={styles.card_body}>
                  <p>{templateDet.role}</p>
                </div>
                <div className={styles.card_actions}>
                  <CustomBtn btnColor="white" word="Delete Card" />
                  <CustomBtn
                    btnColor="black"
                    word="Save"
                    onClick={(e) => handleSaveCard(e)}
                  />
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.card_header}>
                  <h6>Level of Expertise</h6>
                  {Iseditable && (
                    <button onClick={(e) => handleEditCard(e)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.58576 16.7395L0.0553957 20.8204C-0.00336969 20.9775 -0.0156878 21.1481 0.0199129 21.312C0.0555136 21.4758 0.137528 21.626 0.256162 21.7445C0.374795 21.863 0.525034 21.9449 0.688934 21.9803C0.852835 22.0157 1.02347 22.0032 1.18046 21.9443L5.26028 20.4139C5.72724 20.2391 6.15136 19.9662 6.50414 19.6138L18.322 7.79615C18.322 7.79615 17.9097 6.56046 16.6751 5.32477C15.4406 4.09025 14.2037 3.67796 14.2037 3.67796L2.38589 15.4956C2.03348 15.8484 1.76066 16.2725 1.58576 16.7395ZM15.8517 2.02999L17.4625 0.419279C17.7513 0.130446 18.1368 -0.053568 18.5398 0.0139815C19.107 0.107153 19.9746 0.388998 20.7922 1.20774C21.611 2.02649 21.8928 2.89299 21.986 3.46017C22.0536 3.86314 21.8696 4.24864 21.5807 4.53747L19.9688 6.14818C19.9688 6.14818 19.5577 4.91365 18.322 3.67913C17.0874 2.44227 15.8517 2.02999 15.8517 2.02999Z"
                          fill="#2A2B2A"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <div className={styles.card_body}>
                  <p>{templateDet.level}</p>
                </div>
                <div className={styles.card_actions}>
                  <CustomBtn btnColor="white" word="Delete Card" />
                  <CustomBtn
                    btnColor="black"
                    word="Save"
                    onClick={(e) => handleSaveCard(e)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.card_header}>
                <h6>Responsibilities</h6>
                {Iseditable && (
                  <button onClick={(e) => handleEditCard(e)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.58576 16.7395L0.0553957 20.8204C-0.00336969 20.9775 -0.0156878 21.1481 0.0199129 21.312C0.0555136 21.4758 0.137528 21.626 0.256162 21.7445C0.374795 21.863 0.525034 21.9449 0.688934 21.9803C0.852835 22.0157 1.02347 22.0032 1.18046 21.9443L5.26028 20.4139C5.72724 20.2391 6.15136 19.9662 6.50414 19.6138L18.322 7.79615C18.322 7.79615 17.9097 6.56046 16.6751 5.32477C15.4406 4.09025 14.2037 3.67796 14.2037 3.67796L2.38589 15.4956C2.03348 15.8484 1.76066 16.2725 1.58576 16.7395ZM15.8517 2.02999L17.4625 0.419279C17.7513 0.130446 18.1368 -0.053568 18.5398 0.0139815C19.107 0.107153 19.9746 0.388998 20.7922 1.20774C21.611 2.02649 21.8928 2.89299 21.986 3.46017C22.0536 3.86314 21.8696 4.24864 21.5807 4.53747L19.9688 6.14818C19.9688 6.14818 19.5577 4.91365 18.322 3.67913C17.0874 2.44227 15.8517 2.02999 15.8517 2.02999Z"
                        fill="#2A2B2A"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className={`${styles.card_body}`} dangerouslySetInnerHTML={{__html:templateDet.details[1]?.description}}>
              </div>
              <div className={styles.card_actions}>
                <CustomBtn btnColor="white" word="Delete Card" />
                <CustomBtn
                  btnColor="black"
                  word="Save"
                  onClick={(e) => handleSaveCard(e)}
                />
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.card_header}>
                <h6>Qualifications</h6>
                {Iseditable && (
                  <button onClick={(e) => handleEditCard(e)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.58576 16.7395L0.0553957 20.8204C-0.00336969 20.9775 -0.0156878 21.1481 0.0199129 21.312C0.0555136 21.4758 0.137528 21.626 0.256162 21.7445C0.374795 21.863 0.525034 21.9449 0.688934 21.9803C0.852835 22.0157 1.02347 22.0032 1.18046 21.9443L5.26028 20.4139C5.72724 20.2391 6.15136 19.9662 6.50414 19.6138L18.322 7.79615C18.322 7.79615 17.9097 6.56046 16.6751 5.32477C15.4406 4.09025 14.2037 3.67796 14.2037 3.67796L2.38589 15.4956C2.03348 15.8484 1.76066 16.2725 1.58576 16.7395ZM15.8517 2.02999L17.4625 0.419279C17.7513 0.130446 18.1368 -0.053568 18.5398 0.0139815C19.107 0.107153 19.9746 0.388998 20.7922 1.20774C21.611 2.02649 21.8928 2.89299 21.986 3.46017C22.0536 3.86314 21.8696 4.24864 21.5807 4.53747L19.9688 6.14818C19.9688 6.14818 19.5577 4.91365 18.322 3.67913C17.0874 2.44227 15.8517 2.02999 15.8517 2.02999Z"
                        fill="#2A2B2A"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className={styles.card_body}>
                <ul>
                  <li>
                    Edit and enhance video footage to create engaging content.
                  </li>
                  <li>
                    Collaborate with team members to meet project requirements
                    and deadlines.
                  </li>
                  <li>
                    Stay updated on industry trends and techniques to improve
                    editing skills.
                  </li>
                  <li>
                    Contribute creative ideas to enhance the overall quality of
                    video content.
                  </li>
                </ul>
              </div>
              <div className={styles.card_actions}>
                <CustomBtn btnColor="white" word="Delete Card" />
                <CustomBtn
                  btnColor="black"
                  word="Save"
                  onClick={(e) => handleSaveCard(e)}
                />
              </div>
            </div>
          </div>
          <div className="space-y-[1.5vw]">
            <div className={styles.card}>
              <div className={styles.card_header}>
                <h6>Job Description</h6>
                {Iseditable && (
                  <button onClick={(e) => handleEditCard(e)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.58576 16.7395L0.0553957 20.8204C-0.00336969 20.9775 -0.0156878 21.1481 0.0199129 21.312C0.0555136 21.4758 0.137528 21.626 0.256162 21.7445C0.374795 21.863 0.525034 21.9449 0.688934 21.9803C0.852835 22.0157 1.02347 22.0032 1.18046 21.9443L5.26028 20.4139C5.72724 20.2391 6.15136 19.9662 6.50414 19.6138L18.322 7.79615C18.322 7.79615 17.9097 6.56046 16.6751 5.32477C15.4406 4.09025 14.2037 3.67796 14.2037 3.67796L2.38589 15.4956C2.03348 15.8484 1.76066 16.2725 1.58576 16.7395ZM15.8517 2.02999L17.4625 0.419279C17.7513 0.130446 18.1368 -0.053568 18.5398 0.0139815C19.107 0.107153 19.9746 0.388998 20.7922 1.20774C21.611 2.02649 21.8928 2.89299 21.986 3.46017C22.0536 3.86314 21.8696 4.24864 21.5807 4.53747L19.9688 6.14818C19.9688 6.14818 19.5577 4.91365 18.322 3.67913C17.0874 2.44227 15.8517 2.02999 15.8517 2.02999Z"
                        fill="#2A2B2A"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className={styles.card_body}>
                {templateDet?.details[0]?.description}
              </div>
              <div className={styles.card_actions}>
                <CustomBtn btnColor="white" word="Delete Card" />
                <CustomBtn
                  btnColor="black"
                  word="Save"
                  onClick={(e) => handleSaveCard(e)}
                />
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.card_header}>
                <h6>Benefits</h6>
                {Iseditable && (
                  <button onClick={(e) => handleEditCard(e)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.58576 16.7395L0.0553957 20.8204C-0.00336969 20.9775 -0.0156878 21.1481 0.0199129 21.312C0.0555136 21.4758 0.137528 21.626 0.256162 21.7445C0.374795 21.863 0.525034 21.9449 0.688934 21.9803C0.852835 22.0157 1.02347 22.0032 1.18046 21.9443L5.26028 20.4139C5.72724 20.2391 6.15136 19.9662 6.50414 19.6138L18.322 7.79615C18.322 7.79615 17.9097 6.56046 16.6751 5.32477C15.4406 4.09025 14.2037 3.67796 14.2037 3.67796L2.38589 15.4956C2.03348 15.8484 1.76066 16.2725 1.58576 16.7395ZM15.8517 2.02999L17.4625 0.419279C17.7513 0.130446 18.1368 -0.053568 18.5398 0.0139815C19.107 0.107153 19.9746 0.388998 20.7922 1.20774C21.611 2.02649 21.8928 2.89299 21.986 3.46017C22.0536 3.86314 21.8696 4.24864 21.5807 4.53747L19.9688 6.14818C19.9688 6.14818 19.5577 4.91365 18.322 3.67913C17.0874 2.44227 15.8517 2.02999 15.8517 2.02999Z"
                        fill="#2A2B2A"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className={styles.card_body}>
                <ul>
                  <li>
                    Edit and enhance video footage to create engaging content.
                  </li>
                  <li>
                    Collaborate with team members to meet project requirements
                    and deadlines.
                  </li>
                  <li>
                    Stay updated on industry trends and techniques to improve
                    editing skills.
                  </li>
                  <li>
                    Contribute creative ideas to enhance the overall quality of
                    video content.
                  </li>
                </ul>
              </div>
              <div className={styles.card_actions}>
                <CustomBtn btnColor="white" word="Delete Card" />
                <CustomBtn
                  btnColor="black"
                  word="Save"
                  onClick={(e) => handleSaveCard(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {Iseditable && (
        <div className="flex justify-end items-center w-full gap-[1vw]">
          <CustomBtn
            word="Add Card"
            btnColor="white"
            icon={addIcon}
            width="w-[9vw]"
            paddingVal="p-[0.5vw]"
          />
          <CustomBtn
            word="Save Template"
            btnColor="black"
            paddingVal="p-[0.5vw]"
            width="w-[9vw]"
            onClick={() => setIseditable((prev) => !prev)}
          />
        </div>
      )}
    </div>
  );
};

