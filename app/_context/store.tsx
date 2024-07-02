"use client";
import { createContext, useState } from "react";

const initialContextState = {
  selectedText: [] as string[],
  setSelectedText: (text: string[]) => {},
  generateContent: null as any,
  setGenerateContent: (content: any) => {},
  previewText: "" as string,
  setPreviewText: (text: any) => {},
  choosedArticles: [] as any,
  setChoosedArticles: (articles: any) => {},
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
  const [selectedText, setSelectedText] = useState<string[]>([]);
  const [generateContent, setGenerateContent] = useState<any>(null);
  const [previewText, setPreviewText] = useState<any>("");
  const [choosedArticles, setChoosedArticles] = useState<any>([]);
  const [finalArticle, setFinalArticle] = useState<any>([]);

  // Create a context value object
  const contextValue = {
    selectedText,
    setSelectedText,
    generateContent,
    setGenerateContent,
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
