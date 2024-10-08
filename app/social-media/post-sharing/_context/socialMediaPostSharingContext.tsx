"use client";
import { createContext, useContext } from "react";
// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";
import { globalContext } from "@/app/_context/store";
import useSessionStorage from "@/app/_hooks/useSessionStorage";
import toast from "react-hot-toast";

interface ContextState {
  selectedContent: string;
  setSelectedContent: (content: string) => void;
  handleGeneratePosts: () => Promise<string[] | void>;
}

interface IGeneratePostsResponse {
  posts: string[];
}

const initialContextState: ContextState = {
  // ===== 01. Start =====
  selectedContent: "",
  setSelectedContent: () => {},
  handleGeneratePosts: async () => {},
  // ===== 01. End =====
};

// 1- create context, export it
export const socialMediaPostSharingContext =
  createContext<ContextState>(initialContextState);

// 2- provide context, export it
export default function SocialMediaPostSharingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState, handleSignOut } = useContext(globalContext);
  //   const router = useRouter();
  //   const path = usePathname();

  // ===== 01. Start =====
  const [selectedContent, setSelectedContent] = useSessionStorage<string>(
    "SocialMediaPostSharing-selectedContent",
    "",
    { isSerializable: false }
  );

  async function handleGeneratePosts(): Promise<string[] | void> {
    if (!selectedContent) {
      toast.error("No content provided!");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/generate-posts`,
        {
          method: "POST",
          body: JSON.stringify({
            content: selectedContent,
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
      const json: IGeneratePostsResponse = await res.json();
      if (
        json &&
        json.posts &&
        Array.isArray(json.posts) &&
        json.posts.length > 0
      ) {
        return json.posts;
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleGeneratePosts:", error);
    }
  }
  // ===== 01. End =====

  // Create a context value object
  const contextValue: ContextState = {
    // ===== 01. Start =====
    selectedContent,
    setSelectedContent,
    handleGeneratePosts,
    // ===== 01. End =====
  };

  return (
    // to provide what i created
    <socialMediaPostSharingContext.Provider value={contextValue}>
      {children}
    </socialMediaPostSharingContext.Provider>
  );
}
