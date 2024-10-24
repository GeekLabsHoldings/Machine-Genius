"use client";
import dynamic from "next/dynamic";
const PlatformPost = dynamic(() => import("../_platform-post/PlatformPost"), {
  ssr: false,
});

const TwitterPostPage = () => {
  return <PlatformPost postCaptionLimit={280} />;
};

export default TwitterPostPage;
