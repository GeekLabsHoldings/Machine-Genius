"use client"; // Indicate that this component is intended for client-side rendering
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Custom button component
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput"; // Custom select input component
import { useCallback, useContext, useEffect, useState } from "react"; // Importing useEffect and useState hooks from React
import { useRouter } from "next/navigation"; // Importing useRouter hook from Next.js
import { socialMediaPostCreationContext } from "../_context/socialMediaPostCreationContext";
import toast from "react-hot-toast";

// Options for the select input
const brandOptions = [
  "Street Politics Canada",
  "Street Politics UK",
  "Street Politics Africa",
  "Investorcracy",
  "Movie Myth",
];

// ChooseBrand component
const ChooseBrand = () => {
  const router = useRouter();
  const { selectedPlatform, selectedBrand, setSelectedBrand } = useContext(
    socialMediaPostCreationContext
  );
  const getValue = useCallback((value: string) => {
    setSelectedBrand(value);
  }, []); // No dependencies, function reference is stable

  return (
    <div className="flex flex-col h-full">
      {/* Select input to choose the brand */}
      <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw] ">
        <label className="text-[--40px] text-center font-bold leading-normal w-full pb-[--sy-29px]">
          For This Brand
        </label>
        {/* Custom select input component */}
        <CustomSelectInput
          label="Select Brand"
          options={brandOptions}
          getValue={getValue}
          hoverColor="hover:bg-[#E1C655]"
        />
      </div>

      {/* Buttons to navigate */}
      <div className="flex justify-between items-center">
        {/* Button to navigate back */}
        <CustomBtn
          word="Back"
          btnColor="white"
          href="/social-media/post-creation"
        />
        {/* Button to navigate to the next page */}
        <CustomBtn
          word="Next"
          btnColor="black"
          // href="/social-media/post-creation/select-sub-brand"
          onClick={() => {
            if (!selectedBrand) {
              toast.error("Please select a brand!");
            } else {
              router.replace(
                `/social-media/post-creation/${selectedPlatform.toLowerCase()}-post`
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChooseBrand;
