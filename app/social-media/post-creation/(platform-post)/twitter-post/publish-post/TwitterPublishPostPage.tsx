"use client";
import { useContext, useState } from "react"; // React's useState hook
import { socialMediaPostCreationContext } from "@/app/social-media/post-creation/_context/socialMediaPostCreationContext";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";
import PublishPost from "../../_platform-post/PublishPost";
import convertFileToBase64 from "@/app/_utils/convertFileToBase64";

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

interface UploadTwitterImageResponse {
  media_id: number;
  media_id_string: string;
  size: number;
  expires_after_secs: number;
  image: {
    image_type: string;
    w: number;
    h: number;
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
  }>({
    mediaId: null,
    uploadedAsset: null,
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
      const json: any = await res.json();
      if (json && json.message) {
        toast(json.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleAddPost:", error);
    }
  }

  // ===== 00. handleFileChange =====
  async function handleUploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      // Validate file type on client-side before uploading
      if (!file.type.includes("image")) {
        toast.error("Unsupported file type. Please upload image.");
        return;
      }
      await uploadImage(file);
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/brand/${selectedBrandId}/get-account?platform=TWITTER`,
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
        return json;
      } else {
        toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getTwitterData:", error);
    }
  }

  // ===== 02. upload Image =====
  async function uploadImage(file: File) {
    const twitterData: TwitterDataResponse | undefined = await getTwitterData();
    if (!twitterData) {
      toast.error("Failed to get Twitter data!");
      return;
    }

    setPageState((prev) => ({ ...prev, uploadedAsset: null }));

    try {
      const formData = new FormData();
      formData.append("image", file);
      // Convert twitterData object to a JSON string
      formData.append("twitterData", JSON.stringify(twitterData));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/twitter/upload-image`,
        {
          method: "POST",
          headers: {
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Upload failed: ${errorData.error || response.statusText}`);
        return;
      }

      const data: UploadTwitterImageResponse = await response.json();

      if (data && data.media_id_string) {
        console.log("Upload successful:", data);

        // Convert the file to a base64 string
        const base64File = await convertFileToBase64(file);
        setPageState((prev) => ({
          ...prev,
          uploadedAsset: base64File,
          mediaId: data.media_id_string,
        }));
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
      console.error("Error in uploadImage:", error);
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
