"use client";
import styles from "./CustomVideoPlayer.module.css";
// import Video from "next-video";
// video player component to take video url and play it with streaming as chunks

interface videoProps {
  videoUrl: string;
  autoplay?: boolean;
  setVideo?: (videoUrl: string) => void;
  video?: string;
}
const CustomVideoPlayer = ({
  videoUrl,
  autoplay = true,
  setVideo,
  video,
}: videoProps) => {
  console.log(video);
  const handleVideo = () => {
    if (setVideo) {
      setVideo(videoUrl);
    }
  };
  return (
    <div className={`${styles.videoWrapper}`}>
      {/* <Video className='w-full h-full' src={videoUrl} controls accentColor='#F36F24' autoPlay={autoplay} muted /> */}
      <video
        onClick={() => {
          handleVideo();
        }}
        className="w-full h-full"
        controls
        preload="none"
        autoPlay={autoplay}
      >
        <source src={videoUrl} type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default CustomVideoPlayer;
