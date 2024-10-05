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
      uploadPercentage: 0, // Reset upload percentage
    }));

    const xhr = new XMLHttpRequest();

    xhr.open("PUT", getPresignedURLData.preSignedURL, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");

    // Listen to the upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentCompleted = (event.loaded / event.total) * 100;
        setPageState((prev) => ({
          ...prev,
          uploadPercentage: percentCompleted,
        }));
      }
    };

    // Handle successful upload
    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 204) {
        console.log("Upload successful");
        setPageState((prev) => ({
          ...prev,
          triggerTranscriptAudio: true,
          uploadPercentage: 100, // Ensure it's set to 100% on success
        }));
      } else {
        const errorText = xhr.statusText || "Unknown error";
        toast.error(`Upload failed with status: ${xhr.status} - ${errorText}`);
        setPageState((prev) => ({
          ...prev,
          error: `Upload failed with status: ${xhr.status}`,
        }));
      }

      setPageState((prev) => ({
        ...prev,
        uploadVideoLoading: false,
      }));
    };

    // Handle network or other errors
    xhr.onerror = () => {
      toast.error("Something went wrong during the upload!");
      setPageState((prev) => ({
        ...prev,
        error: "Network error during upload.",
        uploadVideoLoading: false,
      }));
      console.error("Error in uploadVideo:", xhr.statusText);
    };

    // Send the request
    xhr.send(file);
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

      if (
        json &&
        json?.transcriptionResults &&
        Array.isArray(json?.transcriptionResults) &&
        json?.transcriptionResults.length > 0
      ) {
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
          title={
            pageState.uploadVideoLoading
              ? "Uploading video..."
              : "Transcribing video..."
          }
        />

        {pageState.uploadPercentage > 0 && pageState.uploadVideoLoading && (
          <div className="mt-[--sy-10px] w-full max-w-md mx-auto overflow-hidden">
            {/* Label and Percentage */}
            <div className="flex justify-between mb-[--sy-8px]">
              <span className="text-[--18px] font-medium text-gray-700">
                Upload Progress
              </span>
              <span className="text-[--18px] font-semibold text-gray-700">
                {pageState.uploadPercentage.toFixed(2)}%
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-gray-300 rounded-full h-[--16px] overflow-hidden">
              {/* Progress Bar */}
              <div
                className="bg-[--dark] h-[--16px] rounded-full transition-all duration-300"
                style={{ width: `${pageState.uploadPercentage}%` }}
              ></div>
            </div>
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
