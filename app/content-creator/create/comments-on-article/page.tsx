"use client";
import React from "react";
import dynamic from "next/dynamic";

export default function Page() {
  const CommentsOnArticlePage = dynamic(() => import("./CommentsOnArticlePage"), {
    ssr: false,
  });
  return <CommentsOnArticlePage />;
}
