"use client";
import styles from "./create-movie.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { useSelector } from "react-redux";
import { useRef } from "react";
import dynamic from "next/dynamic";
// import VideoPlayer from "@/app/_components/VideoPlayer/VideoPlayer";
const VideoPlayer = dynamic(
  () => import("@/app/_components/VideoPlayer/VideoPlayer"),
  {
    ssr: false,
  }
);

const CreateMovie = () => {
  const videoTranscription = useSelector(
    (state) => state.contentCreator.videoTranscription
  );

  const highlightTime = videoTranscription?.transcriptionResults
    .slice() // Create a shallow copy of the array
    .sort((a, b) => a.part - b.part)
    .map((e) => {
      const [start, end] = e["time duration"].split(":");
      return {
        id: e.part,
        start: start.trim(), // Ensure no leading/trailing spaces
        end: end.trim(), // Ensure no leading/trailing spaces
      };
    });

  const videoRef = useRef(null);

  const handleTranscriptClick = (timeDuration) => {
    const [start] = timeDuration.split(":").map(Number);
    if (videoRef.current) {
      videoRef.current.currentTime = start;
    }
  };

  return (
    <div className="flex flex-col gap-[1vw]">
      <div className="flex justify-center items-center pageHeader h-[75vh] py-[1.5vw] w-full gap-[2vw]">
        {/* transcript section */}
        <div className={`${styles.createMovie} w-5/12 h-full`}>
          <h3>Transcribe</h3>
          <div
            className={`${styles.box} flex flex-col px-[1.5vw] pt-[4vw] pb-[1.5vw] gap-[1vw]`}
          >
            {videoTranscription &&
              [...videoTranscription?.transcriptionResults]
                .slice() // Create a shallow copy of the array
                .sort((a, b) => a.part - b.part)
                .map((transcript) => (
                  <div
                    key={transcript.part}
                    className={`flex flex-col cursor-pointer ${styles.script} `}
                    onClick={() =>
                      handleTranscriptClick(transcript["time duration"])
                    }
                  >
                    <p>{transcript.transcription.content}</p>
                    <span className="self-end">
                      {transcript["time duration"]}
                    </span>
                  </div>
                ))}
          </div>
        </div>
        {/* section to display your selected movie */}
        <div className={`${styles.createMovie} w-7/12 h-full`}>
          <h3>Preview</h3>
          <div
            className={`${styles.box} flex justify-center items-center ${styles.movieWrapper}`}
          >
            {/* <div className={styles.videoWrapper}>
              <video
                ref={videoRef}
                className="w-full h-full"
                controls
                preload="none"
                autoPlay
              >
                <source src="/1.mp4" type="video/mp4" />
                <track
                  src="/path/to/captions.vtt"
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                />
                Your browser does not support the video tag.
              </video>
            </div> */}
            <VideoPlayer src="/1.mp4" highlightTime={highlightTime} videoRef={videoRef} />
          </div>
        </div>
      </div>
      {/* buttons lead you to last and next page */}
      <div className="flex justify-between w-full">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href={"/content-creator/create/movie-myth/"}
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href={"/content-creator/create/movie-myth/movie-script"}
        />
      </div>
    </div>
  );
};

export default CreateMovie;
