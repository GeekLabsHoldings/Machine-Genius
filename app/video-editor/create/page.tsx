"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const VideoCreatePage = dynamic(() => import("./VideoCreatePage"), { ssr: false });

  return <VideoCreatePage />;
}