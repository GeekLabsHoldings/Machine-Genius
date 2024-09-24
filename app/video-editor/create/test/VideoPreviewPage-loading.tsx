"use client";

import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";

const WorkingOnVideo = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <LogoAndTitle
        title="Genius is working on your video!"
        textNeeded="Hold on tight.."
        needTxt={true}
      />
    </div>
  );
};

export default WorkingOnVideo;
