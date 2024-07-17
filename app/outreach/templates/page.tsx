import CustomBtn from "@/app/_components/Button/CustomBtn";
import React from "react";
import styles from "./templates.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

const Page = () => {
  return (
    <div className={`${styles.templates} py-[1.2vw]`}>
      {/* // Container with flex layout, space-between alignment, and center items */}
      <div className="flex justify-between items-center">
        {/* Section for selecting templates with flex layout, column direction, vertical gap, and margin */}
        <div
          className={`w-1/3 ${styles.selection} flex flex-col gap-[0.4vw] mb-[1vw]`}
        >
          {/* Title for the templates section */}
          <h5>Templates</h5>

          {/* Custom select input for selecting template type with width */}
          <div className="w-[16vw]">
            <CustomSelectInput
              options={["Feedback", "Campaign", "Sequence"]} // Options for template selection
              label={"All"} // Label for the select input
            />
          </div>
        </div>

        {/* Button for creating a new sequence with padding, color, text, and icon */}
        <div className="w-fit items-end">
          <CustomBtn
            paddingVal="py-[0.5vw] px-[0.6vw]" // Padding values for the button
            btnColor="black" // Color of the button
            word="New Sequence" // Text content of the button
            icon={
              // Icon for the button
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

      <div className="flex gap-[2.5vw] mb-[1.4vw]">
        {/* Twitter Scraper Data  */}
        {/* // Container for displaying templates with custom styling, height, width, flex layout, and vertical gap */}
        <div
          className={`${styles.templateBox} h-[42vh] w-1/3 flex flex-col gap-[0.8vw]`}
        >
          {/* Header section of the template box with flex layout, space-between alignment, and center items */}
          <div
            className={`${styles.templateBoxHeader} flex justify-between items-center`}
          >
            {/* Section for title of the template box */}
            <div className="flex gap-[0.5vw] items-center">
              <h3>Feedback Survey Sequence</h3>{" "}
              {/* Title of the template box */}
            </div>

            {/* Button for additional actions with black color and custom icon */}
            <CustomBtn
              btnColor="black" // Color of the button
              icon={
                // Icon for the button
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Path for the plus icon */}
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

          {/* Container for templates with flex layout, column direction, vertical gap, vertical scrollbar, and padding */}
          <div className="flex flex-col gap-[1.3vw] overflow-y-auto py-2 px-1">
            {/* First template box with flex layout, column direction, and vertical gap */}
            <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
              {/* Header section for the template box */}
              <div className={`${styles.templateBoxHeaderSm}`}>
                <h6 className=" mb-[0.5vw]">
                  Syndication reach-out email (indirect)
                </h6>{" "}
                {/* Heading for the template box */}
              </div>
              {/* Button to view the template with black color, "View Template" text, and full width */}
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
              {/* Button to view the template with black color, "View Template" text, and full width */}
              <CustomBtn btnColor="black" word="View Template" width="100%" />
            </div>

            {/* third template box with flex layout, column direction, and vertical gap */}
            <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
              {/* Header section for the template box */}
              <div className={`${styles.templateBoxHeaderSm}`}>
                <h6 className=" mb-[0.5vw]">
                  Syndication reach-out email (indirect)
                </h6>{" "}
                {/* Heading for the template box */}
              </div>
              {/* Button to view the template with black color, "View Template" text, and full width */}
              <CustomBtn btnColor="black" word="View Template" width="100%" />
            </div>
          </div>
        </div>

        {/* Websites Scraper Data */}
        {/* Main container for the template box with specific height,
          width, flexbox column layout, and gap */}
        <div
          className={`${styles.templateBox} h-[42vh] w-1/3 flex flex-col gap-[0.8vw]`}
        >
          {/* Header section of the template box with flex layout, space-between alignment, and center items */}
          <div
            className={`${styles.templateBoxHeader} flex justify-between items-center`}
          >
            {/* Section for title of the template box */}
            <div className="flex gap-[0.5vw] items-center">
              <h3>Campaign Sequence</h3> {/* Title of the template box */}
            </div>

            {/* Button for additional actions with black color and custom icon */}
            <CustomBtn
              btnColor="black" // Color of the button
              icon={
                // Icon for the button
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Path for the plus icon */}
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

          {/* Container for templates with flex layout, column direction, vertical gap, vertical scrollbar, and padding */}
          <div className="flex flex-col gap-[1.3vw] overflow-y-auto py-2 px-1">
            {/* First template box with flex layout, column direction, and vertical gap */}
            <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
              {/* Header section for the template box */}
              <div className={`${styles.templateBoxHeaderSm}`}>
                <h6 className=" mb-[0.5vw]">Out Reach Campaign Sequence</h6>{" "}
                {/* Heading for the template box */}
              </div>
              {/* Button to view the template with black color, "View Template" text, and full width */}
              <CustomBtn btnColor="black" word="View Template" width="100%" />
            </div>

            {/* Second template box with same layout as the first one */}
            <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
              {/* Header section for the template box */}
              <div className={`${styles.templateBoxHeaderSm}`}>
                <h6 className=" mb-[0.5vw]">Out Reach Campaign Sequence</h6>{" "}
                {/* Heading for the template box */}
              </div>
              {/* Button to view the template with black color, "View Template" text, and full width */}
              <CustomBtn btnColor="black" word="View Template" width="100%" />
            </div>
          </div>
        </div>

        {/* Reddit Scraper Data */}
        {/* Main container for the template box with specific height,
          width, flexbox column layout, and gap */}
        <div
          className={`${styles.templateBox} h-[42vh] w-1/3 flex flex-col gap-[0.8vw]`}
        >
          {/* Header section of the template box with flex layout, space-between alignment, and center items */}
          <div
            className={`${styles.templateBoxHeader} flex justify-between items-center`}
          >
            {/* Section for title of the template box */}
            <div className="flex gap-[0.5vw] items-center">
              <h3>Loyal Customers Sequence</h3>{" "}
              {/* Title of the template box */}
            </div>

            {/* Button for additional actions with black color and custom icon */}
            <CustomBtn
              btnColor="black" // Color of the button
              icon={
                // Icon for the button
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Path for the plus icon */}
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

          {/* Container for templates with flex layout, column direction, vertical gap, vertical scrollbar, and padding */}
          <div className="flex flex-col gap-[1.3vw] overflow-y-auto py-2 px-1">
            {/* First template box with flex layout, column direction, and vertical gap */}
            <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
              {/* Header section for the template box */}
              <div className={`${styles.templateBoxHeaderSm}`}>
                <h6 className=" mb-[0.5vw]">
                  Syndication reach-out email (indirect)
                </h6>{" "}
                {/* Heading for the template box */}
              </div>
              {/* Button to view the template with black color, "View Template" text, and full width */}
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
              {/* Button to view the template with black color, "View Template" text, and full width */}
              <CustomBtn btnColor="black" word="View Template" width="100%" />
            </div>
          </div>
        </div>
      </div>
      {/* Main container with flex layout, space-between alignment, and center items */}
      <div className=" flex justify-between items-center">
        {/* Container for template selection with flex layout, column direction, vertical gap, and margin */}
        <div
          className={`w-1/3 ${styles.selection} flex flex-col gap-[0.5vw] mb-[1.5vw]`}
        >
          {/* Heading for the template selection */}
          <h5>Templates</h5>

          {/* Custom select input for template options with specific width */}
          <div className=" w-[16vw]">
            <CustomSelectInput
              options={["Feedback", "Campaign", "Sequence"]} // Options for the select input
              label={"All"} // Label for the select input
            />
          </div>
        </div>

        {/* Container for new template button with flex layout and end alignment */}
        <div className="w-fit items-end">
          {/* Custom button for creating a new template with specific padding, black color, and custom icon */}
          <CustomBtn
            paddingVal="py-[0.5vw] px-[0.6vw]" // Padding for the button
            btnColor="black" // Color of the button
            word="New Template" // Text for the button
            href="/outreach/templates/template-title"
            icon={
              // Icon for the button
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Path for the plus icon */}
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

      {/* Main container with flex layout and gap */}
      <div className=" flex gap-[2vw]">
        {/* Template box container with flex layout, column direction, and vertical gap */}
        <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
          {/* Header section for the template box */}
          <div className={`${styles.templateBoxHeaderSm}`}>
            <h6 className=" mb-[0.5vw]">
              Syndication reach-out email (indirect)
            </h6>{" "}
            {/* Heading for the template box */}
          </div>

          {/* Custom button for viewing the template with black color, "View Template" text, and full width */}
          <CustomBtn btnColor="black" word="View Template" width="100%" />
        </div>

        {/* Template box container with same layout as the previous one */}
        <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
          {/* Header section for the template box */}
          <div className={`${styles.templateBoxHeaderSm}`}>
            <h6 className=" mb-[0.5vw]">
              Syndication reach-out email (indirect)
            </h6>{" "}
            {/* Heading for the template box */}
          </div>

          {/* Custom button for viewing the template with black color, "View Template" text, and full width */}
          <CustomBtn btnColor="black" word="View Template" width="100%" />
        </div>

        {/* Template box container with same layout as the previous ones */}
        <div className={`${styles.templateBox} flex flex-col gap-[0.7vw]`}>
          {/* Header section for the template box */}
          <div className={`${styles.templateBoxHeaderSm}`}>
            <h6 className=" mb-[0.5vw]">
              Syndication reach-out email (indirect)
            </h6>{" "}
            {/* Heading for the template box */}
          </div>

          {/* Custom button for viewing the template with black color, "View Template" text, and full width */}
          <CustomBtn btnColor="black" word="View Template" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default Page;
