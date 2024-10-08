"use client";
import { createContext, useContext } from "react";
// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";
import { globalContext } from "@/app/_context/store";
import useSessionStorage from "@/app/_hooks/useSessionStorage";
import toast from "react-hot-toast";

interface ContextState {
  selectedContent: "";
  setSelectedContent: (content: ScriptSegment[] | null) => void;
  handleGenerateHashtags: () => Promise<string[] | void>;
}

interface GenerateHashtagsResponse {
  hashTags: string;
}

const initialContextState: ContextState = {
  // ===== 01. Start =====
  selectedContent: "",
  setSelectedContent: () => {},
  handleGenerateHashtags: async () => {},
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
  const [selectedContent, setSelectedContent] = useSessionStorage<
    ScriptSegment[] | null
  >("SocialMediaPostSharing-selectedContent", null);

  async function handleGenerateHashtags(): Promise<string[] | void> {
    if (!postCaption) {
      toast.error("No post caption provided!");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/generate-hashtags`,
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
      const json: GenerateHashtagsResponse = await res.json();
      if (json && json.hashTags) {
        return json.hashTags.match(/#\w+/g) || [];
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
    selectedContent,
    setSelectedContent,
    handleGenerateHashtags,
    // ===== 01. End =====
  };

  return (
    // to provide what i created
    <socialMediaPostSharingContext.Provider value={contextValue}>
      {children}
    </socialMediaPostSharingContext.Provider>
  );
}
