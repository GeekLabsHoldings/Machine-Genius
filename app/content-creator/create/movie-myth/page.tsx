import React from "react";
import dynamic from "next/dynamic";

const MovieMythUploadPage = dynamic(() => import("./MovieMythUploadPage"), {
  ssr: false,
});

export default function page() {
  return <MovieMythUploadPage />;
}
