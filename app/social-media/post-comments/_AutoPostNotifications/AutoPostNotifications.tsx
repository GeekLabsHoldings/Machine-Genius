import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import styles from "./AutoPostNotifications.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import RecentNotificationCard from "./RecentNotificationCard";
import SuggestionCard from "@/app/_components/SocialMedia/SuggestionCard/SuggestionCard";
import { editPenIcon, reGenerateIcon } from "@/app/_utils/svgIcons";
import { useContext, useState, useEffect } from "react";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

interface ITweet {
  _id: string;
  platform: string;
  brand: string;
  accountName: string;
  comment: string;
  content: string;
  post_id: string;
  campaignType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IGetTweetsMustApprove {
  result: ITweet[];
}

interface IHandleAddReplyToTweetErrorResponse {
  status: number;
  message: string;
  data: Record<string, never>;
}

interface IHandleAddReplyToTweetSuccessResponse {
  result: {
    message: string;
    data: {
      data: {
        edit_history_tweet_ids: string[];
        id: string;
        text: string;
      };
    };
  };
}

type IHandleAddReplyToTweet =
  | IHandleAddReplyToTweetErrorResponse
  | IHandleAddReplyToTweetSuccessResponse;

const AutoPostNotifications = ({
  brandsOptions,
}: {
  brandsOptions: string[];
}) => {
  const { authState, handleSignOut, brandMap } = useContext(globalContext);
  const [pageState, setPageState] = useState<{
    // tweetsMustApprove: ITweet[] | null;
    selectedTweet: ITweet | null;
    commentsSuggestions: string | null;
    postText: string;
    selectedBrandId: string;
  }>({
    // tweetsMustApprove: null,
    selectedTweet: null,
    commentsSuggestions: null,
    postText: "",
    selectedBrandId: "",
  });

  async function getTweetsMustApprove() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/twitter/get-tweets-mustApprove`,
        {
          headers: {
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
      const json: IGetTweetsMustApprove = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else if (
        json &&
        json.result &&
        Array.isArray(json.result) &&
        json.result.length > 0
      ) {
        // setPageState((prev: any) => ({
        //   ...prev,
        //   tweetsMustApprove: json.result,
        // }));
        return json.result;
      } else {
        // toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getTweetsMustApprove:", error);
    }
  }

  const {
    data: tweetsMustApprove,
    isLoading: tweetsMustApproveLoading,
    isRefetching: tweetsMustApproveRefetching,
  } = useQuery({
    queryKey: ["tweetsMustApprove"],
    queryFn: getTweetsMustApprove,
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  async function handleGenerateCommentsSuggestions() {
    setPageState((prev) => ({
      ...prev,
      commentsSuggestions: null,
    }));
    if (!pageState.selectedTweet?.content) {
      toast.error("No content provided!");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/twitter/generate-new-reply`,
        {
          method: "POST",
          body: JSON.stringify({
            platform: "TWITTER",
            content: pageState.selectedTweet?.content,
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
      if (
        json &&
        json.NewComment
        //  &&
        // Array.isArray(json.posts) &&
        // json.posts.length > 0
      ) {
        setPageState((prev) => ({
          ...prev,
          commentsSuggestions: json.NewComment,
        }));
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleGenerateCommentsSuggestions:", error);
    }
  }

  useEffect(() => {
    if (pageState.selectedTweet && pageState.selectedTweet.comment) {
      setPageState((prev: any) => ({
        ...prev,
        commentsSuggestions: pageState.selectedTweet?.comment,
      }));
    }
  }, [pageState.selectedTweet]);

  async function handleAddReplyToTweet() {
    if (!pageState.postText) {
      toast.error("No post caption provided!");
      return;
    } else if (!pageState.selectedBrandId) {
      toast.error("No brand selected!");
      return;
    } else if (!pageState.selectedTweet) {
      toast.error("No tweet selected!");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/twitter/add-reply-to-tweet/${pageState.selectedTweet?._id}/${pageState.selectedBrandId}`,
        {
          method: "POST",
          body: JSON.stringify({
            reply: pageState.postText,
            tweetId: pageState.selectedTweet?.post_id,
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
      const json: IHandleAddReplyToTweet = await res.json();

      if ("status" in json && json.status === 400) {
        toast.error(
          json.message === "ACCOUNT_NOT_FOUND"
            ? "Account not found!"
            : "Something went wrong!"
        );
        console.error("Error:", json?.message);
      } else if ("message" in json) {
        toast.error(json.message);
        console.error("Error:", json?.message);
      } else if (
        json &&
        "result" in json &&
        json.result.message === "Reply posted successfully"
      ) {
        toast.success("Reply posted successfully");
      } else {
        // toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleAddReplyToTweet:", error);
    } finally {
      // reset the form
      setPageState((prev) => ({
        ...prev,
        postText: "",
        commentsSuggestions: null,
        selectedTweet: null,
      }));
      // getTweetsMustApprove();
    }
  }

  return (
    <div className="grid grid-cols-2 gap-[2vw] h-full">
      {/* ===== Col (1) ===== */}
      <div className="flex flex-col h-full">
        <h6 className="text-[--24px] font-bold mb-[--sy-17px]">
          Recent Notifications
        </h6>

        <div className={styles.recent_notification}>
          <div className={"h-[65vh] space-y-[1vw] overflow-y-auto pr-[--8px]"}>
            {tweetsMustApproveRefetching || tweetsMustApproveLoading ? (
              <div className="flex justify-center items-center h-full">
                <span className="custom-loader"></span>
              </div>
            ) : tweetsMustApprove &&
              Array.isArray(tweetsMustApprove) &&
              tweetsMustApprove.length > 0 ? (
              tweetsMustApprove.map((ele) => (
                <RecentNotificationCard
                  key={ele._id}
                  name={ele.accountName}
                  username={ele.accountName}
                  text={ele.content}
                  isActive={pageState.selectedTweet?._id === ele._id}
                  onClick={() =>
                    setPageState((prev) => ({
                      ...prev,
                      selectedTweet: ele,
                    }))
                  }
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <span>No notifications found!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== Col (2) ===== */}
      <div className="flex flex-col justify-start h-full">
        <div className={styles.post_content + " mb-[--sy-30px]"}>
          <h6 className="text-[--24px] font-semibold">Comment</h6>
          <textarea
            name=""
            id=""
            maxLength={500}
            rows={2}
            value={pageState.postText}
            onChange={(e) =>
              setPageState((prev) => ({
                ...prev,
                postText: e.target.value,
              }))
            }
          ></textarea>
          <span>
            {pageState.postText?.length}
            0/500
          </span>
        </div>

        <div className={"space-y-[0.7vw] mb-[--sy-20px]"}>
          <div className="flex justify-between items-center">
            <h6 className="text-[--24px] font-semibold">
              Comments Suggestions
            </h6>
            <CustomBtn
              btnColor="black"
              word="Re-Generate"
              icon={reGenerateIcon}
              paddingVal="py-[--10px] px-[--22px]"
              onClick={handleGenerateCommentsSuggestions}
            />
          </div>

          <div className="flex flex-col gap-[--sy-12px] overflow-y-auto min-h-[20vh] max-h-[40vh] pr-[--6px]">
            {/* {SuggetionPosts.map((ele) => (              
            ))} */}
            {pageState.selectedTweet === null ? (
              <span> Please select a tweet!</span>
            ) : pageState.commentsSuggestions !== null ? (
              <SuggestionCard
                text={pageState.commentsSuggestions || ""}
                icon={editPenIcon}
                onClick={() => {
                  setPageState((prev: any) => ({
                    ...prev,
                    postText: pageState.commentsSuggestions || "",
                  }));
                }}
              />
            ) : (
              <span className="custom-loader"></span>
            )}
          </div>
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="w-1/2">
            {Array.isArray(brandsOptions) && brandsOptions.length > 0 ? (
              <CustomSelectInput
                label={"Select Brand"}
                options={brandsOptions || []}
                getValue={(value: string) => {
                  setPageState((prev) => ({
                    ...prev,
                    selectedBrandId: brandMap[value],
                  }));
                }}
              />
            ) : (
              <span className="custom-loader"></span>
            )}
          </div>

          <CustomBtn
            btnColor="black"
            word="Post"
            onClick={handleAddReplyToTweet}
          />
        </div>
      </div>
    </div>
  );
};

export default AutoPostNotifications;
