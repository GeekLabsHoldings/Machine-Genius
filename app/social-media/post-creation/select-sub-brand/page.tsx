"use client"; // Indicate that this component is intended for client-side rendering
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Custom button component
import CustomSelectInput from "../../../_components/CustomSelectInput/CustomSelectInput"; // Custom select input component
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from React
// import { useRouter } from 'next/navigation' // Importing useRouter hook from Next.js

// Options for the select input
const subBrandOptions = [
  "Street Politics Canada",
  "Street Politics UK",
  "Street Politics Africa",
  "Investorcracy",
  "Movie Myth",
];

// ChooseSubBrand component
const ChooseSubBrand = () => {
  // State to store the selected value from custom select
  const [SelectedValue, setSelectedValue] = useState<string | number>("");

  // Function to update the selected value
  const getValue = (value: string | number) => {
    setSelectedValue(value);
  };

  // Router instance
  // const router = useRouter()

  // useEffect hook to perform side effects when the SelectedValue changes
  useEffect(() => {
    console.log(SelectedValue);

    // Navigate to the appropriate page based on the selected sub-brand
    // Example:
    // if (SelectedValue === 'Movie Myth') {
    //   router.push('/content-creator/create/movie-myth')
    // }
  }, [SelectedValue]);

  return (
    <div className="flex flex-col h-full">
      {/* Select input to choose the sub-brand */}
      <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw] ">
        <label className="text-[--40px] text-center font-bold leading-normal w-full pb-[--sy-29px]">
          For This Sub-Brand
        </label>
        {/* Custom select input component */}
        <CustomSelectInput
          label="Select Sub-Brand"
          options={subBrandOptions}
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
          href="/social-media/post-creation/select-brand"
        />
        {/* Button to navigate to the next page */}
        <CustomBtn
          word="Next"
          btnColor="black"
          // href="/social-media/post/twitter-post"
        />
      </div>
    </div>
  );
};

export default ChooseSubBrand;
