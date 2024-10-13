"use client";
import React from "react";
import styles from "./PlatformPost.module.css";

import SuggestionCard from "@/app/_components/SocialMedia/SuggestionCard/SuggestionCard";
import { reGenerateIcon, addIcon } from "@/app/_utils/svgIcons";
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Custom Button component
import { useContext, useState } from "react"; // React's useState hook
import { socialMediaPostCreationContext } from "../../_context/socialMediaPostCreationContext";
import PostViewScreens from "@/app/_components/SocialMedia/PostViewScreens/PostViewScreens";
import toast from "react-hot-toast";

// Array of suggested post contents
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

interface IProps {
  postCaptionLimit: number;
}

export default function PlatformPost({ postCaptionLimit }: IProps) {
  const {
    selectedPlatform,
    postCaption,
    setPostCaption,
    handleGenerateHashtags,
  } = useContext(socialMediaPostCreationContext);
  const [pageState, setPageState] = useState<{
    isGenerateHashtagLoading: boolean;
    generatedHashtags: string[];
  }>({
    isGenerateHashtagLoading: false,
    generatedHashtags: [],
  });

  async function generateHashtags() {
    setPageState((prev) => ({
      ...prev,
      isGenerateHashtagLoading: true,
    }));
    const generatedHashtags = await handleGenerateHashtags();
    if (Array.isArray(generatedHashtags)) {
      setPageState((prev) => ({
        ...prev,
        generatedHashtags: generatedHashtags,
        isGenerateHashtagLoading: false,
      }));
    } else {
      setPageState((prev) => ({
        ...prev,
        isGenerateHashtagLoading: false,
      }));
    }
  }

  // Function to handle adding hashtags to post text
  const handleAddHashTags = (e: React.MouseEvent<HTMLButtonElement>) => {
    const hashtag = (e.target as HTMLButtonElement).innerText;
    if (
      postCaption &&
      postCaption.length + hashtag.length + 1 <= postCaptionLimit
    ) {
      setPostCaption((prev: string) => `${prev} ${hashtag}`);
    } else {
      toast.error("Post character limit reached!");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Wrapper for adding a post */}
      <div
        className={
          "flex flex-col w-full h-[75vh] py-[1vw] " + styles.add_post_wrapper
        }
      >
        <h6 className="!font-bold !mb-[--sy-20px]">
          {selectedPlatform.slice(0, 1) +
            selectedPlatform.toLowerCase().slice(1) +
            " "}
          Post
        </h6>

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
                maxLength={postCaptionLimit}
                rows={2}
                value={postCaption}
                onChange={(e) => setPostCaption(e.target.value)}
              ></textarea>
              <span>
                {postCaption?.length}/{postCaptionLimit}
              </span>
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
            <PostViewScreens />

            {/* ===== Start Hashtags ===== */}
            <div className="flex flex-col gap-[--sy-14px]">
              <div className="flex justify-between items-center">
                <h4 className="text-[--24px] font-semibold">Hashtags</h4>
                <CustomBtn
                  btnColor="black"
                  word="Re-Generate"
                  paddingVal="py-[--10px] px-[--22px]"
                  icon={reGenerateIcon}
                  disabled={pageState.isGenerateHashtagLoading === true}
                  onClick={generateHashtags}
                />
              </div>

              {/* Section for adding hashtags */}
              <div className={styles.hashtags}>
                {Array.isArray(pageState.generatedHashtags) &&
                pageState.generatedHashtags.length ? (
                  pageState.generatedHashtags.map((ele) => (
                    <CustomBtn
                      btnColor="white"
                      word={ele}
                      icon={addIcon}
                      onClick={(e: any) => handleAddHashTags(e)}
                    />
                  ))
                ) : pageState.isGenerateHashtagLoading ? (
                  <p className="text-[--16px]">Loading...</p>
                ) : (
                  <p className="text-[--16px]">No hashtags generated!</p>
                )}
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
          href="/social-media/post-creation/select-brand"
        />
        <CustomBtn
          word="Next"
          btnColor="black"
          href={`/social-media/post-creation/${selectedPlatform.toLowerCase()}-post/publish-post`}
        />
      </div>
    </div>
  );
}
