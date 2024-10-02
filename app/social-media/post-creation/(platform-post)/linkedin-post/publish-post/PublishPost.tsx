"use client";
// Import necessary modules and components
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Custom Button component
import styles from "./PublishPost.module.css"; // CSS module for styling
import { useContext, useRef, useState } from "react"; // React's useState hook
import profileImg from "@/public/assets/post-profile.svg"; // Profile image
import Image from "next/image"; // Next.js Image component for optimized image loading
import { reGenerateIcon } from "@/app/_utils/svgIcons";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
// import postImage from "@/public/assets/post-img.svg"; // Post image
// import ImageOption from "@/app/_components/SocialMedia/ImageOption/ImageOption";
import { socialMediaPostCreationContext } from "../../../_context/socialMediaPostCreationContext";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";
import PostViewScreens from "@/app/_components/SocialMedia/PostViewScreens/PostViewScreens";

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

const PublishPost = () => {
  const { authState, handleSignOut } = useContext(globalContext);
  const { postCaption } = useContext(socialMediaPostCreationContext);
  const uploadImageRef = useRef<HTMLInputElement>(null);
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
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/linkedin/add-post`,
        {
          method: "POST",
          body: JSON.stringify({
            brand: "Geek Labs Holdings",
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
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/linkedin/get`,
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
    <div className="flex flex-col h-full">
      {/* Wrapper for adding post */}
      <div
        className={
          "flex flex-col w-full h-[75vh] py-[1vw] " + styles.add_post_wrapper
        }
      >
        <h6 className="!font-bold !m-0">LinkedIn Post</h6>

        {/* Grid for arranging content */}
        <div className="grid grid-cols-2 gap-[2vw] w-full h-full">
          {/* 01- Col (1) */}
          <div className={styles.post_content + " flex flex-col"}>
            {/* ===== Image Selection ===== */}

            <div className="flex flex-col gap-[--sy-10px]">
              <div className="flex justify-between items-center mt-[--sy-20px]">
                <h4 className="text-[--24px] font-semibold">Image Selection</h4>

                <CustomBtn
                  btnColor="black"
                  word="Re-Generate"
                  icon={reGenerateIcon}
                  paddingVal="py-[--10px] px-[--22px]"
                />
              </div>
              <div className={styles.image_selection}>
                {/* Image options */}

                <div
                  className="min-w-[23%] h-full aspect-square rounded-[--13px]
                border border-[--dark] overflow-hidden flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                  onClick={() => uploadImageRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">
                      Upload
                    </span>
                    <span className="!text-[--26px] text-gray-400">+</span>
                  </div>
                  <input
                    type="file"
                    ref={uploadImageRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleUploadImage}
                  />
                </div>

                {pageState.uploadedAsset && (
                  <div
                    className="min-w-[23%] h-full aspect-square rounded-[--13px]
               border border-[--dark] overflow-hidden flex flex-col items-center justify-center"
                  >
                    <Image
                      src={pageState.uploadedAsset as string}
                      alt="uploaded image"
                    />
                  </div>
                )}

                {/* {Array.from({ length: 10 }).map((_, index) => (
                  <div className="min-w-[23%]">
                    <ImageOption
                      key={index}
                      imageSrc={postImage}
                      name="image"
                    />
                  </div>
                ))} */}
              </div>
            </div>

            {/* ===== Schedule ===== */}
            <div
              className={`!transition-none flex flex-col gap-[--sy-10px] mt-[--sy-40px]`}
            >
              <div className="flex justify-between items-center ">
                <h4 className="text-[--24px] font-semibold">Schedule</h4>

                <CustomBtn btnColor="black" word="Schedule" />
              </div>
              <div className="space-y-[--sy-10px]">
                <div className="w-1/2">
                  <h4 className="text-[--20px] font-semibold mb-[--sy-10px]">
                    Account
                  </h4>
                  <CustomSelectInput
                    label={"Account"}
                    hoverColor="hover:bg-[#E1C655]"
                    options={[]}
                  />
                </div>

                <div className="w-1/2">
                  <h4 className="text-[--20px] font-semibold mb-[--sy-10px]">
                    Upload Time
                  </h4>
                  <CustomSelectInput
                    label={"Upload Time"}
                    hoverColor="hover:bg-[#E1C655]"
                    options={[]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 02- Col (2) */}
          <PostViewScreens />
        </div>
      </div>

      {/* Buttons to move to the last or next page */}
      <div className="flex justify-between items-center mt-[--sy-40px]">
        <CustomBtn
          word="Back"
          btnColor="white"
          href="/social-media/post-creation/linkedin-post/"
        />
        <CustomBtn word="Publish" btnColor="black" onClick={handleAddPost} />
      </div>
    </div>
  );
};

export default PublishPost;
