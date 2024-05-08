'use client';
import styles from './VideoPlayer.module.css'
import Video from 'next-video';
interface videoProps {
    videoUrl:string,
    autoplay?:boolean
}
const VideoPlayer = ({videoUrl,autoplay= true }:videoProps)=>{
    return(
        <div className={styles.videoWrapper}>
        <Video className='w-full h-full' src={videoUrl} controls accentColor='#F36F24' autoPlay={autoplay} muted />
        </div>
    )
}

export default VideoPlayer
