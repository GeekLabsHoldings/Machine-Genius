"use client";
import React, { useState } from "react";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./uploadMovie.module.css";
import { useRouter } from "next/navigation";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";

const MovieMyth = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function uploadVideo(file: File) {
    setIsLoading(true);
    setError(null);
    setUploadPercentage(0);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(file);
      await new Promise((resolve) => {
        videoElement.onloadedmetadata = () => {
          resolve(videoElement.duration);
        };
      });
      const duration = videoElement.duration;
      formData.append("duration", duration.toString());

      console.log("duration", duration.toString());

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://backendmachinegenius.onrender.com/transcript-audio",
        true
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadPercentage(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);
          dispatch(contentCreatorActions.setVideoTranscription(response));
          router.replace("/content-creator/create/movie-myth/create-movie");
        } else {
          throw new Error("Failed to upload video");
          setIsLoading(false);
        }
      };

      xhr.onerror = () => {
        setError("Upload failed due to an error.");
        setIsLoading(false);
      };

      xhr.send(formData);
    } catch (error: any) {
      setError(error.message);
      console.error("Error in uploadVideo:", error);
      setIsLoading(false);
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      uploadVideo(files[0]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
          <LogoAndTitle
            needTxt={true}
            textNeeded="Hold on tight."
            title="Genius is working on your article.."
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
              <input type="file" onChange={handleFileChange} />
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
