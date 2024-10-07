"use client";
import dynamic from "next/dynamic";
const PlatformPost = dynamic(() => import("../_platform-post/PlatformPost"), {
  ssr: false,
});

const TwitterPost = () => {
  return <PlatformPost />;
};

export default TwitterPost;
