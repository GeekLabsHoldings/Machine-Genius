"use client";
import dynamic from "next/dynamic";
import React, { useContext, useEffect } from "react";
import { globalContext } from "./_context/store";

export default function Page() {
  const HomePage = dynamic(() => import("./HomePage"), { ssr: false });
  const { handleSignOut } = useContext(globalContext);

  useEffect(() => {
    localStorage.removeItem("selected-role");
    handleSignOut("");
    const handleBeforeUnload = (): void => {
      window.scrollTo(0, 0);
    };

    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.onbeforeunload = null; // Clean up the event listener
    };
  }, []);

  return <HomePage />;
}
