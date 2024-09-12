"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./create-article.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { globalContext } from "@/app/_context/store";
import { contentCreatorContext } from "@/app/_context/contentCreatorContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";
import { formatToText } from "@/app/_utils/contentFormatter";
import { formatHtml } from "@/app/_utils/htmlFormatter";
import { contentCleaner } from "@/app/_utils/contentCleaner";
// import ArticleWithCheck from "../../../_components/ArticleWithCheck/ArticleWithCheck";
// import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
// import { SelectArticleData } from "@/app/_data/data";

export default function CreateArticlePage() {
  // ===== Start Hooks =====
  const dispatch = useDispatch();
  const router = useRouter();
  // ===== End Hooks =====

  // ===== Start State =====
  const { authState, handleSignOut } = useContext(globalContext);
  const { selectedContentType, selectedBrand, choosedArticles } = useContext(
    contentCreatorContext
  );
  const [pageState, setPageState] = useState<{
    isLoading: boolean;
    isRetry: boolean;
    triggerNav: boolean | null;
  }>({
    isLoading: false,
    isRetry: false,
    triggerNav: null,
  });
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [CheckAllSelectedText, setCheckAllSelectedText] =
    useState<boolean>(false);

  function selectedTextInit() {
    if (typeof window !== "undefined") {
      const selectedTextInitValue = sessionStorage.getItem("selectedText");
      return selectedTextInitValue ? JSON.parse(selectedTextInitValue) : [];
    } else {
      return [];
    }
  }
  const [selectedText, setSelectedText] = useState<any>(selectedTextInit);
  useEffect(() => {
    sessionStorage.setItem("selectedText", JSON.stringify(selectedText));
  }, [selectedText]);

  const options = useMemo(() => {
    return choosedArticles.map((item: any) => {
      // note: href is from twitter data
      return item.title || item.href;
    });
  }, [choosedArticles]);
  // ===== End State =====

  // ===== Start Page Guard =====
  useEffect(() => {
    if (!selectedBrand) {
      toast.error(
        "No data is available. You will be redirected to refetch new data!"
      );
      setTimeout(() => {
        router.replace("/content-creator/create/choose-brand");
      }, 1500);
    }
  }, []);
  // ===== End Page Guard =====

  // ===== Start Helpers Functions =====
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

  useEffect(() => {
    const button = document.getElementById("highlight-btn");
    const articleContent = document.querySelector("#article-content");
    let clientX: any, clientY: any;

    if (articleContent && button) {
      const handleMouseDown = (event: any) => {
        clientX = event.pageX;
        clientY = event.pageY;
      };

      const handleMouseUp = () => {
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
      };

      // Use passive event listeners
      articleContent.addEventListener("mousedown", handleMouseDown, {
        passive: true,
      });
      articleContent.addEventListener("mouseup", handleMouseUp, {
        passive: true,
      });
    }

    return () => {
      if (articleContent && button) {
        articleContent.removeEventListener("mousedown", () => {});
        articleContent.removeEventListener("mouseup", () => {});
      }
    };
  }, []);

  const handleCheckChange = (e: any, index: any) => {
    const newSelectedText = [...selectedText];
    if (newSelectedText[index].checked !== e.target.checked) {
      newSelectedText[index].checked = e.target.checked;
      setSelectedText(newSelectedText);
    }
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
  // function that get role value from select option by send it as a prop
  const getSelectedArticle = (value: string | number) => {
    if (value !== selectedArticle) {
      setSelectedArticle(value);
    }
  };
  // ===== End Helpers Functions =====

  // useEffect(() => {
  //   console.log("selectedArticle:", selectedArticle);
  // }, [selectedArticle]);

  // useEffect(() => {
  //   console.log("choosedArticles:", choosedArticles);
  //   console.log("selectedBrand:", selectedBrand);
  // }, [choosedArticles, selectedBrand]);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      // console.log("selectedText-InitialMount:", selectedText);
      isInitialMount.current = false;
    } else {
      // console.log("selectedText-notInitialMount:", selectedText);
    }
  }, [selectedText]);

  useEffect(() => {
    if (!isInitialMount.current) {
      const filteredSelectedText = selectedText.filter((item: any) =>
        choosedArticles.some(
          (article: any) => article.title === item.selectedFromArticle
        )
      );
      // console.log("filteredSelectedText:", filteredSelectedText);
      setSelectedText(filteredSelectedText);
    }
  }, [choosedArticles]);

  function handleFinalizeContentFailure() {
    toast.error("Something went wrong!");
    setPageState((prevState) => ({
      ...prevState,
      triggerNav: false,
      isRetry: true,
    }));
    return;
  }

  async function finalizeContent() {
    setPageState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    // console.log(`selectedBrand`, selectedBrand);
    // console.log(`selectedText`, selectedText);
    let brandNamePayload = "";
    if (selectedBrand === "Street Politics Canada") {
      brandNamePayload = "streetPoliticsCanada";
    } else if (selectedBrand === "Street Politics UK") {
      brandNamePayload = "streetPoliticsUK";
    } else if (selectedBrand === "Street Politics Africa") {
      brandNamePayload = "streetPoliticsAfrica";
    } else if (selectedBrand === "Investorcracy") {
      brandNamePayload = "investocracy";
    }
    // console.log(`finalizeContent brandNamePayload:`, brandNamePayload);

    try {
      const res = await fetch(
        `https://api.machinegenius.io/content-creation/${
          selectedContentType === "Script" ? "script" : "article"
        }/finalize-content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
          body: JSON.stringify({
            selectedContent: formatToText(
              selectedText.map((item: any) => item.text).join(" ")
            ),
            ...(selectedContentType === "Script" && {
              brandName: brandNamePayload,
            }),
          }),
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json = await res.json();
      if (!json) {
        handleFinalizeContentFailure();
        return;
      } else if (json.success === false) {
        handleFinalizeContentFailure();
        return;
      } else if (json && json?.articles[0]?.content) {
        const updatedArticle = {
          ...json,
          articles: [
            {
              ...json.articles[0],
              content: formatHtml(json.articles[0].content),
            },
          ],
        };

        dispatch(contentCreatorActions.setFinalArticle(updatedArticle));

        // dispatch(contentCreatorActions.setFinalArticle(json));
        setPageState((prevState) => ({
          ...prevState,
          triggerNav: true,
        }));
      }
    } catch (error) {
      console.error("Error finalizeContent:", error);
      handleFinalizeContentFailure();
    }
  }

  useEffect(() => {
    if (pageState.triggerNav === true) {
      router.replace("/content-creator/create/final-article");
    } else if (pageState.triggerNav === false) {
      toast.error("Something went wrong!");
    }
  }, [pageState.triggerNav]);

  // ===== Start HTML Return =====
  function renderSelectedTxt() {
    return selectedText.map((item: any, index: any) => (
      <div key={`${index}-${item.text}`}>
        <div
          className={`${styles.singleArticle} flex items-center gap-[0.25vw]`}
        >
          <CustomCheckBox
            value={item.text}
            onChange={(e: any) => handleCheckChange(e, index)}
            checked={item.checked}
            accentColor="#2A2B2A"
          />

          <div className={`${styles.article_with_check} group`}>
            <label className={`${styles.article}`}>{item.text}</label>
          </div>
        </div>
      </div>
    ));
  }

  function previewSelectedArticle() {
    if (selectedArticle?.includes("x.com")) {
      const selectedContent = choosedArticles.find(
        (item: any) => item.href === selectedArticle
      )?.content;
      return selectedContent;
    } else {
      const selectedContent = choosedArticles.find(
        (item: any) => item.title === selectedArticle
      )?.content;
      return contentCleaner(selectedContent);
    }
  }

  if (pageState.isLoading) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
        <LogoAndTitle
          needTxt={true}
          textNeeded={!pageState.isRetry ? "Hold on tight." : ""}
          title={
            !pageState.isRetry
              ? "Genius is finalizing your content..."
              : "Content finalization failed. Please retry."
          }
        />
        {pageState.isRetry && (
          <CustomBtn
            btnColor="black"
            word="Retry"
            onClick={() => {
              finalizeContent();
              setPageState((prevState) => ({
                ...prevState,
                isRetry: false,
              }));
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
                <div className="w-full">
                  {/* select article to read */}
                  <CustomSelectInput
                    label="Select Article"
                    options={options}
                    getValue={getSelectedArticle}
                  />
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
                    <div
                      // contentEditable={"plaintext-only"}
                      contentEditable={true}
                      dangerouslySetInnerHTML={{
                        __html: previewSelectedArticle(),
                      }}
                      className="outline-none"
                    >
                      {/* {previewSelectedArticle()} */}
                    </div>
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
            if (selectedText.length === 0) {
              toast.error("Please select at least one article!");
              return;
            } else {
              finalizeContent();
            }
          }}
        />
      </div>
    </div>
  );
  // ===== End HTML Return =====
}
