"use client";
import React from "react";
import dynamic from "next/dynamic";
const TwitterPost = dynamic(() => import("./TwitterPostPage"), { ssr: false });

export default function page() {
  return <TwitterPost />;
}
