"use client";
// import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./show-errors.module.css";
import ErrorCollapse from "@/app/_components/ErrorCollapse/ErrorCollapse";
import { useEffect, useRef, useState } from "react";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
import HighlightedContent from "@/app/_components/HighlightedContent/HighlightedContent";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";

const ShowErrors = () => {
  const dispatch = useDispatch();
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

  const saveCursorPosition = (): number | null => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !finalArticleRef.current) {
      return null;
    }

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(finalArticleRef.current);
    preCaretRange.setEnd(range.endContainer, range.endOffset);

    return preCaretRange.toString().length;
  };

  const restoreCursorPosition = (position: number | null) => {
    if (position === null || !finalArticleRef.current) {
      return;
    }
    // if id=finalArticle have children ?

    if (finalArticleRef.current.children.length > 1) {
      const selection = window.getSelection();
      const range = document.createRange();

      if (selection) {
        const paragraphs = Array.from(
          finalArticleRef.current.children
        ) as HTMLElement[];
        let remainingPosition = position;
        let found = false;

        for (let i = 0; i < paragraphs.length; i++) {
          const paragraph = paragraphs[i];
          if (
            paragraph.nodeType === Node.ELEMENT_NODE &&
            paragraph.firstChild
          ) {
            const textNode = paragraph.firstChild as Node;
            const textLength = textNode.textContent?.length || 0;

            if (remainingPosition <= textLength) {
              // Found the correct paragraph
              const validPosition = Math.min(remainingPosition, textLength);
              range.setStart(textNode, validPosition);
              range.setEnd(textNode, validPosition);
              found = true;
              break;
            } else {
              remainingPosition -= textLength;
            }
          }
        }

        if (found) {
          selection.removeAllRanges();
          selection.addRange(range);

          // Scroll to the cursor position
          setTimeout(() => {
            const tempAnchorEl = document.createElement("br");
            range.insertNode(tempAnchorEl);
            tempAnchorEl.scrollIntoView({
              block: "end", // Change to 'start' if needed
            });
            tempAnchorEl.remove();
          }, 0);
        }
      }
    } else {
      const selection = window.getSelection();
      const range = document.createRange();

      if (selection && finalArticleRef.current && position !== null) {
        const textNode = finalArticleRef.current.firstChild;

        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          const textLength = textNode.textContent?.length || 0;
          const validPosition = Math.min(position, textLength);

          range.setStart(textNode, validPosition);
          range.setEnd(textNode, validPosition);

          selection.removeAllRanges();
          selection.addRange(range);

          // Scroll to the cursor position
          setTimeout(() => {
            const tempAnchorEl = document.createElement("br");
            range.insertNode(tempAnchorEl);
            tempAnchorEl.scrollIntoView({
              block: "end", // Change to 'start' if needed
            });
            tempAnchorEl.remove();
          }, 0);
        }
      }
    }
  };

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

    setTriggerStartChecks(true);
  }

  // useEffect(() => {
  // ===== log data =====
  // console.log("finalArticle:", finalArticle);
  // ===== if there is no data, redirect to the choose brand page =====
  // if (!finalArticle && !sessionStorage.getItem("finalArticle")) {
  // window.alert(
  //   "No data is available. You will be redirected to refetch new data!"
  // );
  // router.push("/content-creator/create/choose-brand");
  // }
  // }, []);

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

  // useEffect(() => {
  //   const handleBlur = () => {
  //     if (finalArticleRef.current) {
  //       contentRef.current = finalArticleRef.current.innerText;
  //       const updatedArticle = {
  //         ...finalArticle,
  //         articles: [
  //           {
  //             ...finalArticle.articles[0],
  //             content: contentRef.current,
  //           },
  //         ],
  //       };
  //       dispatch(contentCreatorActions.setFinalArticle(updatedArticle));
  //     }
  //   };
  //   const currentRef = finalArticleRef.current;
  //   if (currentRef) {
  //     currentRef.addEventListener("blur", handleBlur);
  //   }
  //   return () => {
  //     if (currentRef) {
  //       currentRef.removeEventListener("blur", handleBlur);
  //     }
  //   };
  // }, [dispatch, finalArticle]);

  useEffect(() => {
    const handleInput = () => {
      if (finalArticleRef.current) {
        const cursorPosition = saveCursorPosition();
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
        setTimeout(() => {
          restoreCursorPosition(cursorPosition);
        }, 0);
      }
    };

    const currentRef = finalArticleRef.current;
    if (currentRef) {
      currentRef.addEventListener("input", handleInput);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("input", handleInput);
      }
    };
  }, [finalArticle]);

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
          <div className={styles.select_article_container}>
            {checkGrammerResults.map((item: any, index: number) => {
              return (
                <ErrorCollapse
                  key={index}
                  title="Grammer"
                  onClick={() => {
                    const cursorPosition = saveCursorPosition();
                    setSelectedIssue(item);
                    setIssueType("grammer");
                    setTimeout(() => {
                      restoreCursorPosition(cursorPosition);
                    }, 0);
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
                    const cursorPosition = saveCursorPosition();
                    setSelectedIssue(item);
                    setIssueType("ai");
                    setTimeout(() => {
                      restoreCursorPosition(cursorPosition);
                    }, 0);
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
          </div>
        </div>
      </div>

      {/* 02. Buttons lead you to last or next page */}
      <div className="flex justify-between w-full">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href="/content-creator/create/movie-myth/final-movie"
        />
        <CustomBtn
          word={"Fix & Check"}
          btnColor="black"
          onClick={() => {
            handleNavigate();
          }}
          // href="/content-creator/create/movie-myth/article-ready"
        />
      </div>
    </div>
  );
};

export default ShowErrors;
