"use client";
import React, { useState, useEffect, useContext } from "react";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./uploadMovie.module.css";
import { useRouter } from "next/navigation";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";
import { contentCreatorContext } from "@/app/_context/contentCreatorContext";

interface IPresignedURLData {
  message: string;
  preSignedURL: string;
  movieUrl: string;
  s3BucketURL: string;
}

interface ITranscriptionResult {
  part: number;
  timeDuration: string;
  transcription: {
    content: string;
  };
}

interface ITranscriptAudioData {
  transcriptionResults: ITranscriptionResult[];
}

const MovieMythUploadPage = () => {
  const { authState, handleSignOut } = useContext(globalContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const { setEditContentData } = useContext(contentCreatorContext);

  const [pageState, setPageState] = useState<{
    uploadPercentage: number;
    error: string | null;
    presignedURLData: IPresignedURLData | null;
    uploadVideoLoading: boolean;
    transcriptAudioLoading: boolean;
    triggerTranscriptAudio: boolean;
  }>({
    uploadPercentage: 0,
    error: null,
    presignedURLData: null,
    uploadVideoLoading: false,
    transcriptAudioLoading: false,
    triggerTranscriptAudio: false,
  });

  // reset all the data
  useEffect(() => {
    dispatch(contentCreatorActions.setVideoTranscription(null));
    setEditContentData(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("videoTranscription");
      sessionStorage.removeItem("editContentData");
    }
  }, []);

  // ===== 00. handleFileChange =====
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      // Validate file type on client-side before uploading
      if (!file.type.includes("video")) {
        toast.error("Unsupported file type. Please upload video.");
        return;
      }
      await uploadVideo(file);
    }
  };

  // ===== 01. get Presigned URL =====
  async function getPresignedURL() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/content-creation/get-presignedURL`,
        {
          headers: {
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
      const json: IPresignedURLData = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else {
        setPageState((prev) => ({ ...prev, presignedURLData: json }));
        return json;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getPresignedURL:", error);
    }
  }

  // ===== 02. upload video =====
  async function uploadVideo(file: File) {
    const getPresignedURLData: IPresignedURLData | undefined =
      await getPresignedURL();

    if (!getPresignedURLData) {
      toast.error("Failed to getPresignedURLData!");
      return;
    }

    setPageState((prev) => ({
      ...prev,
      uploadVideoLoading: true,
      error: null,
    }));
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/octet-stream");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: file,
      redirect: "follow" as RequestRedirect,
    };

    try {
      const response = await fetch(
        getPresignedURLData.preSignedURL,
        requestOptions
      );
      if (response.ok) {
        console.log("Upload successful");
        setPageState((prev) => ({ ...prev, triggerTranscriptAudio: true }));
      } else {
        const errorText = await response.text();
        toast.error(
          `Upload failed with status: ${response.status} - ${errorText}`
        );
        setPageState((prev) => ({
          ...prev,
          error: `Upload failed with status: ${response.status}`,
        }));
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
      setPageState((prev) => ({
        ...prev,
        error: error?.message,
      }));
      console.error("Error in uploadVideo:", error);
    } finally {
      setPageState((prev) => ({ ...prev, uploadVideoLoading: false }));
    }
  }

  // ===== 03. transcript-audio =====
  async function transcriptAudio() {
    setPageState((prev) => ({ ...prev, transcriptAudioLoading: true }));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/content-creation/transcript-audio`,
        {
          method: "POST",
          body: JSON.stringify({
            s3BucketURL: pageState.presignedURLData?.s3BucketURL,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
          redirect: "follow" as RequestRedirect,
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json: ITranscriptAudioData = await res.json();

      if (json && json?.transcriptionResults) {
        dispatch(contentCreatorActions.setVideoTranscription(json));
        router.replace("/content-creator/create/movie-myth/create-movie");
      } else {
        toast.error("Something went wrong!");
        setPageState((prev) => ({ ...prev, transcriptAudioLoading: false }));
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error transcriptAudio:", error);
      setPageState((prev) => ({ ...prev, transcriptAudioLoading: false }));
    }
  }

  useEffect(() => {
    if (pageState.triggerTranscriptAudio) {
      transcriptAudio();
    }
  }, [pageState.triggerTranscriptAudio]);

  if (pageState.uploadVideoLoading || pageState.transcriptAudioLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
        <LogoAndTitle
          needTxt={true}
          textNeeded="Hold on tight..."
          title={
            pageState.uploadVideoLoading
              ? "Uploading video..."
              : "Transcribing video..."
          }
        />

        {pageState.uploadPercentage > 0 && pageState.uploadVideoLoading && (
          <div className="mt-4">
            Upload Progress:{" "}
            <span className="font-bold">
              {pageState.uploadPercentage.toFixed(2)}%
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center w-[40vw] min-w-[30rem] mx-auto h-[75vh] py-[1.5vw]">
        <label className={styles.select_label}>Upload Movie</label>
        <div className={"w-full flex " + styles.uploud_movie}>
          <input type="file" accept="video/*" onChange={handleFileChange} />
        </div>
        {pageState.error && (
          <div className="text-red-500 mt-2">{pageState.error}</div>
        )}
      </div>

      <div className="flex justify-start items-center">
        <CustomBtn
          word="Back"
          btnColor="white"
          href="/content-creator/create/choose-brand"
        />
      </div>
    </div>
  );
};

export default MovieMythUploadPage;
