"use client";
import CustomSelectInput from "../../_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "../../_components/Button/CustomBtn";
import styles from "./Create.module.css";
import { globalContext } from "@/app/_context/store";
import { useContext, useEffect } from "react";

const options = [
  "Script",
  "Article"
]

export default function CreatePage() {
  const {
    setSelectedBrand,
    setCollectedData,
    setTwitterData,
    setChoosedArticles,
    setFinalArticle,
    setCheckGrammerResults,
    setCheckAiResults
  } = useContext(globalContext);
  
  // reset all the data
  useEffect(() => {
    setSelectedBrand("");
    setCollectedData(null);
    setTwitterData(null);
    setChoosedArticles([]);
    setFinalArticle(null);
    setCheckGrammerResults([]);
    setCheckAiResults([]);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("selectedBrand");
      sessionStorage.removeItem("collectedData");
      sessionStorage.removeItem("twitterData");
      sessionStorage.removeItem("choosedArticles"); 
      sessionStorage.removeItem("selectedText"); 
      sessionStorage.removeItem("finalArticle");
      sessionStorage.removeItem("checkGrammerResults");
      sessionStorage.removeItem("checkAiResults");
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center w-full">

        <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
          {/* writing type select */}
          <label className={styles.select_label}>I am writing a</label>
          <CustomSelectInput label="Select Content Type" options={options} />
        </div>

      {/* buttons to move to last or next page */}
        <div className="flex justify-end items-center w-full">
          <CustomBtn
            word="Next"
            btnColor="black"
            href="/content-creator/create/choose-brand"
          />
        </div>
      </div>
    </div>
  );
}

