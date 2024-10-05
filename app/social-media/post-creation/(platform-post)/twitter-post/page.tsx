"use client";
import React from "react";
import dynamic from "next/dynamic";
const TwitterPost = dynamic(() => import("./TwitterPost"), { ssr: false });

export default function page() {
  return <TwitterPost />;
}
