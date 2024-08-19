"use client";
import React from "react";
import dynamic from "next/dynamic";

export default function Page() {
  const GeneratedThumbnailsPage = dynamic(() => import("@/app/_components/ContentCreator/GeneratedThumbnailsPage"), {
    ssr: false,
  });
  return <GeneratedThumbnailsPage />;
}
