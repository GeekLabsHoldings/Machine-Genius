"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./generated-titles.module.css";
import TitleCheckWithLock from "@/app/_components/TitleCheckWithLock/TitleCheckWithLock";
import { useEffect, useState } from "react";
import { globalContext } from "@/app/_context/store";
import { useContext } from "react";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const ReGenerateIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" fill="none">
    <path
      d="M0.754732 6.49635C0.310457 6.55953 0.00154495 6.97089 0.0646763 7.41516C0.257889 8.77361 0.876039 10.0362 1.83056 11.0219C2.78517 12.0075 4.02716 12.6659 5.37876 12.9026C6.73034 13.1392 8.12216 12.9421 9.35487 12.3394C9.64191 12.1991 9.91688 12.0385 10.178 11.8593C10.622 11.5546 11.2322 11.5579 11.613 11.9387C12.1248 12.4506 13 12.088 13 11.3642V9.12498C13 8.57269 12.5523 8.12498 12 8.12498H9.76078C9.03693 8.12498 8.67441 9.00013 9.18626 9.51201C9.50975 9.83548 9.49955 10.3701 9.11337 10.6153C8.96152 10.7117 8.80392 10.8 8.64114 10.8796C7.71661 11.3316 6.67275 11.4794 5.65905 11.3019C4.64539 11.1244 3.71386 10.6307 2.99796 9.89137C2.28199 9.15207 1.81838 8.20527 1.67351 7.18636C1.61029 6.7421 1.19893 6.43317 0.754732 6.49635ZM3.64512 0.660543C3.35608 0.801857 3.07927 0.963766 2.81654 1.14447C2.37444 1.44855 1.76644 1.44537 1.38702 1.06594C0.875144 0.554093 0 0.916605 0 1.64047V3.875C0 4.42729 0.447716 4.875 1 4.875H3.23456C3.95842 4.875 4.32096 3.99983 3.80908 3.48799C3.48674 3.16564 3.49674 2.63303 3.88124 2.38813C4.03473 2.29037 4.19413 2.20093 4.35882 2.1204C5.2834 1.6684 6.32725 1.52056 7.34095 1.69807C8.35464 1.87558 9.28615 2.36934 10.0021 3.10861C10.718 3.84788 11.1816 4.79476 11.3265 5.81363C11.3897 6.25789 11.801 6.56681 12.2453 6.50363C12.6896 6.44045 12.9985 6.02909 12.9353 5.58483C12.7421 4.22635 12.124 2.96385 11.1694 1.97815C10.2148 0.992452 8.97283 0.334114 7.62124 0.0974319C6.26966 -0.139249 4.87784 0.0578646 3.64512 0.660543Z"
      fill="#FFFFFB"
    />
  </svg>
);

