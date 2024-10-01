"use client";
import { createContext, useContext } from "react";
// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { globalContext } from "@/app/_context/store";

const initialContextState = {
  // ===== 01. Start =====
  // ===== 01. End =====
};

// 1- create context, export it
export const socialMediaPostCreationContext =
  createContext(initialContextState);

// 2- provide context, export it
export default function SocialMediaPostCreationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState, handleSignOut } = useContext(globalContext);
  //   const router = useRouter();
  //   const path = usePathname();

  // ===== 01. Start =====

  // ===== 01. End =====

  // Create a context value object
  const contextValue = {
    // ===== 01. Start =====
    // ===== 01. End =====
  };

  return (
    // to provide what i created
    <socialMediaPostCreationContext.Provider value={contextValue}>
      {children}
    </socialMediaPostCreationContext.Provider>
  );
}
