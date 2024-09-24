"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const ConvertedScriptPage = dynamic(() => import("./ConvertedScriptPage"), { ssr: false });

  return <ConvertedScriptPage />;
}