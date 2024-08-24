"use client";
import styles from "./generated-thumbnails.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { useSelector } from "react-redux";
import { globalContext } from "@/app/_context/store";
import { contentCreatorContext } from "@/app/_context/contentCreatorContext";
import { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useRouter } from "next/navigation";
// import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";

const GeneratedThumbnailsPage = () => {
  const { token } = useContext(globalContext);
  const {
    selectedContentType,
    selectedBrand,
    selectedContentTitle,
    generatedThumbnails,
    generateThumbnails,
    selectedContentThumbnail,
    setSelectedContentThumbnail,
    editContentData,
    setEditContentData,
  } = useContext(contentCreatorContext);
  const finalArticle: any = useSelector(
    (state: any) => state.contentCreator.finalArticle
  );
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState(false);
  const [IsSendLoading, setIsSendLoading] = useState(false);
  const [triggerSendContent, setTriggerSendContent] = useState(false);
  const getValue = useCallback((value: string | number) => {
    if (value !== selectedContentThumbnail) {
      setSelectedContentThumbnail(value);
    }
  }, []); // No dependencies, function reference is stable

  async function handleGenerateThumbnails() {
    setIsLoading(true);
    await generateThumbnails();
    setIsLoading(false);
  }

  useEffect(() => {
    handleGenerateThumbnails();
    // Cleanup
    return () => {
      setEditContentData(null);
      sessionStorage.removeItem("editContentData");
    };
  }, []);

  function handleSelectThumbnail() {
    if (selectedContentThumbnail) {
      setTriggerSendContent(true);
    } else {
      toast.error("Please select a thumbnail!");
    }
    // todo: delete this condition after backend add Movie Myth brand
    if (selectedBrand === "Movie Myth") {
      setTriggerSendContent(true);
    }
  }

  useEffect(() => {
    if (triggerSendContent) {
      handleSendContent();
    }
  }, [triggerSendContent]);

  function generateData() {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    } as const;
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", options);

    // toLocaleDateString returns month abbreviation, convert to full month name
    const monthAbbreviations = {
      Jan: "January",
      Feb: "February",
      Mar: "March",
      Apr: "April",
      May: "May",
      Jun: "June",
      Jul: "July",
      Aug: "August",
      Sep: "September",
      Oct: "October",
      Nov: "November",
      Dec: "December",
    };
    const [day, monthAbbrev, year] = formattedDate.split(" ") as [
      string,
      keyof typeof monthAbbreviations,
      string
    ];
    const month = monthAbbreviations[monthAbbrev];

    return `${day} ${month} ${year}`;
  }

  async function handleSendContent() {
    let endpoint = editContentData
      ? `https://api.machinegenius.io/content-creation/content/${editContentData._id}`
      : "https://api.machinegenius.io/content-creation/content";
    let method = editContentData ? "PATCH" : "POST";
    setIsSendLoading(true);
    let postBody: any = {
      content_title: selectedContentTitle,
      content: finalArticle?.articles[0]?.content,
      brand: selectedBrand,
      content_type: selectedContentType,
      ...(method === "POST" && { date: generateData() }),
    };

    const maxRetries = 1; // Define the maximum number of retries
    let attempts = 0;
    let json = null;

    while (attempts < maxRetries) {
      try {
        const res = await fetch(endpoint, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : token
            }`,
          },
          body: JSON.stringify(postBody),
        });
        json = await res.json();
        if (json) {
          // If valid data is found, break the loop
          break;
        }
      } catch (error) {
        toast.error("Something went wrong! Contact backend department");
        console.error("Error handleSendContent:", error);
      } finally {
        attempts++;
      }
    }

    if (json) {
      // toast.success("Content sent successfully");
      if (selectedBrand === "Movie Myth") {
        router.replace("/content-creator/create/movie-myth/article-ready");
      } else {
        router.replace("/content-creator/create/schedule-script");
      }
    } else {
      // setIsRetry(true);
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
  }

  // =======================================================================
  // make current time in desired format
  const date = new Date();
  const currentHours = date.getHours();
  const amOrPm = currentHours > 12 ? "PM" : "AM";
  const hours = currentHours % 12;
  const currentTime =
    hours + ":" + date.getMinutes() + " " + amOrPm + " " + "GMT";
  // =======================================================================

  if (IsLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-w-[24rem] gap-[2vw] h-[75vh] py-[1.5vw]">
        <LogoAndTitle needTxt={false} title="Generating Thumbnails..." />
      </div>
    );
  }

  if (IsSendLoading) {
    return (
      <div className="flex flex-col justify-center items-center mx-auto h-[75vh] py-[1.5vw]">
        <div className={`${styles.genuisWorking}`}>
          <LogoAndTitle needTxt={false} title="Sending Content..." />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between m-auto h-[75vh] py-[1.5vw] w-full gap-[10vw]">
        <div className="w-5/12 flex flex-col gap-[1.5vw]">
          {/* Thumbnail of article */}
          <div className="flex flex-col gap-[1.5vw]">
            <div className={`${styles.yourThumbnail} pageHeader`}>
              <h3>Thumbnail</h3>
            </div>
            <CustomSelectInput
              label={"Select Thumbnail"}
              options={
                generatedThumbnails && generatedThumbnails?.length > 0
                  ? generatedThumbnails?.map((e: any) => e.Thumbnail)
                  : ["No Thumbnails Found"]
              }
              getValue={getValue}
            />
          </div>

          {/* preview of selected Thumbnail */}
          <div className={`flex flex-col gap-[0.8vw] ${styles.everySec}`}>
            <h5>Preview</h5>
            <div
              className={`${styles.imageHolder} h-[20vh] flex justify-center items-center`}
            >
              <svg
                width="50"
                height="44"
                viewBox="0 0 50 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M37.5 0C44.4036 0 50 5.59644 50 12.5V31.25C50 38.1536 44.4036 43.75 37.5 43.75H12.5C5.59644 43.75 0 38.1536 0 31.25V12.5C0 5.59644 5.59644 0 12.5 0H37.5ZM43.6975 15.6516C43.0832 15.0456 42.0939 15.0523 41.4878 15.6665L28.8865 28.4391L17.4651 17.0177L17.2985 16.8655C16.2707 16.0086 14.7483 16.1612 13.7901 17.1194L5.73474 25.1747L5.61333 25.311C5.12766 25.9243 5.16813 26.8178 5.73474 27.3844L5.87103 27.5058C6.48433 27.9915 7.37784 27.951 7.94445 27.3844L15.6792 19.6495L31.1464 35.1184L31.2827 35.2398C31.896 35.7255 32.7895 35.685 33.3561 35.1184C33.9663 34.5082 33.9663 33.5189 33.3561 32.9087L31.0958 30.6484L43.7124 17.8613L43.8329 17.7242C44.3144 17.1077 44.2679 16.2144 43.6975 15.6516ZM29.0625 7.8125C25.6107 7.8125 22.8125 10.6107 22.8125 14.0625C22.8125 17.5143 25.6107 20.3125 29.0625 20.3125C32.5143 20.3125 35.3125 17.5143 35.3125 14.0625C35.3125 10.6107 32.5143 7.8125 29.0625 7.8125ZM29.0625 10.9375C30.7884 10.9375 32.1875 12.3366 32.1875 14.0625C32.1875 15.7884 30.7884 17.1875 29.0625 17.1875C27.3366 17.1875 25.9375 15.7884 25.9375 14.0625C25.9375 12.3366 27.3366 10.9375 29.0625 10.9375Z"
                  fill="#202327"
                />
              </svg>
            </div>
          </div>

          <div className="w-full lg:w-6/12 flex flex-col gap-[2vw]">
            {/* put the title of article */}
            <div className={`flex flex-col gap-[0.8vw] ${styles.everySec}`}>
              <h5>Title</h5>
              <div className={styles.generatingInput}>
                <input type="text" value={selectedContentTitle} />
              </div>
            </div>
            {/* select wanted upload time and the default value is current time */}
            <div className={`flex flex-col gap-[0.8vw] ${styles.everySec}`}>
              <h5>Upload Time</h5>
              <CustomSelectInput label={currentTime} options={[currentTime]} />
            </div>
          </div>
        </div>

        {/* Article part */}
        <div className={`w-7/12`}>
          {/* Article Preview */}

          <div className={` ${styles.articlePreview} h-full `}>
            <div className={`${styles.articlePreviewData} `}>
              <h1 className="mx-auto font-bold text-2xl">
                {finalArticle?.articles[0]?.title}
              </h1>

              <div className={`${styles.articleContent}`}>
                <p>{finalArticle?.articles[0]?.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* buttons to move to last or next page */}
      <div className="flex justify-between items-center">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href={"/content-creator/create/generated-titles"}
        />
        <CustomBtn
          word={"Send"}
          btnColor="black"
          onClick={() => {
            handleSelectThumbnail();
          }}
        />
      </div>
    </div>
  );
};

export default GeneratedThumbnailsPage;
