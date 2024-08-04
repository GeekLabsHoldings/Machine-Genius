"use client";
import CustomSelectInput from "../../_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "../../_components/Button/CustomBtn";
import styles from "./Create.module.css";
import { globalContext } from "@/app/_context/store";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";

const options = [
  "Script",
  "Article"
]

export default function CreatePage() {
  const dispatch = useDispatch();
  const {
    setSelectedBrand,
    setCollectedData,
    setTwitterData,
    setChoosedArticles,
    setGeneratedTitles,
    setLockedGeneratedTitles
  } = useContext(globalContext);
  
  // reset all the data
  useEffect(() => {
    setSelectedBrand("");
    setCollectedData(null);
    setTwitterData(null);
    setChoosedArticles([]);
    dispatch(contentCreatorActions.setFinalArticle(null));
    dispatch(contentCreatorActions.setCheckGrammerResults([]));
    dispatch(contentCreatorActions.setCheckAiResults([]));
    setGeneratedTitles([]);
    setLockedGeneratedTitles([]);
    dispatch(contentCreatorActions.setVideoTranscription(null));
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("selectedBrand");
      sessionStorage.removeItem("collectedData");
      sessionStorage.removeItem("twitterData");
      sessionStorage.removeItem("choosedArticles"); 
      sessionStorage.removeItem("selectedText"); 
      sessionStorage.removeItem("finalArticle");
      sessionStorage.removeItem("checkGrammerResults");
      sessionStorage.removeItem("checkAiResults");
      sessionStorage.removeItem("generatedTitles");
      sessionStorage.removeItem("lockedGeneratedTitles");
      sessionStorage.removeItem("videoTranscription");
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

