"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const CreateArticle = dynamic(() => import("./CreateArticlePage"), {
    ssr: false,
  });

  return <CreateArticle />;
}
