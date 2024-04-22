"use client";
import { useState } from "react";
import styles from "./create-article.module.css";
import ArticleWithCheck from "../../_components/ArticleWithCheck/ArticleWithCheck";
import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomBtn from "@/app/_components/Button/CustomBtn";

const CreateArticle = () => {
    const [selectedText, setSelectedText] = useState<string[]>([]);
    const renderSelectedTxt = selectedText.map(oneTxt => (
        <div>
            <div className={`mb-3`}>
                <ArticleWithCheck article={oneTxt} name="selected-articles" />
            </div>
        </div>
    ))

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center m-auto h-full py-[1.4vw]">
        <div className="flex justify-between gap-[2vw]">
          <div className="w-7/12">
            <ArticlePreview
              withSelect={true}
              selectedText={selectedText}
              setSelectedText={setSelectedText}
            />
          </div>

          <div
            className={`w-5/12 ${styles.selectionsHeader} flex flex-col gap-4`}>
                <div className={styles.article_with_check}>
                <input type="checkbox" name="check-article" id="" />
            <h2>Selections</h2>
            </div>
            <div className={`${styles.selectionsParent}`}>
              {renderSelectedTxt}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href={"/content-creator/work-on-article"}
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href={"/content-creator/create-article"}
        />
      </div>
    </div>
  );
};
export default CreateArticle;
