"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const FinalArticle = dynamic(() => import("@/app/_components/ContentCreator/FinalArticlePage"), {
    ssr: false,
  });

  return <FinalArticle />;
}
