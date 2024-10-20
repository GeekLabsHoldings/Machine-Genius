"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { formatToText } from "@/app/_utils/contentFormatter";
import { globalContext } from "./store";
import useSessionStorage from "../_hooks/useSessionStorage";

export interface IUploadMoviePresignedURLData {
  message: string;
  preSignedURL: string;
  movieUrl: string;
  s3BucketURL: string;
}

const initialContextState = {
  // ===== 01. Start Content Creator =====
  selectedContentType: "" as any,
  setSelectedContentType: (contentType: any) => {},
  selectedBrand: "" as any,
  setSelectedBrand: (brand: any) => {},
  collectedData: null as any,
  setCollectedData: (data: any) => {},
  twitterData: null as any,
  setTwitterData: (data: any) => {},
  choosedArticles: [] as any,
  setChoosedArticles: (articles: any) => {},

  checkStatus: {
    grammar: "waiting",
    // todo: temp until backend fix it
    plagiarism: "pass",
    ai: "pass",
    isGrammerChecked: false,
  },
  setCheckStatus: (status: any) => {},
  checkGrammer: () => {},
  checkPlagiarism: () => {},
  checkAi: () => {},
  startChecks: () => {},
  generateTitles: () => {},
  generatedTitles: [] as any,
  setGeneratedTitles: (titles: any) => {},
  lockedGeneratedTitles: [] as any,
  setLockedGeneratedTitles: (titles: any) => {},

  generatedThumbnails: [] as any,
  setGeneratedThumbnails: (thumbnails: any) => {},
  generateThumbnails: () => {},
  selectedContentThumbnail: "",
  setSelectedContentThumbnail: (thumbnail: any) => {},

  selectedContentTitle: "",
  setSelectedContentTitle: (title: any) => {},

  uploadMoviePresignedURLData: null as IUploadMoviePresignedURLData | null,
  setUploadMoviePresignedURLData: (
    data: IUploadMoviePresignedURLData | null
  ) => {},

  editContentData: null as any,
  setEditContentData: (id: any) => {},
  // ===== 01. End Content Creator =====
};

// 1- create context, export it
export const contentCreatorContext = createContext(initialContextState);

