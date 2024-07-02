"use client";
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import styles from "./ArticleWithCheck.module.css";
import { globalContext } from "@/app/_context/store";
import { useContext } from "react";

interface IProps {
  article: string;
  name: string;
  accsentColor?: string;
}

const ArticleWithCheck = ({ article, name, accsentColor }: IProps) => {
  const { setPreviewText, setChoosedArticles } = useContext(globalContext);

  return article ? (
    <div
      className={`${styles.article_with_check} group`}
      style={{ "--module-color": accsentColor }}
    >
      <CustomCheckBox name={name} value={article} accentColor={accsentColor} onChange={() => setChoosedArticles((prevArticles: any) => [...prevArticles, article])} />
      <label
        className={`${styles.article}`}
        onMouseEnter={() =>
          setPreviewText(article)
        }
      >
        {article}
      </label>
    </div>
  ) : null;
};

export default ArticleWithCheck;
