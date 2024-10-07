"use client";
import React from "react";
import dynamic from "next/dynamic";
const LinkedInPost = dynamic(() => import("./TelegramPostPage"), { ssr: false });

export default function page() {
  return <LinkedInPost />;
}
