// const ImagesForGeneratingTitles = ()=>{

// }

// export default ImagesForGeneratingTitles

import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import styles from "./commentsOnArticle.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import TopicColapse from "@/app/_components/TopicCollapse/TopicCollapse";

const CommentsOnArticle = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center m-auto h-[80vh] py-[1.4vw] w-full gap-[2vw]">
        <div className="w-7/12 flex flex-col gap-[1vw]">
          <div className={`${styles.yourArticle}`}>
            <h3>Articles</h3>
          </div>
          {/* display your article  */}
          {/* yourNewArticle should be true but till fixing selection bug */}
          <ArticlePreview
            yourNewArticle={false}
            height="h-[65vh]"
            withEdit={false}
          />
        </div>
        {/* comments part */}
        <div className={`w-5/12`}>
          <div className="flex flex-col gap-[1vw]">
            <div className={` ${styles.commentsHeader}`}>
              <h2>Comments</h2>
            </div>
            {/* return comments on article */}
            <div className={`${styles.commentsParent}`}>
   
            </div>
          </div>
        </div>
      </div>
      {/* buttons to move to last or next page */}
      <div className="flex justify-between items-center">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href={"/content-creator/choose-articles"}
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href={"/content-creator/working-on-article-after-create"}
        />
      </div>
    </div>
  );
};

export default CommentsOnArticle;
