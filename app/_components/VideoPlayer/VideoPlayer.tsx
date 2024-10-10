"use client";
import React, { useRef, useState, useEffect } from "react";
import "./VideoPlayer.css";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

interface IndicatorProps {
  id: number;
  start: number;
  end: number;
  duration: number;
  highlighted: boolean;
  setHighlighted: (id: number) => void;
  setCurrentTime: (time: number) => void;
  handleSliderChange: (event: any) => void;
}

const Indicator = ({
  id,
  start,
  end,
  duration,
  highlighted,
  setHighlighted,
  setCurrentTime,
  handleSliderChange,
}: IndicatorProps) => {
  const handleClick = () => {
    setHighlighted(id);
    setCurrentTime(start);
    handleSliderChange({ target: { value: (start / duration) * 100 } });
  };

  const width = ((end - start) / duration) * 100;
  const indicatorPercentage = (start / duration) * 100;

  return (
    <div
      className={`indicator ${highlighted ? "clicked" : ""}`}
      style={{
        left: `${indicatorPercentage + 0.5}%`,
        width: `${width}%`,
      }}
      onClick={handleClick}
    ></div>
  );
};

interface VideoPlayerProps {
  src: string;
  highlightTime: { id: number; start: number; end: number }[];
  videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoPlayer = ({ src, highlightTime, videoRef }: VideoPlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlighted, setHighlighted] = useState(0);

  useEffect(() => {
    console.log("Setting up video event listeners");
    const videoElement = videoRef.current;
    if (!videoElement) {
      console.log("Video element not found");
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const handleLoadedMetadata = () => {
      console.log("Metadata loaded, duration:", videoElement.duration);
      setDuration(videoElement.duration);
    };

    if (videoElement.readyState >= 1) {
      // Metadata is already loaded
      handleLoadedMetadata();
    } else {
      // Metadata not loaded, add event listener
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    setPercentage((currentTime / duration) * 100);
  }, [currentTime, duration]);

  const handleSliderChange = (event: any) => {
    if (!videoRef.current) return;
    const newTime = (event.target.value / 100) * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="video-player">
      <video ref={videoRef} src={src} controls={false} />
      <div className="controls">
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={percentage || 0}
            onChange={handleSliderChange}
            style={{
              background: `linear-gradient(to right, #FFFFFF ${percentage}%, #959595 ${percentage}%)`,
            }}
          />
          {highlightTime?.map((time) => (
            <Indicator
              id={time.id}
              start={time.start}
              end={time.end}
              duration={duration}
              key={time.id}
              highlighted={
                (highlighted === time.id &&
                  currentTime >= time.start &&
                  currentTime < time.end) ||
                (currentTime >= time.start && currentTime < time.end)
              }
              setHighlighted={setHighlighted}
              setCurrentTime={setCurrentTime}
              handleSliderChange={handleSliderChange}
            />
          ))}
        </div>
        <div className="time-stamps">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="flex items-center gap-12">
          <svg
            width="39"
            height="34"
            viewBox="0 0 39 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M35.202 1.13612L23.866 9.27926V3.00345C23.8649 0.252078 22.341 0.42201 21.0108 1.13612L0.940316 15.554C0.0172905 16.4959 0.0172905 18.0209 0.940316 18.9616L21.0108 33.3795C22.2301 34.1691 23.8649 33.7831 23.866 31.4378V25.2351L35.202 33.3795C36.4213 34.1691 38.0195 33.8197 38.0573 31.4012V3.07895C38.0939 0.39958 36.5323 0.42201 35.202 1.13612Z"
              fill="#FFFFFB"
            />
          </svg>
          {isPlaying ? (
            <svg
              width="25"
              height="34"
              viewBox="0 0 25 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handlePlayPause}
              className="cursor-pointer"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.21487 0.687256C1.933 0.687256 0.0810547 2.5392 0.0810547 4.82107V29.6239C0.0810547 31.9058 1.933 33.7578 4.21487 33.7578C6.49673 33.7578 8.34868 31.9058 8.34868 29.6239V4.82107C8.34868 2.5392 6.49673 0.687256 4.21487 0.687256ZM24.8839 4.82107V29.6239C24.8839 31.9058 23.032 33.7578 20.7501 33.7578C18.4683 33.7578 16.6163 31.9058 16.6163 29.6239V4.82107C16.6163 2.5392 18.4683 0.687256 20.7501 0.687256C23.032 0.687256 24.8839 2.5392 24.8839 4.82107Z"
                fill="#FFFFFB"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="34"
              viewBox="0 0 419 474"
              onClick={handlePlayPause}
              className="cursor-pointer"
              fill="none"
            >
              <path
                d="M402.263 207.896C424.486 220.726 424.486 252.8 402.263 265.63L50 469.01C27.7777 481.84 0 465.803 0 440.143V33.3829C0 7.72291 27.7777 -8.31443 50 4.51557L402.263 207.896Z"
                fill="#FFFFFB"
              />
            </svg>
          )}
          <svg
            width="39"
            height="34"
            viewBox="0 0 39 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.82727 1.13612L15.1633 9.27926V3.00345C15.1644 0.252078 16.6882 0.42201 18.0185 1.13612L38.089 15.554C39.012 16.4959 39.012 18.0209 38.089 18.9616L18.0185 33.3795C16.7992 34.1691 15.1644 33.7831 15.1633 31.4378V25.2351L3.82727 33.3795C2.60799 34.1691 1.0098 33.8197 0.972027 31.4012V3.07895C0.935436 0.39958 2.49703 0.42201 3.82727 1.13612Z"
              fill="#FFFFFB"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