// 2- provide context, export it
export default function ContentCreatorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState, handleSignOut } = useContext(globalContext);
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();

  // ===== 01. Start Content Creator =====

  // ===== Start selectedContentType =====
  function selectedContentTypeInit() {
    if (typeof window !== "undefined") {
      const selectedContentTypeInitValue = sessionStorage.getItem(
        "selectedContentType"
      );
      return selectedContentTypeInitValue ? selectedContentTypeInitValue : "";
    } else {
      return "";
    }
  }
  const [selectedContentType, setSelectedContentType] = useState<any>(
    selectedContentTypeInit
  );
  useEffect(() => {
    sessionStorage.setItem("selectedContentType", selectedContentType);
  }, [selectedContentType]);
  // ===== End selectedContentType =====

  // ===== Start selectedBrand =====
  function selectedBrandInit() {
    if (typeof window !== "undefined") {
      const selectedBrandInitValue = sessionStorage.getItem("selectedBrand");
      return selectedBrandInitValue ? selectedBrandInitValue : "";
    } else {
      return "";
    }
  }
  const [selectedBrand, setSelectedBrand] = useState<any>(selectedBrandInit);
  useEffect(() => {
    sessionStorage.setItem("selectedBrand", selectedBrand);
  }, [selectedBrand]);
  // ===== End selectedBrand =====

  // ===== Start collectedData =====
  function collectedDataInit() {
    if (typeof window !== "undefined") {
      const collectedDataInitValue = sessionStorage.getItem("collectedData");
      return collectedDataInitValue ? JSON.parse(collectedDataInitValue) : null;
    } else {
      return null;
    }
  }
  const [collectedData, setCollectedData] = useState<any>(collectedDataInit);
  useEffect(() => {
    sessionStorage.setItem("collectedData", JSON.stringify(collectedData));
  }, [collectedData]);

  function twitterDataInit() {
    if (typeof window !== "undefined") {
      const twitterDataInitValue = sessionStorage.getItem("twitterData");
      return twitterDataInitValue ? JSON.parse(twitterDataInitValue) : null;
    } else {
      return null;
    }
  }
  const [twitterData, setTwitterData] = useState<any>(twitterDataInit);
  useEffect(() => {
    sessionStorage.setItem("twitterData", JSON.stringify(twitterData));
  }, [twitterData]);
  // ===== End collectedData =====

  // ===== Start choosedArticles =====
  function choosedArticlesInit() {
    if (typeof window !== "undefined") {
      const choosedArticlesInitValue =
        sessionStorage.getItem("choosedArticles");
      return choosedArticlesInitValue
        ? JSON.parse(choosedArticlesInitValue)
        : [];
    } else {
      return [];
    }
  }
  const [choosedArticles, setChoosedArticles] =
    useState<any>(choosedArticlesInit);
  useEffect(() => {
    sessionStorage.setItem("choosedArticles", JSON.stringify(choosedArticles));
  }, [choosedArticles]);
  // ===== End choosedArticles =====

  // ===== Start finalArticle =====
  // function finalArticleInit() {
  //   if (typeof window !== "undefined") {
  //     const finalArticleInitValue = sessionStorage.getItem("finalArticle");
  //     return finalArticleInitValue ? JSON.parse(finalArticleInitValue) : null;
  //   } else {
  //     return null;
  //   }
  // }
  // const [finalArticle, setFinalArticle] = useState<any>(finalArticleInit);
  const finalArticle = useSelector(
    (state: any) => state.contentCreator.finalArticle
  );
  useEffect(() => {
    sessionStorage.setItem("finalArticle", JSON.stringify(finalArticle));
  }, [finalArticle]);
  // ===== End finalArticle =====

  // ===== Start Checks =====
  const [checkStatus, setCheckStatus] = useState({
    grammar: "waiting",
    // todo: temp until backend fix it
    plagiarism: "pass",
    ai: "waiting",
    isGrammerChecked: false,
  });
  // const [checkGrammerResults, setCheckGrammerResults] = useState<any>(
  //   checkGrammerResultsInit
  // );
  const checkGrammerResults = useSelector(
    (state: any) => state.contentCreator.checkGrammerResults
  );
  useEffect(() => {
    sessionStorage.setItem(
      "checkGrammerResults",
      JSON.stringify(checkGrammerResults)
    );
  }, [checkGrammerResults]);

  function handleGrammerFetchError() {
    setCheckStatus((prev: any) => ({ ...prev, grammar: "fetchError" }));
    toast.error("Something went wrong!");
    // reset checkGrammerResults
    dispatch(contentCreatorActions.setCheckGrammerResults([]));
    return;
  }

  async function checkGrammer() {
    if (!finalArticle?.articles[0]?.content) {
      toast.error("No content found!");
      return;
    }
    if (checkStatus.isGrammerChecked === true) {
      setCheckStatus((prev: any) => ({ ...prev, grammar: "pass" }));
      dispatch(contentCreatorActions.setCheckGrammerResults([]));
      return;
    }
    try {
      const res = await fetch(`https://api.sapling.ai/api/v1/edits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: process.env.NEXT_PUBLIC_SAPLING_API_KEY as string,
          session_id: uuidv4(),
          text: formatToText(finalArticle?.articles[0]?.content),
        }),
      });

      const json = await res.json();

      if (!json) {
        handleGrammerFetchError();
        return;
      } else if (json && json.edits) {
        const filteredJson = json?.edits.filter(
          (item: any) => item.general_error_type === "Grammar"
        );
        if (filteredJson.length > 0) {
          setCheckStatus((prev: any) => ({
            ...prev,
            grammar: "fail",
            isGrammerChecked: true,
          }));
        } else {
          setCheckStatus((prev: any) => ({
            ...prev,
            grammar: "pass",
            isGrammerChecked: true,
          }));
        }
        dispatch(contentCreatorActions.setCheckGrammerResults(filteredJson));
      } else {
        handleGrammerFetchError();
      }
    } catch (error) {
      handleGrammerFetchError();
      console.error("Error checkGrammer:", error);
    }
  }

  async function checkPlagiarism() {
    const maxRetries = 1; // Define the maximum number of retries
    let attempts = 0;
    let json = null;

    while (attempts < maxRetries) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/content-creation/plagiarism-check`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: finalArticle?.articles[0]?.content,
            }),
          }
        );

        json = await res.json();

        if (json) {
          // If content is found, break the loop
          break;
        }
      } catch (error) {
        // setCheckStatus((prev:any) => ({ ...prev, plagiarism: "fetchError" }));
        toast.error("Something went wrong!");
        console.error("Error checkPlagiarism:", error);
      } finally {
        attempts++;
      }
    }

    if (json) {
      // todo
      if (json) {
        // setCheckStatus((prev:any) => ({ ...prev, plagiarism: "fail" }));
        // todo: temp until backend fix it
        setCheckStatus((prev: any) => ({ ...prev, plagiarism: "pass" }));
      } else {
        setCheckStatus((prev: any) => ({ ...prev, plagiarism: "pass" }));
      }
      console.log("checkPlagiarismResult", json);
    } else {
      // todo: uncomment after backend fix it
      // setCheckStatus((prev:any) => ({ ...prev, plagiarism: "fetchError" }));
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
  }
  // const [checkAiResults, setCheckAiResults] = useState<any>(
  //   checkAiResultsInit
  // );
  const checkAiResults = useSelector(
    (state: any) => state.contentCreator.checkAiResults
  );
  useEffect(() => {
    sessionStorage.setItem("checkAiResults", JSON.stringify(checkAiResults));
  }, [checkAiResults]);

  function handleAiFetchError() {
    setCheckStatus((prev: any) => ({ ...prev, ai: "pass" }));
    // toast.error("Something went wrong!");
    // reset checkGrammerResults
    dispatch(contentCreatorActions.setCheckAiResults([]));
    return;
  }

  async function checkAi() {
    if (
      !finalArticle.articles[0].content ||
      finalArticle.articles[0].content.length < 1
    ) {
      toast.error("No content found!");
      return;
    }
    try {
      const res = await fetch(
        `https://the-ghost-ai-backend-005c5dcbf4a6.herokuapp.com/detection/ai/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Api-Key ${
              process.env.NEXT_PUBLIC_GHOST_API_KEY as string
            }`,
          },
          body: JSON.stringify({
            text: formatToText(finalArticle?.articles[0]?.content),
            useAdditionalDetectors: true,
          }),
        }
      );

      const json = await res.json();

      if (!json || (json && json.error)) {
        handleAiFetchError();
        return;
      } else if (json) {
        let totalAi = 0;
        let count = 0;
        for (const key in json) {
          if (key !== "human") {
            totalAi += json[key].ai;
            count++;
          }
        }
        const averageAi = totalAi / count;

        const filteredJson =
          averageAi >= 0.3
            ? [
                {
                  sentence: `averageAi: ${averageAi}`,
                },
              ]
            : [];

        if (averageAi >= 0.3) {
          setCheckStatus((prev: any) => ({ ...prev, ai: "pass" }));
        } else {
          setCheckStatus((prev: any) => ({ ...prev, ai: "pass" }));
        }

        dispatch(contentCreatorActions.setCheckAiResults(filteredJson));
      } else {
        handleAiFetchError();
      }
    } catch (error) {
      handleAiFetchError();
      console.error("Error checkAi:", error);
    }
  }

  async function startChecks() {
    if (checkStatus.ai !== "pass") {
      await checkAi();
    }
    if (
      checkStatus.grammar !== "pass" &&
      checkStatus.isGrammerChecked === false
    ) {
      await checkGrammer();
    } else {
      setCheckStatus((prev: any) => ({ ...prev, grammar: "pass" }));
      dispatch(contentCreatorActions.setCheckGrammerResults([]));
    }
    // await checkPlagiarism();
    return Promise.resolve();
  }
  // ===== End Checks =====

  // ===== Start generateTitles =====

  function generatedTitlesInit() {
    if (typeof window !== "undefined") {
      const generatedTitlesInitValue =
        sessionStorage.getItem("generatedTitles");
      return generatedTitlesInitValue
        ? JSON.parse(generatedTitlesInitValue)
        : [];
    } else {
      return [];
    }
  }

  const [generatedTitles, setGeneratedTitles] =
    useState<any>(generatedTitlesInit);
  useEffect(() => {
    sessionStorage.setItem("generatedTitles", JSON.stringify(generatedTitles));
    console.log("generatedTitles:", generatedTitles);
  }, [generatedTitles]);

  async function generateTitles() {
    if (!selectedBrand || !finalArticle?.articles[0]?.content) {
      toast.error("No content or brand name provided");
      return;
    }
    let brandNamePayload: string = "";
    if (selectedBrand === "Street Politics Canada") {
      brandNamePayload = "streetPoliticsCanada";
    } else if (selectedBrand === "Street Politics UK") {
      brandNamePayload = "streetPoliticsUK";
    } else if (selectedBrand === "Street Politics Africa") {
      brandNamePayload = "streetPoliticsAfrica";
    } else if (selectedBrand === "Investorcracy") {
      brandNamePayload = "investocracy";
    } else if (selectedBrand === "Movie Myth") {
      brandNamePayload = "movieMyth";
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/content-creation/generate-titles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
          body: JSON.stringify({
            brandName: brandNamePayload,
            content: finalArticle?.articles[0]?.content,
          }),
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json = await res.json();

      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else if (json && json.success === false) {
        toast.error("Something went wrong!");
        return;
      } else if (json && json.success === true && json.Titles) {
        setGeneratedTitles(json.Titles);
      } else {
        toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error generateTitles:", error);
    }
  }

  function selectedContentTitleInit() {
    if (typeof window !== "undefined") {
      const selectedContentTitleInitValue = sessionStorage.getItem(
        "selectedContentTitle"
      );
      return selectedContentTitleInitValue ? selectedContentTitleInitValue : "";
    } else {
      return "";
    }
  }
  const [selectedContentTitle, setSelectedContentTitle] = useState<any>(
    selectedContentTitleInit
  );
  useEffect(() => {
    sessionStorage.setItem("selectedContentTitle", selectedContentTitle);
  }, [selectedContentTitle]);

  function lockedGeneratedTitlesInit() {
    if (typeof window !== "undefined") {
      const lockedGeneratedTitlesInitValue = sessionStorage.getItem(
        "lockedGeneratedTitles"
      );
      return lockedGeneratedTitlesInitValue
        ? JSON.parse(lockedGeneratedTitlesInitValue)
        : [];
    } else {
      return [];
    }
  }
  const [lockedGeneratedTitles, setLockedGeneratedTitles] = useState<any>(
    lockedGeneratedTitlesInit
  );
  useEffect(() => {
    sessionStorage.setItem(
      "lockedGeneratedTitles",
      JSON.stringify(lockedGeneratedTitles)
    );
    console.log("lockedGeneratedTitles:", lockedGeneratedTitles);
  }, [generatedTitles, lockedGeneratedTitles]);
  // ===== End generateTitles =====

  // ===== Start generatedThumbnails =====

  function generatedThumbnailsInit() {
    if (typeof window !== "undefined") {
      const generatedThumbnailsInitValue = sessionStorage.getItem(
        "generatedThumbnails"
      );
      return generatedThumbnailsInitValue
        ? JSON.parse(generatedThumbnailsInitValue)
        : [];
    } else {
      return [];
    }
  }
  const [generatedThumbnails, setGeneratedThumbnails] = useState<any>(
    generatedThumbnailsInit
  );
  useEffect(() => {
    sessionStorage.setItem(
      "generatedThumbnails",
      JSON.stringify(generatedThumbnails)
    );
    // console.log("generatedThumbnails:", generatedThumbnails);
  }, [generatedThumbnails]);

  async function generateThumbnails() {
    if (!selectedBrand || !finalArticle?.articles[0]?.content) {
      toast.error("No content or brand name provided");
      return;
    }
    let brandNamePayload: string = "";
    if (selectedBrand === "Street Politics Canada") {
      brandNamePayload = "streetPoliticsCanada";
    } else if (selectedBrand === "Street Politics UK") {
      brandNamePayload = "streetPoliticsUK";
    } else if (selectedBrand === "Street Politics Africa") {
      brandNamePayload = "streetPoliticsAfrica";
    } else if (selectedBrand === "Investorcracy") {
      brandNamePayload = "investocracy";
    } else if (selectedBrand === "Movie Myth") {
      brandNamePayload = "movieMyth";
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/content-creation/generate-thumbnails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
          body: JSON.stringify({
            brandName: brandNamePayload,
            content: finalArticle?.articles[0]?.content,
          }),
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else if (
        json &&
        json.success === false &&
        json.error === "No content or brand name provided"
      ) {
        toast.error("No content or brand name provided");
        return;
      } else if (
        json &&
        json.success === false &&
        json.error === "brandName Not correct"
      ) {
        toast.error("brandName Not correct");
        return;
      } else if (json && json.success === false) {
        toast.error("Something went wrong!");
        return;
      } else if (json && json.success === true && json.Thumbnail) {
        setGeneratedThumbnails(json.Thumbnail);
      } else {
        toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error generateThumbnails:", error);
    }
  }

  function selectedContentThumbnailInit() {
    if (typeof window !== "undefined") {
      const selectedContentThumbnailInitValue = sessionStorage.getItem(
        "selectedContentThumbnail"
      );
      return selectedContentThumbnailInitValue
        ? selectedContentThumbnailInitValue
        : "";
    } else {
      return "";
    }
  }
  const [selectedContentThumbnail, setSelectedContentThumbnail] = useState<any>(
    selectedContentThumbnailInit
  );
  useEffect(() => {
    sessionStorage.setItem(
      "selectedContentThumbnail",
      selectedContentThumbnail
    );
  }, [selectedContentThumbnail]);

  // ===== End generatedThumbnails =====

  // ===== Start MovieMyth/videoTranscription =====
  const videoTranscription = useSelector(
    (state: any) => state.contentCreator.videoTranscription
  );
  useEffect(() => {
    sessionStorage.setItem(
      "videoTranscription",
      JSON.stringify(videoTranscription)
    );
  }, [videoTranscription]);

  // ===== End MovieMyth/videoTranscription =====

  // ===== Start MovieMyth/uploadMoviePresignedURLData =====
  const [uploadMoviePresignedURLData, setUploadMoviePresignedURLData] =
    useSessionStorage<IUploadMoviePresignedURLData | null>(
      "ContentCreatorMovieMyth-uploadMoviePresignedURLData",
      null
    );
  // ===== End MovieMyth/uploadMoviePresignedURLData =====

  // ===== Start editContentData =====
  function editContentDataInit() {
    if (typeof window !== "undefined") {
      const editContentDataInitValue =
        sessionStorage.getItem("editContentData");
      return editContentDataInitValue
        ? JSON.parse(editContentDataInitValue)
        : null;
    } else {
      return null;
    }
  }
  const [editContentData, setEditContentData] =
    useState<any>(editContentDataInit);
  useEffect(() => {
    sessionStorage.setItem("editContentData", JSON.stringify(editContentData));
  }, [editContentData]);
  // ===== End editContentData =====

  // ===== 01. End Content Creator =====

  // Create a context value object
  const contextValue = {
    // ===== 01. Start Content Creator =====
    selectedContentType,
    setSelectedContentType,
    selectedBrand,
    setSelectedBrand,
    collectedData,
    setCollectedData,
    twitterData,
    setTwitterData,
    choosedArticles,
    setChoosedArticles,
    checkStatus,
    setCheckStatus,
    checkGrammer,
    checkPlagiarism,
    checkAi,
    startChecks,
    generateTitles,
    generatedTitles,
    setGeneratedTitles,
    lockedGeneratedTitles,
    setLockedGeneratedTitles,
    generatedThumbnails,
    setGeneratedThumbnails,
    generateThumbnails,
    selectedContentThumbnail,
    setSelectedContentThumbnail,
    selectedContentTitle,
    setSelectedContentTitle,

    uploadMoviePresignedURLData,
    setUploadMoviePresignedURLData,

    editContentData,
    setEditContentData,
    // ===== 01. End Content Creator =====
  };

  return (
    // to provide what i created
    <contentCreatorContext.Provider value={contextValue}>
      {children}
    </contentCreatorContext.Provider>
  );
}
