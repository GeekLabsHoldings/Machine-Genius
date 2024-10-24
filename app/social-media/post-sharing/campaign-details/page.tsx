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
import toast from "react-hot-toast";

const sharingListOptions = ["Reddit", "Telegram", "Facebook"];

const ShareCampaign = () => {
  const router = useRouter();
  const { authState, handleSignOut, brandMap } = useContext(globalContext);
  const { handleGeneratePosts, selectedContent, setSelectedContent } =
    useContext(socialMediaPostSharingContext);
  const [pageState, setPageState] = useState<any>({
    scheduledTime: null,
    postText: "",
    generatedPosts: [],
    sharingList: "",
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
    if (selectedContent === null) {
      router.replace("/social-media/post-sharing");
    }
  }, [selectedContent]);

  async function handleAddFacebookPost() {
    if (!pageState.postText) {
      toast.error("No post caption provided!");
      return;
    } else if (!selectedContent.brand) {
      toast.error("No brand selected!");
      return;
    }
    try {
      const res = await fetch(
        `https://facebook-api.machinegenius.io/api/v1/groups/create-post`,
        {
          method: "POST",
          body: JSON.stringify({
            brandId: brandMap[selectedContent.brand],
            postContent: pageState.postText,
            // "scheduleDate": "1728562848870"
            // delayTimePerJobOrPost: 5,
            // delayTimeBetweenBatches: 2,
            // numberOfBatchesJobs: 1,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json = await res.json();
      if (json && json.message) {
        toast(json.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleAddFacebookPost:", error);
    }
  }

  async function handleAddTelegramPost() {
    if (!pageState.postText) {
      toast.error("No post caption provided!");
      return;
    } else if (!selectedContent.brand) {
      toast.error("No brand selected!");
      return;
    }
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/social-media/telegram/campaign-brand/${
          brandMap[selectedContent.brand]
        }`,
        {
          method: "POST",
          body: JSON.stringify({
            message: pageState.postText,
            // ...(pageState.scheduledTime !== null && {
            //   starttime: pageState.scheduledTime,
            // }),
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json = await res.json();
      if (json && json.chatIds) {
        toast.success("Message is sent!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleAddTelegramPost:", error);
    }
  }

  async function handlePublishCampaign() {
    if (pageState.sharingList === "") {
      toast.error("Please select a sharing list!");
      return;
    } else if (pageState.sharingList === "Facebook") {
      await handleAddFacebookPost();
    } else if (pageState.sharingList === "Telegram") {
      await handleAddTelegramPost();
    } else if (pageState.sharingList === "Reddit") {
      toast.error("Reddit account is not available!");
    }
  }

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
              setSelectedContent(null);
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
                <CustomSelectInput
                  label="Select Sharing List"
                  options={sharingListOptions}
                  getValue={(value: string) => {
                    setPageState((prev: any) => ({
                      ...prev,
                      sharingList: value,
                    }));
                  }}
                />
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
                        label="0"
                        options={Array.from(
                          { length: 61 },
                          (_, index) => index
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
                        label="0"
                        options={Array.from(
                          { length: 61 },
                          (_, index) => index
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
                        label="0"
                        options={Array.from(
                          { length: 21 },
                          (_, index) => index
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
            {/* <CustomBtn
              word="Schadule"
              btnColor="black"
              paddingVal="py-[--10px] px-[--22px]"
            /> */}
            <CustomBtn
              btnColor="black"
              word="Publish"
              paddingVal="py-[--10px] px-[--22px]"
              onClick={handlePublishCampaign}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCampaign;
