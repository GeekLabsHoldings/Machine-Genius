"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const PublishPost = dynamic(
  () => import('./LinkedInPublishPost'),
  { ssr: false }
);

export default function page() {
  return <PublishPost />;
}
