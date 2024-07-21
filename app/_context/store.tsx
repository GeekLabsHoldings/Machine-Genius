"use client";
import { createContext, useEffect, useState } from "react";

const initialContextState = {
  selectedBrand: "" as any,
  setSelectedBrand: (brand: any) => {},
  collectedData: null as any,
  setCollectedData: (data: any) => {},
  twitterData: null as any,
  setTwitterData: (data: any) => {},
  choosedArticles: [] as any,
  setChoosedArticles: (articles: any) => {},
  finalArticle: null as any,
  setFinalArticle: (article: any) => {},
  checkGrammerResults: [] as any,
  setCheckGrammerResults: (result: any) => {},
  checkAiResults: [] as any,
  setCheckAiResults: (result: any) => {},
};

// 1- create context, export it
export const globalContext = createContext(initialContextState);

// 2- provide context, export it
export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  function selectedBrandInit(){
    if (typeof window !== "undefined") {
      const selectedBrandInitValue = sessionStorage.getItem("selectedBrand");
      return selectedBrandInitValue ? selectedBrandInitValue : "";
    } else{
      return "";
    }
  }
  const [selectedBrand, setSelectedBrand] = useState<any>(selectedBrandInit());
  useEffect(() => {
    sessionStorage.setItem("selectedBrand", selectedBrand);
  }, [selectedBrand]);


  function collectedDataInit(){
    if (typeof window !== "undefined") {
      const collectedDataInitValue = sessionStorage.getItem("collectedData");
      return collectedDataInitValue ? JSON.parse(collectedDataInitValue) : null;
    } else{
      return null;
    }
  }
  const [collectedData, setCollectedData] = useState<any>(collectedDataInit());
  useEffect(() => {
    sessionStorage.setItem("collectedData", JSON.stringify(collectedData));
  }, [collectedData]);


  function twitterDataInit(){
    if (typeof window !== "undefined") {
      const twitterDataInitValue = sessionStorage.getItem("twitterData");
      return twitterDataInitValue ? JSON.parse(twitterDataInitValue) : null;
    } else{
      return null;
    }
  }
  const [twitterData, setTwitterData] = useState<any>(twitterDataInit());
  useEffect(() => {
    sessionStorage.setItem("twitterData", JSON.stringify(twitterData));
  }, [twitterData]);

  
  function choosedArticlesInit(){
    if (typeof window !== "undefined") {
      const choosedArticlesInitValue = sessionStorage.getItem("choosedArticles");
      return choosedArticlesInitValue ? JSON.parse(choosedArticlesInitValue) : [];
    } else{
      return [];
    }
  }
  const [choosedArticles, setChoosedArticles] = useState<any>(choosedArticlesInit()); 
  useEffect(() => {
    sessionStorage.setItem("choosedArticles", JSON.stringify(choosedArticles));
  }, [choosedArticles]);
  
  
  function finalArticleInit(){
    if (typeof window !== "undefined") {
      const finalArticleInitValue = sessionStorage.getItem("finalArticle");
      return finalArticleInitValue ? JSON.parse(finalArticleInitValue) : null;
    } else{
      return null;
    }
  }
  const [finalArticle, setFinalArticle] = useState<any>(finalArticleInit()); 
  useEffect(() => {
    sessionStorage.setItem("finalArticle", JSON.stringify(finalArticle));
  }, [finalArticle]);


  function checkGrammerResultsInit(){
    if (typeof window !== "undefined") {
      const checkGrammerResultsInitValue = sessionStorage.getItem("checkGrammerResults");
      return checkGrammerResultsInitValue ? JSON.parse(checkGrammerResultsInitValue) : [];
    } else{
      return [];
    }
  }
  const [checkGrammerResults, setCheckGrammerResults] = useState<any>(checkGrammerResultsInit()); 
  useEffect(() => {
    sessionStorage.setItem("checkGrammerResults", JSON.stringify(checkGrammerResults));
  }, [checkGrammerResults]);


  function checkAiResultsInit(){
    if (typeof window !== "undefined") {
      const checkAiResultsInitValue = sessionStorage.getItem("checkAiResults");
      return checkAiResultsInitValue ? JSON.parse(checkAiResultsInitValue) : [];
    } else{
      return [];
    }
  }
  const [checkAiResults, setCheckAiResults] = useState<any>(checkAiResultsInit());
  useEffect(() => {
    sessionStorage.setItem("checkAiResults", JSON.stringify(checkAiResults));
  }, [checkAiResults]);


  // Create a context value object
  const contextValue = {
    selectedBrand,
    setSelectedBrand,
    collectedData,
    setCollectedData,
    twitterData,
    setTwitterData,
    choosedArticles,
    setChoosedArticles,
    finalArticle,
    setFinalArticle,
    checkGrammerResults,
    setCheckGrammerResults,
    checkAiResults,
    setCheckAiResults,
  };

  return (
    // to provide what i created
    <globalContext.Provider value={contextValue}>
      {children}
    </globalContext.Provider>
  );
}
