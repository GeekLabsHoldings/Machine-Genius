"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { formatToText } from "@/app/_utils/contentFormatter";
import { globalContext } from "./store";

const initialContextState = {
  // selectedContentType: "" as any,
  // setSelectedContentType: (contentType: any) => {},
};

// 1- create context, export it
export const videoEditingContext = createContext(initialContextState);

// 2- provide context, export it
export default function VideoEditingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState, handleSignOut } = useContext(globalContext);
  const router = useRouter();

  // ===== Start selectedContentType =====
  // function selectedContentTypeInit() {
  //   if (typeof window !== "undefined") {
  //     const selectedContentTypeInitValue = sessionStorage.getItem(
  //       "selectedContentType"
  //     );
  //     return selectedContentTypeInitValue ? selectedContentTypeInitValue : "";
  //   } else {
  //     return "";
  //   }
  // }
  // const [selectedContentType, setSelectedContentType] = useState<any>(
  //   selectedContentTypeInit
  // );
  // useEffect(() => {
  //   sessionStorage.setItem("selectedContentType", selectedContentType);
  // }, [selectedContentType]);
  // ===== End selectedContentType =====

  // Create a context value object
  const contextValue = {
    // selectedContentType,
    // setSelectedContentType,
  };

  return (
    // to provide what i created
    <videoEditingContext.Provider value={contextValue}>
      {children}
    </videoEditingContext.Provider>
  );
}
