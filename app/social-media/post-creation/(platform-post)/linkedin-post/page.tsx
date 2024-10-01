"use client";
// Import necessary modules and components
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Custom Button component
import styles from "./TwitterPost.module.css"; // CSS module for styling
import { useState } from "react"; // React's useState hook
import profileImg from "@/public/assets/post-profile.svg"; // Profile image
import Image from "next/image"; // Next.js Image component for optimized image loading
import SuggestionCard from "@/app/_components/SocialMedia/SuggestionCard/SuggestionCard";
import { reGenerateIcon, addIcon } from "@/app/_utils/svgIcons";

// Array of suggested Twitter post contents
const SuggetionPosts = [
  "Stocks, the heartbeat of the marketStocks, the heartbeat of the market! ! Whether you are a seasoned investor or just getting started, understanding trends and staying informed is key to navigating this thrilling financial landscape.",
  "Whether you are a seasoned investor or just getting started, understanding trends and staying. Whether you are a seasoned investor or just getting started, understanding trends and staying. Whether you are a seasoned investor or just getting started",
  "Stocks, the heartbeat of the marketStocks, the heartbeat of the market!",
  "Stocks, the heartbeat of the marketStocks, the heartbeat of the market! ! Whether you are a seasoned investor or just getting started, understanding trends and staying informed is key to navigating this thrilling financial landscape.",
  "Whether you are a seasoned investor or just getting started, understanding trends and staying. Whether you are a seasoned investor or just getting started, understanding trends and staying. Whether you are a seasoned investor or just getting started",
  "Stocks, the heartbeat of the marketStocks, the heartbeat of the market!",
  "Stocks, the heartbeat of the marketStocks, the heartbeat of the market! ! Whether you are a seasoned investor or just getting started, understanding trends and staying informed is key to navigating this thrilling financial landscape.",
  "Whether you are a seasoned investor or just getting started, understanding trends and staying. Whether you are a seasoned investor or just getting started, understanding trends and staying. Whether you are a seasoned investor or just getting started",
  "Stocks, the heartbeat of the marketStocks, the heartbeat of the market!",
];

const LinkedInPost = () => {
  // State for managing post text
  const [PostText, setPostText] = useState<string>("");

  // Function to handle adding hashtags to post text
  const handleAddHashTags = (e: any) => {
    setPostText((prev) => prev + " " + e.target.innerText);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Wrapper for adding a Twitter post */}
      <div
        className={
          "flex flex-col w-full h-[75vh] py-[1vw] " + styles.add_post_wrapper
        }
      >
        <h6 className="!font-bold !mb-[--sy-20px]">Twitter Post</h6>

        {/* Grid for arranging content */}
        <div className="grid grid-cols-2 gap-[2vw] w-full h-full">
          {/* 01- Col (1) */}
          <div
            className={styles.post_content + " flex flex-col justify-between"}
          >
            {/* Textarea for writing tweet content */}
            <div className={styles.post_content}>
              <h6>Post Caption</h6>
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

            {/* Section for tweet content suggestions */}
            <div
              className={styles.suggestions + " max-h-[80vh] overflow-hidden"}
            >
              <div className="flex justify-between items-center my-[--sy-16px] overflow-hidden">
                <h4 className="text-[--24px] font-semibold">
                  Caption Suggestions
                </h4>

                <CustomBtn
                  btnColor="black"
                  word="Re-Generate"
                  icon={reGenerateIcon}
                  paddingVal="py-[--10px] px-[--22px]"
                />
              </div>

              {/* Mapping through suggestion posts and displaying them */}
              <div className="flex flex-col gap-[--sy-12px] overflow-y-auto max-h-[40vh] pr-[--6px]">
                {SuggetionPosts.map((ele) => (
                  <SuggestionCard text={ele} />
                ))}
              </div>
            </div>
          </div>

          {/* 02- Col (2) */}
          <div className="h-full">
            <div
              className={styles.post_view_screens + " flex gap-[1vw] h-[70%]"}
            >
              {/* Desktop view */}
              <div className={styles.desctop_screen + " w-2/3 h-full"}>
                <h6>Desktop View</h6>
                <div className={styles.desctop_view}>
                  <div className={styles.avatar}>
                    <Image src={profileImg} alt="avatar" />
                    <div className={styles.avatar_info}>
                      <p>Investocracy</p>
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
                      <p>Investocracy</p>
                      <span>@Investocrasy</span>
                    </div>
                  </div>
                  <p>{PostText}</p>
                </div>
              </div>
            </div>

            {/* ===== Start Hashtags ===== */}
            <div className="flex flex-col gap-[--sy-14px]">
              <div className="flex justify-between items-center">
                <h4 className="text-[--24px] font-semibold">Hashtags</h4>
                <CustomBtn
                  btnColor="black"
                  word="Re-Generate"
                  icon={reGenerateIcon}
                />
              </div>

              {/* Section for adding hashtags */}
              <div className={styles.hashtags}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <CustomBtn
                    btnColor="white"
                    word="#SAVE"
                    icon={addIcon}
                    onClick={(e?: React.MouseEvent<HTMLButtonElement>) =>
                      handleAddHashTags(e)
                    }
                  />
                ))}
              </div>
            </div>
            {/* ===== End Hashtags ===== */}
          </div>
        </div>
      </div>

      {/* Buttons to move to the last or next page */}
      <div className="flex justify-between items-center">
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

export default LinkedInPost;
