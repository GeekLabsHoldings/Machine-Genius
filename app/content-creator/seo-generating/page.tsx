'use client';
import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview"
import CustomBtn from "@/app/_components/Button/CustomBtn"
import styles from './seo-generating.module.css'
import {ArticlePreviewData} from '../../data/data'
import { useState } from "react";

const SEOGenerating = ()=>{
    const [keyword,setKeyword] = useState<string>('');
    const [noOfMatched,setNoOfMatched] = useState<number>(20)

console.log(keyword);
    const searchForWord = ()=>{

        ArticlePreviewData.map((article)=>(
            article.sectionData.map((sentence)=>(
                 sentence.search(keyword)
            ))
        ))

    }
    
    return(
        <div className="flex flex-col h-full">
        <div className="flex justify-center items-center h-[80vh] py-[1.4vw] w-full gap-[10vw] ">
        <div className="w-5/12 flex flex-col gap-[1.3vw]">
        <div className={`${styles.yourSEO}`}>
            <h3>SEO</h3>
          </div>

          <div className={`flex flex-col gap-[0.8vw] ${styles.everySec}`}>
            <h5>Main Keyword</h5>
            <div className={`${styles.seoGeneratingInput} `}>
            <input type="text" className="h-[3.5vh]" onMouseUp={()=>{setKeyword(this?.value)}} />
            </div>
          </div>
          <div className={`flex flex-col gap-[0.8vw] ${styles.everySec}`}>
            <h5>Title Keyword</h5>
            <div className={`${styles.seoGeneratingInput} `}>
            <input type="text" className="h-[3.5vh]" />
            </div>
          </div>
          <div className={`flex flex-col gap-[0.8vw] ${styles.everySec}`}>
            <h5>Heading 1 Keyword</h5>
            <div className={`${styles.seoGeneratingInput} `}>
            <input type="text" className="h-[3.5vh]" />
            </div>
          </div>
          <div className={`flex flex-col gap-[0.8vw] ${styles.everySec}`}>
            <h5>Keyword Density</h5>
            <div>
            {/* `progress w-full` */}
            <progress className={noOfMatched < 7 ? `progress w-full progress-error` : noOfMatched > 7 && noOfMatched < 20 ? `progress w-full progress-warning` : `progress w-full progress-success ` } value={noOfMatched} max="41"></progress>
            </div>
          </div>
          
          <div className={`flex flex-col gap-[0.8vw] ${styles.everySec}`}>
            <h5>Page Description</h5>
            <div className={`${styles.seoGeneratingInput} `}>
            <textarea name="description" id="page-description" cols={30} rows={3}></textarea>
            </div>
          </div>
          <div className={`flex flex-col gap-[0.8vw] ${styles.everySec}`}>
            <h5>Interlinking</h5>
            <div className={`${styles.seoGeneratingInput} `}>
            <input type="text" className="h-[3.5vh]" />
            </div>
          </div>
          <div className={`flex flex-col gap-[0.8vw] ${styles.everySec}`}>
            <h5>Affiliate Links</h5>
            <div className={`${styles.seoGeneratingInput} `}>
            <input type="text" className="h-[3.5vh]" />
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
          word={"Schedule"}
          btnColor="black"
          href={"/content-creator/schedule-script"}
        />
      </div>
            </div>
    )
}
export default SEOGenerating