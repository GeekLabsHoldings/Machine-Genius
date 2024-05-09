'use client'
import React from 'react';
import styles from './converted-article.module.css'
import CustomBtn from '@/app/_components/Button/CustomBtn';
import ArticlePreview from '@/app/_components/ArticlePreview/ArticlePreview';
import CustomAudioPlayer from '@/app/_components/customAudioPlayer/CustomAudioPlayer'

const convertedArticle = () => {

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-end h-[75vh] py-[1.5vw] w-full gap-[2vw]">
        <div className="w-7/12 flex flex-col gap-[1vw] h-full">
          <div className={`${styles.yourArticle} h-full`}>
            <h3>Converted Article</h3>
            <ArticlePreview
              yourNewArticle={false}
              height="h-[90%]"
              withEdit={false}
            />
          </div>
          {/* display your article  */}
          {/* yourNewArticle should be true but till fixing selection bug */}

        </div>
        {/* comments part */}
        <div className={`w-5/12 h-[90%]`}>
          <div className={styles.audio_player + " mb-[2vw]"}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            <CustomAudioPlayer />
          </div>

          <div className={styles.selected_words}>
            <div className={styles.header + " flex items-center justify-between"}>
              <h6>Selected Words</h6>
              <div className={styles.update_delete + " flex items-center gap-[1vw]"}>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29" fill="none">
                    <path d="M0 26.6436L5.51027 28.4211L7.46523 26.4532L3.76819 22.7319L0 26.6436ZM6.87185 13.3208C6.58154 13.5787 6.37108 13.9153 6.26557 14.2903C6.16006 14.6653 6.16396 15.0629 6.27682 15.4357L6.99648 17.8132L4.18785 20.6409L9.49463 25.9825L12.2994 23.1593L14.6564 23.8854C15.4135 24.1185 16.2363 23.8848 16.7602 23.287L18.7207 20.9756L9.16155 11.3536L6.87185 13.3208ZM29.1131 4.40048L25.6279 0.892285C24.4979 -0.245102 22.6841 -0.302276 21.4852 0.761838L10.5082 10.1962L19.8705 19.6206L29.2427 8.5709C30.3004 7.36412 30.2436 5.53842 29.1131 4.40048Z" fill="#9B5FBF" />
                  </svg>
                </button>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 22 25" fill="none">
                    <path d="M6.6 1.1V2.2H1.1C0.492492 2.2 0 2.69249 0 3.3V4.4C0 5.00751 0.492492 5.5 1.1 5.5H20.9C21.5075 5.5 22 5.00751 22 4.4V3.3C22 2.69249 21.5075 2.2 20.9 2.2H15.4V1.1C15.4 0.492487 14.9075 0 14.3 0H7.7C7.09249 0 6.6 0.492487 6.6 1.1Z" fill="#2A2B2A" />
                    <path d="M2.11538 7.7H19.8843L18.8478 21.6938C18.7201 23.417 17.2848 24.75 15.5568 24.75H6.44294C4.71497 24.75 3.2796 23.417 3.15196 21.6938L2.11538 7.7Z" fill="#2A2B2A" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* buttons to move to last or next page */}
      <div className="flex justify-between items-center">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href={"/video-editor/create/video-creation"}
        />
        <CustomBtn
          word={"Generate Titles"}
          btnColor="black"
          href={"/video-editor/create/video-templates"}
        />
      </div>
    </div>
  )
}

export default convertedArticle
