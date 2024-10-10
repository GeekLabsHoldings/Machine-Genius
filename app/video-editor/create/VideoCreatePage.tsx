"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./VideoCreatePage.module.css";
import { globalContext } from "@/app/_context/store";
import { videoEditingContext } from "@/app/_context/videoEditingContext";
import { useContext, useEffect, useState } from "react";
import { formatToText } from "@/app/_utils/contentFormatter";
import toast from "react-hot-toast";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useRouter } from "next/navigation";
import { truncateText } from "@/app/_utils/text";

interface AssignedVideo {
  _id: string;
  user_id: string;
  user_name: string;
  content_title: string;
  content: string;
  brand: string;
  content_type: string;
  date: string;
  approvals: string;
}

const VideoCreatePage = () => {
  const router = useRouter();
  const { authState, handleSignOut } = useContext(globalContext);
  const {
    selectedContent,
    setSelectedContent,
    splitedContent,
    setSplitedContent,
    setTotalIntroSlides,
  } = useContext(videoEditingContext);

  function parseParagraph(paragraph: string) {
    const result = {
      intro: "",
      selectedContent: "",
    };

    const introMatch = paragraph.match(/Intro([\s\S]*?)(?=Body|\s*$)/);
    const bodyMatch = paragraph.match(/Body([\s\S]*)/);

    if (introMatch) {
      result.intro = introMatch[1].trim();
    }

    if (bodyMatch) {
      result.selectedContent = bodyMatch[1].trim();
    }

    return result;
  }

  const [assignedVideos, setAssignedVideos] = useState<AssignedVideo[]>([]);

  useEffect(() => {
    setSplitedContent(null);
    setSelectedContent("");
    const fetchAssignedVideos = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/video-editing/get-all-content`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 401) {
        handleSignOut();
      }

      if (!res.ok) {
        toast.error("Failed to fetch assigned videos");
        return;
      }

      const data = await res.json();
      if (data.message === "successfully") {
        setAssignedVideos(data.content);
      } else {
        toast.error("Failed to fetch assigned videos");
      }
    };
    fetchAssignedVideos();
  }, []);

  const [pageState, setPageState] = useState<{
    createVideoLoading: boolean;
  }>({
    createVideoLoading: false,
  });

  function handleSetSplitedContent(content: any) {
    const introSlides = content.slideJson;
    const body = content.paragraphJson;

    // get all the keys in the intros object
    const introKeys = Object.keys(introSlides);

    const intro = introKeys.map((key) => introSlides[key][0]);

    // sort the intro slides by the index
    intro.sort((a: any, b: any) => a.index - b.index);

    setTotalIntroSlides(intro.length);

    return [...intro, ...body];
  }

  async function handleCreateVideo() {
    if (!selectedContent) {
      toast.error("No content found!");
      return;
    }
    try {
      // router.replace("/video-editor/create/converted-script");
      setPageState((prev) => ({ ...prev, createVideoLoading: true }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/video-editing/split-content`,
        {
          method: "POST",
          body: JSON.stringify(parseParagraph(selectedContent)),
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
      const data = await res.json();
      if (data && data.success === true) {
        setSplitedContent(handleSetSplitedContent(data));
      } else {
        toast.error("Something went wrong!");
        setPageState((prev) => ({ ...prev, createVideoLoading: false }));
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleCreateVideo:", error);
      setPageState((prev) => ({ ...prev, createVideoLoading: false }));
    }
  }

  useEffect(() => {
    if (splitedContent && splitedContent[0] !== null) {
      router.replace("/video-editor/create/converted-script");
    }
  }, [splitedContent]);

  useEffect(() => {
    if (selectedContent && !splitedContent) {
      handleCreateVideo();
    }
  }, [selectedContent]);

  // render assigned videos to every one and its status of completetion
  const renderVideosData = [...assignedVideos].reverse().map((video, idx) => (
    <ul
      key={idx}
      className="borderBottom w-full flex justify-between  items-center py-[0.5vh] text-center"
    >
      <li className="w-[10%]">{video._id}</li>
      <li className="w-[40%]">{truncateText(video.content_title, 100)}</li>
      <li className="w-[10%]">{new Date(video.date).toLocaleDateString()}</li>
      <li className="w-[25%]">
        <span
          className={
            // video.assignedTo === "Sherry"
            //   ? "bg-[#9B5FBFB2]"
            //   : video.assignedTo === "Kamel"
            //   ? "bg-[#E1C655B2]"
            //   : video.assignedTo === "Yara"
            //   ? "bg-[#31B2E9B2]"
            // :
            "bg-[#F36F24B2]"
          }
        >
          {video?.user_name?.split("@")[0]}
        </span>
      </li>
      {/* lead user to convert article to video or disply it after conversion */}
      <li className="w-[15%]">
        <CustomBtn
          class="videoStatusBtn"
          width="w-full"
          word="Create Video"
          onClick={() => {
            setSelectedContent(formatToText(video.content));
          }}
          btnColor="black"
        />
      </li>
    </ul>
  ));

  if (pageState.createVideoLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-w-[24rem] gap-[2vw] h-[75vh] py-[1.5vw]">
        <LogoAndTitle needTxt={false} title="Converting Script To Audio..." />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full pageHeader flex flex-col gap-[1vw]  ${styles.createVideo}`}
    >
      <h3 className="pt-[1vw]">Assigned Videos</h3>
      {/* render assigned videos in table */}
      <div className={styles.videoDatabase}>
        <div className={`${styles.videoWrapper} flex flex-col h-[70vh]`}>
          {/* table header */}
          <ul
            className={`${styles.tableHeader} w-full flex justify-between items-center text-center py-[2vh]`}
          >
            <li className="w-[10%]">#</li>
            <li className="w-[40%]">Script Title</li>
            <li className="w-[15%]">Date</li>
            <li className="w-[25%]">Assigned To</li>
            <li className="w-[15%]">Edit</li>
          </ul>
          {/* table body */}
          <div className={`${styles.tableBody} flex flex-col`}>
            {renderVideosData}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCreatePage;
