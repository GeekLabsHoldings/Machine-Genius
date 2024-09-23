"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";

const initialContextState = {
  // ===== 01. Start Content Creator =====
  selectedContentType: "" as any,
  setSelectedContentType: (contentType: any) => {},
  selectedBrand: "" as any,
  setSelectedBrand: (brand: any) => {},
  collectedData: null as any,
  setCollectedData: (data: any) => {},
  choosedArticles: [] as any,
  setChoosedArticles: (articles: any) => {},

  checkStatus: {
    grammar: "waiting",
    // todo: temp until backend fix it
    plagiarism: "pass",
    ai: "waiting",
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

  presignedURLData: null as any,
  setPresignedURLData: (data: any) => {},

  editContentData: null as any,
  setEditContentData: (id: any) => {},
  // ===== 01. End Content Creator =====
};

// 1- create context, export it
export const createNewsletterContext = createContext(initialContextState);

// 2- provide context, export it
export default function CreateNewsletterContextProvider({
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
        `https://api.machinegenius.io/content-creation/generate-titles`,
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
        `https://api.machinegenius.io/content-creation/generate-thumbnails`,
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

  // ===== Start videoTranscription =====
  const videoTranscription = useSelector(
    (state: any) => state.contentCreator.videoTranscription
  );
  useEffect(() => {
    sessionStorage.setItem(
      "videoTranscription",
      JSON.stringify(videoTranscription)
    );
  }, [videoTranscription]);
  // ===============================================================

  // function presignedURLDataInit() {
  //   if (typeof window !== "undefined") {
  //     const presignedURLDataInitValue = sessionStorage.getItem("presignedURLData");
  //     return presignedURLDataInitValue ? JSON.parse(presignedURLDataInitValue) : null;
  //   } else {
  //     return null;
  //   }
  // }
  const [presignedURLData, setPresignedURLData] = useState<any>(null);
  // useEffect(() => {
  //   sessionStorage.setItem("presignedURLData", JSON.stringify(presignedURLData));
  // }, [presignedURLData]);

  // ===== End videoTranscription =====

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

    presignedURLData,
    setPresignedURLData,

    editContentData,
    setEditContentData,

    checkGrammer: () => {},
    checkPlagiarism: () => {},
    checkAi: () => {},
    startChecks: () => {},
    // ===== 01. End Content Creator =====
  };

  return (
    // to provide what i created
    <createNewsletterContext.Provider value={contextValue}>
      {children}
    </createNewsletterContext.Provider>
  );
}
