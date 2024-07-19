"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./create-article.module.css";
// import ArticleWithCheck from "../../../_components/ArticleWithCheck/ArticleWithCheck";
// import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
// import { SelectArticleData } from "@/app/_data/data";
import { globalContext } from "@/app/_context/store";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";

export default function CreateArticlePage() {
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState(false);
  const [IsRetry, setIsRetry] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [selectedText, setSelectedText] = useState<any>([]);
  // state keeps selected text to display them in selection section
  const {
    selectedBrand,
    setSelectedBrand,
    collectedData,
    setCollectedData,
    choosedArticles,
    setChoosedArticles,
    setFinalArticle
  } = useContext(globalContext);

  // state to enable text selection when click on highlight button
  const [beginSelect, setBeginSelect] = useState(false);
  const [CheckAllSelectedText, setCheckAllSelectedText] = useState(false);

  const handleSelectedText = () => {
    const button = document.getElementById("highlight-btn");
    const selection = window.getSelection();
    if (selection) {
      const getSelectedText = selection.toString();
      // @ts-ignore
      if (getSelectedText.length > 0) {
        setSelectedText((prev: any) => [
          ...prev,
          {
            text: getSelectedText,
            checked: false,
            selectedFromArticle: selectedArticle,
          },
        ]);
      }
      if (button) {
        button.style.display = "none";
      }
    }
  };

  // return selected text in selections
  function renderSelectedTxt() {
    return selectedText.map((item: any, index: any) => (
        <div key={index}>
          <div
            className={`${styles.singleArticle} flex items-center gap-[0.25vw]`}
          >
            <CustomCheckBox
              value={item.text}
              onChange={(e: any) => handleCheckChange(e, index)}
              checked={item.checked}
              accentColor="#2A2B2A"
            />
            {/* <ArticleWithCheck
              accsentColor="#2A2B2A"
              article={oneTxt.text}
              name="selected-articles"
            /> */}

            <div className={`${styles.article_with_check} group`}>
              <label className={`${styles.article}`}>{item.text}</label>
            </div>
          </div>
        </div>
      ));
  }

  const handleCheckChange = (e: any, index: any) => {
    const newSelectedText = [...selectedText];
    newSelectedText[index].checked = e.target.checked;
    setSelectedText(newSelectedText);
  };

  const handleCheckAllSelectedText = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCheckedState = !CheckAllSelectedText;
    const newSelectedText = selectedText.map((item: any) => ({
      ...item,
      checked: newCheckedState,
    }));
    setSelectedText(newSelectedText);
    setCheckAllSelectedText(newCheckedState);
  };

  function handleDeleteSelectedText() {
    // delete checked from selected text
    let newSelectedText = selectedText.filter((item: any) => !item.checked);
    setSelectedText(newSelectedText);
    // reset check all selected text
    setCheckAllSelectedText(false);
  }

  async function setFinalArticleAsync(json: any) {
    setFinalArticle(json);
    return Promise.resolve(); // Ensure this function is awaited properly
  }

  async function finalizeContent() {
    if (selectedText.length === 0) {
      // window.alert("Please select at least one article!");
    } else {
      var postBody: any = {};
      console.log(`selectedBrand`, selectedBrand);

      if (selectedBrand === "PST Canada") {
        postBody.selectedContent = selectedText
          .map((item: any) => item.text)
          .join(" ");
        postBody.brandName = "StreetPolitics";
      } else if (selectedBrand === "Investorcracy") {
        postBody.selectedContent = selectedText
          .map((item: any) => item.text)
          .join(" ");
        postBody.brandName = "Investocracy";
      }
      console.log(`finalizeContent postBody:`, postBody);
      setIsLoading(true);
      const maxRetries = 2; // Define the maximum number of retries
      let attempts = 0;
      let json = null;

      while (attempts < maxRetries) {
        try {
          const res = await fetch(
            `http://localhost:3000/script/finalize-content`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(postBody),
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
        await setFinalArticleAsync(json);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("finalArticle", JSON.stringify(json));
        }
        router.replace("/content-creator/create/final-article");
      } else {
        setIsRetry(true);
        // window.alert("Failed to generate content after multiple attempts");
        // router.push("/content-creator/create/choose-brand");
      }
    }
  }

  // function that get role value from select option by send it as a prop
  const getSelectedArticle = (value: string | number) => {
    setSelectedArticle(value);
  };

  useEffect(() => {
    console.log("selectedArticle:", selectedArticle);
  }, [selectedArticle]);

  function previewSelectedArticle() {
    let selectedContent = null;

    choosedArticles?.forEach((item: any) => {
      if (item.title === selectedArticle) {
        selectedContent = item.content;
      }
    });

    return selectedContent;
  }

  const isInitialMount = useRef(true);
  useEffect(() => {
    // console.log("selectedText:", selectedText);
    // if (typeof window !== "undefined") {
    //   sessionStorage.setItem("selectedText", JSON.stringify(selectedText));
    // }


    if (isInitialMount.current) {
      console.log("selectedText-InitialMount:", selectedText);
      isInitialMount.current = false;
    } else {
      console.log("selectedText-notInitialMount:", selectedText);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("selectedText", JSON.stringify(selectedText));
      }
    }

    
  }, [selectedText]);

  useEffect(() => {
    console.log("choosedArticles:", choosedArticles);
    console.log("selectedBrand:", selectedBrand);
  }, [choosedArticles, selectedBrand]);

  useEffect(() => {
    if (
      (!collectedData || choosedArticles.length === 0) &&
      !sessionStorage.getItem("choosedArticles")
    ) {
      // window.alert(
      //   "No data is available. You will be redirected to refetch new data!"
      // );
      // router.push("/content-creator/create/choose-brand");
    } else {
      if (typeof window !== "undefined") {
        const storedData = sessionStorage.getItem("collectedData");
        if (storedData) {
          setCollectedData(JSON.parse(storedData));
        }

        const storedChoosedArticles = sessionStorage.getItem("choosedArticles");
        if (storedChoosedArticles) {
          setChoosedArticles(JSON.parse(storedChoosedArticles));
        }

        const selectedBrandData = sessionStorage.getItem("selectedBrand");
        if (selectedBrandData) {
          setSelectedBrand(selectedBrandData);
        }
  
        const selectedTextData = sessionStorage.getItem("selectedText");
        if (selectedTextData) {
          setSelectedText(JSON.parse(selectedTextData));
        }
      }
    }

    const button = document.getElementById("highlight-btn");
    const articleContent = document.querySelector("#article-content");
    let clientX: any, clientY: any;

    if (articleContent && button) {
      articleContent.addEventListener("mousedown", function (event: any) {
        clientX = event.pageX;
        clientY = event.pageY;
      });

      articleContent.addEventListener("mouseup", () => {
        let selectionFromDocument: any = document.getSelection();
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

  if (IsLoading) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
        <LogoAndTitle
          needTxt={true}
          textNeeded="Hold on tight."
          title="Genius is working on your article.."
        />
        {IsRetry && (
          <CustomBtn
            btnColor="black"
            word="Retry"
            onClick={() => {
              finalizeContent();
              setIsRetry(false);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center h-[75vh] py-[1.5vw]">
        <div className="flex justify-between gap-[2vw] h-full w-full">
          {/* ===== 01. Articles to select ===== */}
          <div className="w-7/12 flex flex-col gap-[3vh] h-full">
            {/* 01-1. Title & CustomSelectInput */}
            <div className={`${styles.articlesToSelect} h-[15%]`}>
              <h3>Articles</h3>
              <div className="flex items-center gap-3">
                <div className="w-11/12">
                  {/* select article to read */}
                  <CustomSelectInput
                    label="Select Article"
                    options={choosedArticles.map((item: any) => item.title)}
                    getValue={getSelectedArticle}
                  />
                </div>
                {/* highlighting button */}
                <div
                  className={`w-1/12 flex justify-end cursor-pointern ${styles.highlightSvg}`}
                  onClick={() => {
                    setBeginSelect(true);
                  }}
                >
                  <svg
                    viewBox="0 0 30 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 26.6436L5.51027 28.4211L7.46523 26.4532L3.76819 22.7319L0 26.6436ZM6.87185 13.3208C6.58154 13.5787 6.37108 13.9153 6.26557 14.2903C6.16006 14.6653 6.16396 15.0629 6.27682 15.4357L6.99648 17.8132L4.18785 20.6409L9.49463 25.9825L12.2994 23.1593L14.6564 23.8854C15.4135 24.1185 16.2363 23.8848 16.7602 23.287L18.7207 20.9756L9.16155 11.3536L6.87185 13.3208ZM29.1131 4.40048L25.6279 0.892285C24.4979 -0.245102 22.6841 -0.302276 21.4852 0.761838L10.5082 10.1962L19.8705 19.6206L29.2427 8.5709C30.3004 7.36412 30.2436 5.53842 29.1131 4.40048Z"
                      fill={`${beginSelect ? "#F36F24" : "#2A2B2A"}`}
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* 01-2. previewSelectedArticle */}
            <div
              className={` ${styles.articlePreview} !h-[57vh]`}
              id="article-content"
            >
              <div className={`${styles.articlePreviewData} `}>
                <div>
                  <div className={`${styles.articleContent}`}>
                    <button
                      id="highlight-btn"
                      className={`${styles.highlightBtn}`}
                      onClick={() => {
                        handleSelectedText();
                      }}
                    >
                      Select
                    </button>
                    <p
                      contentEditable={true}
                      className={beginSelect ? styles.beginSelection : ""}
                      // onMouseUp={handleSelectedText}
                    >
                      {previewSelectedArticle()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 02. Selections ===== */}
          <div className={`w-5/12 ${styles.selectionsHeader}`}>
            <div className="flex justify-between items-center">
              <div className={`${styles.checkSelection} items-center flex`}>
                {/* to select all of highlighted text */}
                <CustomCheckBox
                  value={""}
                  onChange={(e) => handleCheckAllSelectedText(e)}
                  accentColor="#2A2B2A"
                  checked={CheckAllSelectedText}
                />
                <h2>Selections</h2>
              </div>
              {/* delete button to delete selected highlighted text */}
              <div
                className={styles.deleteSvg}
                onClick={() => {
                  handleDeleteSelectedText();
                }}
              >
                <svg
                  viewBox="0 0 22 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.6 1.1V2.2H1.1C0.492492 2.2 0 2.69249 0 3.3V4.4C0 5.00751 0.492492 5.5 1.1 5.5H20.9C21.5075 5.5 22 5.00751 22 4.4V3.3C22 2.69249 21.5075 2.2 20.9 2.2H15.4V1.1C15.4 0.492487 14.9075 0 14.3 0H7.7C7.09249 0 6.6 0.492487 6.6 1.1Z"
                    fill="#2A2B2A"
                  />
                  <path
                    d="M2.11538 7.7H19.8843L18.8478 21.6938C18.7201 23.417 17.2848 24.75 15.5568 24.75H6.44294C4.71497 24.75 3.2796 23.417 3.15196 21.6938L2.11538 7.7Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
            {/* return highlighted text */}
            <div className={`${styles.selectionsParent}`}>
              {renderSelectedTxt()}
            </div>
          </div>
        </div>
      </div>
      {/* ===== Navigation Buttons ===== */}
      <div className="flex justify-between items-center">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href={"/content-creator/create/choose-articles"}
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          onClick={() => {
            finalizeContent();
          }}
        />
      </div>
    </div>
  );
}
