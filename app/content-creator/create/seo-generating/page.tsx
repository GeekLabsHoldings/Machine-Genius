'use client';
import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview"
import CustomBtn from "@/app/_components/Button/CustomBtn"
import styles from './seo-generating.module.css'
import { ArticlePreviewData } from '../../../_data/data'
import { useState } from "react";

const SEOGenerating = () => {
  
  const [keyword, setKeyword] = useState<string>('');
  const [noOfMatched, setNoOfMatched] = useState<number>(0);

  const searchForWord = () => {
    const matchedWords: string[] = []
    ArticlePreviewData.map((article) => (
      article.sectionData.map((sentence) => (
        sentence.split(" ").map((word) => {
          if (word === keyword) {
            matchedWords.push(word)
            setNoOfMatched(matchedWords.length)
            return noOfMatched
          }
        })
      ))
    )
    )
  }

  return (
    <div className="flex flex-col ">
      <div className="flex justify-center items-start w-full gap-[10vw] h-[75vh] py-[1.5vw]">
        <div className="w-5/12 flex flex-col justify-between gap-[0.5vw] h-full">

          <div className={`${styles.yourSEO} pageHeader`}>
            <h3>SEO</h3>
          </div>

          <div className={`flex flex-col gap-[0.4vw] ${styles.everySec}`}>
            <h5>Main Keyword</h5>
            <div className={`${styles.seoGeneratingInput} `}>
              <input type="text" onChange={(e) => { setKeyword(e.target.value); searchForWord() }} />
            </div>
          </div>

          <div className={`flex flex-col gap-[0.4vw] ${styles.everySec}`}>
            <h5>Title Keyword</h5>
            <div className={`${styles.seoGeneratingInput} `}>
              <input name="title-keyword" type="text" />
            </div>
          </div>

          <div className={`flex flex-col gap-[0.4vw] ${styles.everySec}`}>
            <h5>Heading 1 Keyword</h5>
            <div className={`${styles.seoGeneratingInput} `}>
              <input name="heading-title" type="text" />
            </div>
          </div>

          <div className={`flex flex-col gap-[0.4vw] ${styles.everySec}`}>
            <div className="flex justify-between items-center">
              <h5>Keyword Density</h5>
              {noOfMatched > 7 && noOfMatched < 41 ?
                <svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_646_2190)">
                    <path d="M10 1C5.58191 1 2 4.58157 2 9C2 13.4184 5.58191 17 10 17C14.4181 17 18 13.4184 18 9C18 4.58157 14.4181 1 10 1ZM12.2261 7.11409C12.6682 7.11409 13.0449 7.62922 13.1948 8.35513C13.2212 8.48557 13.1878 8.62087 13.104 8.72417C13.0202 8.82713 12.8939 8.88765 12.7614 8.88765H11.6915C11.5583 8.88765 11.4323 8.82783 11.3485 8.72452C11.2643 8.62157 11.2313 8.48557 11.2581 8.35548C11.4077 7.62922 11.7843 7.11409 12.2261 7.11409ZM7.77391 7.11409C8.216 7.11409 8.5927 7.62957 8.74226 8.35513C8.76904 8.48557 8.73565 8.62087 8.65148 8.72417C8.56765 8.82713 8.44139 8.88765 8.30887 8.88765H7.23896C7.10609 8.88765 6.98017 8.82783 6.896 8.72452C6.81217 8.62122 6.77878 8.48557 6.80557 8.35513C6.95478 7.62957 7.33148 7.11409 7.77391 7.11409ZM10 14.1231C7.91757 14.1231 6.09913 12.9927 5.12313 11.3127C5.04348 11.1757 5.04348 11.007 5.12243 10.8696C5.20139 10.7322 5.34748 10.6483 5.50609 10.6483H14.4939C14.6518 10.6483 14.7983 10.7329 14.8772 10.8699C14.9569 11.007 14.9569 11.176 14.8772 11.3123C13.9009 12.9927 12.0821 14.1231 10 14.1231Z" fill="#5FA85B" />
                  </g>
                  <defs>
                    <filter id="filter0_d_646_2190" x="0.4" y="0.4" width="21.2" height="21.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dx="1" dy="2" />
                      <feGaussianBlur stdDeviation="1.3" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_646_2190" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_646_2190" result="shape" />
                    </filter>
                  </defs>
                </svg> : <svg fill="red" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                  width="18" height="18" viewBox="0 0 34.25 34.25"
                >
                  <g>
                    <path d="M17.125,0C7.668,0,0,7.667,0,17.125S7.668,34.25,17.125,34.25c9.459,0,17.125-7.667,17.125-17.125S26.584,0,17.125,0z
		 M23.445,11.422c1.355,0,2.453,1.099,2.453,2.453s-1.098,2.453-2.453,2.453c-1.354,0-2.451-1.099-2.451-2.453
		S22.093,11.422,23.445,11.422z M10.806,11.422c1.354,0,2.453,1.099,2.453,2.453s-1.099,2.453-2.453,2.453s-2.453-1.099-2.453-2.453
		S9.453,11.422,10.806,11.422z M26.457,25.641c-0.26,0.492-0.77,0.801-1.328,0.801H9.121c-0.559,0-1.067-0.309-1.328-0.801
		c-0.26-0.494-0.225-1.09,0.093-1.549c2.098-3.046,5.551-4.865,9.239-4.865c3.689,0,7.146,1.819,9.24,4.866
		C26.684,24.55,26.718,25.146,26.457,25.641z"/>
                  </g>
                </svg>}


            </div>
            <div>
              <progress className={noOfMatched < 7 ? `progress w-full progress-error` : noOfMatched > 7 && noOfMatched < 20 ? `progress w-full progress-warning` : noOfMatched > 20 && noOfMatched < 41 ? `progress w-full progress-success ` : `progress w-full progress-error`} value={noOfMatched} max="50"></progress>
            </div>
          </div>

          <div className={`flex flex-col gap-[0.4vw] ${styles.everySec}`}>
            <h5>Page Description</h5>
            <div className={`${styles.seoGeneratingInput} `}>
              <textarea name="description" id="page-description" cols={30} rows={3}></textarea>
            </div>
          </div>

          <div className={`flex flex-col gap-[0.4vw] ${styles.everySec}`}>
            <h5>Interlinking</h5>
            <div className={`${styles.seoGeneratingInput} `}>
              <input name="interlinking" type="text" />
            </div>
          </div>

          <div className={`flex flex-col gap-[0.4vw] ${styles.everySec}`}>
            <h5>Affiliate Links</h5>
            <div className={`${styles.seoGeneratingInput} `}>
              <input name="affiliate-Links" type="text" />
            </div>
          </div>

        </div>
        {/* Article part */}
        <div className={`w-7/12 h-full`}>
          {/* yourNewArticle should be true but till fixing selection bug */}
          <ArticlePreview height="h-full" withEdit={false} yourNewArticle={false} />
        </div>
      </div>

      {/* buttons to move to last or next page */}
      <div className="flex justify-between items-center">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href={"/content-creator/create/choose-articles"}
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href={"/content-creator/create/make-article-style"}
        />
      </div>
    </div>
  )
}
export default SEOGenerating