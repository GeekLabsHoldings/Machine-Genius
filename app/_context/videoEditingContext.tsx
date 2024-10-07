"use client";
import { createContext, useContext, useEffect, useState } from "react";
import useSessionStorage from "../_hooks/useSessionStorage";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { v4 as uuidv4 } from "uuid";
// import { formatToText } from "@/app/_utils/contentFormatter";
// import { globalContext } from "./store";

// Define your interfaces
interface KeywordsAndImage {
  keyword: string;
  imageUrl: string[];
}

export interface ScriptSegment {
  index: number;
  text: string;
  keywordsAndImages: KeywordsAndImage[];
  audioPath: {
    index: number;
    url: string;
    duration: number;
  };
}

interface VideoEditingContextType {
  selectedContent: string;
  setSelectedContent: (content: string) => void;
  splitedContent: ScriptSegment[] | null;
  setSplitedContent: (content: ScriptSegment[] | null) => void;
  totalIntroSlides: number;
  setTotalIntroSlides: (total: number) => void;
}

const initialContextState: VideoEditingContextType = {
  selectedContent: "",
  setSelectedContent: () => {},
  splitedContent: null,
  setSplitedContent: () => {},
  totalIntroSlides: 0,
  setTotalIntroSlides: () => {},
};

// 1- create context, export it
export const videoEditingContext =
  createContext<VideoEditingContextType>(initialContextState);

// 2- provide context, export it
export default function VideoEditingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedContent, setSelectedContent] = useSessionStorage<string>(
    "VideoEditing-selectedContent",
    ""
  );

  const [splitedContent, setSplitedContent] = useSessionStorage<
    ScriptSegment[] | null
  >("VideoEditing-splitedContent", null);

  const [totalIntroSlides, setTotalIntroSlides] = useSessionStorage<number>(
    "VideoEditing-totalIntroSlides",
    0
  );

  // Create a context value object
  const contextValue: VideoEditingContextType = {
    selectedContent,
    setSelectedContent,
    splitedContent,
    setSplitedContent,
    totalIntroSlides,
    setTotalIntroSlides,
  };

  return (
    // to provide what i created
    <videoEditingContext.Provider value={contextValue}>
      {children}
    </videoEditingContext.Provider>
  );
}
