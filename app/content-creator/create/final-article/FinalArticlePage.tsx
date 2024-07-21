"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { useEffect, useRef, useState } from "react";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
import styles from "./final-artical.module.css";
import { globalContext } from "@/app/_context/store";
import { useContext } from "react";

export default function FinalArticlePage() {
  const [IsLoading, setIsLoading] = useState(false);
  const {
    finalArticle,
    setFinalArticle,
    setCheckGrammerResults,
    setCheckAiResults,
  } = useContext(globalContext);

  const finalArticleRef = useRef<HTMLDivElement>(null);

  const [checkStatus, setCheckStatus] = useState({
    grammar: "waiting",
    plagiarism: "waiting",
    ai: "waiting",
  });

  // useEffect(() => {
  //   if (
  //     !finalArticle &&
  //     !sessionStorage.getItem("finalArticle")
  // ||
  // !finalArticle.articles[0] ||
  // !finalArticle.articles[0]?.content ||
  // finalArticle.success !== true
  // ) {
  // window.alert(
  //   "No data is available. You will be redirected to refetch new data!"
  // );
  // router.push("/content-creator/create/choose-brand");
  //   }
  // }, []);

  async function setIsLoadingAsync() {
    setIsLoading(true);
    return Promise.resolve();
  }

  async function setFinalArticleAsync(finalArticleContent: any) {
    setFinalArticle((prev: any) => ({
      ...prev,
      articles: [
        {
          ...prev.articles[0],
          content: finalArticleContent,
        },
      ],
    }));

    return Promise.resolve();
  }

  async function startChecks() {
    await checkGrammer();
    await checkPlagiarism();
    await checkAi();
    return Promise.resolve();
  }

  async function handleContentChange() {
    if (finalArticleRef.current) {
      const finalArticleContent = finalArticleRef.current.innerHTML
        .replace(/[*#]/g, "") // Remove asterisks and hash symbols
        .replace(/[’]/g, "'") // Replace right single quotes with regular single quotes
        .replace(/[‘]/g, "'") // Replace left single quotes with regular single quotes
        .replace(/[“]/g, '"') // Replace left double quotes with regular double quotes
        .replace(/[”]/g, '"') // Replace right double quotes with regular double quotes
        .replace(/\s+/g, " ") // Normalize whitespace to a single space
        .trim(); // Trim leading and trailing whitespace
      await setFinalArticleAsync(finalArticleContent);
    }
  }

  async function handleNavigate() {
    // handleContentChange(): must be first line.
    await handleContentChange();
    await setIsLoadingAsync();
    // console.log("finalArticleContent:", finalArticleContent);
    await startChecks();
  }

  async function checkGrammer() {
    const maxRetries = 2; // Define the maximum number of retries
    let attempts = 0;
    let json = null;

    while (attempts < maxRetries) {
      try {
        const res = await fetch(`http://localhost:3000/grammar-check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            document: finalArticle?.articles[0]?.content.replace(/[*#]/g, ""),
          }),
        });

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
        const res = await fetch(`http://localhost:3000/plagiarism-check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: finalArticle?.articles[0]?.content.replace(/[*#]/g, ""),
          }),
        });

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
        const res = await fetch(`http://localhost:3000/AI-check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            document: finalArticle?.articles[0]?.content.replace(/[*#]/g, ""),
          }),
        });

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
      if (json.documents[0].class_probabilities.human < 0.8) {
        setCheckStatus((prev) => ({ ...prev, ai: "fail" }));
      } else {
        setCheckStatus((prev) => ({ ...prev, ai: "pass" }));
      }
      console.log("checkAiResult", json);
      setCheckAiResults(json.documents[0].sentences);
    } else {
      setCheckStatus((prev) => ({ ...prev, ai: "fetchError" }));
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
  }

  if (IsLoading) {
    return (
      <div className="flex flex-col justify-center items-center mx-auto h-[75vh] py-[1.5vw]">
        <div className={`${styles.genuisWorking}`}>
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
            checkStatus.ai !== "waiting" && (
              <CustomBtn
                word={"Results"}
                btnColor="black"
                href="/content-creator/create/show-errors/"
              />
            )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center mx-auto h-[75vh] py-[1.5vw] w-11/12 ">
        {/* section to display article */}
        <div className="w-4/5 mx-auto h-full">
          {/* <ArticlePreview
                isEditable={false}
                yourNewArticle={true}
                finalArticle={finalArticle}
              /> */}

          <div className={` ${styles.articlePreview} h-full `}>
            <div className={`${styles.articlePreviewData} `}>
              <h1 className="mx-auto font-bold text-2xl">
                {finalArticle?.articles[0]?.title}
              </h1>

              <div
                id="finalArticle"
                ref={finalArticleRef}
                contentEditable={true}
                className={`${styles.articleContent}`}
              >
                {/* {finalArticle?.articles[0]?.content
                  .match(/[^\.!\?]+[\.!\?]+/g)
                  ?.map((e: any, index: number) => (
                    <>
                      <p key={index}>{e}</p>
                      <br />
                    </>
                  ))} */}

                {finalArticle?.articles[0]?.content}
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
          href={"/content-creator/create/create-article"}
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          onClick={() => {
            handleNavigate();
          }}
        />
      </div>
    </div>
  );
}
