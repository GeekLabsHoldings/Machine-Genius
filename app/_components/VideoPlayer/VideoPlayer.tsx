'use client';
import Video from 'next-video';
interface videoProps {
    videoUrl:string
}
const VideoPlayer = ({videoUrl}:videoProps)=>{
    return(
        <div>
        <Video src={videoUrl} controls accentColor='#F36F24' autoPlay/>
        </div>
    )
}

export default VideoPlayer