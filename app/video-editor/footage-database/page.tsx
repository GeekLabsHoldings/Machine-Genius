"use client";
import CustomBtn from '@/app/_components/Button/CustomBtn';
import styles from './footage-database.module.css';
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import {
    ArticleNames,
    VideosDatabase
} from "@/app/_data/data";
import $ from 'jquery';
import VideoPlayer from '@/app/_components/VideoPlayer/VideoPlayer';

const FootageDatabase = () => {
     // Function to handle the selection background
    const handleSelectedBg = (e: any)=>{
        $('.articleRow').removeClass('selected')
        $(e.target).parents('.articleRow').toggleClass('selected')
    }

    // Render the list of videos from the VideosDatabase array
  const renderVideos = VideosDatabase.map((oneVideo , idx) => (
    <ul
    key={idx}
      className = { `${styles.tableBody} borderBottom articleRow ` } 
      onClick={(e)=>{handleSelectedBg(e)}}
    >
      <li className="w-[20%]">{oneVideo.id}</li>
      <li className="w-[20%] ">
        {/* Conditional rendering for different brand colors */}
        <span
          className={
            oneVideo.brand === "PST USA"
              ? "bg-[#31B2E9B2]"
              : oneVideo.brand === "Canada"
              ? "bg-[#E9313EB2]"
              : oneVideo.brand === "PST Asia"
              ? "bg-[#E1C655B2]"
              : oneVideo.brand === "Investocracy"
              ? "bg-[#5FA85BB5]"
              : "bg-[#F36F24B2]"
          }
        >
          {oneVideo.brand}
        </span>
      </li>
      <li className="w-[60%] ">{oneVideo.title}</li>
 

    </ul>
  ));

  return (
      <div className={`${styles.articleDatabase} w-full h-full pt-[0.5vw]`}>
        {/* Page header and filters */}
          <div className={`flex flex-col gap-[0.7vw] w-full pageHeader`}>
          <h3>Filter By:</h3>
          <div className={`${styles.filters} flex justify-between gap-[1vw]`}>
            <div className="flex flex-col w-2/12 gap-[0.3vw]">
              <CustomSelectInput label="Published" options={ArticleNames} />
            </div>
            <CustomBtn btnColor='black' word='Add Footage'/>
          </div>
        </div>
     
{/* Table content and video section */}
         <div className={`${styles.box} pageHeader flex w-full px-[0.5vw] `}>
           <div className={`${styles.tableContent} w-1/2`}>
           <ul
              className={`${styles.tableHeader} flex justify-center items-center py-[2vh]`}
            >
              <li className="w-[20%]">#</li>
              <li className="w-[20%] ">Brand</li>
              <li className="w-[60%] ">Topic</li>
              
            </ul>
{/* Rendered list of videos */}
            {renderVideos}
           </div>
           <div className={`w-1/2 flex flex-col gap-[1vw] ${styles.videosSection}`}>
            <h3>Topic Name</h3>

            <div className="flex gap-[1.5vw]">
            <div className={`${styles.videoHolder} w-1/2`}>
            <VideoPlayer autoplay={false} videoUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' />
            </div>
            <div className={`${styles.videoHolder} w-1/2`}>
            <VideoPlayer autoplay={false} videoUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' />
            </div>
            </div>
            <div className="flex gap-[1.5vw]">
            <div className={`${styles.videoHolder} w-1/2`}>
            <VideoPlayer autoplay={false} videoUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' />
            </div>
            <div className={`${styles.videoHolder} w-1/2`}>
            <VideoPlayer autoplay={false} videoUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' />
            </div>
            </div>
            <div className="flex gap-[1.5vw]">
            <div className={`${styles.videoHolder} w-1/2`}>
            <VideoPlayer autoplay={false} videoUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' />
            </div>
            <div className={`${styles.videoHolder} w-1/2`}>
            <VideoPlayer autoplay={false} videoUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' />
            </div>
            </div>

           </div>
        </div>  
      </div>
  
  );
};

export default FootageDatabase;
