"use client";
import React, { useState, useEffect, useContext } from "react";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./uploadMovie.module.css";
import { useRouter } from "next/navigation";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";
import { contentCreatorContext } from "@/app/_context/contentCreatorContext";

const MovieMyth = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setEditContentData, presignedURLData, setPresignedURLData } =
    useContext(contentCreatorContext);

  const [pageState, setPageState] = useState<{
    triggerUploadVideo: boolean;
    triggerTranscriptAudio: boolean;
  }>({
    triggerUploadVideo: false,
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

  // ===== 01. get Presigned URL =====
  async function getPresignedURL() {
    try {
      const res = await fetch(
        `https://api.machinegenius.io/content-creation/get-presignedURL`
      );
      const json = await res.json();
      if (!json) {
        toast.error("Something went wrong! Contact backend department");
        return;
      } else {
        setPresignedURLData(json);
        return json;
      }
    } catch (error) {
      toast.error("Something went wrong! Contact backend department");
      console.error("Error getPresignedURL:", error);
    }
  }

  // ===== 02. upload video =====
  async function uploadVideo(file: File) {
    const baseURL = await getPresignedURL();
    setIsLoading(true);
    setError(null);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/octet-stream");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: file,
      redirect: "follow" as RequestRedirect,
    };

    try {
      const response = await fetch(baseURL.preSignedURL, requestOptions);
      if (response.ok) {
        console.log("Upload successful");
        setPageState((prev) => ({ ...prev, triggerTranscriptAudio: true }));
      } else {
        const errorText = await response.text();
        toast.error(
          `Upload failed with status: ${response.status} - ${errorText}`
        );
        setError(`Upload failed with status: ${response.status}`);
      }
    } catch (error: any) {
      toast.error("Something went wrong! Contact backend department");
      setError(error?.message);
      console.error("Error in uploadVideo:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // ===== 03. transcript-audio =====
  async function transcriptAudio() {
    try {
      const res = await fetch(
        `https://api.machinegenius.io/content-creation/transcript-audio`,
        {
          method: "POST",
          body: JSON.stringify({
            s3BucketURL: presignedURLData.s3BucketURL,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow" as RequestRedirect,
        }
      );

      const json = await res.json();

      if (json && json?.transcriptionResults) {
        dispatch(contentCreatorActions.setVideoTranscription(json));
        router.replace("/content-creator/create/movie-myth/create-movie");
      } else {
        toast.error("Something went wrong! Error transcriptAudio");
      }
    } catch (error) {
      toast.error("Something went wrong! Error transcriptAudio");
      console.error("Error transcriptAudio:", error);
    }
  }

  // ===== 00. handleFileChange =====
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      uploadVideo(files[0]);
    }
  };

  useEffect(() => {
    if (pageState.triggerTranscriptAudio) {
      transcriptAudio();
    }
  }, [pageState.triggerTranscriptAudio]);

  return (
    <div className="flex flex-col h-full">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
          <LogoAndTitle
            needTxt={true}
            textNeeded="Hold on tight."
            title="Genius is uploading your video..."
          />
          <div className="mt-4">
            Upload Progress: {uploadPercentage.toFixed(2)}%
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center w-[40vw] min-w-[30rem] mx-auto h-[75vh] py-[1.5vw]">
            <label className={styles.select_label}>Upload Movie</label>
            <div className={"w-full flex " + styles.uploud_movie}>
              <input type="file" accept="video/*" onChange={handleFileChange} />
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        </>
      )}
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

export default MovieMyth;
