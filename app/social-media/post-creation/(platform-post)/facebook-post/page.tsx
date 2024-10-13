"use client";
import React from "react";
import dynamic from "next/dynamic";
const LinkedInPost = dynamic(() => import("./FacebookPostPage"), { ssr: false });

export default function page() {
  return <LinkedInPost />;
}
