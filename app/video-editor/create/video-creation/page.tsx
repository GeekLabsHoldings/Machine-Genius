
import CustomBtn from '@/app/_components/Button/CustomBtn';
import styles from './video-creation.module.css';
import { AssignedVideos } from '@/app/_data/data';
import $ from 'jquery';

const VideoCreation = ()=>{
    const handleSelectedBg = (e: any)=>{
        $('.assignedVideo').removeClass('selected')
        $('.videoStatusBtn').removeClass('clicked')
        $(e.target).parents('.assignedVideo').toggleClass('selected')
        $(e.target).toggleClass('selected')
        $(e.target).find('.videoStatusBtn').toggleClass('clicked')
    }
    const renderVideosData = AssignedVideos.map((video,idx)=>(
        <ul key={idx} className='borderBottom w-full flex justify-between assignedVideo items-center py-[0.5vh] text-center' onClick={(e)=>{handleSelectedBg(e);console.log(e.target)}}>
                <li className="w-[5%]">{video.id}</li>
                <li className="w-3/12">{video.title}</li>
                <li className="w-2/12">{video.date}</li>
                <li className="w-2/12"><span
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
                <li className="w-2/12 "> <CustomBtn class='videoStatusBtn' width='w-full' word={video.videoStatus} href={video.videoStatus === 'Convert Audio' ? 'convert-audio' : ''} btnColor='black' /> </li>
        </ul>
    ))

   
    return(
        <div className={`w-full h-full pageHeader flex flex-col gap-[1vw]  ${styles.createVideo}`}>
            <h3 className='pt-[1vw]'>Assigned Videos</h3>

            <div className={styles.videoDatabase}>
            <div className={`${styles.videoWrapper} flex flex-col h-[70vh]`}>
            <ul className={`${styles.tableHeader} w-full flex justify-between items-center text-center py-[2vh]`}>
                <li className="w-[5%]">#</li>
                <li className="w-3/12">Script Title</li>
                <li className="w-2/12">Date</li>
                <li className="w-2/12">Assigned To</li>
                <li className="w-2/12">Edit</li>
            </ul>

            <div className={`${styles.tableBody} flex flex-col`}>
            {renderVideosData}
            </div>
        </div>
            </div>
            

        </div>
    )
}


export default VideoCreation