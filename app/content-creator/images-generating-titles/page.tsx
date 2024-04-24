
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
        <div className="w-5/12 flex flex-col gap-[2vw]">
          <div className="flex flex-col gap-[1.5vw]">
          <div className={`${styles.yourThumbnail}`}>
            <h3>Thumbnail</h3>
          </div>
          <CustomSelectInput label={"Select Thumbnail"} options={SelectArticleData}/>
          </div>
          <div className={`flex flex-col gap-[0.8vw] ${styles.everySec}`}>
            <h5>Preview</h5>
            <div className={`${styles.imageHolder} h-[20vh] flex justify-center items-center`}>

            <svg width="50" height="44" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M37.5 0C44.4036 0 50 5.59644 50 12.5V31.25C50 38.1536 44.4036 43.75 37.5 43.75H12.5C5.59644 43.75 0 38.1536 0 31.25V12.5C0 5.59644 5.59644 0 12.5 0H37.5ZM43.6975 15.6516C43.0832 15.0456 42.0939 15.0523 41.4878 15.6665L28.8865 28.4391L17.4651 17.0177L17.2985 16.8655C16.2707 16.0086 14.7483 16.1612 13.7901 17.1194L5.73474 25.1747L5.61333 25.311C5.12766 25.9243 5.16813 26.8178 5.73474 27.3844L5.87103 27.5058C6.48433 27.9915 7.37784 27.951 7.94445 27.3844L15.6792 19.6495L31.1464 35.1184L31.2827 35.2398C31.896 35.7255 32.7895 35.685 33.3561 35.1184C33.9663 34.5082 33.9663 33.5189 33.3561 32.9087L31.0958 30.6484L43.7124 17.8613L43.8329 17.7242C44.3144 17.1077 44.2679 16.2144 43.6975 15.6516ZM29.0625 7.8125C25.6107 7.8125 22.8125 10.6107 22.8125 14.0625C22.8125 17.5143 25.6107 20.3125 29.0625 20.3125C32.5143 20.3125 35.3125 17.5143 35.3125 14.0625C35.3125 10.6107 32.5143 7.8125 29.0625 7.8125ZM29.0625 10.9375C30.7884 10.9375 32.1875 12.3366 32.1875 14.0625C32.1875 15.7884 30.7884 17.1875 29.0625 17.1875C27.3366 17.1875 25.9375 15.7884 25.9375 14.0625C25.9375 12.3366 27.3366 10.9375 29.0625 10.9375Z" fill="#202327"/>
            </svg>

            </div>
          </div>

          <div className="w-6/12 flex flex-col gap-[2vw]">
          <div className={`flex flex-col gap-[0.8vw] ${styles.everySec}`}>
            <h5>Title</h5>
            <div className={styles.generatingInput}>
            <input type="text" placeholder="Canada Hates People" />
            </div>
         
          </div>
          <div className={`flex flex-col gap-[0.8vw] ${styles.everySec}`}>
            <h5>Upload Time</h5>
            <CustomSelectInput label={"8:30 PM GMT"} options={SelectArticleData}/>
         
          </div>
          </div>

        </div>

        {/* Article part */}
        <div className={`w-7/12`}>
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
