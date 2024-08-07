"use client";
// import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./show-errors.module.css";
import ErrorCollapse from "@/app/_components/ErrorCollapse/ErrorCollapse";
import { useEffect, useRef, useState, useContext } from "react";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
// import HighlightedContent from "@/app/_components/HighlightedContent/HighlightedContent";
import { useSelector, useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { globalContext } from "@/app/_context/store";

export default function ShowErrorsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [issueType, setIssueType] = useState<string>("");
  const { checkStatus, setCheckStatus, startChecks, selectedBrand } =
    useContext(globalContext);
  const checkGrammerResults = useSelector(
    (state: any) => state.contentCreator.checkGrammerResults
  );
  const checkAiResults = useSelector(
    (state: any) => state.contentCreator.checkAiResults
  );
  const [triggerStartChecks, setTriggerStartChecks] = useState<boolean>(false);
  const finalArticle = useSelector(
    (state: any) => state.contentCreator.finalArticle
  );

  const finalArticleRef = useRef<HTMLDivElement>(null);

  function finalArticleContentInit() {
    if (typeof window !== "undefined") {
      const finalArticleInitValue = sessionStorage.getItem("finalArticle");
      return finalArticleInitValue
        ? JSON.parse(finalArticleInitValue)?.articles[0]?.content
        : finalArticleRef.current?.innerText;
    } else {
      return finalArticleRef.current?.innerText;
    }
  }
  const finalArticleContentRef = useRef(finalArticleContentInit());
  useEffect(() => {
    const updatedArticle = {
      ...finalArticle,
      articles: [
        {
          ...finalArticle?.articles[0],
          content: finalArticleContentRef.current,
        },
      ],
    };

    sessionStorage.setItem("finalArticle", JSON.stringify(updatedArticle));
  }, [finalArticle, finalArticleContentRef.current]);

  useEffect(() => {
    // ===== log data =====
    // console.log("finalArticle:", finalArticle);
    // ===== if there is no data, redirect to the choose brand page =====
    if (!finalArticle) {
      toast.error(
        "No data is available. You will be redirected to refetch new data!"
      );
      setTimeout(() => {
        router.replace("/content-creator/create/choose-brand");
      }, 1500);
    }
  }, []);

  useEffect(() => {
    if (triggerStartChecks === false) {
      setCheckStatus({
        grammar: "waiting",
        plagiarism: "pass",
        ai: "pass",
      });
    } else {
      setIsLoading(true);
      console.log("finalArticle right before startChecks()", finalArticle);
      startChecks();
      if (selectedIssue !== null) {
        setSelectedIssue(null);
      }
      if (issueType !== "") {
        setIssueType("");
      }
    }
  }, [triggerStartChecks]);

  useEffect(() => {
    if (IsLoading === false) {
      if (triggerStartChecks === true) {
        setTriggerStartChecks(false);
      }
      setCheckStatus({
        grammar: "waiting",
        plagiarism: "pass",
        ai: "pass",
      });
    } else {
      if (selectedIssue !== null) {
        setSelectedIssue(null);
      }
      if (issueType !== "") {
        setIssueType("");
      }
    }
  }, [IsLoading]);

  useEffect(() => {
    const handleInput = () => {
      console.log("handleInput");
      if (finalArticleRef.current) {
        finalArticleContentRef.current = finalArticleRef.current.innerText;
        const updatedArticle = {
          ...finalArticle,
          articles: [
            {
              ...finalArticle.articles[0],
              content: finalArticleContentRef.current,
            },
          ],
        };
        sessionStorage.setItem("finalArticle", JSON.stringify(updatedArticle));
      }
    };

    if (finalArticleRef.current) {
      finalArticleRef.current.addEventListener("input", handleInput);
    }

    return () => {
      if (finalArticleRef.current) {
        finalArticleRef.current.removeEventListener("input", handleInput);
      }
    };
  }, [finalArticle, finalArticleContentRef.current]);

  useEffect(() => {
    const handleBlur = () => {
      console.log("handleBlur");
      // window.alert("handleBlur");
      if (typeof window !== undefined) {
        const updatedFinalArticle = sessionStorage.getItem("finalArticle");
        if (updatedFinalArticle) {
          dispatch(
            contentCreatorActions.setFinalArticle(
              JSON.parse(updatedFinalArticle)
            )
          );
        }
      } else {
        const updatedFinalArticle = {
          ...finalArticle,
          articles: [
            {
              ...finalArticle.articles[0],
              content: finalArticleContentRef.current,
            },
          ],
        };
        dispatch(contentCreatorActions.setFinalArticle(updatedFinalArticle));
      }
    };

    if (finalArticleRef.current) {
      finalArticleRef.current.addEventListener("blur", handleBlur);
    }
    return () => {
      if (finalArticleRef.current) {
        finalArticleRef.current.removeEventListener("blur", handleBlur);
      }
    };
  }, [finalArticle, dispatch, finalArticleContentRef.current]);

  function highlightText(text: any, start: any, end: any) {
    return [text.slice(0, start), text.slice(start, end), text.slice(end)];
  }

  function handleFixGrammerIssue() {
    if (typeof window !== undefined) {
      const storedFinalArticle = sessionStorage.getItem("finalArticle");
      if (storedFinalArticle) {
        let parsedStoredFinalArticle = JSON.parse(storedFinalArticle);
        let storedFinalArticleContent =
          parsedStoredFinalArticle.articles[0].content;

        for (let i = 0; i < checkGrammerResults.length; i++) {
          let item = checkGrammerResults[i];

          let replacedSentence =
            item.sentence.slice(0, item.start) +
            item.replacement +
            item.sentence.slice(item.end);

          storedFinalArticleContent = storedFinalArticleContent.replace(
            item.sentence,
            replacedSentence
          );
        }

        const updatedFinalArticle = {
          ...parsedStoredFinalArticle,
          articles: [
            {
              ...parsedStoredFinalArticle.articles[0],
              content: storedFinalArticleContent,
            },
          ],
        };

        dispatch(contentCreatorActions.setFinalArticle(updatedFinalArticle));
      }
    }
  }

  // todo
  function handleNavigate() {
    handleFixGrammerIssue();
    setTriggerStartChecks(true);
  }

  if (IsLoading) {
    return (
      <div className="flex flex-col justify-center items-center m-auto h-[75vh] py-[1.5vw]">
        <div className={`${styles.genuisWorking} m-auto`}>
          <LogoAndTitle
            needTxt={false}
            title="Genius is working on your article.."
          />
          <div className={`${styles.allCheckers} w-full`}>
            <SpecificChecker
              checkStatus={checkStatus.grammar}
              word="Grammar Checker"
            />
            <SpecificChecker
              checkStatus={checkStatus.plagiarism}
              word="Plagiarism Checker"
            />
            <SpecificChecker checkStatus={checkStatus.ai} word="AI Checker" />
          </div>
          {(checkStatus.grammar === "fail" ||
            checkStatus.plagiarism === "fail" ||
            checkStatus.ai === "fail") &&
          checkStatus.grammar !== "waiting" &&
          checkStatus.plagiarism !== "waiting" &&
          checkStatus.ai !== "waiting" ? (
            <CustomBtn
              word={"Results"}
              btnColor="black"
              // href="/content-creator/create/show-errors/"
              onClick={() => {
                setIsLoading(false);
              }}
            />
          ) : (
            ""
          )}

          {checkStatus.grammar === "pass" &&
            checkStatus.plagiarism === "pass" &&
            checkStatus.ai === "pass" &&
            (selectedBrand === "Movie Myth" ? (
              <CustomBtn
                word={"Generate Titles"}
                btnColor="black"
                href="/content-creator/create/movie-myth/generated-titles"
              />
            ) : (
              <CustomBtn
                word={"Generate Titles"}
                btnColor="black"
                href="/content-creator/create/generated-titles"
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* 01. Article Preview & Errors */}
      <div className="flex justify-center items-start h-[75vh] py-[1.5vw] gap-[2rem]">
        {/* 01-1. Article Preview */}
        <div className={"w-3/5 h-full"}>
          <div className={` ${styles.articlePreview} h-full`}>
            <div className={`${styles.articlePreviewData} `}>
              <h1 className="mx-auto font-bold text-2xl">
                {finalArticle?.articles[0]?.title}
              </h1>

              <div
                id="finalArticle"
                ref={finalArticleRef}
                contentEditable={true}
                className={`${styles.articleContent}`}
                // onInput={handleInput}
              >
                <p>{finalArticle?.articles[0]?.content}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 01-2. Preview Errors */}
        <div className={styles.scripts_wrapper + " w-2/5"}>
          <div className={styles.header}>
            <h6>Issues</h6>
            <h6>({checkGrammerResults.length + checkAiResults.length})</h6>
          </div>

          <div className={styles.errors_container}>
            {checkGrammerResults.map((item: any, index: number) => {
              return (
                <ErrorCollapse
                  key={index}
                  title="Grammer"
                  onClick={() => {
                    setSelectedIssue(item);
                    setIssueType("grammer");
                    // console.log("grammer item clicked:", item);
                  }}
                >
                  <>
                    <p>
                      <span className="font-bold">Grammar Issue:</span>{" "}
                      {item.description}
                    </p>
                    <p>
                      <span className="font-bold">
                        In the following sentence:
                      </span>
                      "
                      <span>
                        {highlightText(item.sentence, item.start, item.end)[0]}
                      </span>
                      <span className="bg-red-200">
                        {highlightText(item.sentence, item.start, item.end)[1]}
                      </span>
                      <span>
                        {highlightText(item.sentence, item.start, item.end)[2]}
                      </span>
                      "
                    </p>
                    <p>
                      <span className="font-bold">Replace:</span> "
                      {item.sentence.slice(item.start, item.end)}"{" "}
                      <span className="font-bold">With:</span>{" "}
                      {item.replacement}
                    </p>
                    {/* <div className="flex justify-end">
                      <CustomBtn
                        word={"Fix"}
                        btnColor="black"
                        paddingVal={"py-[0.5vw] px-[1vw]"}
                        onClick={() => {
                          handleFixGrammerIssue(item);
                        }}
                      ></CustomBtn>
                    </div> */}
                  </>
                </ErrorCollapse>
              );
            })}

            {checkAiResults.map((item: any, index: number) => {
              return (
                <ErrorCollapse
                  key={index}
                  title="AI"
                  onClick={() => {
                    setSelectedIssue(item);
                    setIssueType("ai");
                    // console.log("ai item clicked:", item);
                  }}
                >
                  <>
                    {/* <p><span className="font-bold">Grammar Issue:</span> {item.description}</p> */}
                    <p>
                      <span className="font-bold">
                        In the following sentence:{" "}
                      </span>
                      "<span>{item.sentence}</span>"
                    </p>
                  </>
                </ErrorCollapse>
              );
            })}

            {/* error Collapse */}
            {/* <ErrorCollapse title="Plagiarism">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
                doloribus ratione non similique velit modi eum repudiandae, nam
                saepe amet quaerat quasi placeat, dolore molestiae magnam iure
                earum ipsam. Soluta.
              </ErrorCollapse> */}
          </div>
        </div>
      </div>

      {/* 02. Buttons lead you to last or next page */}
      <div className="flex justify-between w-full">
        {selectedBrand === "Movie Myth" ? (
          <CustomBtn
            word={"Back"}
            btnColor="black"
            href="/content-creator/create/movie-myth/final-movie"
          />
        ) : (
          <CustomBtn
            word={"Back"}
            btnColor="white"
            href="/content-creator/create/final-article"
          />
        )}
        <CustomBtn
          word={"Fix & Check"}
          btnColor="black"
          onClick={() => {
            handleNavigate();
          }}
        />
      </div>
    </div>
  );
}
