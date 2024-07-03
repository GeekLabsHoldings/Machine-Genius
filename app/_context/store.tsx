"use client";
import { createContext, useState } from "react";

const initialContextState = {
  generateContent: null as any,
  setGenerateContent: (content: any) => {},
  collectedData: null as any,
  setCollectedData: (data: any) => {},
  choosedArticles: [] as any,
  setChoosedArticles: (articles: any) => {},
  previewText: "" as string,
  setPreviewText: (text: any) => {},
  selectedText: [] as string[],
  setSelectedText: (text: string[]) => {},
  finalArticle: [] as any,
  setFinalArticle: (article: any) => {},
};

// 1- create context, export it
export const globalContext = createContext(initialContextState);

// 2- provide context, export it
export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [generateContent, setGenerateContent] = useState<any>(null);
  const [collectedData, setCollectedData] = useState<any>(null);
  const [choosedArticles, setChoosedArticles] = useState<any>([]);
  const [previewText, setPreviewText] = useState<any>("");
  const [selectedText, setSelectedText] = useState<string[]>([]); 
  const [finalArticle, setFinalArticle] = useState<any>([]);

  // Create a context value object
  const contextValue = {
    selectedText,
    setSelectedText,
    generateContent,
    setGenerateContent,
    collectedData,
    setCollectedData,
    previewText,
    setPreviewText,
    choosedArticles,
    setChoosedArticles,
    finalArticle,
    setFinalArticle,
  };

  return (
    // to provide what i created
    <globalContext.Provider value={contextValue}>
      {children}
    </globalContext.Provider>
  );
}
