"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const ThumbnailCanvas = dynamic(() => import("./ThumbnailCanvas"), { ssr: false });

  return <ThumbnailCanvas />;
}
