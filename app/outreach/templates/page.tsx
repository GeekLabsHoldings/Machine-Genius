import CustomBtn from "@/app/_components/Button/CustomBtn";
import React from "react";
import styles from "./templates.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

const page = () => {
  return (
    <div className={`${styles.templates} py-[1vw]`}>
      <div className=" flex justify-between items-center">
        <div
          className={`w-1/3 ${styles.selection} flex flex-col gap-[0.4vw] mb-[1vw]`}
        >
          <h5>Templates</h5>
          <div className=" w-[16vw]">
            <CustomSelectInput
              options={["Feedback", "Campaign", "Sequence"]}
              label={"All"}
            />
          </div>
        </div>
        <div className="w-fit items-end">
          <CustomBtn
            paddingVal="py-[0.5vw] px-[0.6vw]"
            btnColor="black"
            word="New Sequence"
            icon={
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z"
                  fill="#FFFFFB"
                />
              </svg>
            }
          />
        </div>
      </div>

      <div className="flex gap-[2.5vw] mb-[1vw]">
        {/* Twitter Scraper Data  */}
        <div
          className={`${styles.templateBox} h-[48vh] w-1/3 flex flex-col gap-[0.8vw]`}
        >
          <div
            className={`${styles.templateBoxHeader} flex justify-between items-center`}
          >
            <div className="flex gap-[0.5vw] items-center">
              <h3>Feedback Survey Sequence</h3>
            </div>
            <CustomBtn
              btnColor="black"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.58333 16.5C7.58333 17.3284 8.21757 18 9 18C9.78242 18 10.4167 17.3284 10.4167 16.5V10.5H16.0833C16.8658 10.5 17.5 9.82845 17.5 9C17.5 8.17155 16.8658 7.5 16.0833 7.5H10.4167V1.5C10.4167 0.671565 9.78242 0 9 0C8.21757 0 7.58333 0.671565 7.58333 1.5V7.5H1.91667C1.13427 7.5 0.5 8.17155 0.5 9C0.5 9.82845 1.13427 10.5 1.91667 10.5H7.58333V16.5Z"
                    fill="#FFFFFB"
                  />
                </svg>
              }
            />
          </div>
          {/* Container div with flexbox column layout, vertical gap, vertical scrollbar, and padding */}
          <div className="flex flex-col gap-[1.1vw] overflow-y-auto py-2 px-1">
            {" "}
            {/* First template box with flexbox column layout and gap */}
            <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
              {/* Header section for the template box */}
              <div className={`${styles.templateBoxHeaderSm}`}>
                <h6 className=" mb-[0.5vw]">
                  Syndication reach-out email (indirect)
                </h6>{" "}
                {/* Heading for the template box */}
              </div>
              {/* Custom button with black color, "Run Scraper" text, full width, and onClick event to setIsOpen */}
              <CustomBtn btnColor="black" word="View Template" width="100%" />
            </div>
            {/* Second template box with same layout as the first one */}
            <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
              {/* Header section for the template box */}
              <div className={`${styles.templateBoxHeaderSm}`}>
                <h6 className=" mb-[0.5vw]">
                  Syndication reach-out email (indirect)
                </h6>{" "}
                {/* Heading for the template box */}
              </div>
              {/* Custom button with black color, "Run Scraper" text, full width, and onClick event to setIsOpen */}
              <CustomBtn btnColor="black" word="View Template" width="100%" />
            </div>
          </div>
        </div>
        {/* Websites Scraper Data */}
        {/* Main container for the template box with specific height,
                  width, flexbox column layout, and gap */}
        <div
          className={`${styles.templateBox} h-[48vh] w-1/3 flex flex-col gap-[0.8vw]`}
        >
          <div
            className={`${styles.templateBoxHeader} flex justify-between items-center`}
          >
            <div className="flex gap-[0.5vw] items-center">
              <h3>Campaign Sequence</h3>
            </div>
            <CustomBtn
              btnColor="black"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.58333 16.5C7.58333 17.3284 8.21757 18 9 18C9.78242 18 10.4167 17.3284 10.4167 16.5V10.5H16.0833C16.8658 10.5 17.5 9.82845 17.5 9C17.5 8.17155 16.8658 7.5 16.0833 7.5H10.4167V1.5C10.4167 0.671565 9.78242 0 9 0C8.21757 0 7.58333 0.671565 7.58333 1.5V7.5H1.91667C1.13427 7.5 0.5 8.17155 0.5 9C0.5 9.82845 1.13427 10.5 1.91667 10.5H7.58333V16.5Z"
                    fill="#FFFFFB"
                  />
                </svg>
              }
            />
          </div>
          {/* Container div with flexbox column layout, vertical gap, vertical scrollbar, and padding */}
          <div className="flex flex-col gap-[1.1vw] overflow-y-auto py-2 px-1">
            {" "}
            {/* First template box with flexbox column layout and gap */}
            <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
              {/* Header section for the template box */}
              <div className={`${styles.templateBoxHeaderSm}`}>
                <h6 className=" mb-[0.5vw]">Out Reach Campaign Sequence</h6>{" "}
                {/* Heading for the template box */}
              </div>
              {/* Custom button with black color, "Run Scraper" text, full width, and onClick event to setIsOpen */}
              <CustomBtn btnColor="black" word="View Template" width="100%" />
            </div>
            {/* Second template box with same layout as the first one */}
            <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
              {/* Header section for the template box */}
              <div className={`${styles.templateBoxHeaderSm}`}>
                <h6 className=" mb-[0.5vw]">Out Reach Campaign Sequence</h6>{" "}
                {/* Heading for the template box */}
              </div>
              {/* Custom button with black color, "Run Scraper" text, full width, and onClick event to setIsOpen */}
              <CustomBtn btnColor="black" word="View Template" width="100%" />
            </div>
          </div>
        </div>
        {/* Reddit Scraper Data */}
        {/* Main container for the template box with specific height,
                  width, flexbox column layout, and gap */}
        <div
          className={`${styles.templateBox} h-[48vh] w-1/3 flex flex-col gap-[0.8vw]`}
        >
          <div
            className={`${styles.templateBoxHeader} flex justify-between items-center`}
          >
            <div className="flex gap-[0.5vw] items-center">
              <h3>Loyal Customers Sequence</h3>
            </div>
            <CustomBtn
              btnColor="black"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.58333 16.5C7.58333 17.3284 8.21757 18 9 18C9.78242 18 10.4167 17.3284 10.4167 16.5V10.5H16.0833C16.8658 10.5 17.5 9.82845 17.5 9C17.5 8.17155 16.8658 7.5 16.0833 7.5H10.4167V1.5C10.4167 0.671565 9.78242 0 9 0C8.21757 0 7.58333 0.671565 7.58333 1.5V7.5H1.91667C1.13427 7.5 0.5 8.17155 0.5 9C0.5 9.82845 1.13427 10.5 1.91667 10.5H7.58333V16.5Z"
                    fill="#FFFFFB"
                  />
                </svg>
              }
            />
          </div>
          {/* Container div with flexbox column layout, vertical gap, vertical scrollbar, and padding */}
          <div className="flex flex-col gap-[1.1vw] overflow-y-auto py-2 px-1">
            {" "}
            {/* First template box with flexbox column layout and gap */}
            <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
              {/* Header section for the template box */}
              <div className={`${styles.templateBoxHeaderSm}`}>
                <h6 className=" mb-[0.5vw]">
                  Syndication reach-out email (indirect)
                </h6>{" "}
                {/* Heading for the template box */}
              </div>
              {/* Custom button with black color, "Run Scraper" text, full width, and onClick event to setIsOpen */}
              <CustomBtn btnColor="black" word="View Template" width="100%" />
            </div>
            {/* Second template box with same layout as the first one */}
            <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
              {/* Header section for the template box */}
              <div className={`${styles.templateBoxHeaderSm}`}>
                <h6 className=" mb-[0.5vw]">
                  Syndication reach-out email (indirect)
                </h6>{" "}
                {/* Heading for the template box */}
              </div>
              {/* Custom button with black color, "Run Scraper" text, full width, and onClick event to setIsOpen */}
              <CustomBtn btnColor="black" word="View Template" width="100%" />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-between items-center">
        <div
          className={`w-1/3 ${styles.selection} flex flex-col gap-[0.5vw] mb-[1vw]`}
        >
          <h5>Templates</h5>
          <div className=" w-[16vw]">
            <CustomSelectInput
              options={["Feedback", "Campaign", "Sequence"]}
              label={"All"}
            />
          </div>
        </div>
        <div className="w-fit items-end">
          <CustomBtn
            paddingVal="py-[0.5vw] px-[0.6vw]"
            btnColor="black"
            word="New Template"
            icon={
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z"
                  fill="#FFFFFB"
                />
              </svg>
            }
          />
        </div>
      </div>
      <div className=" flex gap-[2vw]">
        <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
          {/* Header section for the template box */}
          <div className={`${styles.templateBoxHeaderSm}`}>
            <h6 className=" mb-[0.5vw]">Out Reach Campaign Sequence</h6>{" "}
            {/* Heading for the template box */}
          </div>
          {/* Custom button with black color, "Run Scraper" text, full width, and onClick event to setIsOpen */}
          <CustomBtn btnColor="black" word="View Template" width="100%" />
        </div>
        <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
          {/* Header section for the template box */}
          <div className={`${styles.templateBoxHeaderSm}`}>
            <h6 className=" mb-[0.5vw]">Out Reach Campaign Sequence</h6>{" "}
            {/* Heading for the template box */}
          </div>
          {/* Custom button with black color, "Run Scraper" text, full width, and onClick event to setIsOpen */}
          <CustomBtn btnColor="black" word="View Template" width="100%" />
        </div>
        <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
          {/* Header section for the template box */}
          <div className={`${styles.templateBoxHeaderSm}`}>
            <h6 className=" mb-[0.5vw]">Out Reach Campaign Sequence</h6>{" "}
            {/* Heading for the template box */}
          </div>
          {/* Custom button with black color, "Run Scraper" text, full width, and onClick event to setIsOpen */}
          <CustomBtn btnColor="black" word="View Template" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default page;
