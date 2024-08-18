"use client";
import CustomSelectInput from "../../_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "../../_components/Button/CustomBtn";
import styles from "./Create.module.css";
import { globalContext } from "@/app/_context/store";
import { useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";

export default function CreatePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const options = useMemo(() => ["Script", "Article"], []);
  const {
    selectedContentType,
    setSelectedContentType,
    setSelectedBrand,
    setCollectedData,
    setTwitterData,
    setChoosedArticles,
    setCheckStatus,
    setGeneratedTitles,
    setLockedGeneratedTitles,
    setSelectedContentTitle,
    setEditContentData,
  } = useContext(globalContext);

  // reset all the data
  useEffect(() => {
    function resetStateAndSessionStorage() {
      setSelectedContentType("");
      setSelectedBrand("");
      setCollectedData(null);
      setTwitterData(null);
      setChoosedArticles([]);
      dispatch(contentCreatorActions.setFinalArticle(null));
      setCheckStatus({
        grammar: "waiting",
        // todo: temp until backend fix it
        plagiarism: "pass",
        ai: "waiting",
      });
      dispatch(contentCreatorActions.setCheckGrammerResults([]));
      dispatch(contentCreatorActions.setCheckAiResults([]));
      setGeneratedTitles([]);
      setLockedGeneratedTitles([]);
      setSelectedContentTitle("");
      dispatch(contentCreatorActions.setVideoTranscription(null));
      setEditContentData(null);
      if (typeof window !== "undefined") {
        // sessionStorage.removeItem("selectedContentType");
        // sessionStorage.removeItem("selectedBrand");
        // sessionStorage.removeItem("collectedData");
        // sessionStorage.removeItem("twitterData");
        // sessionStorage.removeItem("choosedArticles");
        // sessionStorage.removeItem("selectedText");
        // sessionStorage.removeItem("finalArticle");
        // sessionStorage.removeItem("checkGrammerResults");
        // sessionStorage.removeItem("checkAiResults");
        // sessionStorage.removeItem("generatedTitles");
        // sessionStorage.removeItem("lockedGeneratedTitles");
        // sessionStorage.removeItem("selectedContentTitle");
        // sessionStorage.removeItem("videoTranscription");
        // sessionStorage.removeItem("editContentData");
        sessionStorage.clear();
      }
    }
    resetStateAndSessionStorage();
  }, []);

  // function that get select value by sending to custom select as a prop
  const getValue = (value: string | number) => {
    setSelectedContentType(value);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
          {/* writing type select */}
          <label className={styles.select_label}>I am writing a</label>
          <CustomSelectInput
            label="Select Content Type"
            options={options}
            getValue={getValue}
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
                router.replace("/content-creator/create/choose-brand");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
