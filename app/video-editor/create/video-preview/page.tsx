'use client'
import VideoPlayer from '@/app/_components/VideoPlayer/VideoPlayer';
import styles from './video-preview.module.css'
import CustomBtn from '@/app/_components/Button/CustomBtn';
const VideoPreview = ()=>{
    return(
        <div className={`w-full h-full py-[1vw] pageHeader `}>
              <h3 className='pb-[0.8vw]'>Your video is all done!</h3>
                <div className='flex pb-[0.9vw] '>
                    <div className={`w-2/3 flex flex-col gap-[1vw] ${styles.videoPreview}`}>
                        <h5 className='w-4/5'>Make sure to watch the video carefully before uploading, if there are any errors in your video, you can quick edit them from the options below </h5>
                        <div className={`${styles.borderRight} flex flex-col gap-[1vw]`}>
                        <h4>Video Preview:</h4> 
                        <div className={`${styles.videoHolder} flex justify-center items-center `}>
                        <VideoPlayer videoUrl='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' />
                        </div>
                        </div>
                        </div>

                        <div className={`${styles.access} w-1/3 ps-[2vw] flex flex-col gap-[1vw]`}>
                            <h4>Quick Acss</h4>
                            <div className={`${styles.box}`}>
                                <h5>Edit Footage</h5>
                                <p>Make sure to watch the video carefully before uploading, if there are any errors in your video, you can quick edit them from the options below </p>
                                <CustomBtn width='w-full' word='Footage Selection' btnColor='black'/>

                            </div>
                            <div className={`${styles.box}`}>
                                <h5>Edit Music</h5>
                                <p>Make sure to watch the video carefully before uploading, if there are any errors in your video, you can quick edit them from the options below </p>
                                <CustomBtn width='w-full' word='Music Selection' btnColor='black'/>

                            </div>
                            <div className={`${styles.box}`}>
                                <h5>Voice Over</h5>
                                <p>Make sure to watch the video carefully before uploading, if there are any errors in your video, you can quick edit them from the options below </p>
                                <CustomBtn width='w-full' word='Voice Over' btnColor='black'/>

                            </div>
                        </div>
                      
            </div>
            <div className='flex justify-between'>
                    <CustomBtn word='Back' btnColor='white' href='/video-editor/create/footage-preview' />
                    <CustomBtn word='Next' btnColor='black' href='/video-editor/create/video-ready' />

                        </div>

        </div>
    )
}

export default VideoPreview