"use client";
import { useContext, useEffect, useState } from "react"; // React's useState hook
import { socialMediaPostCreationContext } from "@/app/social-media/post-creation/_context/socialMediaPostCreationContext";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";
import PublishPost from "../../_platform-post/PublishPost";
import useSessionStorage from "@/app/_hooks/useSessionStorage";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "next/navigation";

// interface IPublishPostResponse {
//   result: {
//     platform: "FACEBOOK";
//     brandId: string;
//     content: string;
//     postId: string;
//     employeeId: string;
//     _id: string;
//     __v: number;
//   };
//   facebookPost: {
//     id: string;
//     post_id?: string;
//   };
// }

interface IUploadImagePresignedURLData {
  message: string;
  preSignedURL: string;
  movieUrl: string;
  s3BucketURL: string;
}

const FacebookPublishPostPage = () => {
  const searchParams = useSearchParams();
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

  const [tokenState, setTokenState] = useSessionStorage<{
    clientId: string;
    clientSecret: string;
  } | null>("tokenState", null);

  useEffect(() => {
    if (tokenState !== null) {
      handleFacebookLogin();
    }
  }, [tokenState]);

  const handleFacebookLogin = () => {
    if (!tokenState) {
      toast.error("No token state found!");
      return;
    }
    const redirectUri = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_BASE_URL}/social-media/post-creation/facebook-post/publish-post`
    );
    const scope = "pages_show_list,pages_read_engagement";
    const state = uuidv4(); // For security, you should generate a random string here
    const responseType = "code";

    const facebookOAuthUrl = `https://www.facebook.com/v16.0/dialog/oauth?client_id=${tokenState?.clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${state}`;

    // Redirect the user to Facebook's OAuth dialog
    window.location.href = facebookOAuthUrl;
  };

  useEffect(() => {
    const code: any = searchParams.get("code");
    const state: any = searchParams.get("state");
    // if (typeof window !== "undefined") {
    //   window.localStorage.setItem("code", code);
    //   window.localStorage.setItem("state", state);
    // }
    if (code && tokenState !== null) {
      // Send the code to your server to exchange it for an access token
      fetch("/api/social-media/facebook/exchange-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          state,
          clientId: tokenState?.clientId,
          clientSecret: tokenState?.clientSecret,
          redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/social-media/post-creation/facebook-post/publish-post`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Access token received and stored successfully
            // You can redirect or update the UI as needed
            handleUpdateToken(data?.access_token);
            // window.localStorage.setItem("access_token", data.access_token);
            // console.log("Access token:", data.access_token);
          } else {
            // Handle errors
            console.error(
              "Error exchanging code for access token:",
              data.error
            );
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
        });
    }
  }, [searchParams, tokenState]);

  async function handleUpdateToken(accessToken: string) {
    setTokenState(null);
    if (!selectedBrandId) {
      toast.error("No brand selected!");
      return;
    }
    if (!accessToken) {
      toast.error("No access token provided!");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/facebook/update-token`,
        {
          method: "POST",
          body: JSON.stringify({
            brandId: selectedBrandId,
            longAccessToken: accessToken,
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
      console.error("Error handleUpdateToken:", error);
    }
  }

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
      const json: any = await res.json();
      if (
        json &&
        json.message.toLowerCase() === "facebook token expired" &&
        json.status === 400
      ) {
        setTokenState({
          clientId: json.data.client_id,
          clientSecret: json.data.client_secret,
        });
      } else if (json && json.message) {
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
