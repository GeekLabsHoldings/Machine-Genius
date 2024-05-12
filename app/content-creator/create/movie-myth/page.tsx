'use client'
import React from 'react'
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./uploadMovie.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";

const MovieMyth = () => {
// loading state that make loading show or hidden
const [IsLoading, setIsLoading] = useState(false);

const router = useRouter();

const handleNavigate = () => {
// show loading
  setIsLoading(true);

  setTimeout(() => {
    // Your action here
    router.push("/content-creator/create/movie-myth/create-movie");
  }, 1500); // 3000 milliseconds = 3 seconds
};

return (
  <div className="flex flex-col h-full">
    {IsLoading ? (
      <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
        <LogoAndTitle
          needTxt={true}
          textNeeded="Hold on tight."
          title="Genius is working on your article.."
        />
      </div>
    ) : (
      <>
        <div
          className={
            "flex flex-col justify-center items-center w-[40vw] min-w-[30rem] mx-auto h-[75vh] py-[1.5vw] "
          }
        >
                  <label className={styles.select_label}>Upload Movie</label>
          <div className={"w-full flex "+ styles.uploud_movie}>
            {/* movie src input */}
          <input type="text" />

          {/* upload button */}
          <CustomBtn
            btnColor="black"
            word="Upload"
            onClick={handleNavigate}
          />
          </div>
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
}

export default MovieMyth;
