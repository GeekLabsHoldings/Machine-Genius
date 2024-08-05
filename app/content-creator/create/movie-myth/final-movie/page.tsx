"use client";
// import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import styles from "./final-movie.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const FinalMovie = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState(false);
  const [startNav, setStartNav] = useState(false);

  const finalArticle: any = useSelector(
    (state: any) => state.contentCreator.finalArticle
  );

  const finalArticleRef = useRef<HTMLDivElement>(null);

  const [checkStatus, setCheckStatus] = useState({
    grammar: "waiting",
    plagiarism: "waiting",
    ai: "waiting",
  });

  useEffect(() => {
    if (!finalArticle) {
      toast.error(
        "No data is available. You will be redirected to refetch new data!"
      );
      setTimeout(() => {
        router.replace("/content-creator/create/choose-brand");
      }, 1500);
    }
  }, []);

  async function startChecks() {
    await checkGrammer();
    await checkPlagiarism();
    await checkAi();
    return Promise.resolve();
  }

  function handleNavigate() {
    // must be first line.
    if (finalArticleRef.current) {
      const finalArticleContent = finalArticleRef.current.innerHTML
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
          }
        );

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
          }
        );

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
                href="/content-creator/create/movie-myth/show-errors"
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
          href={"/content-creator/create/movie-myth/create-movie"}
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          onClick={handleNavigate}
          //   href="/content-creator/create/movie-myth/show-errors"
        />
      </div>
    </div>
  );
};

export default FinalMovie;
