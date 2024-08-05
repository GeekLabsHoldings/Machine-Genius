"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const FinalArticle = dynamic(() => import("./FinalArticlePage"), {
    ssr: false,
  });

  return <FinalArticle />;
}
