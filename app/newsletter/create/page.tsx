"use client";

import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import styles from "@/app/newsletter/create/create.module.css";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { createNewsletterContext } from "./_context/createNewsletterContext";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const options = useMemo(() => ["Script", "Article"], []);
  const { selectedContentType, setSelectedContentType } = useContext(
    createNewsletterContext
  );

  // reset all the data
  useEffect(() => {
    function resetStateAndSessionStorage() {
      setSelectedContentType("");
      if (typeof window !== "undefined") {
        sessionStorage.clear();
      }
    }
    resetStateAndSessionStorage();
  }, []);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col justify-center gap-12 items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
            {/* writing type select */}
            <h2 className="text-[2.5rem] font-bold">
              I am creating a newsletter for
            </h2>
            <CustomSelectInput
              label="Select Brand"
              options={options}
              getValue={(value: string) => setSelectedContentType(value)}
            />
          </div>

          {/* buttons to move to last or next page */}
          <div className="flex justify-end items-center w-full">
            <CustomBtn
              word="Next"
              btnColor="black"
              onClick={() => {
                if (!selectedContentType) {
                  toast.error("Please select a content type!");
                } else {
                  router.replace("/newsletter/create/choose-brand");
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
