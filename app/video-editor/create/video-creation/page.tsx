"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./video-creation.module.css";
import { AssignedVideos } from "@/app/_data/data";

const VideoCreation = () => {
  // render assigned videos to every one and its status of completetion
  const renderVideosData = AssignedVideos.map((video, idx) => (
    <ul
      key={idx}
      className="borderBottom w-full flex justify-between  items-center py-[0.5vh] text-center"
    >
      <li className="w-[5%]">{video.id}</li>
      <li className="w-[45%]">{video.title}</li>
      <li className="w-[15%]">{video.date}</li>
      <li className="w-[15%]">
        <span
          className={
            video.assignedTo === "Sherry"
              ? "bg-[#9B5FBFB2]"
              : video.assignedTo === "Kamel"
              ? "bg-[#E1C655B2]"
              : video.assignedTo === "Yara"
              ? "bg-[#31B2E9B2]"
              : "bg-[#F36F24B2]"
          }
        >
          {video.assignedTo}
        </span>
      </li>
      {/* lead user to convert article to video or disply it after conversion */}
      <li className="w-[20%]">
        {" "}
        <CustomBtn
          class="videoStatusBtn"
          width="w-full"
          word={video.videoStatus}
          href={
            video.videoStatus === "Convert Audio" ? "converted-article" : ""
          }
          btnColor="black"
        />{" "}
      </li>
    </ul>
  ));

  return (
    <div
      className={`w-full h-full pageHeader flex flex-col gap-[1vw]  ${styles.createVideo}`}
    >
      <h3 className="pt-[1vw]">Assigned Videos</h3>
      {/* render assigned videos in table */}
      <div className={styles.videoDatabase}>
        <div className={`${styles.videoWrapper} flex flex-col h-[70vh]`}>
          {/* table header */}
          <ul
            className={`${styles.tableHeader} w-full flex justify-between items-center text-center py-[2vh]`}
          >
            <li className="w-[5%]">#</li>
            <li className="w-[45%]">Script Title</li>
            <li className="w-[15%]">Date</li>
            <li className="w-[15%]">Assigned To</li>
            <li className="w-[20%]">Edit</li>
          </ul>
          {/* table body */}
          <div className={`${styles.tableBody} flex flex-col`}>
            {renderVideosData}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCreation;
