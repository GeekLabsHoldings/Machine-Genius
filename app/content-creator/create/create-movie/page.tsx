'use client'
import VideoPlayer from '@/app/_components/VideoPlayer/VideoPlayer'
import styles from './create-movie.module.css'
import CustomBtn from '@/app/_components/Button/CustomBtn'
import { TranscriptData } from '@/app/data/data'

const CreateMovie = ()=>{
    const renderTranscriptData = TranscriptData.map((transcript)=>(
        <div className={`flex flex-col  ${styles.script} items-end  `}>
                        <p>{transcript.text}</p>
                        <span>{transcript.minutes}</span>
                    </div>
    ))

    return(
        <div className="flex flex-col gap-[1vw]">
        <div className="flex justify-center items-center h-[80vh] w-full gap-[10vw] ">
            <div className={`${styles.createMovie} w-5/12 `}>
                <h1>Transcribe</h1>
                <div className={`${styles.box} flex flex-col px-[1.5vw] pt-[4vw] pb-[1.5vw] gap-[1vw]`}>
                   {renderTranscriptData}
                </div>
            </div>
            <div className={`${styles.createMovie} w-7/12 `}>
                <h3>Preview</h3>
                <div className={`${styles.box} flex justify-center items-center ${styles.movieWrapper} `}>
                    <VideoPlayer videoUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'/>
                </div>
            </div>
            </div>
            <div className="flex justify-between w-full">
                <CustomBtn word={"Back"} btnColor="white" href={"/content-creator/create/choose-content"} />
                <CustomBtn word={"Next"} btnColor="black" href={"/content-creator/create/create-article"} />
            </div>
            </div>
    )
}

export default CreateMovie