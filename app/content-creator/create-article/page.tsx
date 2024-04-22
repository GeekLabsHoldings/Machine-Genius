'use client'
import { useState } from "react";
import styles from './create-article.module.css'
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
      <div className="flex flex-col justify-center items-center m-auto h-full py-[1.4vw]" >
        <div className="flex justify-between gap-[2vw]">
          <div className="w-7/12">
            <ArticlePreview
              withEdit={false}
              selectedText={selectedText}
              setSelectedText={setSelectedText}
            />
          </div>

          <div className={`w-5/12 ${styles.selectionsHeader} flex flex-col gap-4`}>
           <div className="flex justify-between items-center">
           <div className={`${styles.checkSelection} items-center flex`}>
                <input type="checkbox" name="check-article" id="check" />
                <h2>Selections</h2>
            </div>
            <div>
            <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.6 1.1V2.2H1.1C0.492492 2.2 0 2.69249 0 3.3V4.4C0 5.00751 0.492492 5.5 1.1 5.5H20.9C21.5075 5.5 22 5.00751 22 4.4V3.3C22 2.69249 21.5075 2.2 20.9 2.2H15.4V1.1C15.4 0.492487 14.9075 0 14.3 0H7.7C7.09249 0 6.6 0.492487 6.6 1.1Z" fill="#2A2B2A"/>
            <path d="M2.11538 7.7H19.8843L18.8478 21.6938C18.7201 23.417 17.2848 24.75 15.5568 24.75H6.44294C4.71497 24.75 3.2796 23.417 3.15196 21.6938L2.11538 7.7Z" fill="#2A2B2A"/>
            </svg>
            </div>
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
