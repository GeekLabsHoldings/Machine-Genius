
import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import styles from "./images-generating-titles.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import TopicColapse from "@/app/_components/TopicCollapse/TopicCollapse";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { SelectArticleData } from "@/app/data/data";

const ImagesForGeneratingTitles = () => {

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between m-auto h-[80vh] py-[1.4vw] w-full gap-[10vw]">
        <div className="w-6/12 flex flex-col gap-[2vw]">
          <div className="flex flex-col gap-[1.5vw]">
          <div className={`${styles.yourThumbnail}`}>
            <h3>Thumbnail</h3>
          </div>
          <CustomSelectInput label={"Select Thumbnail"} options={SelectArticleData}/>
          </div>
          <div className="flex flex-col gap-[1.5vw]">
            <h5>Preview</h5>
            <div className={`${styles.imageHolder} h-[25vh]`}>

            </div>
          </div>
  
   
         
        </div>

        {/* Article part */}
        <div className={`w-6/12`}>
           {/* yourNewArticle should be true but till fixing selection bug */}
          <ArticlePreview height="h-[75vh]" withEdit={false} yourNewArticle={false}/>
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

export default ImagesForGeneratingTitles;
