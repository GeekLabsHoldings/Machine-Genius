import React from 'react'
import './CustomAudioPlayer.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const CustomAudioPlayer = () => {



  
  return (
    <AudioPlayer
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
      onPlay={e => console.log("onPlay")}
      autoPlayAfterSrcChange={true}
      // other props here
      className="custom_audio_player"
      
    />
  )
}

export default CustomAudioPlayer
