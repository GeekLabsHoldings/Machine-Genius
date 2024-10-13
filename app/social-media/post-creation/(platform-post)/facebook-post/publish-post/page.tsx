"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const PublishPost = dynamic(
  () => import('./FacebookPublishPostPage'),
  { ssr: false }
);

export default function page() {
  return <PublishPost />;
}
