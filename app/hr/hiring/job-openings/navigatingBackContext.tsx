"use client";
import React, { useState } from "react";

export const NavigatingBackContext = React.createContext<any>(null);

const NavigatingBackContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [navigatingBackData, setNavigatingBackData] = useState(false);

  return (
    <NavigatingBackContext.Provider
      value={{ navigatingBackData, setNavigatingBackData }}
    >
      {children}
    </NavigatingBackContext.Provider>
  );
};

export default NavigatingBackContextProvider;
