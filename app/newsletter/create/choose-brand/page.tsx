"use client";
import dynamic from 'next/dynamic';
import React from 'react';

export default function Page() {
  const ChooseBrand = dynamic(() => import("./ChooseBrandPage"), { ssr: false });

  return (
    <ChooseBrand />
  )
}
