"use client";
import React, { useEffect, useState } from "react";

export const NavigatingBackContext = React.createContext<any>(null);

const NavigatingBackContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [navigatingBackData, setNavigatingBackData] = useState<any>(null);
  useEffect(() => { 
    setNavigatingBackData(JSON.parse(localStorage.getItem("navigatingBackData") || "[]"));
    console.log(JSON.parse(localStorage.getItem("navigatingBackData") || "[]"));
  },[])

  useEffect(() => {
    console.log(navigatingBackData);
  },[navigatingBackData])

  return (
    <NavigatingBackContext.Provider
      value={{ navigatingBackData, setNavigatingBackData }}
    >
      {children}
    </NavigatingBackContext.Provider>
  );
};

export default NavigatingBackContextProvider;
