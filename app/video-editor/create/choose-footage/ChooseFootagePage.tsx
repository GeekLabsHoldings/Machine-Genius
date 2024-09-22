"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./ChooseFootagePage.module.css";
import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";

import { useContext, useEffect, useState } from "react";
import CustomVideoPlayer from "@/app/_components/VideoEditing/CustomVideoPlayer/CustomVideoPlayer";
import { videoEditingContext } from "@/app/_context/videoEditingContext";

interface ScriptSegment {
  index: number;
  text: string;
  keywordsAndImages: {
    keyword: string;
    imageUrl: string[];
  }[];
  audioPath: {
    index: number;
    url: string;
    duration: number;
  };
}

const ChooseFootagePage = () => {
  const { splitedContent, setSplitedContent } = useContext(videoEditingContext);
  const [pageState, setPageState] = useState<{
    selectedScriptSegment: ScriptSegment | null;
    selectedIncorrectWord: string | null;
  }>({
    selectedScriptSegment: null,
    selectedIncorrectWord: null,
  });



  return (
    <div className={`w-full h-full flex flex-col ${styles.footagePreview}`}>
      <div className="flex gap-[2vw] h-[75vh] py-[1.5vw]">
        <div className="w-1/2">
          <h3 className="font-bold !text-[--32px] mb-[--sy-10px]">
            Choose Footage
          </h3>

          {/* Script Preview */}
          <div className={` ${styles.articlePreview} h-[90%] `}>
            <div className={`${styles.articlePreviewData} `}>
              <div className={`${styles.articleHeader} `}>
                <h1 className="mx-auto pb-[--sy-15px]">Script Title</h1>
                <div className="cursor-pointer h-max"></div>
              </div>
              {Array.isArray(splitedContent) && splitedContent.length > 0 ? (
                splitedContent.map((scriptSegment: ScriptSegment) => (
                  <div
                    className={`${styles.articleContent} cursor-pointer`}
                    key={scriptSegment.index}
                  >
                    <p
                      className={`${
                        pageState.selectedScriptSegment?.index ===
                        scriptSegment.index
                          ? styles.active
                          : ""
                      }`}
                      onClick={() =>
                        setPageState((prevState) => ({
                          ...prevState,
                          selectedScriptSegment: scriptSegment,
                          selectedIncorrectWord: null,
                        }))
                      }
                    >
                      {scriptSegment.text}
                    </p>
                  </div>
                ))
              ) : (
                <div>
                  <p>No data available!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-[1vw]">
          <div className="flex justify-between">
            <h3 className="font-bold text-[--24px]">Footage Found</h3>
          </div>
          {/* holds sample of footage */}
          <div className="flex gap-[0.6vw]">




            <div className={`${styles.box} h-[12vh] w-1/3 `}>
              <div className={`${styles.movedCheckbox}`}>
                <CustomCheckBox
                  value=""
                  type="checkbox"
                  name="choose-footage"
                />
              </div>
              {/* <CustomVideoPlayer
                video={video}
                setVideo={setVideo}
                autoplay={false}
                videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              /> */}
            </div>









          </div>


























































          <div className="flex items-center justify-between">
            <p className="font-bold text-[--24px]">Out Sourced Footage</p>

            <CustomBtn
              word="Insert Source"
              btnColor={"black"}
              paddingVal="py-[--8px] px-[--24px]"
            />
          </div>












        </div>
      </div>




































      {/* buttons lead you to last and next page */}
      <div className="flex justify-between mt-[--sy-30px]">
        <CustomBtn
          word="Back"
          btnColor={"white"}
          href="/video-editor/create/converted-script"
        />
        <CustomBtn
          word="Next"
          btnColor={"black"}
          href="/video-editor/create/video-preview"
        />
      </div>
    </div>
  );
};

export default ChooseFootagePage;
