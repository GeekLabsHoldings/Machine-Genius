"use client";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import styles from "./dataCollection.module.css";
import { Platforms } from "@/app/_data/data";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { useState } from "react";

// display all platforms
const Share = () => {
  // State for handling modal visibility and date selection
  const [isOpen, setIsOpen] = useState(false);

  const [sorting1, setSorting1] = useState("Ascend");
  const [sorting2, setSorting2] = useState("Ascend");

  function getRandomBackgroundColor() {
    const colors = [
      "#F36F24B2",
      "#9B5FBFB2",
      "#E1C655B2",
      "#31B2E9B2",
      "#E9313EB2",
    ];

    // Select a random index from the array of colors
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the color at the random index
    return colors[randomIndex];
  }

  const headers = [
    "Data Scraped",
    "Platform",
    "Data Mentions",
    "Trending",
    "Data",
  ];

  const bodyRow = [
    {
      DataScraped: "$TSLA",
      Platform: "Email",
      DataMentions: "200 Mentions",
      Trending: "Not Trending",
      Date: "12 March  2024",
    },
    {
      DataScraped: "$TSLA",
      Platform: "Instagram",
      DataMentions: "200 Mentions",
      Trending: "Not Trending",
      Date: "12 March  2024",
    },
    {
      DataScraped: "$TSLA",
      Platform: "Instagram",
      DataMentions: "200 Mentions",
      Trending: "Not Trending",
      Date: "12 March  2024",
    },
    {
      DataScraped: "$TSLA",
      Platform: "Instagram",
      DataMentions: "200 Mentions",
      Trending: "Not Trending",
      Date: "12 March  2024",
    },
    {
      DataScraped: "$TSLA",
      Platform: "Instagram",
      DataMentions: "2.1K Mentions",
      Trending: "Trending",
      Date: "12 March  2024",
    },
    {
      DataScraped: "$TSLA",
      Platform: "Instagram",
      DataMentions: "200 Mentions",
      Trending: "Not Trending",
      Date: "12 March  2024",
    },
    {
      DataScraped: "$TSLA",
      Platform: "Twitter",
      DataMentions: "2.1K Mentions",
      Trending: "Trending",
      Date: "12 March  2024",
    },
    {
      DataScraped: "$TSLA",
      Platform: "Subscribed",
      DataMentions: "2.1K Mentions",
      Trending: "Not Trending",
      Date: "12 March  2024",
    },
    {
      DataScraped: "$TSLA",
      Platform: "Youtube",
      DataMentions: "200 Mentions",
      Trending: "Trending",
      Date: "12 March  2024",
    },
    {
      DataScraped: "$TSLA",
      Platform: "Youtube",
      DataMentions: "200 Mentions",
      Trending: "Trending",
      Date: "12 March  2024",
    },
  ];

  return (
    <>
      <div className="flex flex-col h-full">
        {/* breadcrumbs to change content  */}
        <div className={" pt-[0.5vw] " + styles.comments_wrapper}>
          <div className={"tabs " + styles.tabs}>
            <input
              type="radio"
              name="tabs"
              className="tab"
              aria-label="Scrapers"
              defaultChecked
            />
            <div className="tab-content h-[75vh] pt-[0.5vw]">
              <div className=" flex flex-col gap-[1.5vw]">
                {/* dropdown selection to select specific platform */}
                <div
                  className={`w-1/3 ${styles.selection} flex flex-col gap-[0.5vw]`}
                >
                  <h5>Scrapers</h5>
                  <CustomSelectInput options={Platforms} label={"All"} />
                </div>

                <div className="flex gap-[2.5vw]">
                  {/* Twitter Scraper Data  */}
                  <div
                    className={`${styles.platformBox} h-[65vh] w-1/3 flex flex-col gap-[1.2vw]`}
                  >
                    <div
                      className={`${styles.platformBoxHeader} flex justify-between`}
                    >
                      <div className="flex gap-[0.5vw] items-center">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
                            fill="#1DA1F2"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M24 9.23145C23.3383 9.52545 22.6261 9.72345 21.8792 9.81285C22.6417 9.35565 23.2273 8.63212 23.5026 7.77C22.7899 8.19352 21.9986 8.50013 21.158 8.66633C20.4842 7.9488 19.5237 7.5 18.4624 7.5C16.4231 7.5 14.7696 9.15353 14.7696 11.1928C14.7696 11.4819 14.8026 11.7639 14.8656 12.0345C11.7962 11.8809 9.07538 10.4104 7.25392 8.17612C6.93592 8.72152 6.75412 9.35565 6.75412 10.0325C6.75412 11.3134 7.40513 12.4437 8.39685 13.106C7.79085 13.0868 7.22212 12.9206 6.72352 12.644V12.6902C6.72352 14.4799 7.99725 15.972 9.68558 16.3122C9.37598 16.3962 9.04958 16.4418 8.71305 16.4418C8.47485 16.4418 8.24325 16.4184 8.01765 16.3752C8.48745 17.8421 9.85178 18.9101 11.4674 18.9401C10.2039 19.93 8.61165 20.5209 6.88133 20.5209C6.58253 20.5209 6.2886 20.5035 6 20.4687C7.63433 21.5163 9.57518 22.1282 11.6606 22.1282C18.4528 22.1282 22.1672 16.5012 22.1672 11.6217C22.1672 11.4615 22.1642 11.302 22.1564 11.1442C22.8787 10.6222 23.505 9.97185 24 9.23145Z"
                            fill="white"
                          />
                        </svg>

                        <h3>Twitter Scraper Data</h3>
                      </div>
                    </div>
                    <h5 className=" underline border-b-[var(--dark)]">
                      3 Scrapers Running
                    </h5>
                    {/* Container div with flexbox column layout, vertical gap, vertical scrollbar, and padding */}
                    <div className="flex flex-col gap-[0.7vw] overflow-y-auto py-2 px-1">
                      {" "}
                      {/* First platform box with flexbox column layout and gap */}
                      <div
                        className={`${styles.platformBox} flex flex-col gap-[0.7vw]`}
                      >
                        {/* Header section for the platform box */}
                        <div className={`${styles.platformBoxHeaderSm}`}>
                          <h6>$TSLA</h6> {/* Heading for the platform box */}
                        </div>
                        {/* Custom button with black color, "Run Scraper" text, full width, and onClick event to setIsOpen */}
                        <CustomBtn
                          btnColor="black"
                          word="Run Scraper"
                          width="100%"
                          onClick={() => setIsOpen(true)}
                        />
                      </div>
                      {/* Second platform box with same layout as the first one */}
                      <div
                        className={`${styles.platformBox} flex flex-col gap-[0.7vw]`}
                      >
                        {/* Header section for the platform box */}
                        <div className={`${styles.platformBoxHeaderSm}`}>
                          <h6>$TSLA</h6> {/* Heading for the platform box */}
                        </div>
                        {/* Custom button with black color, "Run Scraper" text, and full width */}
                        <CustomBtn
                          btnColor="black"
                          word="Run Scraper"
                          width="100%"
                        />
                      </div>
                      {/* Third platform box with same layout as the previous ones */}
                      <div
                        className={`${styles.platformBox} flex flex-col gap-[0.7vw]`}
                      >
                        {/* Header section for the platform box */}
                        <div className={`${styles.platformBoxHeaderSm}`}>
                          <h6>$TSLA</h6> {/* Heading for the platform box */}
                        </div>
                        {/* Custom button with white color, "Stop Scraper" text, and full width */}
                        <CustomBtn
                          btnColor="white"
                          word="Stop Scraper"
                          width="100%"
                        />
                      </div>
                      {/* Fourth platform box with same layout as the previous ones */}
                      <div
                        className={`${styles.platformBox} flex flex-col gap-[0.7vw]`}
                      >
                        {/* Header section for the platform box */}
                        <div className={`${styles.platformBoxHeaderSm}`}>
                          <h6>$TSLA</h6> {/* Heading for the platform box */}
                        </div>
                        {/* Custom button with white color, "Stop Scraper" text, and full width */}
                        <CustomBtn
                          btnColor="white"
                          word="Stop Scraper"
                          width="100%"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Websites Scraper Data */}
                  {/* Main container for the platform box with specific height,
                  width, flexbox column layout, and gap */}
                  <div
                    className={`${styles.platformBox} h-[65vh] w-1/3 flex flex-col gap-[1.2vw]`}
                  >
                    {/* Header section of the platform box with flex layout and space-between alignment */}
                    <div
                      className={`${styles.platformBoxHeader} flex justify-between`}
                    >
                      {/* Container for the icon and title with flex layout, gap, and center alignment */}
                      <div className="flex gap-[0.5vw] items-center">
                        {/* SVG icon representing a logo or symbol */}
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
                            fill="#F33052"
                          />
                          <path
                            d="M14.3044 11.8247L12.6056 18.1744H10.8244L9.94125 14.9175C9.86063 14.6231 9.76594 14.2294 9.65719 13.7353L9.56813 13.3453H9.52688L9.43313 13.7409L9.345 14.1309C9.27938 14.3944 9.20906 14.6578 9.135 14.9222L8.2275 18.1744H6.465L4.81875 11.8247H6.04688L6.96375 15.3094C7.02 15.5325 7.08938 15.8409 7.17375 16.2347L7.27125 16.6997L7.365 17.1647H7.40719C7.45688 16.9603 7.49438 16.8047 7.51875 16.6997L7.63031 16.2394C7.68844 15.9975 7.77094 15.6891 7.87688 15.3141L8.85375 11.8247H10.2684L11.2219 15.3141C11.3025 15.6113 11.3822 15.9197 11.4591 16.2394L11.5659 16.6997L11.6775 17.1647H11.715L11.8172 16.6997L11.9147 16.2347C11.9953 15.8597 12.0684 15.5494 12.1331 15.3047L13.0725 11.8247H14.3044Z"
                            fill="white"
                          />
                          <path
                            d="M15.9469 12.8391V14.4759H18.9234V15.3647H15.9469V17.16H19.1147V18.1744H14.7422V11.8247H19.0866V12.8391H15.9469Z"
                            fill="white"
                          />
                          <path
                            d="M20.0128 18.1753V11.8256H23.1338C23.865 11.8256 24.3638 11.9428 24.63 12.1772C24.8944 12.4116 25.0275 12.8522 25.0275 13.5C25.0275 14.2847 24.7162 14.7469 24.0928 14.8866V14.91C24.8175 15.0216 25.1813 15.525 25.1813 16.4213C25.1813 17.0691 25.0416 17.5238 24.7622 17.7844C24.4838 18.0441 23.9972 18.1753 23.3016 18.1753H20.0128ZM21.2175 14.4909H22.6912C23.1694 14.4909 23.4741 14.4375 23.6063 14.3325C23.7384 14.2275 23.8041 13.9838 23.8041 13.6022C23.8041 13.0941 23.5153 12.84 22.9388 12.84H21.2175V14.4909ZM22.5384 17.1609L22.9613 17.1516C23.3681 17.1516 23.6353 17.0934 23.7637 16.9791C23.8922 16.8647 23.9559 16.6219 23.9559 16.2534C23.9559 15.8691 23.8894 15.6272 23.7534 15.5288C23.6184 15.4294 23.2866 15.3797 22.7569 15.3797H21.2166V17.1609H22.5384Z"
                            fill="white"
                          />
                        </svg>

                        {/* Title for the platform box */}
                        <h3>Websites Scraper Data</h3>
                      </div>
                    </div>

                    {/* Subheader with underline and bottom border */}
                    <h5 className="underline border-b-[var(--dark)]">
                      3 Scrapers Running
                    </h5>

                    {/* Inner container for the scraper list with flexbox column layout, vertical gap, vertical scrollbar, and padding */}
                    <div className="flex flex-col gap-[0.7vw] overflow-y-auto py-2 px-1">
                      {" "}
                      {/* Individual platform box for a scraper with flexbox column layout and gap */}
                      <div
                        className={`${styles.platformBox} flex flex-col gap-[0.7vw]`}
                      >
                        <div className={`${styles.platformBoxHeaderSm}`}>
                          <h6>$TSLA</h6> {/* Scraper label */}
                        </div>
                        {/* Custom button with black color, "Run Scraper" text, and full width */}
                        <CustomBtn
                          btnColor="black"
                          word="Run Scraper"
                          width="100%"
                        />
                      </div>
                      {/* Repeat of platform box for another scraper */}
                      <div
                        className={`${styles.platformBox} flex flex-col gap-[0.7vw]`}
                      >
                        <div className={`${styles.platformBoxHeaderSm}`}>
                          <h6>$TSLA</h6> {/* Scraper label */}
                        </div>
                        {/* Custom button with black color, "Run Scraper" text, and full width */}
                        <CustomBtn
                          btnColor="black"
                          word="Run Scraper"
                          width="100%"
                        />
                      </div>
                      {/* Platform box with a "Stop Scraper" button */}
                      <div
                        className={`${styles.platformBox} flex flex-col gap-[0.7vw]`}
                      >
                        <div className={`${styles.platformBoxHeaderSm}`}>
                          <h6>$TSLA</h6> {/* Scraper label */}
                        </div>
                        {/* Custom button with white color, "Stop Scraper" text, and full width */}
                        <CustomBtn
                          btnColor="white"
                          word="Stop Scraper"
                          width="100%"
                        />
                      </div>
                      {/* Another platform box with a "Stop Scraper" button */}
                      <div
                        className={`${styles.platformBox} flex flex-col gap-[0.7vw]`}
                      >
                        <div className={`${styles.platformBoxHeaderSm}`}>
                          <h6>$TSLA</h6> {/* Scraper label */}
                        </div>
                        {/* Custom button with white color, "Stop Scraper" text, and full width */}
                        <CustomBtn
                          btnColor="white"
                          word="Stop Scraper"
                          width="100%"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Reddit Scraper Data */}
                  {/* Main container for the platform box with specific height,
                  width, flexbox column layout, and gap */}
                  <div
                    className={`${styles.platformBox} h-[65vh] w-1/3 flex flex-col gap-[1.2vw]`}
                  >
                    {/* Header section of the platform box with flex layout and space-between alignment */}
                    <div
                      className={`${styles.platformBoxHeader} flex justify-between`}
                    >
                      {/* Container for the icon and title with flex layout, gap, and center alignment */}
                      <div className="flex gap-[0.5vw] items-center">
                        {/* SVG icon representing a logo or symbol */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="31"
                          height="30"
                          viewBox="0 0 31 30"
                          fill="none"
                        >
                          {/* SVG path for the icon */}
                        </svg>

                        {/* Title for the platform box */}
                        <h3>Twitter Scraper Data</h3>
                      </div>
                    </div>

                    {/* Subheader with underline and bottom border */}
                    <h5 className="underline border-b-[var(--dark)]">
                      3 Scrapers Running
                    </h5>

                    {/* Inner container for the scraper list with flexbox column layout, vertical gap, vertical scrollbar, and padding */}
                    <div className="flex flex-col gap-[0.7vw] overflow-y-auto py-2 px-1">
                      {" "}
                      {/* Individual platform box for a scraper with flexbox column layout and gap */}
                      <div
                        className={`${styles.platformBox} flex flex-col gap-[0.7vw]`}
                      >
                        <div className={`${styles.platformBoxHeaderSm}`}>
                          <h6>$TSLA</h6> {/* Scraper label */}
                        </div>
                        {/* Custom button with black color, "Run Scraper" text, and full width */}
                        <CustomBtn
                          btnColor="black"
                          word="Run Scraper"
                          width="100%"
                        />
                      </div>
                      {/* Repeat of platform box for another scraper */}
                      <div
                        className={`${styles.platformBox} flex flex-col gap-[0.7vw]`}
                      >
                        <div className={`${styles.platformBoxHeaderSm}`}>
                          <h6>$TSLA</h6> {/* Scraper label */}
                        </div>
                        {/* Custom button with black color, "Run Scraper" text, and full width */}
                        <CustomBtn
                          btnColor="black"
                          word="Run Scraper"
                          width="100%"
                        />
                      </div>
                      {/* Platform box with a "Stop Scraper" button */}
                      <div
                        className={`${styles.platformBox} flex flex-col gap-[0.7vw]`}
                      >
                        <div className={`${styles.platformBoxHeaderSm}`}>
                          <h6>$TSLA</h6> {/* Scraper label */}
                        </div>
                        {/* Custom button with white color, "Stop Scraper" text, and full width */}
                        <CustomBtn
                          btnColor="white"
                          word="Stop Scraper"
                          width="100%"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <input
              type="radio"
              name="tabs"
              className="tab"
              aria-label="Lists"
            />
            <div className="tab-content h-[75vh] pb-[1vw]">
              <div className={`${styles.lists} py-[4.4vh]`}>
                <div className=" flex items-center justify-between">
                  <div className={` flex gap-[0.938vw]`}>
                    <div className="mb-[3vh]">
                      {/* Staff Member */}
                      <h5 className=" mb-[1vh] font-semibold">List</h5>
                      <div className="w-[11.927vw]">
                        {/* CustomSelectInput for staff members */}
                        <CustomSelectInput options={["All", "list"]} />
                      </div>
                    </div>
                    <div className="mb-[3vh]">
                      <h5 className=" mb-[1vh] font-semibold">Data Scraped</h5>
                      <div className="w-[11.927vw]">
                        {/* CustomSelectInput for projects */}
                        <CustomSelectInput
                          options={[
                            "All",
                            ...bodyRow.map((e, i) => e.DataScraped),
                          ]}
                        />
                      </div>
                    </div>
                    <div className="mb-[3vh]">
                      <h5 className=" mb-[1vh] font-semibold">Platform</h5>
                      <div className="w-[11.927vw]">
                        {/* CustomSelectInput for projects */}
                        <CustomSelectInput
                          options={[
                            "All",
                            ...bodyRow.map((e, i) => e.Platform),
                          ]}
                        />
                      </div>
                    </div>
                    <div className="mb-[3vh]">
                      <h5 className=" mb-[1vh] font-semibold">Trend</h5>
                      <div className="w-[11.927vw]">
                        {/* CustomSelectInput for projects */}
                        <CustomSelectInput
                          options={[
                            "All",
                            ...bodyRow.map((e, i) => e.Trending),
                          ]}
                        />
                      </div>
                    </div>
                    <div className="mb-[3vh]">
                      <h5 className=" mb-[1vh] font-semibold">Data Mentions</h5>
                      <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.37vw]">
                        <span className={`${styles.dataSort}`}>{sorting1}</span>
                        <svg
                          onClick={() => {
                            sorting1 == "Ascend"
                              ? setSorting1("Descend")
                              : setSorting1("Ascend");
                          }}
                          className="cursor-pointer"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                            fill="#2A2B2A"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mb-[3vh]">
                      <h5 className=" mb-[1vh] font-semibold">Date</h5>
                      <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.37vw]">
                        <span className={`${styles.dataSort}`}>{sorting2}</span>
                        <svg
                          onClick={() => {
                            sorting2 == "Ascend"
                              ? setSorting2("Descend")
                              : setSorting2("Ascend");
                          }}
                          className="cursor-pointer"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                            fill="#2A2B2A"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.tableContainer} h-[65vh]`}>
                  {/* Start Table */}
                  <div className={styles.table}>
                    {/* Table Header */}
                    <ul className={styles.table_header}>
                      {headers.map((e, i) => (
                        <li className="w-[20%]" key={i}>
                          {e}
                        </li>
                      ))}
                    </ul>

                    {/* Table Body */}
                    <div className={styles.table_body}>
                      {bodyRow.map((e, idx) => (
                        <ul className="w-[100%]" key={idx}>
                          <li className="w-[20%]">{e.DataScraped}</li>
                          <li className="w-[20%]">
                            <span
                              className={` text-white ${
                                styles[e.Platform]
                              }  px-[0.4vw] py-[0.2vw] rounded-sm`}
                              style={{
                                backgroundColor: `${getRandomBackgroundColor()}`,
                              }}
                            >
                              {e.Platform}
                            </span>
                          </li>
                          <li className="w-[20%]"> {e.DataMentions}</li>
                          <li className="w-[20%]">
                            <span
                              className={`px-[0.4vw] py-[0.2vw] rounded-sm ${
                                e.Trending == "Trending"
                                  ? "text-black"
                                  : "text-white"
                              }`}
                              style={{
                                backgroundColor: `${
                                  e.Trending == "Trending"
                                    ? "#5FA85BB5"
                                    : "#E9313EB2"
                                }`,
                              }}
                            >
                              {e.Trending}
                            </span>
                          </li>
                          <li className="w-[20%]">{e.Date}</li>
                        </ul>
                      ))}
                    </div>
                  </div>
                  {/* End Table */}
                </div>
              </div>
            </div>

            <input
              type="radio"
              name="tabs"
              className="tab"
              aria-label="Database"
            />
            <div className="tab-content h-[75vh] pb-[1vw]">
              {" "}
              <div className={`${styles.lists} py-[4.4vh]`}>
                <div className=" flex items-center justify-between">
                  <div className={` flex gap-[0.938vw]`}>
                    <div className="mb-[3vh]">
                      {/* Staff Member */}
                      <h5 className=" mb-[1vh] font-semibold">List</h5>
                      <div className="w-[11.927vw]">
                        {/* CustomSelectInput for staff members */}
                        <CustomSelectInput options={["All", "list"]} />
                      </div>
                    </div>
                    <div className="mb-[3vh]">
                      <h5 className=" mb-[1vh] font-semibold">Data Scraped</h5>
                      <div className="w-[11.927vw]">
                        {/* CustomSelectInput for projects */}
                        <CustomSelectInput
                          options={[
                            "All",
                            ...bodyRow.map((e, i) => e.DataScraped),
                          ]}
                        />
                      </div>
                    </div>
                    <div className="mb-[3vh]">
                      <h5 className=" mb-[1vh] font-semibold">Platform</h5>
                      <div className="w-[11.927vw]">
                        {/* CustomSelectInput for projects */}
                        <CustomSelectInput
                          options={[
                            "All",
                            ...bodyRow.map((e, i) => e.Platform),
                          ]}
                        />
                      </div>
                    </div>
                    <div className="mb-[3vh]">
                      <h5 className=" mb-[1vh] font-semibold">Trend</h5>
                      <div className="w-[11.927vw]">
                        {/* CustomSelectInput for projects */}
                        <CustomSelectInput
                          options={[
                            "All",
                            ...bodyRow.map((e, i) => e.Trending),
                          ]}
                        />
                      </div>
                    </div>
                    <div className="mb-[3vh]">
                      <h5 className=" mb-[1vh] font-semibold">Data Mentions</h5>
                      <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.37vw]">
                        <span className={`${styles.dataSort}`}>{sorting1}</span>
                        <svg
                          onClick={() => {
                            sorting1 == "Ascend"
                              ? setSorting1("Descend")
                              : setSorting1("Ascend");
                          }}
                          className="cursor-pointer"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                            fill="#2A2B2A"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mb-[3vh]">
                      <h5 className=" mb-[1vh] font-semibold">Date</h5>
                      <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.37vw]">
                        <span className={`${styles.dataSort}`}>{sorting2}</span>
                        <svg
                          onClick={() => {
                            sorting2 == "Ascend"
                              ? setSorting2("Descend")
                              : setSorting2("Ascend");
                          }}
                          className="cursor-pointer"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                            fill="#2A2B2A"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.tableContainer} h-[65vh]`}>
                  {/* Start Table */}
                  <div className={styles.table}>
                    {/* Table Header */}
                    <ul className={styles.table_header}>
                      {headers.map((e, i) => (
                        <li className="w-[20%]" key={i}>
                          {e}
                        </li>
                      ))}
                    </ul>

                    {/* Table Body */}
                    <div className={styles.table_body}>
                      {bodyRow.map((e, idx) => (
                        <ul className="w-[100%]" key={idx}>
                          <li className="w-[20%]">{e.DataScraped}</li>
                          <li className="w-[20%]">
                            <span
                              className={` text-white ${
                                styles[e.Platform]
                              }  px-[0.4vw] py-[0.2vw] rounded-sm`}
                              style={{
                                backgroundColor: `${getRandomBackgroundColor()}`,
                              }}
                            >
                              {e.Platform}
                            </span>
                          </li>
                          <li className="w-[20%]"> {e.DataMentions}</li>
                          <li className="w-[20%]">
                            <span
                              className={`px-[0.4vw] py-[0.2vw] rounded-sm ${
                                e.Trending == "Trending"
                                  ? "text-black"
                                  : "text-white"
                              }`}
                              style={{
                                backgroundColor: `${
                                  e.Trending == "Trending"
                                    ? "#5FA85BB5"
                                    : "#E9313EB2"
                                }`,
                              }}
                            >
                              {e.Trending}
                            </span>
                          </li>
                          <li className="w-[20%]">{e.Date}</li>
                        </ul>
                      ))}
                    </div>
                  </div>
                  {/* End Table */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Overlay container covering the entire screen with absolute positioning,
      centered content, and conditional rendering based on isOpen state */}
      <div
        className={` ${
          styles.overlay
        } absolute left-0 right-0 top-0 bottom-0 justify-center items-center bg-[#FFFFFB] bg-opacity-[58%] z-20 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        {/* Container for overlay content with rounded corners */}
        <div className={`${styles.overlayBox} rounded-xl`}>
          {/* Header section with title and close button */}
          <div className="flex justify-between items-center pb-[0.8vw] mb-[1vw] border-b-[1px] border-b-[var(--dark)]">
            <h6>Listing</h6> {/* Title for the overlay */}
            {/* Close button */}
            <svg
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.0125 13.9613L18.4214 21.3616C18.8145 21.7543 19.3477 21.9749 19.9037 21.9749C20.4597 21.9749 20.9929 21.7543 21.386 21.3616C21.7791 20.969 22 20.4364 22 19.881C22 19.3257 21.7791 18.7931 21.386 18.4004L13.9744 11L21.3846 3.59962C21.5792 3.40518 21.7335 3.17437 21.8388 2.92035C21.944 2.66634 21.9982 2.39411 21.9981 2.11919C21.998 1.84428 21.9438 1.57207 21.8384 1.3181C21.733 1.06414 21.5786 0.833399 21.3839 0.639051C21.1892 0.444703 20.9582 0.290556 20.7039 0.185411C20.4496 0.0802654 20.177 0.026181 19.9018 0.0262458C19.6266 0.0263106 19.354 0.080523 19.0998 0.185788C18.8455 0.291053 18.6145 0.445309 18.42 0.639749L11.0125 8.04013L3.6037 0.639749C3.41048 0.439732 3.17931 0.280156 2.92369 0.170331C2.66806 0.0605069 2.3931 0.00263317 2.11484 8.77827e-05C1.83659 -0.0024576 1.56061 0.0503759 1.30301 0.155506C1.04541 0.260635 0.811359 0.415956 0.614501 0.612405C0.417642 0.808853 0.261924 1.0425 0.156431 1.2997C0.0509388 1.5569 -0.00221519 1.83252 7.07167e-05 2.11046C0.00235662 2.3884 0.0600364 2.6631 0.169745 2.91854C0.279454 3.17398 0.438994 3.40503 0.639057 3.59823L8.05068 11L0.640455 18.4018C0.440392 18.595 0.280852 18.826 0.171143 19.0815C0.0614341 19.3369 0.00375362 19.6116 0.00146772 19.8895C-0.000818188 20.1675 0.0523358 20.4431 0.157828 20.7003C0.263321 20.9575 0.419039 21.1911 0.615898 21.3876C0.812756 21.584 1.04681 21.7394 1.30441 21.8445C1.562 21.9496 1.83798 22.0025 2.11624 21.9999C2.3945 21.9974 2.66946 21.9395 2.92508 21.8297C3.18071 21.7198 3.41188 21.5603 3.6051 21.3603L11.0125 13.9613Z"
                fill="#BDBDBD"
              />
            </svg>
          </div>

          {/* Section for assigning to an existing list */}
          <h6 className="mb-[1vw]">Assign to</h6>

          {/* Custom select input for selecting from existing lists */}
          <div className="w-[20vw] mb-[2vw]">
            <CustomSelectInput options={["List", "List"]} />
          </div>

          {/* Divider */}
          <div
            className={`${styles.or} h-[1px] w-full bg-[var(--dark)] relative mb-[2vw]`}
          ></div>

          {/* Section for assigning to a new list */}
          <h6 className="mb-[1vw]">Assign to new list</h6>

          {/* Input field for entering the name of the new list */}
          <label className="mb-[0.2vw] block">List Name*</label>
          <input
            type="text"
            placeholder="New List"
            className="placeholder:text-[var(--dark)] border-0 border-b-[1px] border-b-[var(--dark)] w-full py-[0.5vw] mb-[1vw] outline-none placeholder:font-semibold"
          />

          {/* Button to save the new list */}
          <div className="w-fit ms-auto">
            <CustomBtn btnColor="black" word="Save" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;
