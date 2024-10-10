"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./ShareCampaign.module.css";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { backIcon, editPenIcon, reGenerateIcon } from "@/app/_utils/svgIcons";
import SuggestionCard from "@/app/_components/SocialMedia/SuggestionCard/SuggestionCard";
import DateAndTimePicker from "@/app/_components/DateAndTimePicker/DateAndTimePicker";
import { socialMediaPostSharingContext } from "../_context/socialMediaPostSharingContext";
import { globalContext } from "@/app/_context/store";
import { useRouter } from "next/navigation";

const sharingListOptions = ["Reddit", "Telegram", "Facebook"];

const ShareCampaign = () => {
  const router = useRouter();
  const { authState, handleSignOut } = useContext(globalContext);
  const { handleGeneratePosts, selectedContent, setSelectedContent } =
    useContext(socialMediaPostSharingContext);
  const [pageState, setPageState] = useState<any>({
    scheduledTime: null,
    postText: "",
    generatedPosts: [],
  });

  function getDateTimeValue(value: any) {
    setPageState((prev: any) => ({ ...prev, scheduledTime: value }));
  }

  useEffect(() => {
    if (pageState.generatedPosts.length === 0) {
      handleGeneratePosts().then((posts) => {
        if (posts) {
          setPageState((prev: any) => ({ ...prev, generatedPosts: posts }));
        }
      });
    }
  }, [pageState.generatedPosts]);

  useEffect(() => {
    if (selectedContent === "") {
      router.replace("/social-media/post-sharing");
    }
  }, [selectedContent]);

  return (
    <div
      className={
        "flex flex-col w-full h-[80vh] py-[1vw] " + styles.add_post_wrapper
      }
    >
      <div>
        <h6 className="flex items-center gap-[0.5vw] !mb-[--sy-20px]">
          <span
            onClick={() => {
              setSelectedContent("");
            }}
          >
            {backIcon}
          </span>
          Pacific Allies ABANDO...
        </h6>
      </div>

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
              value={pageState.postText}
              onChange={(e) =>
                setPageState((prev: any) => ({
                  ...prev,
                  postText: e.target.value,
                }))
              }
            ></textarea>
            <span>{pageState.postText?.length}/500</span>
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
                  onClick={() => {
                    setPageState((prev: any) => ({
                      ...prev,
                      generatedPosts: [],
                    }));
                  }}
                />
              </div>

              <div className="space-y-[--sy-14px] overflow-y-auto max-h-[45vh] pr-[--6px] pb-[--5px]">
                {pageState.generatedPosts &&
                Array.isArray(pageState.generatedPosts) &&
                pageState.generatedPosts.length > 0 ? (
                  pageState.generatedPosts.map(
                    (post: string, index: number) => (
                      <SuggestionCard
                        icon={editPenIcon}
                        key={index}
                        text={post}
                        onClick={() => {
                          setPageState((prev: any) => ({
                            ...prev,
                            postText: post,
                          }));
                        }}
                      />
                    )
                  )
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="custom-loader"></span>
                  </div>
                )}
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
                    <div className="w-[40%] flex items-center gap-[--4px]">
                      <CustomSelectInput
                        options={Array.from(
                          { length: 20 },
                          (_, index) => index + 1
                        )}
                      />
                      <span>min.</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h5 className="text-[--20px] font-medium">
                      Time between batches
                    </h5>
                    <div className="w-[40%] flex items-center gap-[--4px]">
                      <CustomSelectInput
                        options={Array.from(
                          { length: 20 },
                          (_, index) => index + 1
                        )}
                      />
                      <span>min.</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h5 className="text-[--20px] font-medium">
                      Number of batches
                    </h5>
                    <div className="w-[40%]">
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
                <label htmlFor="">Posting Time</label>
                <DateAndTimePicker getDateTimeValue={getDateTimeValue} />
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
