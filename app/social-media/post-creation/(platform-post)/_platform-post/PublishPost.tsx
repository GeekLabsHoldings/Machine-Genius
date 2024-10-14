import React, { useContext, useRef } from "react";
// Import necessary modules and components
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Custom Button component
import styles from "./PublishPost.module.css"; // CSS module for styling
// import profileImg from "@/public/assets/post-profile.svg"; // Profile image
// import postImage from "@/public/assets/post-img.svg"; // Post image
// import ImageOption from "@/app/_components/SocialMedia/ImageOption/ImageOption";
import { reGenerateIcon } from "@/app/_utils/svgIcons";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import PostViewScreens from "@/app/_components/SocialMedia/PostViewScreens/PostViewScreens";
import { socialMediaPostCreationContext } from "../../_context/socialMediaPostCreationContext";
import DateAndTimePicker from "@/app/_components/DateAndTimePicker/DateAndTimePicker";

// todo: accept PostViewScreens as childern
interface IProps {
  handleUploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadedAsset: string | null | File;
  handleAddPost: () => void;
  setPageState?: React.Dispatch<React.SetStateAction<any>>;
  handleFacebookLogin?: () => void;
}

export default function PublishPost({
  handleUploadImage,
  uploadedAsset,
  handleAddPost,
  setPageState,
  handleFacebookLogin,
}: IProps) {
  const { selectedPlatform } = useContext(socialMediaPostCreationContext);
  const uploadImageRef = useRef<HTMLInputElement>(null);

  function getDateTimeValue(value: any) {
    if (setPageState) {
      setPageState((prev: any) => ({ ...prev, scheduledTime: value }));
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
        <h6 className="!font-bold !m-0">
          {selectedPlatform.slice(0, 1) +
            selectedPlatform.toLowerCase().slice(1) +
            " "}
          Post
        </h6>

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
                  className="min-w-[23%] h-full aspect-square rounded-[--13px] border border-[--dark] overflow-hidden flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
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

                {uploadedAsset && (
                  <div className="max-w-[23%] h-full aspect-square rounded-[--13px] border border-[--dark] overflow-hidden flex flex-col items-center justify-center">
                    <img src={uploadedAsset as string} alt="uploaded image" />
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

                  <DateAndTimePicker getDateTimeValue={getDateTimeValue} />
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

        <div className="flex gap-[--20px]">
          {selectedPlatform === "FACEBOOK" && (
            <CustomBtn
              word="Update Access Token"
              btnColor="black"
              onClick={handleFacebookLogin}
              paddingVal="py-[--10px] px-[--18px]"
            />
          )}
          <CustomBtn word="Publish" btnColor="black" onClick={handleAddPost} />
        </div>
      </div>
    </div>
  );
}
