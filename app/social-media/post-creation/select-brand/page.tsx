"use client";
import React from "react";
import dynamic from "next/dynamic";

const SelectBrandPage = dynamic(() => import("./SelectBrandPage"), {
  ssr: false,
});

export default function page() {
  return <SelectBrandPage />;
}
