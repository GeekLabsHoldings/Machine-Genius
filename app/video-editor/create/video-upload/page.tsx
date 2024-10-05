"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const VideoUploadPage = dynamic(() => import("./VideoUploadPage"), { ssr: false });

  return <VideoUploadPage />;
}