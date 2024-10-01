import React from "react";
import dynamic from "next/dynamic";
const LinkedInPost = dynamic(() => import("./LinkedInPost"), { ssr: false });

export default function page() {
  return <LinkedInPost />;
}
