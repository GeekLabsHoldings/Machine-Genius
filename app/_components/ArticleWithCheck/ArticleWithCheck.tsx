"use client";
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import styles from "./ArticleWithCheck.module.css";

interface IProps {
  article: string;
  name: string;
  accsentColor?: string;
  handleCheckboxChange?: () => void;
  checked?: boolean;
  handleLabelClick?: () => void;
}

const ArticleWithCheck = ({
  article,
  name,
  accsentColor,
  handleCheckboxChange,
  checked,
  handleLabelClick,
}: IProps) => {
  return article ? (
    <div
      className={`${styles.article_with_check} group`}
      // style={{ "--module-color": accsentColor }}
      style={{ "--module-color": accsentColor } as React.CSSProperties}
    >
      <CustomCheckBox
        name={name}
        value={article}
        accentColor={accsentColor}
        onClick={handleCheckboxChange}
        checked={checked}
      />
      <label className={`${styles.article}`} onClick={handleLabelClick}>
        {article}
      </label>
    </div>
  ) : null;
};

export default ArticleWithCheck;
