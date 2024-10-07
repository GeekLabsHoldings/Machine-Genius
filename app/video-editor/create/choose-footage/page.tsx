"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const ChooseFootagePage = dynamic(() => import("./ChooseFootagePage"), { ssr: false });

  return <ChooseFootagePage />;
}