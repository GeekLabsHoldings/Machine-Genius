"use client";
import { createContext } from "react";
import useSessionStorage from "../_hooks/useSessionStorage";

// Define your interfaces
interface KeywordsAndImage {
  keyword: string;
  imageUrl: string[];
}

export interface ScriptSegment {
  index: number;
  title?: string;
  text?: string;
  keywordsAndImages?: KeywordsAndImage[];
  videoPath?: string;
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
  videoUrl: string;
  setVideoUrl: (url: string) => void;
}

const initialContextState: VideoEditingContextType = {
  selectedContent: "",
  setSelectedContent: () => {},
  splitedContent: null,
  setSplitedContent: (content: ScriptSegment[] | null) => {},
  totalIntroSlides: 4,
  setTotalIntroSlides: () => {},
  videoUrl: "",
  setVideoUrl: () => {},
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
    4
  );
  const [videoUrl, setVideoUrl] = useSessionStorage<string>(
    "VideoEditing-videoUrl",
    ""
  );

  // Create a context value object
  const contextValue: VideoEditingContextType = {
    selectedContent,
    setSelectedContent,
    splitedContent,
    setSplitedContent,
    totalIntroSlides,
    setTotalIntroSlides,
    videoUrl,
    setVideoUrl,
  };

  return (
    // to provide what i created
    <videoEditingContext.Provider value={contextValue}>
      {children}
    </videoEditingContext.Provider>
  );
}
