"use client";
// import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./show-errors.module.css";
import ErrorCollapse from "@/app/_components/ErrorCollapse/ErrorCollapse";
import { useEffect, useState } from "react";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
import { globalContext } from "@/app/_context/store";
import { useContext } from "react";

export default function ShowErrorsPage() {
  const [IsLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<any>(null);
  const [issueType, setIssueType] = useState<string>("");
  const {
    finalArticle,
    setFinalArticle,
    checkGrammerResults,
    setCheckGrammerResults,
    checkAiResults,
  } = useContext(globalContext);

  function highlightText(text: string, start: number, end: number) {
    // return text.slice(0, start) + "<span className='bg-red-500'>" + text.slice(start, end) + "</span>" + text.slice(end);
    return [text.slice(0, start), text.slice(start, end), text.slice(end)];
  }

  const handleNavigate = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    // ===== log data =====
    console.log("finalArticle:", finalArticle);
    console.log("checkGrammerResults:", checkGrammerResults);
    // ===== if there is no data, redirect to the choose brand page =====
    if (!finalArticle && !sessionStorage.getItem("finalArticle")) {
      // window.alert(
      //   "No data is available. You will be redirected to refetch new data!"
      // );
      // router.push("/content-creator/create/choose-brand");
    } else {
      if (typeof window !== "undefined") {
        const finalArticle = sessionStorage.getItem("finalArticle");
        if (finalArticle) {
          setFinalArticle(JSON.parse(finalArticle));
        }
        const checkGrammerResults = sessionStorage.getItem(
          "checkGrammerResults"
        );
        if (checkGrammerResults) {
          setCheckGrammerResults(JSON.parse(checkGrammerResults));
        }
      }
    }
  }, []);

  if (IsLoading) {
    return (
      <div className="flex flex-col justify-center items-center m-auto h-[75vh] py-[1.5vw]">
        <div className={`${styles.genuisWorking} m-auto`}>
          <LogoAndTitle
            needTxt={false}
            title="Genius is working on your article.."
          />
          <div className={`${styles.allCheckers} w-full`}>
            <SpecificChecker checkStatus={"todo"} word="Grammar Checker" />
            <SpecificChecker checkStatus={"todo"} word="Plagiarism Checker" />
            <SpecificChecker checkStatus={"todo"} word="AI Checker" />
          </div>
          <CustomBtn
            word={"Request Approval"}
            btnColor="black"
            href="/content-creator/create/script-approved"
          />
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
                contentEditable={true}
                className={`${styles.articleContent}`}
                // onInput={handleInput}
              >
                {selectedIndex === null ? (
                  finalArticle?.articles[0]?.content
                ) : issueType === "grammer" ? (
                  <>
                    "
                    <p>
                      {
                        highlightText(
                          finalArticle?.articles[0]?.content.replace(
                            /[*#]/g,
                            ""
                          ),
                          selectedIndex.sentence_start,
                          selectedIndex.sentence_start +
                            selectedIndex.sentence.length
                        )[0]
                      }
                    </p>
                    <p className="bg-red-200">
                      {
                        highlightText(
                          finalArticle?.articles[0]?.content.replace(
                            /[*#]/g,
                            ""
                          ),
                          selectedIndex.sentence_start,
                          selectedIndex.sentence_start +
                            selectedIndex.sentence.length
                        )[1]
                      }
                    </p>
                    <p>
                      {
                        highlightText(
                          finalArticle?.articles[0]?.content.replace(
                            /[*#]/g,
                            ""
                          ),
                          selectedIndex.sentence_start,
                          selectedIndex.sentence_start +
                            selectedIndex.sentence.length
                        )[2]
                      }
                    </p>
                    "
                  </>
                ) : issueType === "ai" ? (
                  <>
                    "
                    <p>
                      {
                        highlightText(
                          finalArticle?.articles[0]?.content
                            .replace(/[*#]/g, "")
                            .replace(/[’]/g, "'"),
                          finalArticle?.articles[0]?.content
                            .replace(/[*#]/g, "")
                            .replace(/[’]/g, "'")
                            .indexOf(selectedIndex.sentence),
                          finalArticle?.articles[0]?.content
                            .replace(/[*#]/g, "")
                            .replace(/[’]/g, "'")
                            .indexOf(selectedIndex.sentence) +
                            selectedIndex.sentence.length
                        )[0]
                      }
                    </p>
                    <p className="bg-red-200">
                      {
                        highlightText(
                          finalArticle?.articles[0]?.content
                            .replace(/[*#]/g, "")
                            .replace(/[’]/g, "'"),
                          finalArticle?.articles[0]?.content
                            .replace(/[*#]/g, "")
                            .replace(/[’]/g, "'")
                            .indexOf(selectedIndex.sentence),
                          finalArticle?.articles[0]?.content
                            .replace(/[*#]/g, "")
                            .replace(/[’]/g, "'")
                            .indexOf(selectedIndex.sentence) +
                            selectedIndex.sentence.length
                        )[1]
                      }
                    </p>
                    <p>
                      {
                        highlightText(
                          finalArticle?.articles[0]?.content
                            .replace(/[*#]/g, "")
                            .replace(/[’]/g, "'"),
                          finalArticle?.articles[0]?.content
                            .replace(/[*#]/g, "")
                            .replace(/[’]/g, "'")
                            .indexOf(selectedIndex.sentence),
                          finalArticle?.articles[0]?.content
                            .replace(/[*#]/g, "")
                            .replace(/[’]/g, "'")
                            .indexOf(selectedIndex.sentence) +
                            selectedIndex.sentence.length
                        )[2]
                      }
                    </p>
                    "
                  </>
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
                    setSelectedIndex(item);
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
                    setSelectedIndex(item);
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
