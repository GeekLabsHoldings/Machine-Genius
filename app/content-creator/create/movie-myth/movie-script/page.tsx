'use client';
import CustomBtn from "@/app/_components/Button/CustomBtn"
import styles from './movie-script.module.css'
// page enables you to have a look to your article
import VideoPlayer from '@/app/_components/VideoPlayer/VideoPlayer'
import { TranscriptData } from '@/app/_data/data'

const MovieScript = () => {
    // return script data 
    const renderTranscriptData = TranscriptData.map((transcript) => (
        <div className={`flex flex-col ${styles.script} items-end  `}>
            <p>{transcript.text}</p>
            <span>{transcript.minutes}</span>
        </div>
    ))

    return (
        <div className="flex flex-col gap-[1vw]">
            <div className="flex justify-center items-center pageHeader h-[75vh] py-[1.5vw] w-full gap-[2vw] ">
                {/* script section */}
                <div className={`${styles.createMovie} w-5/12  h-full`}>
                    <h3>Script</h3>
                    <div className={`${styles.box} px-[1.5vw] pt-[2.5vw] pb-[1.5vw] `}>
                        <div className={`${styles.dataWrapper}  flex flex-col gap-[1vw] `}>
                        {renderTranscriptData}
                        </div>
                    </div>
                </div>
                {/* section to display your selected movie */}
                <div className={`${styles.createMovie} w-7/12 h-full`}>
                    <h3>Preview</h3>
                    <div className={`${styles.box} flex justify-center items-center ${styles.movieWrapper} `}>
                        {/* <VideoPlayer videoUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' /> */}
                    </div>
                </div>
            </div>
            {/* buttons lead you to last and next page */}
            <div className="flex justify-between w-full">
                <CustomBtn word={"Back"} btnColor="white" href={"/content-creator/create/movie-myth/create-movie"} />
                <CustomBtn word={"Next"} btnColor="black" href={"/content-creator/create/movie-myth/final-movie"} />
            </div>
        </div>
    )
}

export default MovieScript