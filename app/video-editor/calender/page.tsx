"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const CalenderPage = dynamic(
    () => import("@/app/_components/Calendar/Calendar"),
    { ssr: false }
  );

  return <CalenderPage />;
}
