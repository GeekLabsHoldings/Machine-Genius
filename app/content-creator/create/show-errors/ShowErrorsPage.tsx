"use client";
// import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./show-errors.module.css";
import ErrorCollapse from "@/app/_components/ErrorCollapse/ErrorCollapse";
import { useEffect, useRef, useState } from "react";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
import HighlightedContent from "@/app/_components/HighlightedContent/HighlightedContent";
import { useSelector, useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ShowErrorsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [issueType, setIssueType] = useState<string>("");
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
  const [checkStatus, setCheckStatus] = useState({
    grammar: "waiting",
    plagiarism: "pass",
    ai: "waiting",
  });

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

  async function startChecks() {
    await checkGrammer();
    await checkPlagiarism();
    await checkAi();
    return Promise.resolve();
  }

  // todo
  function handleNavigate() {
    // must be first line.
    if (finalArticleRef.current) {
      const finalArticleContent = finalArticleRef.current.innerText;

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

    setTriggerStartChecks(true);
  }

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
        ai: "waiting",
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
        ai: "waiting",
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
        toast.error("Something went wrong! Contact backend department");
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
      let filteredJson = json.grammarIssues.filter(
        (item: any) => item.general_error_type !== "Other"
      );
      dispatch(contentCreatorActions.setCheckGrammerResults(filteredJson));
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
        toast.error("Something went wrong! Contact backend department");
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
      // setCheckStatus((prev) => ({ ...prev, plagiarism: "fetchError" }));
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
        toast.error("Something went wrong! Contact backend department");
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
      let filteredJson = json.documents[0].sentences.filter(
        (sentence: any) => sentence.highlight_sentence_for_ai
      );
      dispatch(contentCreatorActions.setCheckAiResults(filteredJson));
    } else {
      setCheckStatus((prev) => ({ ...prev, ai: "fetchError" }));
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
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
            checkStatus.ai === "pass" && (
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
              {/* 
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
              </div> */}

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
