"use client";
import { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { v4 as uuidv4 } from "uuid";
// import { formatToText } from "@/app/_utils/contentFormatter";
// import { globalContext } from "./store";

const initialContextState = {
  selectedContent: "" as string,
  setSelectedContent: (content: string) => {},
  splitedContent: null as [] | null,
  setSplitedContent: (content: [] | null) => {},
};

// 1- create context, export it
export const videoEditingContext = createContext(initialContextState);

// 2- provide context, export it
export default function VideoEditingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { authState, handleSignOut } = useContext(globalContext);
  // const router = useRouter();

  // ===== Start selectedContent =====
  function selectedContentInit(): string {
    if (typeof window !== "undefined") {
      const selectedContentInitValue = sessionStorage.getItem(
        "VideoEditing-selectedContent"
      );
      return selectedContentInitValue ? selectedContentInitValue : "";
    } else {
      return "";
    }
  }

  const [selectedContent, setSelectedContent] =
    useState<string>(selectedContentInit);

  useEffect(() => {
    sessionStorage.setItem("VideoEditing-selectedContent", selectedContent);
    console.log("VideoEditing-selectedContent:", selectedContent);
  }, [selectedContent]);
  // ===== End selectedContent =====

  // ===== Start splitedContent =====
  function splitedContentInit(): [] | null {
    if (typeof window !== "undefined") {
      const splitedContentInitValue = sessionStorage.getItem(
        "VideoEditing-splitedContent"
      );
      return splitedContentInitValue ? JSON.parse(splitedContentInitValue) : null;
    } else {
      return null;
    }
  }

  const [splitedContent, setSplitedContent] = useState<[] | null>(splitedContentInit);

  useEffect(() => {
    sessionStorage.setItem(
      "VideoEditing-splitedContent",
      JSON.stringify(splitedContent)
    );
    console.log("VideoEditing-splitedContent:", splitedContent);
  }, [splitedContent]);
  // ===== End splitedContent =====

  // Create a context value object
  const contextValue = {
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
