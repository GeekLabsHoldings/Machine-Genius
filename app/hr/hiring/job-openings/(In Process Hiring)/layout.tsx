import React from "react";
import NavigatingBackContextProvider from "../navigatingBackContext";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigatingBackContextProvider>{children}</NavigatingBackContextProvider>
  );
};

export default layout;
