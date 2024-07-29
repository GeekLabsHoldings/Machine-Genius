"use client";
import React, { useState } from "react";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./uploadMovie.module.css";
import { useRouter } from "next/navigation";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";

const MovieMyth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [videoRes, setVideoRes] = useState(null);

  async function uploadVideo(file: File) {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("duration", "20");

      const res = await fetch(`https://convert-m16z.onrender.com/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload video");
      }

      const json = await res.json();
      setVideoRes(json);
      console.log(videoRes);
      // Handle response if needed
      // router.push("/content-creator/create/movie-myth/create-movie");
    } catch (error: any) {
      setError(error.message);
      console.error("Error in uploadVideo:", error);
    } finally {
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
              <CustomBtn
                btnColor="black"
                word="Upload"
                onClick={() => {
                  // const inputElement = document.querySelector(
                  //   'input[type="file"]'
                  // ) as HTMLInputElement;
                  // inputElement?.click();
                }}
              />
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
