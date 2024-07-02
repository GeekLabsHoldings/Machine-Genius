
import GlobalContextProvider from "@/app/_context/store";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <GlobalContextProvider>{children}</GlobalContextProvider>
    </>
  );
};

export default layout;
