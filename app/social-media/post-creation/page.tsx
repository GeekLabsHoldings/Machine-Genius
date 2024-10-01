"use client";
import CustomSelectInput from "../../_components/CustomSelectInput/CustomSelectInput"; // Custom select input component
import CustomBtn from "../../_components/Button/CustomBtn"; // Custom button component
import { useCallback, useContext } from "react";
import {
  PlatformEnum,
  socialMediaPostCreationContext,
} from "./_context/socialMediaPostCreationContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Options for post creation type
const platformsOptions = [
  "Facebook",
  "Reddit",
  "Telegram",
  "Twitter",
  "LinkedIn",
  "Youtube",
  "Instagram",
];

// Post component
const Post = () => {
  const router = useRouter();
  const { selectedPlatform, setSelectedPlatform } = useContext(
    socialMediaPostCreationContext
  );

  // function that get select value by sending to custom select as a prop
  const getValue = useCallback((value: string) => {
    setSelectedPlatform(value.toUpperCase() as PlatformEnum);
  }, []); // No dependencies, function reference is stable

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center w-full">
        {/* Container for post creation */}
        <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
          {/* Label for selecting post creation type */}
          <label className="text-[--40px] text-center font-bold leading-normal w-full pb-[--sy-29px]">
            I am creating a post on
          </label>
          {/* Custom select input for selecting post creation type */}
          <CustomSelectInput
            label="Select Platform"
            options={platformsOptions}
            hoverColor="hover:bg-[#E1C655]"
            getValue={getValue}
          />
        </div>

        {/* Buttons to navigate */}
        <div className="flex justify-end items-center w-full">
          <CustomBtn
            word="Next" // Button text
            btnColor="black" // Button color
            onClick={() => {
              if (!selectedPlatform) {
                toast.error("Please select a platform!");
              } else {
                router.replace("/social-media/post-creation/select-brand");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
