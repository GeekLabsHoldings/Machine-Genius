"use client";
import dynamic from "next/dynamic";
import React from "react";

export default function Page() {
  const Dashboard = dynamic(() => import("./SignIn"), { ssr: false });

  return <Dashboard />;
}
