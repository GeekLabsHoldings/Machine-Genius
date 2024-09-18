"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./ChooseFootagePage.module.css";
import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";
import { SimplePagination } from "@/app/_components/Pagination/pagination";
import { useEffect, useState } from "react";
import CustomVideoPlayer from "@/app/_components/VideoEditing/CustomVideoPlayer/CustomVideoPlayer";

const ChooseFootagePage = () => {
  // state that holds video url when click on it to display it in preview section
  const [video, setVideo] = useState<string>("");

  // render video in every update in its url
  // const renderVideo = () => {
  //   return (
  //     <div>
  //       <CustomVideoPlayer video={video} autoplay={true} videoUrl={video} />
  //     </div>
  //   );
  // };
  // useEffect(() => {
  //   renderVideo;
  // }, [video]);

  return (
    <div className={`w-full h-full flex flex-col ${styles.footagePreview}`}>
      <div className="flex gap-[2vw] h-[75vh] py-[1.5vw]">
        <div className="w-1/2">
          <h3 className="font-bold !text-[--32px] mb-[--sy-10px]">
            Choose Footage
          </h3>
          <ArticlePreview
            height="h-full"
            withEdit={false}
            yourNewArticle={false}
          />
        </div>

        <div className="w-1/2 flex flex-col gap-[1vw]">
          <div className="flex justify-between">
            <h3 className="font-bold text-[--24px]">Footage Found</h3>
            <SimplePagination />
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
              <CustomVideoPlayer
                video={video}
                setVideo={setVideo}
                autoplay={false}
                videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              />
            </div>
            <div className={`${styles.box} h-[12vh] w-1/3 `}>
              <div className={`${styles.movedCheckbox}`}>
                <CustomCheckBox
                  value=""
                  type="checkbox"
                  name="choose-footage"
                />
              </div>
              <CustomVideoPlayer
                video={video}
                setVideo={setVideo}
                autoplay={false}
                videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
              />
            </div>
            <div className={`${styles.box} h-[12vh] w-1/3 `}>
              <div className={`${styles.movedCheckbox}`}>
                <CustomCheckBox
                  value=""
                  type="checkbox"
                  name="choose-footage"
                />
              </div>
              <CustomVideoPlayer
                video={video}
                setVideo={setVideo}
                autoplay={false}
                videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <h3 className="font-bold text-[--24px]">Selected Footage</h3>
            <SimplePagination />
          </div>
          {/* holds sample of footage */}
          <div className="flex gap-[0.6vw]">
            <div className={`${styles.box} h-[12vh] w-1/3 `}>
              <div className={`${styles.movedCheckbox}`}>
                <CustomCheckBox
                  checked
                  value=""
                  type="checkbox"
                  name="choose-footage"
                />
              </div>
              <CustomVideoPlayer
                video={video}
                setVideo={setVideo}
                autoplay={false}
                videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              />
            </div>
            <div className={`${styles.box} h-[12vh] w-1/3 `}>
              <div className={`${styles.movedCheckbox}`}>
                <CustomCheckBox
                  checked
                  value=""
                  type="checkbox"
                  name="choose-footage"
                />
              </div>
              <CustomVideoPlayer
                video={video}
                setVideo={setVideo}
                autoplay={false}
                videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
              />
            </div>
            <div className={`${styles.box} h-[12vh] w-1/3 `}>
              <div className={`${styles.movedCheckbox}`}>
                <CustomCheckBox
                  checked
                  value=""
                  type="checkbox"
                  name="choose-footage"
                />
              </div>
              <CustomVideoPlayer
                video={video}
                setVideo={setVideo}
                autoplay={false}
                videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              />
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
