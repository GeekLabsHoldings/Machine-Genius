"use client";
import { useContext, useState } from "react"; // React's useState hook
import { socialMediaPostCreationContext } from "@/app/social-media/post-creation/_context/socialMediaPostCreationContext";
import { globalContext } from "@/app/_context/store";
// import postImage from "@/public/assets/post-img.svg"; // Post image
// import ImageOption from "@/app/_components/SocialMedia/ImageOption/ImageOption";
import toast from "react-hot-toast";
import PublishPost from "../../_platform-post/PublishPost";

interface IPublishPostResponse {
  result?: {
    platform: string;
    brand: string;
    content: string;
    postId: string;
    employeeId: string;
    _id: string;
    __v: number;
  };
  linkedinPost?: {
    id: string;
  };
  message?: string;
}

interface LinkedInDataResponse {
  success: boolean;
  message: string;
  data: {
    asset: string;
    uploadUrl: string;
    linkedIn_Access_Token: string;
  };
}

const LinkedInPublishPost = () => {
  const { authState, handleSignOut, selectedBrandId } =
    useContext(globalContext);
  const { postCaption } = useContext(socialMediaPostCreationContext);
  const [pageState, setPageState] = useState<{
    asset: string | null;
    uploadedAsset: string | null | File;
  }>({
    asset: null,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/linkedin/add-post/${selectedBrandId}`,
        {
          method: "POST",
          body: JSON.stringify({
            content: postCaption,
            ...(pageState.asset !== null && { asset: pageState.asset }),
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
      if (json && json.message && json.message.includes("duplicate")) {
        toast.error("Post is a duplicate!");
      } else if (json && json.result && json.linkedinPost) {
        toast.success("Post is published!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleAddPost:", error);
    }
  }

  // ===== 01. get LinkedIn Data =====
  async function getLinkedInData() {
    if (!selectedBrandId) {
      toast.error("No brand selected!");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/linkedin/get/${selectedBrandId}`,
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
      const json: LinkedInDataResponse = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else if (json && json.success === true) {
        setPageState((prev) => ({ ...prev, asset: json.data.asset }));
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
    const LinkedInData: LinkedInDataResponse | undefined =
      await getLinkedInData();

    if (!LinkedInData) {
      toast.error("Failed to get LinkedIn data!");
      return;
    }

    setPageState((prev) => ({ ...prev, uploadedAsset: null }));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "image/jpeg");
    myHeaders.append("media-type-family", "STILLIMAGE");
    myHeaders.append(
      "Authorization",
      `Bearer ${LinkedInData.data.linkedIn_Access_Token}`
    );

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: file,
      redirect: "follow" as RequestRedirect,
    };

    try {
      const response = await fetch(LinkedInData.data.uploadUrl, requestOptions);

      if (response.ok) {
        console.log("Upload successful");
        setPageState((prev) => ({ ...prev, uploadedAsset: file }));
      } else {
        setPageState((prev) => ({ ...prev, uploadedAsset: null }));
        toast.error(`Upload failed with status: ${response.status}`);
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
      console.error("Error in uploadImage:", error);
    }
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
      pageState={pageState}
      handleAddPost={handleAddPost}
    />
  );
};

export default LinkedInPublishPost;
