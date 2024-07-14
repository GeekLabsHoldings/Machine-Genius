"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
import styles from "./final-artical.module.css";
import { globalContext } from "@/app/_context/store";
import { useContext } from "react";
// page enables you to have a look to your article
const FinalArticle = () => {
  // state to handle content while page is loading its content
  const [IsLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { finalArticle, setFinalArticle } = useContext(globalContext);
  const [checkStatus, setCheckStatus] = useState({
    grammar: "waiting",
    plagiarism: "waiting",
    ai: "waiting",
  });

  useEffect(() => {
    if (
      !finalArticle
      // ||
      // !finalArticle.articles[0] ||
      // !finalArticle.articles[0]?.content ||
      // finalArticle.success !== true
    ) {
      window.alert(
        "No data is available. You will be redirected to refetch new data!"
      );
      router.push("/content-creator/create/choose-brand");
    }
  }, []);

  // show loading page before navigate to next page
  const handleNavigate = () => {
    setIsLoading(true);
    const finalArticleContent =
      document.getElementById("finalArticle")?.innerHTML;

    // setFinalArticle([
    //   { ...finalArticle.articles[0], content: finalArticleContent },
    // ]);

    setFinalArticle((prev: any) => ({
      ...prev,
      articles: [
        {
          ...prev.articles[0],
          content: finalArticleContent,
        },
      ],
    }));

    //   setTimeout(() => {
    //     // Your action here
    //     router.push('/content-creator/create/final-article')

    //   }, 1500); // 3000 milliseconds = 3 seconds
  };

  //   const handleInput = (event: any) => {
  //     // const newContent = event.target.innerHTML;
  //     // setFinalArticle([newContent]);
  //     const updatedContent = event.target.innerHTML;
  //     setFinalArticle([{ ...finalArticle[0], content: updatedContent }]);
  //   };

  if (IsLoading) {
    return (
      <div className="flex flex-col justify-center items-center mx-auto h-[75vh] py-[1.5vw]">
        <div className={`${styles.genuisWorking}`}>
          <LogoAndTitle
            needTxt={false}
            title="Genius is working on your article.."
          />
          <div className={`${styles.allCheckers} w-full`}>
            <SpecificChecker checkStatus={checkStatus.grammar} word="Grammar Checker" />
            <SpecificChecker checkStatus={checkStatus.plagiarism} word="Plagiarism Checker" />
            <SpecificChecker checkStatus={checkStatus.ai} word="AI Checker" />
          </div>
          <CustomBtn
            word={"Results"}
            btnColor="black"
            href="/content-creator/create/show-errors"
          />
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
                contentEditable={true}
                className={`${styles.articleContent}`}
                // onInput={handleInput}
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
          href={"/content-creator/create/create-article"}
        />
        <CustomBtn word={"Next"} btnColor="black" onClick={handleNavigate} />
      </div>
    </div>
  );
};

export default FinalArticle;
