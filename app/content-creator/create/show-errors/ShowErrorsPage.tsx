"use client";
// import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./show-errors.module.css";
import ErrorCollapse from "@/app/_components/ErrorCollapse/ErrorCollapse";
import { useEffect, useRef, useState } from "react";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
import { globalContext } from "@/app/_context/store";
import { useContext } from "react";
import HighlightedContent from "@/app/_components/HighlightedContent/HighlightedContent";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";

export default function ShowErrorsPage() {
  const dispatch = useDispatch();
  const [IsLoading, setIsLoading] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [issueType, setIssueType] = useState<string>("");
  const {
    checkGrammerResults,
    setCheckGrammerResults,
    checkAiResults,
    setCheckAiResults,
  } = useContext(globalContext);

  const [startNav, setStartNav] = useState(false);
  const finalArticle = useSelector(
    (state: any) => state.contentCreator.finalArticle
  );

  const [checkStatus, setCheckStatus] = useState({
    grammar: "waiting",
    plagiarism: "waiting",
    ai: "waiting",
  });

  const finalArticleRef = useRef<HTMLDivElement>(null);

  async function startChecks() {
    await checkGrammer();
    await checkPlagiarism();
    await checkAi();
    return Promise.resolve();
  }

  function handleNavigate() {
    // must be first line.
    if (finalArticleRef.current) {
      const finalArticleContent = finalArticleRef.current.innerText
        .replace(/[*#]/g, "") // Remove asterisks and hash symbols
        .replace(/[’]/g, "'") // Replace right single quotes with regular single quotes
        .replace(/[‘]/g, "'") // Replace left single quotes with regular single quotes
        .replace(/[“]/g, '"') // Replace left double quotes with regular double quotes
        .replace(/[”]/g, '"') // Replace right double quotes with regular double quotes
        .replace(/\s+/g, " ") // Normalize whitespace to a single space
        .trim(); // Trim leading and trailing whitespace

      const updatedArticle = {
        ...finalArticle,
        articles: [
          {
            ...finalArticle.articles[0],
            content: finalArticleContent,
          },
        ],
      };

      dispatch(contentCreatorActions.setFinalArticle(updatedArticle));
      console.log("+++++++++++++++++-finalArticle is updated-+++++++++++++++");
    } else {
      console.log(
        "xxxxxxxxxxxxxxxxxx-finalArticleRef.current is null-xxxxxxxxxxxxxxxxxx"
      );
    }

    setStartNav(true);
  }

  useEffect(() => {
    // ===== log data =====
    // console.log("finalArticle:", finalArticle);
    console.log("checkGrammerResults:", checkGrammerResults);
    // ===== if there is no data, redirect to the choose brand page =====
    // if (!finalArticle && !sessionStorage.getItem("finalArticle")) {
    // window.alert(
    //   "No data is available. You will be redirected to refetch new data!"
    // );
    // router.push("/content-creator/create/choose-brand");
    // }
  }, []);

  function highlightText(text: any, start: any, end: any) {
    return [text.slice(0, start), text.slice(start, end), text.slice(end)];
  }

  useEffect(() => {
    if (startNav) {
      setIsLoading(true);
      console.log("finalArticle right before startChecks()", finalArticle);
      startChecks();
    }
  }, [startNav]);

  async function checkGrammer() {
    const maxRetries = 2; // Define the maximum number of retries
    let attempts = 0;
    let json = null;

    while (attempts < maxRetries) {
      try {
        const res = await fetch(
          `https://backendmachinegenius.onrender.com/grammar-check`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              document: finalArticle?.articles[0]?.content,
            }),
            cache: "no-cache",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        json = await res.json();

        if (json) {
          // If content is found, break the loop
          break;
        }
      } catch (error) {
        console.error("Error checkGrammer:", error);
      } finally {
        attempts++;
      }
    }

    if (json) {
      if (
        json.grammarIssues.filter(
          (item: any) => item.general_error_type !== "Other"
        ).length > 0
      ) {
        setCheckStatus((prev) => ({ ...prev, grammar: "fail" }));
      } else {
        setCheckStatus((prev) => ({ ...prev, grammar: "pass" }));
      }

      console.log("checkGrammerResults1", json);
      setCheckGrammerResults(
        json.grammarIssues.filter(
          (item: any) => item.general_error_type !== "Other"
        )
      );
    } else {
      setCheckStatus((prev) => ({ ...prev, grammar: "fetchError" }));
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
  }

  async function checkPlagiarism() {
    const maxRetries = 1; // Define the maximum number of retries
    let attempts = 0;
    let json = null;

    while (attempts < maxRetries) {
      try {
        const res = await fetch(
          `https://backendmachinegenius.onrender.com/plagiarism-check`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: finalArticle?.articles[0]?.content,
            }),
            cache: "no-cache",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        json = await res.json();

        if (json) {
          // If content is found, break the loop
          break;
        }
      } catch (error) {
        console.error("Error checkPlagiarism:", error);
      } finally {
        attempts++;
      }
    }

    if (json) {
      // todo
      if (json) {
        setCheckStatus((prev) => ({ ...prev, plagiarism: "fail" }));
      } else {
        setCheckStatus((prev) => ({ ...prev, plagiarism: "pass" }));
      }
      console.log("checkPlagiarismResult", json);
    } else {
      setCheckStatus((prev) => ({ ...prev, plagiarism: "fetchError" }));
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
  }

  async function checkAi() {
    const maxRetries = 2; // Define the maximum number of retries
    let attempts = 0;
    let json = null;

    while (attempts < maxRetries) {
      try {
        const res = await fetch(
          `https://backendmachinegenius.onrender.com/AI-check`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              document: finalArticle?.articles[0]?.content,
            }),
            cache: "no-cache",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        json = await res.json();

        if (json) {
          // If content is found, break the loop
          break;
        }
      } catch (error) {
        console.error("Error checkAi:", error);
      } finally {
        attempts++;
      }
    }

    if (json) {
      if (
        // json.documents[0].class_probabilities.human < 0.8
        json.documents[0].sentences.some(
          (sentence: any) => sentence.highlight_sentence_for_ai
        )
      ) {
        setCheckStatus((prev) => ({ ...prev, ai: "fail" }));
      } else {
        setCheckStatus((prev) => ({ ...prev, ai: "pass" }));
      }
      console.log("checkAiResult", json);
      setCheckAiResults(
        json.documents[0].sentences.filter(
          (sentence: any) => sentence.highlight_sentence_for_ai
        )
      );
    } else {
      setCheckStatus((prev) => ({ ...prev, ai: "fetchError" }));
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
    setStartNav(false);
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
          {checkStatus.grammar !== "waiting" &&
            checkStatus.plagiarism !== "waiting" &&
            checkStatus.ai !== "waiting" &&
            checkGrammerResults.length + checkAiResults.length > 0 && (
              <CustomBtn
                word={"Results"}
                btnColor="black"
                // href="/content-creator/create/show-errors/"
                onClick={()=>{
                  
                  setIsLoading(false);
                  // reset checkStatus
                  setCheckStatus({
                    grammar: "waiting",
                    plagiarism: "waiting",
                    ai: "waiting",
                  });
                }}
              />
            )}

          {checkGrammerResults.length + checkAiResults.length === 0 && (
            <CustomBtn
              word={"Request Approval"}
              btnColor="black"
              href="/content-creator/create/script-approved"
            />
          )}
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
          {/* <ArticlePreview
              yourNewArticle={true}
              height="h-full"
              withEdit={true}
            /> */}
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
                {selectedIssue === null ? (
                  finalArticle?.articles[0]?.content
                ) : issueType === "grammer" ? (
                  <HighlightedContent
                    text={finalArticle?.articles[0]?.content}
                    start={selectedIssue.sentence_start}
                    end={
                      selectedIssue.sentence_start +
                      selectedIssue.sentence.length
                    }
                  />
                ) : issueType === "ai" ? (
                  <HighlightedContent
                    text={finalArticle?.articles[0]?.content}
                    start={finalArticle?.articles[0]?.content.indexOf(
                      selectedIssue.sentence
                    )}
                    end={
                      finalArticle?.articles[0]?.content.indexOf(
                        selectedIssue.sentence
                      ) + selectedIssue.sentence.length
                    }
                  />
                ) : (
                  <p>{finalArticle?.articles[0]?.content}</p>
                )}
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
                    console.log("grammer item clicked:", item);
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
                    console.log("ai item clicked:", item);
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
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href="/content-creator/create/final-article"
        />
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
