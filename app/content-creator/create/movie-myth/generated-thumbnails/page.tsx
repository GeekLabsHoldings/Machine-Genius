"use client";
import React from "react";
import dynamic from "next/dynamic";

export default function Page() {
  const GeneratedThumbnailsPage = dynamic(() => import("@/app/content-creator/create/generated-thumbnails/ThumbnailCanvas"), {
    ssr: false,
  });
  return <GeneratedThumbnailsPage />;
}
