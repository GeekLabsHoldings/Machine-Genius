"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const CreatePage = dynamic(() => import("./CreatePage"), { ssr: false });

  return <CreatePage />;
}
