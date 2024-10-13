"use client";
import dynamic from "next/dynamic";
const PlatformPost = dynamic(() => import("../_platform-post/PlatformPost"), {
  ssr: false,
});

const LinkedInPostPage = () => {
  return <PlatformPost postCaptionLimit={3000} />;
};

export default LinkedInPostPage;
