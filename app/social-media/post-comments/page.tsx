"use client";
import React from "react";
import dynamic from "next/dynamic";

const PostCommentsPage = dynamic(() => import("./PostCommentsPage"), {
  ssr: false,
});

export default function page() {
  return <PostCommentsPage />;
}
