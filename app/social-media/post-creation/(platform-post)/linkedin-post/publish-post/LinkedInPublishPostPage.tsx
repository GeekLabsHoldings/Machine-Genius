"use client";
import { useContext, useState } from "react"; // React's useState hook
import { socialMediaPostCreationContext } from "@/app/social-media/post-creation/_context/socialMediaPostCreationContext";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";
import PublishPost from "../../_platform-post/PublishPost";
import convertFileToBase64 from "@/app/_utils/convertFileToBase64";

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
    LinkedIn_Token: string;
  };
}

const LinkedInPublishPostPage = () => {
  const { authState, handleSignOut, selectedBrandId } =
    useContext(globalContext);
  const { postCaption } = useContext(socialMediaPostCreationContext);
  const [pageState, setPageState] = useState<{
    assetId: string | null;
    uploadedAsset: string | null | File;
  }>({
    assetId: null,
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
            ...(pageState.assetId !== null && { asset: pageState.assetId }),
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
        setPageState((prev) => ({ ...prev, assetId: json.data.asset }));
        return json;
      } else {
        toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getLinkedInData:", error);
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

    // Convert the file to a base64 string
    const base64File = await convertFileToBase64(file);

    try {
      const response = await fetch(
        "/api/social-media/linkedin/uploadLinkedInImage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uploadUrl: LinkedInData.data.uploadUrl,
            token: LinkedInData.data.LinkedIn_Token,
            file: base64File.split(",")[1], // Remove the data URL prefix if present
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("Upload successful");
        setPageState((prev) => ({ ...prev, uploadedAsset: base64File }));
        toast.success("Image uploaded successfully!");
      } else {
        setPageState((prev) => ({ ...prev, uploadedAsset: null }));
        toast.error(`Upload failed: ${result.message || "Unknown error"}`);
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

export default LinkedInPublishPostPage;
