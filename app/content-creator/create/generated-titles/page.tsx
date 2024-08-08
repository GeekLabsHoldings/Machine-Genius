"use client";
import React from "react";
import dynamic from "next/dynamic";

export default function Page() {
  const GeneratedTitlesPage = dynamic(() => import("@/app/_components/ContentCreator/GeneratedTitlesPage"), {
    ssr: false,
  });
  return <GeneratedTitlesPage />;
}
