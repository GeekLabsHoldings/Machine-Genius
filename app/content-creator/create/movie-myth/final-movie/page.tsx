"use client";
// import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import styles from "./final-movie.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useEffect, useRef, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { globalContext } from "@/app/_context/store";

const FinalMovie = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState(false);
  const [startNav, setStartNav] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { checkStatus, startChecks } =
    useContext(globalContext);
  const finalArticle: any = useSelector(
    (state: any) => state.contentCreator.finalArticle
  );

  const finalArticleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsHydrated(true);
    if (!finalArticle) {
      toast.error(
        "No data is available. You will be redirected to refetch new data!"
      );
      setTimeout(() => {
        router.replace("/content-creator/create/choose-brand");
      }, 1500);
    }
  }, []);

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
