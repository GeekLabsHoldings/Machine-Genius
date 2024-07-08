"use client";
import styles from "./choose-content.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "../../../_components/CustomSelectInput/CustomSelectInput";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { globalContext } from "@/app/_context/store";
import { useContext } from "react";

const ChooseContent = () => {
  // loading state that show and hide loading
  const [IsLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setGenerateContent, setCollectedData, collectedData } = useContext(globalContext);

  // async function generateContent() {
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch(`http://localhost:3000/generate-content`);
  //     if (!res.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     const json = await res.json();
  //     setGenerateContent(json);
  //     router.push("/content-creator/create/choose-articles");
  //   } catch (error) {
  //     console.error("Error generating content:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

   async function getCollectedData() {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/generate-content`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await res.json();
      setCollectedData(json?.organizedArticles);
      router.push("/content-creator/create/choose-articles");
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsLoading(false);
      console.log(collectedData);
    }
  }

  // select options
  const options = [
    // "Script",
    // "Article",
    "Documentary",
    "Trends Article",
  ];

  return (
    <div className="flex flex-col">
      {IsLoading ? (
        <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
          <LogoAndTitle
            needTxt={true}
            textNeeded="Hold on tight."
            title="Genius is working on your article.."
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
          <label className={styles.select_label}>Select Content Type</label>
          <CustomSelectInput label="Select Content Type" options={options} />
        </div>
      )}

      {/* buttons to move to last or next page */}
      <div className="flex justify-between items-center">
        <CustomBtn
          word="Back"
          btnColor="white"
          href="/content-creator/create/choose-brand"
        />
        <CustomBtn word="Next" btnColor="black" onClick={getCollectedData} />
      </div>
    </div>
  );
};

export default ChooseContent;
