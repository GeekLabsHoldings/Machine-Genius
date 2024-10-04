"use client";
import { useContext, useState } from "react"; // React's useState hook
import { socialMediaPostCreationContext } from "@/app/social-media/post-creation/_context/socialMediaPostCreationContext";
import { globalContext } from "@/app/_context/store";
// import postImage from "@/public/assets/post-img.svg"; // Post image
// import ImageOption from "@/app/_components/SocialMedia/ImageOption/ImageOption";
import toast from "react-hot-toast";
import PublishPost from "../../_platform-post/PublishPost";

// Interface for the successful response
interface IPublishPostResponseSuccess {
  response: {
    tweet: {
      data: {
        edit_history_tweet_ids: string[];
        text: string;
        id: string;
      };
    };
    success: number;
    message: string;
  };
  result: {
    platform: string;
    brandId: string;
    content: string;
    postId: string;
    employeeId: string;
    _id: string;
    __v: number;
  };
}

// Interface for the error response
interface IPublishPostResponseError {
  status: number;
  message: string;
  data: Record<string, unknown>; // You can specify a more precise type if known
}

// Union type representing either a success or error response
type IPublishPostResponse =
  | IPublishPostResponseSuccess
  | IPublishPostResponseError;

interface TwitterDataResponse {
  platform: "TWITTER";
  account: {
    ConsumerKey: string;
    ConsumerSecret: string;
    AccessToken: string;
    TokenSecret: string;
    BearerToken: string;
  };
}

const TwitterPublishPostPage = () => {
  const { authState, handleSignOut, selectedBrandId } =
    useContext(globalContext);
  const { postCaption, selectedPlatform } = useContext(
    socialMediaPostCreationContext
  );
  const [pageState, setPageState] = useState<{
    mediaId: string | null;
    uploadedAsset: string | null | File;
    twitterData: TwitterDataResponse | null;
  }>({
    mediaId: null,
    uploadedAsset: null,
    twitterData: null,
  });

  async function handleAddPost() {
    if (!postCaption) {
      toast.error("No post caption provided!");
      return;
    } else if (!selectedBrandId) {
      toast.error("No brand selected!");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/twitter/add-post/${selectedBrandId}`,
        {
          method: "POST",
          body: JSON.stringify({
            content: postCaption,
            ...(pageState.mediaId !== null && { mediaId: pageState.mediaId }),
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
      const json: IPublishPostResponse = await res.json();

      if ("message" in json && json.message.includes("duplicate")) {
        toast.error("Post is a duplicate!");
      } else if ("response" in json && "result" in json) {
        toast.success("Post is published!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleAddPost:", error);
    }
  }

  // ===== 01. get Twitter Data =====
  async function getTwitterData() {
    if (!selectedBrandId) {
      toast.error("No brand selected!");
      return;
    } else if (selectedPlatform !== "TWITTER") {
      toast.error("No platform selected!");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/${selectedBrandId}/get-account?platform=TWITTER`,
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
      const json: TwitterDataResponse = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else if (json && json.platform && json.account) {
        // setPageState((prev) => ({ ...prev, twitterData: json.account }));
        return json;
      } else {
        toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getPresignedURL:", error);
    }
  }

  // ===== 02. upload Image =====
  async function uploadImage(file: File) {
    //   const twitterData: TwitterDataResponse | undefined = await getTwitterData();
    //   if (!twitterData) {
    //     toast.error("Failed to get Twitter data!");
    //     return;
    //   }
    //   setPageState((prev) => ({ ...prev, uploadedAsset: null }));
    //   try {
    //     const formdata = new FormData();
    //     formdata.append("media", file, "[PROXY]");
    //     const requestOptions = {
    //       method: "POST",
    //       body: formdata,
    //       redirect: "follow",
    //     };
    //     fetch(
    //       "https://upload.twitter.com/1.1/media/upload.json?oauth_consumer_key=NxfNy5CBLLiQ4ZD26SvGcMEXe&oauth_token=1833043345876144128-kC6nw8jUtbF0q0VJEWO561YLLyNaZl&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1727964640&oauth_nonce=OUT1Icra4tJ&oauth_version=1.0&oauth_signature=QSLEb9PxkgtxDW5UJhxhrZ%2Fdj34%3D",
    //       requestOptions
    //     );
    //     if (response.ok) {
    //       console.log("Upload successful");
    //       setPageState((prev) => ({ ...prev, uploadedAsset: file }));
    //     } else {
    //       setPageState((prev) => ({ ...prev, uploadedAsset: null }));
    //       toast.error(`Upload failed with status: ${response.status}`);
    //     }
    //   } catch (error: any) {
    //     toast.error("Something went wrong!");
    //     console.error("Error in uploadImage:", error);
    //   }
  }

  // ===== 00. handleFileChange =====
  async function handleUploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files[0]) {
      uploadImage(files[0]);
    }
  }

  return (
    <PublishPost
      handleUploadImage={handleUploadImage}
      uploadedAsset={pageState.uploadedAsset}
      handleAddPost={handleAddPost}
    />
  );
};

export default TwitterPublishPostPage;
