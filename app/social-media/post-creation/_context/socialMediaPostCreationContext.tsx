"use client";
import { createContext, useContext } from "react";
// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import toast from "react-hot-toast";
// import { v4 as uuidv4 } from "uuid";
import { globalContext } from "@/app/_context/store";
import useSessionStorage from "@/app/_hooks/useSessionStorage";

interface ContextState {
  selectedPlatform: PlatformEnum | "";
  setSelectedPlatform: (platform: PlatformEnum | "") => void;
  selectedBrand: string | "";
  setSelectedBrand: (brand: string | "") => void;
}

export enum PlatformEnum {
  TWITTER = "TWITTER",
  FACEBOOK = "FACEBOOK",
  LINKEDIN = "LINKEDIN",
  REDDIT = "REDDIT",
  TELEGRAM = "TELEGRAM",
  YOUTUBE = "YOUTUBE",
  INSTAGRAM = "INSTAGRAM",
}

enum brandEnum {
  PST = "PST",
  STREET_POLITICS = "Street Politics",
  MOVIE_MYTH = "Movie Myth",
  INVESTOCRACY = "Investocracy",
  MEDIA_PROJECTS = "Media Projects",
  PST_CANADA = "PST Canada",
  GEEK_LABS = "Geek Labs Holdings",
  machinegenius = "r/machinegenius",
}

const initialContextState: ContextState = {
  // ===== 01. Start =====
  selectedPlatform: "",
  setSelectedPlatform: () => {},
  selectedBrand: "",
  setSelectedBrand: () => {},
  // ===== 01. End =====
};

// 1- create context, export it
export const socialMediaPostCreationContext =
  createContext<ContextState>(initialContextState);

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
  const [selectedPlatform, setSelectedPlatform] = useSessionStorage<
    PlatformEnum | ""
  >("SocialMediaPostCreation-selectedPlatform", "", { isSerializable: false });

  const [selectedBrand, setSelectedBrand] = useSessionStorage<string | "">(
    "SocialMediaPostCreation-selectedBrand",
    "",
    { isSerializable: false }
  );
  // ===== 01. End =====

  // Create a context value object
  const contextValue: ContextState = {
    // ===== 01. Start =====
    selectedPlatform,
    setSelectedPlatform,
    selectedBrand,
    setSelectedBrand,
    // ===== 01. End =====
  };

  return (
    // to provide what i created
    <socialMediaPostCreationContext.Provider value={contextValue}>
      {children}
    </socialMediaPostCreationContext.Provider>
  );
}