const GeneratedTitlesPage = () => {
  const {
    selectedContentType,
    selectedBrand,
    generateTitles,
    generatedTitles,
    setGeneratedTitles,
    lockedGeneratedTitles,
    setLockedGeneratedTitles,
    selectedContentTitle,
    setSelectedContentTitle,
    editContentData,
    setEditContentData,
  } = useContext(globalContext);
  const finalArticle = useSelector(
    (state: any) => state.contentCreator.finalArticle
  );
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState(false);
  const [IsSendLoading, setIsSendLoading] = useState(false);
  // state that make create my title disabled or abled
  const [isCreateMyOwnDisabled, setIsCreateMyOwnDisabled] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [triggerSendContent, setTriggerSendContent] = useState(false);

  async function handleGenerateTitles() {
    setIsLoading(true);
    await generateTitles();
    setIsLoading(false);
  }

  useEffect(() => {
    setIsHydrated(true);
    handleGenerateTitles();
    // Cleanup
    return () => {
      setEditContentData(null);
      sessionStorage.removeItem("editContentData");
    };
  }, []);

  function handleSelectTitle() {
    if (selectedContentTitle) {
      setTriggerSendContent(true);
    } else {
      toast.error("Please select a title!");
    }
  }

  useEffect(() => {
    if (triggerSendContent) {
      handleSendContent();
    }
  }, [triggerSendContent]);

  async function handleSendContent() {
    let endpoint = editContentData
      ? `https://backendmachinegenius.onrender.com/content/${editContentData._id}`
      : "https://backendmachinegenius.onrender.com/content";
    let method = editContentData ? "PATCH" : "POST";
    setIsSendLoading(true);
    let postBody: any = {
      content_title: selectedContentTitle,
      content: finalArticle?.articles[0]?.content,
      brand: selectedBrand,
      content_type: selectedContentType,
    };

    const maxRetries = 2; // Define the maximum number of retries
    let attempts = 0;
    let json = null;

    while (attempts < maxRetries) {
      try {
        const res = await fetch(endpoint, {
          method: method,
          headers: {
            "Content-Type": "application/json",
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
      router.replace("/content-creator/create/schedule-script");
    } else {
      // setIsRetry(true);
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
  }

  if (!isHydrated) {
    return (
      <div className="flex flex-col justify-center items-center mx-auto h-[75vh] py-[1.5vw]">
        <div className={`${styles.genuisWorking}`}>
          <LogoAndTitle needTxt={false} title="Genius is Loading..." />
        </div>
      </div>
    );
  }

  if (IsLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-w-[24rem] gap-[2vw] h-[75vh] py-[1.5vw]">
        <LogoAndTitle needTxt={false} title="Generating Titles.." />
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
    <div className="flex flex-col justify-between">
      <div className="flex justify-center items-end h-[75vh] py-[1.5vw] gap-[2vw]">
        {/* titles wrapper */}
        <div className={styles.titles_wrapper + " w-1/2 h-full"}>
          <div className={styles.header}>
            <h6>Titles Generated</h6>

            {/* regenerate titles button */}
            <CustomBtn
              word="Re-Generate"
              btnColor="black"
              icon={ReGenerateIcon}
              onClick={handleGenerateTitles}
            />
          </div>

          {/* generated titles container */}
          <div
            className={`${styles.titles_container} ${
              isCreateMyOwnDisabled ? "" : "opacity-40"
            } h-full`}
            onClick={() => setIsCreateMyOwnDisabled(true)}
          >
            <div className="h-full overflow-y-auto p-[1vw] space-y-[1vw]">
              {generatedTitles.map((title: any, index: any) => {
                if (
                  lockedGeneratedTitles
                    .map((item: any) => item.order)
                    .includes(index)
                ) {
                  const lockedTitle = lockedGeneratedTitles.find(
                    (item: any) => item.order === index
                  );
                  return (
                    <TitleCheckWithLock
                      title={lockedTitle.title}
                      checkName="generated-titles"
                      id={lockedTitle.id}
                      order={lockedTitle.order}
                      key={lockedTitle.id}
                      setAsLocked={true}
                    />
                  );
                } else {
                  return (
                    <TitleCheckWithLock
                      title={title.generalTitle}
                      checkName="generated-titles"
                      id={title.id}
                      order={index}
                      key={title.id}
                    />
                  );
                }
              })}
              {/* todo: add locked titles that are not in the generated titles (it's order over the generated titles length) */}
              {/* {
                (Math.max(...lockedGeneratedTitles.map((item:any) => item.order)) > generatedTitles.length-1) && (
                  lockedGeneratedTitles.filter((item:any) => item.order > generatedTitles.length-1).map((item:any) => (
                    <TitleCheckWithLock
                      title={item.title}
                      checkName="generated-titles"
                      id={item.id}
                      order={item.order}
                      key={item.id}
                      setAsLocked={true}
                    />
                  ))
                ) 
              } */}
            </div>
          </div>
        </div>
        <div className={styles.line}></div>

        {/* create my own title wrapper */}
        <div
          className={` ${
            isCreateMyOwnDisabled
              ? styles.add_title_wrapper + " " + styles.disabled
              : styles.add_title_wrapper
          } w-1/2 h-full flex flex-col items-center justify-center`}
          onClick={() => setIsCreateMyOwnDisabled(false)}
        >
          <label htmlFor="add-title">Create My Own</label>
          <input
            type="text"
            id="add-title"
            disabled={isCreateMyOwnDisabled}
            value={selectedContentTitle}
            onChange={(e) => {
              setSelectedContentTitle(e.target.value);
            }}
            placeholder="Enter your title"
          />
        </div>
      </div>

      {/* Next & Back Buttons to navigate to next and back pages */}
      <div className="flex justify-between">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          // href={"/content-creator/create/generating-titles"}
          href={"/content-creator/create/show-errors"}
        />
        <CustomBtn
          word={"Send"}
          btnColor="black"
          // href={"/content-creator/create/schedule-script"}
          onClick={() => {
            handleSelectTitle();
          }}
        />
      </div>
    </div>
  );
};

export default GeneratedTitlesPage;
