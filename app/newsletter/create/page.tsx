'use client'

import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import styles from "@/app/newsletter/create/create.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

const options = ["Script", "Article"];

const page = () => {
  const [IsLoading, setIsLoading] = useState(false);

  const router = useRouter();

 // show loading page before navigate to next page
  const handleNavigate = () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push('/newsletter/create/choose-newsletter')
    }, 1500); 
  }

  return (
    <>
      {IsLoading ? (
        <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
          <LogoAndTitle
            needTxt={true}
            textNeeded="Gather News..."
            title="Genius is working on your Newsletter.."
          />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col justify-center gap-12 items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
              {/* writing type select */}
              <h2 className="text-[2.5rem] font-bold">I am writing a</h2>
              <CustomSelectInput
                label="Select Brand"
                options={options}
              />
            </div>

            {/* buttons to move to last or next page */}
            <div className="flex justify-end items-center w-full">
              <CustomBtn
                word="Next"
                btnColor="black"
          onClick={handleNavigate}
         
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
