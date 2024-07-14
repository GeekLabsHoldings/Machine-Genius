"use client";
import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./show-errors.module.css";
import ErrorCollapse from "@/app/_components/ErrorCollapse/ErrorCollapse";
import { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation'
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
import { globalContext } from "@/app/_context/store";
import { useContext } from "react";

// page that displays the errors in the article
const ShowErrors = () => {
  // loading state that make loading show or hide
  // state to handle content while page is loading its content
  const [IsLoading, setIsLoading] = useState(false);

  // const router = useRouter()
  // const router = useRouter()
  // show loading page before navigate to next page

  const handleNavigate = () => {
    setIsLoading(true);
    //   setTimeout(() => {
    //     // Your action here
    //     router.push('/content-creator/create/final-article')

    //   }, 1500); // 3000 milliseconds = 3 seconds
  };
  const { finalArticle, checkResults } = useContext(globalContext);
  useEffect(() => {
    console.log(finalArticle);
  }, []);

  return (
    <>
      <div className="flex flex-col h-full">
        {/* loading screen */}
        {IsLoading ? (
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
        ) : (
          <>
            <div className="flex justify-center items-start h-[75vh] py-[1.5vw] gap-[2rem]">
              <div className={"w-3/5 h-full"}>
                <ArticlePreview
                  yourNewArticle={true}
                  height="h-full"
                  withEdit={true}
                />
              </div>
              <div className={styles.scripts_wrapper + " w-2/5"}>
                <div className={styles.header}>
                  <h6>Errors</h6>
                  <h6>({checkResults.length})</h6>
                </div>

                <div className={styles.errors_container}>
                  {/* error Collapse */}
                  <ErrorCollapse title="Plagiarism">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Itaque doloribus ratione non similique velit modi eum
                    repudiandae, nam saepe amet quaerat quasi placeat, dolore
                    molestiae magnam iure earum ipsam. Soluta.
                  </ErrorCollapse>




                </div>
              </div>
            </div>
            {/* buttons lead you to last or next page */}
            <div className="flex justify-between w-full">
              <CustomBtn
                word={"Back"}
                btnColor="white"
                href="/content-creator/create/final-article"
              />
              <CustomBtn
                word={"Fix & Check"}
                btnColor="black"
                onClick={handleNavigate}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShowErrors;
