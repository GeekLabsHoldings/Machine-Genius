"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";
import { v4 as uuidv4 } from "uuid";

const initialContextState = {
  // ===== 01. Start Content Creator =====

  selectedBrand: "" as any,
  setSelectedBrand: (brand: any) => {},
  collectedData: null as any,
  setCollectedData: (data: any) => {},
  choosedArticles: [] as any,
  setChoosedArticles: (articles: any) => {},

  generateTitles: () => {},
  generatedTitles: [] as any,
  setGeneratedTitles: (titles: any) => {},
  lockedGeneratedTitles: [] as any,
  setLockedGeneratedTitles: (titles: any) => {},

  selectedContentTitle: "",
  setSelectedContentTitle: (title: any) => {},

  setGeneralTitles: (titles: any) => {},
  generalTitles: [] as any,
  subjectLine: [] as any,
  setSubjectLine: (lines: any) => {},
  openingLine: [] as any,
  setOpeningLine: (lines: any) => {},
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

  function subjectLineInit() {
    if (typeof window !== "undefined") {
      const subjectLineInitValue = sessionStorage.getItem("subjectLine");
      return subjectLineInitValue ? subjectLineInitValue : "";
    } else {
      return "";
    }
  }

  const [subjectLine, setSubjectLine] = useState(subjectLineInit);

  useEffect(() => {
    sessionStorage.setItem("subjectLine", subjectLine);
  }, [subjectLine]);

  function openingLineInit() {
    if (typeof window !== "undefined") {
      const openingLineInitValue = sessionStorage.getItem("openingLine");
      return openingLineInitValue ? openingLineInitValue : "";
    } else {
      return "";
    }
  }
  const [openingLine, setOpeningLine] = useState(openingLineInit);

  useEffect(() => {
    sessionStorage.setItem("openingLine", openingLine);
  }, [openingLine]);
  // ===== 01. Start Content Creator =====
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

  function generalTitlesInit() {
    if (typeof window !== "undefined") {
      const generalTitlesInitValue = sessionStorage.getItem(
        "Newsletter-generalTitles"
      );
      return generalTitlesInitValue ? JSON.parse(generalTitlesInitValue) : [];
    } else {
      return [];
    }
  }

  const [generalTitles, setGeneralTitles] = useState<any>(generalTitlesInit);
  useEffect(() => {
    sessionStorage.setItem(
      "Newsletter-generalTitles",
      JSON.stringify(generalTitles)
    );
  }, [generalTitles]);

  const [generatedTitles, setGeneratedTitles] =
    useState<any>(generatedTitlesInit);
  useEffect(() => {
    sessionStorage.setItem("generatedTitles", JSON.stringify(generatedTitles));
    console.log("generatedTitles:", generatedTitles);
  }, [generatedTitles]);

  async function generateTitles() {
    if (!generateTitles) {
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
        `https://api.machinegenius.io/social-media/news-letter/generate-titles`,
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
            articles: generalTitles.map((topic: any) => topic.generalTitle),
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
      } else if (Array.isArray(json)) {
        setGeneratedTitles(
          json.map((title: any) => ({
            id: uuidv4(),
            generalTitle: title,
          }))
        );
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

  // ===== 01. End Content Creator =====

  // Create a context value object
  const contextValue = {
    // ===== 01. Start Content Creator =====
    selectedBrand,
    setSelectedBrand,
    collectedData,
    setCollectedData,
    choosedArticles,
    setChoosedArticles,
    generateTitles,
    generatedTitles,
    setGeneratedTitles,
    lockedGeneratedTitles,
    setLockedGeneratedTitles,

    selectedContentTitle,
    setSelectedContentTitle,

    setGeneralTitles,
    generalTitles,

    subjectLine,
    setSubjectLine,
    openingLine,
    setOpeningLine,
    // ===== 01. End Content Creator =====
  };

  return (
    // to provide what i created
    <createNewsletterContext.Provider value={contextValue}>
      {children}
    </createNewsletterContext.Provider>
  );
}
