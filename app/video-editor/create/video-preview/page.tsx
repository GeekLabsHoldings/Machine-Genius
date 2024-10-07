"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const VideoPreviewPage = dynamic(() => import("./VideoPreviewPage"), { ssr: false });

  return <VideoPreviewPage />;
}