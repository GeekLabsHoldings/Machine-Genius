"use client";
import styles from "./create-movie.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { globalContext } from "@/app/_context/store";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
// import VideoPlayer from "@/app/_components/VideoPlayer/VideoPlayer";
const VideoPlayer = dynamic(
  () => import("@/app/_components/VideoPlayer/VideoPlayer"),
  {
    ssr: false,
  }
);

const CreateMovie = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const videoTranscription = useSelector(
    (state) => state.contentCreator.videoTranscription
  );

  const { selectedBrand } = useContext(globalContext);

  const [IsLoading, setIsLoading] = useState(false);

  function selectedTextInit() {
    if (typeof window !== "undefined") {
      const selectedTextInitValue = sessionStorage.getItem("selectedText");
      return selectedTextInitValue ? JSON.parse(selectedTextInitValue) : [];
    } else {
      return [];
    }
  }
  const [selectedText, setSelectedText] = useState(selectedTextInit());
  useEffect(() => {
    sessionStorage.setItem("selectedText", JSON.stringify(selectedText));
  }, [selectedText]);

  const [highlightTranscriptionTime, setHighlightTranscriptionTime] =
    useState(null);

  const highlightTime = videoTranscription?.transcriptionResults
    .slice() // Create a shallow copy of the array
    .sort((a, b) => a.part - b.part)
    .map((e) => {
      const [start, end] = e["time duration"].split(":").map(Number);
      return {
        id: e.part,
        start, // Ensure they are numbers
        end, // Ensure they are numbers
      };
    });

  const videoRef = useRef(null);

  function formatTime(seconds) {
    const pad = (num) => String(num).padStart(2, "0");
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  function handleTimeStampFormat(timeDuration) {
    const [start, end] = timeDuration.split(":").map(Number);
    return {
      formatted: `${formatTime(start)} - ${formatTime(end)}`,
      start: start || 0, // Ensure it defaults to 0 if NaN
      end: end || 0, // Ensure it defaults to 0 if NaN
    };
  }

  const handleTranscriptClick = (timeDuration) => {
    const { start } = handleTimeStampFormat(timeDuration);
    if (videoRef.current) {
      videoRef.current.currentTime = start;
      videoRef.current.play();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      setHighlightTranscriptionTime(currentTime);
    };

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (video) {
        // video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [videoRef]);

  async function finalizeContent() {
    let brandNamePayload = "";
    console.log(`selectedBrand`, selectedBrand);
    console.log(`selectedText`, selectedText);

    if (selectedBrand === "PST Canada") {
      brandNamePayload = "StreetPolitics";
    } else if (selectedBrand === "Investorcracy") {
      brandNamePayload = "Investocracy";
    } else if (selectedBrand === "Movie Myth") {
      brandNamePayload = "Moviemyth";
    }
    console.log(`finalizeContent brandNamePayload:`, brandNamePayload);
    setIsLoading(true);
    const maxRetries = 2; // Define the maximum number of retries
    let attempts = 0;
    let json = null;

    while (attempts < maxRetries) {
      try {
        const res = await fetch(
          `https://backendmachinegenius.onrender.com/script/finalize-content`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify(postBody),
            body: JSON.stringify({
              selectedContent: selectedText.map((item) => item.text).join(" "),
              brandName: brandNamePayload,
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        json = await res.json();

        if (json.articles[0]?.content) {
          // If content is found, break the loop
          break;
        }
      } catch (error) {
        console.error("Error finalizeContent:", error);
      } finally {
        attempts++;
      }
    }

    if (json?.articles[0]?.content) {
      // await setFinalArticleAsync(json);
      dispatch(contentCreatorActions.setFinalArticle(json));
      router.replace("/content-creator/create/movie-myth/final-movie");
    } else {
      // setIsRetry(true);
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
  }


  const handleSelectedText = () => {
    const button = document.getElementById("highlight-btn");
    const selection = window.getSelection();
    if (selection) {
      const getSelectedText = selection.toString();
      if (getSelectedText.length > 0) {
        setSelectedText((prev) => [
          ...prev,
          {
            text: getSelectedText,
          },
        ]);
      }
      if (button) {
        button.style.display = "none";
      }
    }
  };

  useEffect(() => {
    const button = document.getElementById("highlight-btn");
    const articleContent = document.querySelector("#article-content");
    let clientX, clientY;

    if (articleContent && button) {
      articleContent.addEventListener("mousedown", function (event) {
        clientX = event.pageX;
        clientY = event.pageY;
      });

      articleContent.addEventListener("mouseup", () => {
        let selectionFromDocument = document.getSelection();
        let textValue = selectionFromDocument.toString();

        if (textValue == "") {
          button.style.display = "none";
        } else {
          // Get coOrdinates of the content div
          let coOrdinates = articleContent.getBoundingClientRect();

          // Calculate button dimensions
          let buttonWidth = button.offsetWidth;
          let buttonHeight = button.offsetHeight;

          // Calculate maximum allowable positions
          let maxPosX = coOrdinates.right - buttonWidth;
          let maxPosY = coOrdinates.bottom - buttonHeight;

          // Constrain posX and posY
          let posX = Math.min(
            Math.max(clientX - Math.round(coOrdinates.left), 0),
            maxPosX
          );
          let posY = Math.min(
            Math.max(clientY - Math.round(coOrdinates.top) - 40, 0),
            maxPosY
          );

          // Set the display style of the button to block
          button.style.display = "block";
          // Set the position of the button
          button.style.left = posX + "px";
          button.style.top = posY + "px";
        }
      });
    }

    return () => {
      if (articleContent && button) {
        articleContent.removeEventListener("mousedown", () => {});
        articleContent.removeEventListener("mouseup", () => {});
      }
    };
  }, []);

  useEffect(() => {
    console.log(selectedText);
  }, [selectedText]);

  if (IsLoading) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
        <LogoAndTitle
          needTxt={true}
          textNeeded="Hold on tight."
          title="Genius is working on your article.."
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[1vw]">
      <div className="flex justify-center items-center pageHeader h-[75vh] py-[1.5vw] w-full gap-[2vw]">
        <button
          id="highlight-btn"
          className={`${styles.highlightBtn}`}
          onClick={() => {
            handleSelectedText();
          }}
        >
          Select
        </button>
        {/* transcript section */}
        <div
          className={`${styles.createMovie} w-5/12 h-full`}
          id="article-content"
        >
          <h3>Transcribe</h3>
          <div
            className={`${styles.box} flex flex-col px-[1.5vw] pt-[4vw] pb-[1.5vw] gap-[1vw]`}
          >
            {videoTranscription &&
              [...videoTranscription?.transcriptionResults]
                .sort((a, b) => a.part - b.part)
                .map((transcript) => {
                  const { formatted, start, end } = handleTimeStampFormat(
                    transcript["time duration"]
                  );
                  const isActive =
                    highlightTranscriptionTime >= start &&
                    highlightTranscriptionTime <= end;
                  return (
                    <div
                      key={transcript.part}
                      className={`flex flex-col cursor-pointer ${styles.script}`}
                      onClick={() =>
                        handleTranscriptClick(transcript["time duration"])
                      }
                    >
                      <p className={isActive ? styles.highlight : ""}>
                        {transcript.transcription.content}
                      </p>
                      <span className="self-end">{formatted}</span>
                    </div>
                  );
                })}
          </div>
        </div>
        {/* section to display your selected movie */}
        <div className={`${styles.createMovie} w-7/12 h-full`}>
          <h3>Preview</h3>
          <div
            className={`${styles.box} flex justify-center items-center ${styles.movieWrapper}`}
          >
            <VideoPlayer
              src={videoTranscription?.movie_url}
              highlightTime={highlightTime}
              videoRef={videoRef}
            />
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
          // href={"/content-creator/create/movie-myth/final-movie"}
          onClick={() => {
            finalizeContent();
          }}
        />
      </div>
    </div>
  );
};

export default CreateMovie;
