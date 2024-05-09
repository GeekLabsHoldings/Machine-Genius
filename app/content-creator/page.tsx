import React from 'react'

const page = () => {

  return (
    <div>
      <video width="100%" height="100%" controls preload="none" autoPlay={true} >
        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default page
