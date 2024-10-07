"use client";
import { useContext, useState } from "react"; // React's useState hook
import { socialMediaPostCreationContext } from "@/app/social-media/post-creation/_context/socialMediaPostCreationContext";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";
import PublishPost from "../../_platform-post/PublishPost";

interface IPublishPostResponse {
  result: {
    platform: "FACEBOOK";
    brandId: string;
    content: string;
    postId: string;
    employeeId: string;
    _id: string;
    __v: number;
  };
  facebookPost: {
    id: string;
    post_id?: string;
  };
}

interface IUploadImagePresignedURLData {
  message: string;
  preSignedURL: string;
  movieUrl: string;
  s3BucketURL: string;
}

const FacebookPublishPostPage = () => {
  const { authState, handleSignOut, selectedBrandId } =
    useContext(globalContext);
  const { postCaption } = useContext(socialMediaPostCreationContext);
  const [pageState, setPageState] = useState<{
    presignedURLData: IUploadImagePresignedURLData | null;
    uploadedAsset: string | null;
  }>({
    presignedURLData: null,
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
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/social-media/facebook/add-post/${
          pageState.uploadedAsset !== null ? "photos" : "text"
        }/${selectedBrandId}`,
        {
          method: "POST",
          body: JSON.stringify({
            content: postCaption,
            ...(pageState.uploadedAsset !== null && {
              url: pageState.uploadedAsset,
            }),
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
      if (json && json.result && json.facebookPost) {
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

  // ===== 01. get Presigned URL =====
  async function getPresignedURL() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/facebook/get-url`,
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
      const json: IUploadImagePresignedURLData = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else {
        setPageState((prev) => ({ ...prev, presignedURLData: json }));
        return json;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getPresignedURL:", error);
    }
  }

  // ===== 02. upload Image =====
  async function uploadImage(file: File) {
    const getPresignedURLData: IUploadImagePresignedURLData | undefined =
      await getPresignedURL();

    if (!getPresignedURLData) {
      toast.error("Failed to getPresignedURLData!");
      return;
    }

    setPageState((prev) => ({ ...prev, uploadedAsset: null }));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/octet-stream");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: file,
      redirect: "follow" as RequestRedirect,
    };

    try {
      const response = await fetch(
        getPresignedURLData.preSignedURL,
        requestOptions
      );
      if (response.ok) {
        console.log("Upload successful");
        setPageState((prev) => ({
          ...prev,
          uploadedAsset: getPresignedURLData.movieUrl,
        }));
      } else {
        const errorText = await response.text();
        toast.error(
          `Upload failed with status: ${response.status} - ${errorText}`
        );
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

export default FacebookPublishPostPage;
