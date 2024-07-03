"use client";
import styles from "./ArticlePreview.module.css";
import { ArticlePreviewData } from "../../_data/data";
import { IArticleProps } from "@/app/_interfaces/interfaces";
import { useState } from "react";
import { globalContext } from "@/app/_context/store";
import { useContext } from "react";

// Article preview component contains article title and content
const ArticlePreview = ({
  withEdit,
  isEditable = false,
  beginSelect,
  height,
  yourNewArticle,
  finalArticle,
}: IArticleProps) => {
  const { selectedText, setSelectedText } = useContext(globalContext);

  // const [highlightedBefore, setHighlightedBefore] = useState<string[]>([]);

  const handleSelectedText = () => {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString();
      // @ts-ignore
      setSelectedText((prev) => [...prev, selectedText]);
    }
    const DetectEqual = ArticlePreviewData.map((article) =>
      article.sectionData.map((everyData) => {
        // setHighlightedBefore([...highlightedBefore, JSON.stringify(selectedText?.filter(element =>  everyData.match(element)))])
        // console.log(highlightedBefore);
      })
    );
  };

  // console.log(highlightedBefore);

  // return article data
  const renderArticleData = ArticlePreviewData.map((article) => (
    <div className={`${styles.articleContent} `}>
      {article.sectionData.map((singleData) => (
        // setHighlightedBefore([...highlightedBefore,selectedText.filter(element => article.sectionData.includes(element))]);
        // highlightedBefore.length ? highlightedBefore.map((ele)=>(<p className={styles.highlightedBefore}>{ele}</p>)) : <p className={beginSelect ? styles.beginSelection : ''}>{singleData}</p>
        // highlight text with orange color
        <p
          contentEditable={`${isEditable}`}
          className={beginSelect ? styles.beginSelection : ""}
          onMouseUp={handleSelectedText}
        >
          {singleData}
        </p>
      ))}
    </div>
  ));

  // return highlighted parts that are wanted to be in my article
  const renderWantedParts = selectedText?.map((singlePart) => (
    <p>{singlePart}</p>
  ));

  // return article title
  const renderArticleTitle = finalArticle && finalArticle[0]?.title;

  return (
    <div className={` ${styles.articlePreview} ${height} `}>
      <div className={`${styles.articlePreviewData} `}>
        <h1 className="mx-auto font-bold text-2xl">{renderArticleTitle}</h1>
        {yourNewArticle ? (
          <div contentEditable={true} className={`${styles.articleContent} `}>
            {" "}
            {finalArticle && finalArticle[0]?.content}{" "}
          </div>
        ) : (
          <div>{renderArticleData}</div>
        )}
      </div>
    </div>
  );
};

export default ArticlePreview;
