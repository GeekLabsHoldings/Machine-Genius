"use client";
import React from "react";

interface IProps {
  text: any;
  start: any;
  end: any;
}

export default function HighlightedContent({ text, start, end }: IProps) {
  function highlightText(text: any, start: any, end: any) {
    return [text.slice(0, start), text.slice(start, end), text.slice(end)];
  }

  const parts = highlightText(text, start, end);


  return (
    <>
      <p>{parts[0]}</p>
      <p className="bg-red-200">{parts[1]}</p>
      <p>{parts[2]}</p>
    </>
  );
}
