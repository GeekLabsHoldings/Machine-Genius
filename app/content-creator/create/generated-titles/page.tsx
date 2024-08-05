"use client";
import React from "react";
import dynamic from "next/dynamic";

export default function Page() {
  const GeneratedTitlesPage = dynamic(() => import("./GeneratedTitlesPage"), {
    ssr: false,
  });
  return <GeneratedTitlesPage />;
}
