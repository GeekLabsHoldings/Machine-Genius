"use client";

// Import React and useState from React library
import React, { useState } from "react";

import TemplateContextProvider from "./_context/templatesContext";
// Import components
import dynamic from "next/dynamic";

// import { usePathname } from 'next/navigation';

// Define the layout component
const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  // Return the layout component
  return <TemplateContextProvider>{children}</TemplateContextProvider>;
};

// Export the layout component
export default layout;
