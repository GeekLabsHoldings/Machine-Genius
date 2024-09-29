"use client";
import { createContext, useContext, useEffect, useState } from "react";
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
}

const initialContextState: VideoEditingContextType = {
  selectedContent: "",
  setSelectedContent: () => {},
  splitedContent: null,
  setSplitedContent: () => {},
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
  // const { authState, handleSignOut } = useContext(globalContext);
  // const router = useRouter();

  // ===== Start selectedContent =====
  const [selectedContent, setSelectedContent] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedContentInitValue = sessionStorage.getItem(
        "VideoEditing-selectedContent"
      );
      if (selectedContentInitValue !== null) {
        setSelectedContent(selectedContentInitValue);
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("VideoEditing-selectedContent", selectedContent);
    console.log("VideoEditing-selectedContent:", selectedContent);
  }, [selectedContent]);
  // ===== End selectedContent =====

  // ===== Start splitedContent =====
  const [splitedContent, setSplitedContent] = useState<ScriptSegment[] | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const splitedContentInitValue = sessionStorage.getItem(
        "VideoEditing-splitedContent"
      );
      if (splitedContentInitValue !== null) {
        setSplitedContent(JSON.parse(splitedContentInitValue));
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "VideoEditing-splitedContent",
      JSON.stringify(splitedContent)
    );
    console.log("VideoEditing-splitedContent:", splitedContent);
  }, [splitedContent]);
  // ===== End splitedContent =====

  // Create a context value object
  const contextValue: VideoEditingContextType = {
    selectedContent,
    setSelectedContent,
    splitedContent,
    setSplitedContent,
  };

  return (
    // to provide what i created
    <videoEditingContext.Provider value={contextValue}>
      {children}
    </videoEditingContext.Provider>
  );
}
