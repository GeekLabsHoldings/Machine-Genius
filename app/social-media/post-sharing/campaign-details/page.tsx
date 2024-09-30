"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./ShareCampaign.module.css";
import { useState } from "react";
import Link from "next/link";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { backIcon, editPenIcon, reGenerateIcon } from "@/app/_utils/svgIcons";
import SuggestionCard from "@/app/_components/SocialMedia/SuggestionCard/SuggestionCard";

const sharingListOptions = [
  "Subreddit | Mega Projects",
  "Subreddit | Mega Projects",
  "Subreddit | Mega Projects",
  "Subreddit | Mega Projects",
];

const TimeRange = ["1 min", "5 min", "10 min", "15 min", "20 min"];

const ShareCampaign = () => {
  const [PostText, setPostText] = useState<string>("");

  return (
    <div
      className={
        "flex flex-col w-full h-[80vh] py-[1vw] " + styles.add_post_wrapper
      }
    >
      <Link href={"/social-media/post-sharing"}>
        <h6 className="flex items-center gap-[0.5vw] !mb-[--sy-20px]">
          {backIcon}
          Pacific Allies ABANDO...
        </h6>
      </Link>

      <div className="grid grid-cols-2 gap-[5vw] w-full h-full">
        {/* Col (1) */}
        <div className={styles.post_content + " flex flex-col"}>
          <div className={styles.post_content}>
            <h6>Post</h6>
            <textarea
              name=""
              id=""
              maxLength={500}
              rows={2}
              value={PostText}
              onChange={(e) => setPostText(e.target.value)}
            ></textarea>
            <span>{PostText?.length}/500</span>
          </div>

          <div
            className={
              styles.suggestions +
              " flex flex-col justify-between mt-[--sy-40px]"
            }
          >
            <div className="flex flex-col space-y-[0.7vw]">
              <div className="flex justify-between items-cente">
                <h6>Caption Suggestions</h6>
                <CustomBtn
                  btnColor="black"
                  word="Re-Generate"
                  icon={reGenerateIcon}
                  paddingVal="py-[--10px] px-[--22px]"
                />
              </div>

              <div className="space-y-[--sy-14px] overflow-y-auto max-h-[45vh] pr-[--6px] pb-[--5px]">
                {Array.from({ length: 8 }).map((_, index) => (
                  <SuggestionCard
                    icon={editPenIcon}
                    key={index}
                    text={`Stocks, the heartbeat of the market! Whether you're a seasoned investor or just getting started, understanding trends and staying informed is key to navigating this thrilling financial landscape. `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Col (2) */}
        <div className={"h-full flex flex-col justify-between"}>
          {/* 01- Campaign Details */}
          <div>
            <h6>Campaign Details</h6>
            <div
              className={
                styles.campaignDetails +
                " border border-[#BCBCBC] rounded-[--10px] p-[--20px] flex flex-col gap-[--sy-20px]"
              }
            >
              {/* Sharing List */}
              <div>
                <label htmlFor="">Sharing List</label>
                <CustomSelectInput options={sharingListOptions} />
              </div>

              {/* Settings */}
              <div>
                <h4 className="text-[--20px] font-bold mb-[--sy-10px]">
                  Settings
                </h4>

                <div className="flex flex-col justify-between gap-[--sy-15px]">
                  <div className="flex items-center justify-between">
                    <h5 className="text-[--20px] font-medium">
                      Time between posts
                    </h5>
                    <div className="w-[20%]">
                      <CustomSelectInput options={TimeRange} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h5 className="text-[--20px] font-medium">
                      Time between batches
                    </h5>
                    <div className="w-[20%]">
                      <CustomSelectInput options={TimeRange} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h5 className="text-[--20px] font-medium">
                      Number of batches
                    </h5>
                    <div className="w-[20%]">
                      <CustomSelectInput
                        options={Array.from(
                          { length: 20 },
                          (_, index) => index + 1
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 02- Schedule Campaign */}
          <div>
            <h6>Schedule Campaign</h6>
            <div
              className={
                styles.campaignDetails +
                " border border-[#BCBCBC] rounded-[--10px] p-[--20px] flex flex-col gap-[--sy-20px]"
              }
            >
              {/* Sharing List */}
              <div>
                <label htmlFor="">Sharing List</label>
                <CustomSelectInput options={sharingListOptions} />
              </div>
            </div>
          </div>

          {/* 03- Buttons */}
          <div className="flex justify-end gap-[--20px]">
            <CustomBtn
              word="Schadule"
              btnColor="black"
              paddingVal="py-[--10px] px-[--22px]"
            />
            <CustomBtn
              btnColor="black"
              word="Publish Now"
              paddingVal="py-[--10px] px-[--22px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCampaign;
