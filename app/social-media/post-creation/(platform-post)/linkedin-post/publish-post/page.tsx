"use client";
// Import necessary modules and components
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Custom Button component
import styles from "./PublishPost.module.css"; // CSS module for styling
import { useContext, useState } from "react"; // React's useState hook
import profileImg from "@/public/assets/post-profile.svg"; // Profile image
import Image from "next/image"; // Next.js Image component for optimized image loading
import { reGenerateIcon } from "@/app/_utils/svgIcons";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import postImage from "@/public/assets/post-img.svg"; // Post image
import ImageOption from "@/app/_components/SocialMedia/ImageOption/ImageOption";
import { socialMediaPostCreationContext } from "../../../_context/socialMediaPostCreationContext";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";

const PublishPost = () => {
  const { authState, handleSignOut } = useContext(globalContext);
  const { postCaption } = useContext(socialMediaPostCreationContext);

  // const [pageState, setPageState] = useState({
  // });

  async function handleAddPost() {
    if (!postCaption) {
      toast.error("No post caption provided!");
      return;
    }
    try {
      const res = await fetch(
        `https://api.machinegenius.io/social-media/linkedin/add-post`,
        {
          method: "POST",
          body: JSON.stringify({
            brand: "Geek Labs Holdings",
            content: postCaption,
            // "asset":"urn:li:digitalmediaAsset:D5622AQHi_q2dnUqL6Q"
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
      if (json && json.hashTags) {
        return json.hashTags.match(/#\w+/g);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleGenerateHashtags:", error);
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
        <h6 className="!font-bold !m-0">Twitter Post</h6>

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
                {Array.from({ length: 10 }).map((_, index) => (
                  <div className="min-w-[23%]">
                    <ImageOption
                      key={index}
                      imageSrc={postImage}
                      name="image"
                    />
                  </div>
                ))}
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
          <div className={styles.post_view_screens + " flex gap-[1vw] h-[70%]"}>
            {/* Desktop view */}
            <div className={styles.desctop_screen + " w-2/3 h-[40vh]"}>
              <h6>Desktop View</h6>
              <div className={styles.desctop_view}>
                <div className={styles.avatar}>
                  <Image src={profileImg} alt="avatar" />
                  <div className={styles.avatar_info}>
                    <p>Investocracy</p>
                    <span>@Investocrasy</span>
                  </div>
                </div>
                <p>{postCaption}</p>
              </div>
            </div>

            {/* Mobile view */}
            <div className={styles.mobile_screen + " w-1/3"}>
              <h6>Mobile View</h6>
              <div className={styles.mobile_view}>
                <div className={styles.avatar}>
                  <Image src={profileImg} alt="avatar" />
                  <div className={styles.avatar_info}>
                    <p>Investocracy</p>
                    <span>@Investocrasy</span>
                  </div>
                </div>
                <p>{postCaption}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons to move to the last or next page */}
      <div className="flex justify-between items-center mt-[--sy-40px]">
        <CustomBtn
          word="Back"
          btnColor="white"
          href="/social-media/post-creation/linkedin-post/"
        />
        <CustomBtn word="Publish" btnColor="black" />
      </div>
    </div>
  );
};

export default PublishPost;
