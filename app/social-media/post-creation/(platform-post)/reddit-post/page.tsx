"use client";
// Import necessary modules and components
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Custom Button component
import styles from "./RedditPost.module.css"; // CSS module for styling
import { useState } from "react"; // React's useState hook
import profileImg from "@/public/assets/post-profile.svg"; // Profile image
import Image from "next/image"; // Next.js Image component for optimized image loading
import SuggestionCard from "@/app/_components/SocialMedia/SuggestionCard/SuggestionCard";
import { reGenerateIcon, addIcon } from "@/app/_utils/svgIcons";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

const RedditPost = () => {
  const [pageState, setPageState] = useState({
    activeTab: 2,
  });

  // State for managing post text
  const [PostText, setPostText] = useState<string>("");

  return (
    <div className="flex flex-col h-full">
      {/* Wrapper for adding post */}
      <div
        className={
          "flex flex-col w-full h-[75vh] py-[1vw] " + styles.add_post_wrapper
        }
      >
        <h6 className="!font-bold !m-0">Reddit Post</h6>

        {/* Grid for arranging content */}
        <div className="grid grid-cols-2 gap-[2vw] w-full h-full">
          {/* 01- Col (1) */}
          <div className={styles.post_content + " flex flex-col"}>
            {/* Tabs */}
            <div role="tablist" className={`${styles.tabs} flex`}>
              <a
                role="tab"
                className={`${styles.tab} ${
                  pageState.activeTab === 1 ? styles.activeTab : ""
                }`}
                onClick={() =>
                  setPageState((prev) => ({ ...prev, activeTab: 1 }))
                }
              >
                Text
              </a>
              <a
                role="tab"
                className={`${styles.tab} ${
                  pageState.activeTab === 2 ? styles.activeTab : ""
                }`}
                onClick={() =>
                  setPageState((prev) => ({ ...prev, activeTab: 2 }))
                }
              >
                Image & Video
              </a>
              <a
                role="tab"
                className={`${styles.tab} ${
                  pageState.activeTab === 3 ? styles.activeTab : ""
                }`}
                onClick={() =>
                  setPageState((prev) => ({ ...prev, activeTab: 3 }))
                }
              >
                Link
              </a>
            </div>

            {/* 01.1- Textarea for writing content */}
            <div>
              <div className={styles.post_content}>
                <h6>Post Title</h6>
                <textarea
                  name=""
                  id=""
                  maxLength={300}
                  rows={2}
                  value={PostText}
                  onChange={(e) => setPostText(e.target.value)}
                ></textarea>
                <span>{PostText?.length}/300</span>
              </div>
              {pageState.activeTab !== 2 && (
                <div className={styles.post_content}>
                  <h6>{pageState.activeTab === 1 ? "Post" : "Link"}</h6>
                  <textarea
                    name=""
                    id=""
                    maxLength={280}
                    rows={2}
                    value={PostText}
                    onChange={(e) => setPostText(e.target.value)}
                  ></textarea>
                  <span>{PostText?.length}/280</span>
                </div>
              )}
            </div>

            {/* ===== Schedule ===== */}

            <div
              className={`!transition-none flex flex-col gap-[--sy-10px] ${
                pageState.activeTab === 2 ? "mt-[--sy-50px]" : ""
              }`}
            >
              <div className="flex justify-between items-center mt-[--sy-20px]">
                <h4 className="text-[--24px] font-semibold">Schedule</h4>

                <CustomBtn btnColor="black" word="Schedule" />
              </div>
              <div className="space-y-[--sy-10px]">
                <div className="w-1/2">
                  <h4 className="text-[--20px] font-semibold mb-[--sy-10px]">
                    Account
                  </h4>
                  <CustomSelectInput
                    label={"Account"}
                    hoverColor="hover:bg-[#E1C655]"
                    options={[]}
                  />
                </div>
                <div className="w-1/2">
                  <h4 className="text-[--20px] font-semibold mb-[--sy-10px]">
                    Sub Reddit
                  </h4>
                  <CustomSelectInput
                    label={"Sub Reddit"}
                    hoverColor="hover:bg-[#E1C655]"
                    options={[]}
                  />
                </div>
                <div className="w-1/2">
                  <h4 className="text-[--20px] font-semibold mb-[--sy-10px]">
                    Upload Time
                  </h4>
                  <CustomSelectInput
                    label={"Upload Time"}
                    hoverColor="hover:bg-[#E1C655]"
                    options={[]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 02- Col (2) */}
          <div className="h-full">
            {pageState.activeTab !== 2 && (
              <div className="flex flex-col gap-[--sy-20px]">
                <div className="flex justify-between items-center mt-[--sy-20px]">
                  <h4 className="text-[--24px] font-semibold">
                    Post Suggestions
                  </h4>

                  <CustomBtn
                    btnColor="black"
                    word="Re-Generate"
                    icon={reGenerateIcon}
                    paddingVal="py-[--10px] px-[--22px]"
                  />
                </div>
                <div className="space-y-[--sy-14px]">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <SuggestionCard
                      key={index}
                      title="Stocks, the heartbeat of the market!"
                      text={`Stocks, the heartbeat of the market! Whether you're a seasoned investor or just getting started, understanding trends and staying informed is key to navigating this thrilling financial landscape. `}
                    />
                  ))}
                </div>
              </div>
            )}

            {pageState.activeTab === 2 && (
              <>
                <div className="flex flex-col gap-[--sy-10px]">
                  <div className="flex justify-between items-center mt-[--sy-20px]">
                    <h4 className="text-[--24px] font-semibold">
                      Image Selection
                    </h4>

                    <CustomBtn
                      btnColor="black"
                      word="Re-Generate"
                      icon={reGenerateIcon}
                      paddingVal="py-[--10px] px-[--22px]"
                    />
                  </div>
                </div>

                <div
                  className={
                    styles.post_view_screens + " flex gap-[1vw] h-[70%]"
                  }
                >
                  {/* Desktop view */}
                  <div className={styles.desctop_screen + " w-2/3 h-full"}>
                    <h6>Desktop View</h6>
                    <div className={styles.desctop_view}>
                      <div className={styles.avatar}>
                        <Image src={profileImg} alt="avatar" />
                        <div className={styles.avatar_info}>
                          <p>
                            Investocracy
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              ...
                            </svg>
                          </p>
                          <span>@Investocrasy</span>
                        </div>
                      </div>
                      <p>{PostText}</p>
                    </div>
                  </div>

                  {/* Mobile view */}
                  <div className={styles.mobile_screen + " w-1/3"}>
                    <h6>Mobile View</h6>
                    <div className={styles.mobile_view}>
                      <div className={styles.avatar}>
                        <Image src={profileImg} alt="avatar" />
                        <div className={styles.avatar_info}>
                          <p>
                            Investocracy
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              ...
                            </svg>
                          </p>
                          <span>@Investocrasy</span>
                        </div>
                      </div>
                      <p>{PostText}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Buttons to move to the last or next page */}
      <div className="flex justify-between items-center mt-[--sy-30px]">
        <CustomBtn
          word="Back"
          btnColor="white"
          href="/social-media/post/twitter"
        />
        <CustomBtn
          word="Next"
          btnColor="black"
          href="/social-media/post/schadule-post"
        />
      </div>
    </div>
  );
};

export default RedditPost;
