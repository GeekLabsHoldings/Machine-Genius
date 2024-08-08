"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const ShowErrors = dynamic(() => import("@/app/_components/ContentCreator/ShowErrorsPage"), { ssr: false });

  return <ShowErrors />;
}
