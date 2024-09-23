"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "@/app/newsletter/create/newsletter-preview/newsletter-preview.module.css";
import { use, useContext, useEffect, useState } from "react";
import { createNewsletterContext } from "../_context/createNewsletterContext";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";

interface NewsLetter {
  title: string;
  articles: string[];
}

function Page() {
  const { selectedContentTitle, generalTitles } = useContext(
    createNewsletterContext
  );

  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, []);

  if (IsLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-w-[24rem] gap-[2vw] h-[75vh] py-[1.5vw]">
        <LogoAndTitle needTxt={false} title="Getting There..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* titles wrapper */}
      <div className="flex justify-end items-center flex-col h-[75vh] gap-[2vw] pb-[1.5vw]">
        {/* scripts wrapper */}
        {/* generated titles container */}
        <div className="flex flex-col gap-1 w-full mt-5">
          <h2 className="text-2xl font-bold">News Letter</h2>
          <span>
            Make sure to check the News Letter carefully before publishing.
          </span>
        </div>
        <div
          className={`${styles.titles_container} flex flex-col h-full text-center overflow-hidden`}
        >
          {/* generated titles container */}
          <h3 className="text-2xl p-4 font-bold u">{selectedContentTitle}</h3>
          <ul className="grow overflow-y-auto pb-[0.7rem]">
            {generalTitles?.map((section: NewsLetter, index: number) => (
              <div key={index} className="">
                <li className="text-2xl font-bold bg-[#E1C655] text-white">
                  <h4 className="text-2xl font-bold bg-[#E1C655] text-white">
                    {section?.title}
                  </h4>
                </li>
                {section?.articles?.map((news, index) => (
                  <li key={news} className="p-2">
                    {news}
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </div>
      {/* Next & Back Buttons to navigate to next and back pages */}
      <div className="flex w-full justify-between">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href={"/newsletter/create/newsletter-generated-titles"}
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href={"/newsletter/create/newsletter-subjectline"}
        />
      </div>
    </div>
  );
}

export default Page;
