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
  const [error, setError] = useState(null);
  const router = useRouter();

  async function uploadVideo(file: File) {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      // formData.append("duration", "59:34:33");

      // Get video duration
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

      const res = await fetch(`https://backendmachinegenius.onrender.com/transcript-audio`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload video");
      }

      const json = await res.json();
      dispatch(contentCreatorActions.setVideoTranscription(json));
      if (json) {
        router.replace("/content-creator/create/movie-myth/create-movie");
      }
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
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center w-[40vw] min-w-[30rem] mx-auto h-[75vh] py-[1.5vw]">
            <label className={styles.select_label}>Upload Movie</label>
            <div className={"w-full flex " + styles.uploud_movie}>
              <input type="file" onChange={handleFileChange} />
              {/* <CustomBtn
                // btnColor="black"
                // word="Upload"
                // onClick={() => {
                  // const inputElement = document.querySelector(
                  //   'input[type="file"]'
                  // ) as HTMLInputElement;
                  // inputElement?.click();
                // }}
              /> */}
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
