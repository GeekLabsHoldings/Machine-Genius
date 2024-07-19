"use client";
import { createContext, useState } from "react";

const initialContextState = {
  selectedBrand: "" as any,
  setSelectedBrand: (brand: any) => {},
  collectedData: null as any,
  setCollectedData: (data: any) => {},
  choosedArticles: [] as any,
  setChoosedArticles: (articles: any) => {},
  selectedText: [] as any,
  setSelectedText: (text: any) => {},
  finalArticle: null as any,
  setFinalArticle: (article: any) => {},
  checkGrammerResults: [] as any,
  setCheckGrammerResults: (result: any) => {},
};

// 1- create context, export it
export const globalContext = createContext(initialContextState);

// 2- provide context, export it
export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedBrand, setSelectedBrand] = useState<any>("");
  const [collectedData, setCollectedData] = useState<any>(null);
  const [choosedArticles, setChoosedArticles] = useState<any>([]);
  const [selectedText, setSelectedText] = useState<any>([]);
  const [finalArticle, setFinalArticle] = useState<any>(null);
  const [checkGrammerResults, setCheckGrammerResults] = useState<any>([]);

  // Create a context value object
  const contextValue = {
    selectedBrand,
    setSelectedBrand,
    selectedText,
    setSelectedText,
    collectedData,
    setCollectedData,
    choosedArticles,
    setChoosedArticles,
    finalArticle,
    setFinalArticle,
    checkGrammerResults,
    setCheckGrammerResults,
  };

  return (
    // to provide what i created
    <globalContext.Provider value={contextValue}>
      {children}
    </globalContext.Provider>
  );
}
