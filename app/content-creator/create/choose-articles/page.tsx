"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const ChooseArticles = dynamic(() => import("./ChooseArticlesPage"), { ssr: false });

  return <ChooseArticles />;
}