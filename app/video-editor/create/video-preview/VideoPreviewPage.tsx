"use client";
import CustomVideoPlayer from "@/app/_components/VideoEditing/CustomVideoPlayer/CustomVideoPlayer";
import styles from "./VideoPreviewPage.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";

const VideoPreviewPage = () => {
  return (
    <div className={`w-full h-full py-[1vw] pageHeader `}>
      <h3 className="pb-[0.8vw]">Your video is all done!</h3>
      <div className="flex pb-[0.9vw] ">
        <div className={`w-2/3 flex flex-col gap-[1vw] ${styles.videoPreview}`}>
          <h5 className="w-4/5">
            Make sure to watch the video carefully before uploading, if there
            are any errors in your video, you can quick edit them from the
            options below{" "}
          </h5>
          <div className={`${styles.borderRight} flex flex-col gap-[1vw]`}>
            <h4>Video Preview:</h4>
            {/* display video here */}
            <div
              className={`${styles.videoHolder} flex justify-center items-center `}
            >
              <CustomVideoPlayer videoUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' />
            </div>
          </div>
        </div>
        {/* edit boxes */}
        <div
          className={`${styles.access} w-1/3 ps-[2vw] flex flex-col gap-[0.8vw]`}
        >
          <h4>Quick Acss</h4>
          <div className={`${styles.box}`}>
            <h5>Edit Footage</h5>
            <p>
              Make sure to watch the video carefully before uploading, if there
              are any errors in your video, you can quick edit them from the
              options below{" "}
            </p>
            <CustomBtn
              width="w-full"
              word="Footage Selection"
              href="/video-editor/create/footage-preview"
              btnColor="black"
            />
          </div>

          <div className={`${styles.box}`}>
            <h5>Edit Music</h5>
            <p>
              Make sure to watch the video carefully before uploading, if there
              are any errors in your video, you can quick edit them from the
              options below{" "}
            </p>
            <CustomBtn
              width="w-full"
              word="Music Selection"
              href="/video-editor/create/converted-article"
              btnColor="black"
            />
          </div>

          <div className={`${styles.box}`}>
            <h5>Voice Over</h5>
            <p>
              Make sure to watch the video carefully before uploading, if there
              are any errors in your video, you can quick edit them from the
              options below{" "}
            </p>
            <CustomBtn
              width="w-full"
              word="Voice Over"
              href="/video-editor/create/converted-article"
              btnColor="black"
            />
          </div>
        </div>
      </div>
      {/* buttons lead you to last or next page */}
      <div className="flex justify-between">
        <CustomBtn
          word="Back"
          btnColor="white"
          href="/video-editor/create/choose-footage"
        />
        <CustomBtn
          word="Next"
          btnColor="black"
          href="/video-editor/create/video-upload"
        />
      </div>
    </div>
  );
};

export default VideoPreviewPage;
