"use client";
import React, { createContext, useContext } from "react";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";
import { v4 as uuidv4 } from "uuid";
import useSessionStorage from "@/app/_hooks/useSessionStorage";

const initialContextState = {
  // ===== 01. Start Newsletter =====

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
  // ===== 01. End Newsletter =====
};

// 1- create context, export it
export const createNewsletterContext = createContext(initialContextState);

interface IGeneralTitles {
  generalTitle: string;
  id: string;
}

// 2- provide context, export it
export default function CreateNewsletterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState, handleSignOut } = useContext(globalContext);

  const [subjectLine, setSubjectLine] = useSessionStorage(
    "Newsletter-subjectLine",
    "",
    { isSerializable: false }
  );
  const [openingLine, setOpeningLine] = useSessionStorage(
    "Newsletter-openingLine",
    "",
    { isSerializable: false }
  );

  const [selectedBrand, setSelectedBrand] = useSessionStorage(
    "Newsletter-selectedBrand",
    "",
    { isSerializable: false }
  );

  const [collectedData, setCollectedData] = useSessionStorage(
    "Newsletter-collectedData",
    null
  );

  const [choosedArticles, setChoosedArticles] = useSessionStorage(
    "Newsletter-choosedArticles",
    []
  );

  const [generalTitles, setGeneralTitles] = useSessionStorage(
    "Newsletter-generalTitles",
    []
  );

  const [generatedTitles, setGeneratedTitles] = useSessionStorage<
    IGeneralTitles[]
  >("Newsletter-generatedTitles", []);

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
        `process.env.NEXT_PUBLIC_API_BASE_URL/social-media/news-letter/generate-titles`,
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

  const [selectedContentTitle, setSelectedContentTitle] = useSessionStorage(
    "Newsletter-selectedContentTitle",
    "",
    { isSerializable: false }
  );

  const [lockedGeneratedTitles, setLockedGeneratedTitles] = useSessionStorage(
    "Newsletter-lockedGeneratedTitles",
    []
  );

  // Create a context value object
  const contextValue = {
    // ===== 01. Start Newsletter =====
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
    // ===== 01. End Newsletter =====
  };

  return (
    // to provide what i created
    <createNewsletterContext.Provider value={contextValue}>
      {children}
    </createNewsletterContext.Provider>
  );
}
