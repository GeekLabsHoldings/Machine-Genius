"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const Dashboard = dynamic(
    () => import("@/app/_components/Dashboard/Dashboard"),
    { ssr: false }
  );

  return <Dashboard />;
}
