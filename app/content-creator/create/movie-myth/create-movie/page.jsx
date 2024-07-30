"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const CreateMovie = dynamic(() => import("./CreateMoviePage"), { ssr: false });

  return <CreateMovie />;
}
