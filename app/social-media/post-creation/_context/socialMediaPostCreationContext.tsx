"use client";
import { createContext, useContext } from "react";
// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";
import { globalContext } from "@/app/_context/store";
import useSessionStorage from "@/app/_hooks/useSessionStorage";
import toast from "react-hot-toast";

interface ContextState {
  selectedPlatform: PlatformEnum | "";
  setSelectedPlatform: (platform: PlatformEnum | "") => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  postCaption: string;
  setPostCaption: (value: string | ((prev: string) => string)) => void;
  handleGenerateHashtags: () => void;
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

const initialContextState: ContextState = {
  // ===== 01. Start =====
  selectedPlatform: "",
  setSelectedPlatform: () => {},
  selectedBrand: "",
  setSelectedBrand: () => {},
  postCaption: "",
  setPostCaption: () => {},
  handleGenerateHashtags: () => {},
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

  const [selectedBrand, setSelectedBrand] = useSessionStorage<string>(
    "SocialMediaPostCreation-selectedBrand",
    "",
    { isSerializable: false }
  );

  const [postCaption, setPostCaption] = useSessionStorage<string>(
    "SocialMediaPostCreation-PostCaption",
    "",
    { isSerializable: false }
  );

  async function handleGenerateHashtags() {
    if (!postCaption) {
      toast.error("No post caption provided!");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/twitter/generate-hashtags`,
        {
          method: "POST",
          body: JSON.stringify({
            content: postCaption,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json = await res.json();
      if (json && json.hashTags) {
        return json.hashTags.match(/#\w+/g);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleGenerateHashtags:", error);
    }
  }
  // ===== 01. End =====

  // Create a context value object
  const contextValue: ContextState = {
    // ===== 01. Start =====
    selectedPlatform,
    setSelectedPlatform,
    selectedBrand,
    setSelectedBrand,
    postCaption,
    setPostCaption,
    handleGenerateHashtags,
    // ===== 01. End =====
  };

  return (
    // to provide what i created
    <socialMediaPostCreationContext.Provider value={contextValue}>
      {children}
    </socialMediaPostCreationContext.Provider>
  );
}
