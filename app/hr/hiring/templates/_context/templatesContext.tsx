"use client";
import React, { createContext, useState } from "react";

type template = {
  key: string;
  value: string;
};

interface TemplatesContextType {
  templates: template;
  setTemplates: React.Dispatch<React.SetStateAction<template>>;
}

export let templatesContext = createContext<TemplatesContextType>(
  {} as TemplatesContextType
);
export default function TemplatesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [templates, setTemplates] = useState<template>({
    key: "",
    value: "",
  });

  return (
    <templatesContext.Provider value={{ templates, setTemplates }}>
      {children}
    </templatesContext.Provider>
  );
}
